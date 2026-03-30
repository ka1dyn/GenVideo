---
name: scene-development
description: 단일 Scene 컴포넌트 개발 가이드 — Scene 하나를 요청받았을 때 이 스킬을 참조합니다.
---

# Scene 개별 개발 가이드

이 스킬은 Remotion 영상 프로젝트에서 **Scene 하나를 독립적으로 개발**할 때 사용합니다.

## 핵심 구조: Scene → Segment

| 단위 | 역할 | 길이 | 오디오 |
|------|------|------|--------|
| **Scene** | 챕터 (소제목 단위) | ~2분 | Segment WAV의 합산 |
| **Segment** | 오디오 싱크 최소 단위 | 10-20초 | 개별 WAV (`seg1.wav`) |

Scene 컴포넌트는 내부에 **nested TransitionSeries**를 사용하여 여러 Segment를 시퀀싱합니다.
각 Segment에 개별 `<Audio>`가 붙어 음성과 화면이 정확히 싱크됩니다.

---

## 사전 조건

Scene 개발을 시작하기 전에 아래 파일이 존재하는지 확인합니다:

- `src/projects/{project-id}/script.ts` — Scene·Segment별 대본
- `src/projects/{project-id}/config.ts` — 프로젝트 설정 (fps, 해상도 등)
- `public/projects/{project-id}/audio/scene{N}/seg{M}.wav` — 해당 Scene의 Segment별 오디오

하나라도 없으면 사용자에게 알리고 대기합니다.

---

## 🚨 4대 금지 원칙

| # | 금지 사항 | 대신 사용할 것 |
|---|----------|---------------|
| 1 | **🚫 원시 HTML 금지** (`<div>`, `<h1>`, `<p>` 직접 사용 금지) | `shared/components/` + `shared/layouts/`에서 import |
| 2 | **🚫 매직 넘버 금지** (인라인 spring config, px 값 직접 입력 금지) | `SPRING_CONFIG`, `TIMING`, `EASING_PRESET`, `SPACING`, `FONT_SIZES` 상수 |
| 3 | **🚫 자유 배치 금지** (커스텀 flexbox/grid 레이아웃 금지) | 6가지 레이아웃 중 선택 |
| 4 | **🚫 Duration 관여 금지** (ffprobe, 하드코딩 duration 금지) | `useCurrentFrame()` + `fps` + `clamp` |

---

## 🎨 디자인 규칙 — Vercel Geist 기반

### 색상

- `COLORS` 상수에서만 선택합니다. **임의 hex 코드 금지.**
- 기본 화면은 **흑백 + 그레이**로 깔끔하게 구성합니다.
- 색상은 **의미가 있을 때만** 사용합니다 (강조, 성공, 경고, 에러).
- 강조할 때는 `COLORS.ACCENT` (Vercel Blue: `#0070f3`)을 사용합니다.

### 타이포그래피

- `TYPOGRAPHY` 프리셋을 사용합니다 — `letterSpacing`, `lineHeight` 직접 지정 금지.
- 폰트는 **Geist Sans** (일반), **Geist Mono** (코드·수치).
- 제목은 크고 시원하게, 본문은 편안하게 읽히도록:
  - `TYPOGRAPHY.HERO` → 히어로 제목 (XXL, tight)
  - `TYPOGRAPHY.HEADING` → 서브 제목 (XL)
  - `TYPOGRAPHY.BODY` → 본문 (MD)
  - `TYPOGRAPHY.LABEL` → SectionLabel용 (SM, 자연스러운 문장체)
  - `TYPOGRAPHY.MONO` → 코드/수치 (SM)

### 화면 구성

- **한 화면에 텍스트를 적게, 대신 크고 시원하게.**
- 핵심 한 줄이 화면을 지배하는 구성을 지향합니다.
- `SPACING` 상수로 넉넉한 여백을 확보합니다.
- 장식(`GlowOrb` 등)은 **intro/outro 또는 핵심 강조 씬에서만** 사용합니다.

### 애니메이션

- 기본 spring은 `SPRING_CONFIG.GENTLE` (부드러운 흐름).
- 빠른 settling이 필요하면 `SPRING_CONFIG.SMOOTH`.
- 정밀한 반응에는 `SPRING_CONFIG.SNAPPY`.
- 강조할 때만 `SPRING_CONFIG.POP` (살짝 튀어오르는 등장).
- 대형 제목에는 `SPRING_CONFIG.HEAVY` (무게감 있는 등장).
- Easing 기본값: `EASING_PRESET.SMOOTH_OUT` (빠른 시작 + 우아한 감속).

---

## 🏷️ SectionLabel 규칙

`sectionTitle`은 **Scene 레벨**에 정의됩니다. 첫 번째 Segment에서만 SectionLabel을 표시합니다.

| Segment 위치 | SectionLabel 표시 | 처리 방법 |
|-------------|-------------------|----------|
| **Scene의 첫 번째 Segment** | ✅ 표시 | 렌더러에 `sectionTitle={sceneData?.sectionTitle}` 전달 |
| **Scene의 후속 Segment** | ❌ 미표시 | `sectionTitle` 생략 |

```tsx
// 첫 번째 Segment 렌더러에서만 sectionTitle 전달
const SEGMENT_RENDERERS = [
  (seg) => <Seg1 text={seg.text} sectionTitle={sceneData?.sectionTitle} />,
  (seg) => <Seg2 text={seg.text} />,  // sectionTitle 없음
];
```

---

## 개발 절차

### 1. 대본 확인

대본 데이터는 `script.ts`에서 가져옵니다.

```ts
import { script } from "../../script";
const sceneData = script.find((s) => s.sceneId === "scene{N}");
const segments = sceneData?.segments || [];
```

### 2. Segment 렌더러 설계

각 Segment의 `text`를 읽고, 내용에 맞는 레이아웃·컴포넌트 조합을 설계합니다.

```tsx
// 예: 핵심 개념 설명 → 큰 제목 + 본문
const Seg1: React.FC<{ text: string; sectionTitle?: string }> = ({
  text, sectionTitle,
}) => (
  <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
    <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />
    <AnimatedText text={text} variant="body" delay={0.3} />
  </CenteredLayout>
);

// 예: 데이터/비교 → 카드 레이아웃
const Seg2: React.FC<{ text: string }> = ({ text }) => (
  <SplitLayout
    left={<StatCard value="95%" label="정확도" />}
    right={<AnimatedText text={text} variant="body" />}
  />
);
```

### 3. Scene 컴포넌트 작성

파일 위치: `src/projects/{project-id}/scenes/scene{N}/Scene{N}.tsx`

```tsx
import React from "react";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneBackground, AnimatedTitle, AnimatedText } from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";

// ── Segment 렌더러 ──
const Seg1: React.FC<{ text: string; sectionTitle?: string }> = ({
  text, sectionTitle,
}) => (
  <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
    <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />
    <AnimatedText text={text} variant="body" delay={0.3} />
  </CenteredLayout>
);

const Seg2: React.FC<{ text: string }> = ({ text }) => (
  <CenteredLayout gap={SPACING.LG}>
    <AnimatedText text={text} variant="body" animation="fadeIn" />
  </CenteredLayout>
);

// ── Scene 컴포넌트 ──
export const Scene{N}: React.FC<{ segmentDurations: number[] }> = ({
  segmentDurations,
}) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene{N}");
  const segments = sceneData?.segments || [];
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  // Segment 렌더러 배열 — segments 배열과 1:1 대응
  const SEGMENT_RENDERERS = [
    (seg: SegmentScript) => (
      <Seg1 text={seg.text} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript) => <Seg2 text={seg.text} />,
    // ... Segment 수만큼 추가
  ];

  return (
    <SceneBackground variant="gradient">
      <TransitionSeries>
        {segments.map((seg, i) => {
          const render = SEGMENT_RENDERERS[i];
          return (
            <React.Fragment key={seg.segmentId}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: transitionFrames })}
                />
              )}
              <TransitionSeries.Sequence
                durationInFrames={Math.ceil(segmentDurations[i] * fps)}
              >
                {render(seg)}
                <Audio src={staticFile(seg.audioFile)} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </SceneBackground>
  );
};
```

### 4. index.tsx에 Scene 등록

```tsx
import { Scene{N} } from "./scenes/scene{N}/Scene{N}";

const SCENES: React.FC<{ segmentDurations: number[] }>[] = [Scene1, ..., Scene{N}]; // ← 추가
```

**주의**: SCENES 배열의 순서는 `script.ts`의 scene 순서와 반드시 일치해야 합니다.

### 5. 미리보기 확인

```bash
npm run dev
```

---

## Segment 설계 가이드라인

대본(text)의 내용에 따라 적절한 컴포넌트를 선택합니다:

| 대본 내용 | 추천 컴포넌트 |
|----------|-------------|
| 핵심 개념/정의 | `AnimatedTitle` (hero) + `AnimatedText` (body) |
| 숫자/통계 | `StatCard`, `NumberCounter`, `BarChart` |
| 단계별 설명 | `BulletList`, `StepIndicator` |
| 비교/대조 | `ComparisonRow`, `SplitLayout` |
| 코드/기술 | `CodeSnippet`, `TypewriterText` |
| 인용/강조 | `Quote`, `HighlightedText` |
| 시간순 설명 | `TimelineItem` |

---

## 사용 가능한 컴포넌트 카탈로그

### Typography

| 컴포넌트 | 용도 | 주요 Props |
|---------|------|-----------|
| `AnimatedTitle` | 크고 시원한 제목 | `text`, `size` (`hero`\|`heading`), `animation`, `delay` |
| `AnimatedText` | 본문/부제/캡션 | `text`, `variant` (`body`\|`subtitle`\|`caption`\|`mono`), `delay` |
| `HighlightedText` | 블루 형광펜 강조 | `text`, `highlightColor?`, `delay` |
| `TypewriterText` | 타자기 효과 (Geist Mono) | `text`, `speed?` (`normal`\|`fast`\|`slow`), `delay` |
| `NumberCounter` | 숫자 카운트업 | `from`, `to`, `suffix?`, `prefix?`, `duration` |
| `Quote` | 인용문 + 출처 | `text`, `author?`, `delay` |
| `BulletList` | 순차 등장 리스트 | `items: string[]`, `icon?`, `staggerDelay?` |

### Surfaces

| 컴포넌트 | 용도 | 주요 Props |
|---------|------|-----------|
| `SceneBackground` | 전체 배경 | `variant` (`solid`\|`gradient`\|`radialGlow`\|`mesh`), `children` |
| `ContentBox` | 카드/패널 | `variant` (`glass`\|`solid`\|`outlined`\|`accent`), `children` |
| `GlassPanel` | 글래스 효과 패널 | `intensity?` (`light`\|`medium`\|`strong`), `children` |
| `ProgressBar` | 프로그레스 바 | `progress` (0-1), `variant`, `label?` |

### Data & Information

| 컴포넌트 | 용도 | 주요 Props |
|---------|------|-----------|
| `StatCard` | 통계 카드 | `value`, `label`, `suffix?`, `trend?` |
| `ComparisonRow` | Before/After 비교 | `label`, `before`, `after` |
| `TimelineItem` | 타임라인 항목 | `title`, `description?`, `isActive?` |
| `BarChart` | 바 차트 | `data: {label, value}[]`, `direction?` |
| `StepIndicator` | 단계 표시기 | `steps: string[]`, `currentStep` |

### Visual & Decoration

| 컴포넌트 | 용도 | 주요 Props |
|---------|------|-----------|
| `Divider` | 구분선 | `variant` (`line`\|`gradient`\|`glow`\|`dashed`) |
| `IconBadge` | 이모지 배지 | `icon`, `label?`, `variant` |
| `GlowOrb` | 배경 글로우 **(강조 전용)** | `size?`, `color?`, `position` |

### Media

| 컴포넌트 | 용도 | 주요 Props |
|---------|------|-----------|
| `ImageFrame` | 프레임 이미지 | `src`, `variant` (`plain`\|`rounded`\|`bordered`\|`shadow`) |
| `CodeSnippet` | 코드 블록 | `code`, `language?`, `title?`, `highlightLines?` |

---

## 사용 가능한 레이아웃

모든 레이아웃은 `sectionTitle?: string` prop을 가집니다.

| 레이아웃 | 용도 | 주요 Props |
|---------|------|-----------|
| `CenteredLayout` | 중앙 정렬 (가장 기본) | `verticalAlign?`, `gap?` |
| `SplitLayout` | 좌우 분할 | `left`, `right`, `ratio?` |
| `StackLayout` | 수직 스택 | `header?`, `gap?` |
| `FullBleedLayout` | 전체 화면 | `overlay?`, `darkenOverlay?` |
| `GridLayout` | 그리드 | `columns` (2\|3\|4), `gap?` |
| `TopBottomLayout` | 상하 분할 | `top`, `bottom`, `ratio?` |

---

## Import 경로 참조

Scene 파일 (`src/projects/{id}/scenes/scene{N}/`) 기준:

```ts
// 컴포넌트
import { AnimatedTitle, AnimatedText, ... } from "../../../../shared/components";

// 레이아웃
import { CenteredLayout, SplitLayout, ... } from "../../../../shared/layouts";

// 상수
import { COLORS, FONTS, FONT_SIZES, TYPOGRAPHY, SPACING, BORDER_RADIUS } from "../../../../shared/constants/design";
import { SPRING_CONFIG, TIMING, CLAMP, EASING_PRESET } from "../../../../shared/constants/animations";

// 타입
import type { SegmentScript } from "../../../../shared/types/project";
```

---

## 추가 규칙 참조

복잡한 기능이 필요할 때는 Remotion 스킬의 세부 규칙을 참조합니다:

- 자막/캡션 → `.agents/skills/remotion-best-practices/rules/subtitles.md`
- 텍스트 애니메이션 → `.agents/skills/remotion-best-practices/rules/text-animations.md`
- 트랜지션 → `.agents/skills/remotion-best-practices/rules/transitions.md`
- 오디오 시각화 → `.agents/skills/remotion-best-practices/rules/audio-visualization.md`
- 차트/데이터 시각화 → `.agents/skills/remotion-best-practices/rules/charts.md`
