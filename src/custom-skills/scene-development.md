---
name: scene-development
description: 단일 Scene 컴포넌트 개발 가이드 — Scene 하나를 요청받았을 때 이 스킬을 참조합니다.
---

# Scene 개별 개발 가이드

이 스킬은 Remotion 영상 프로젝트에서 **Scene 하나를 독립적으로 개발**할 때 사용합니다.

## 사전 조건

Scene 개발을 시작하기 전에 아래 파일이 존재하는지 확인합니다:

- `src/projects/{project-id}/script.ts` — Scene별 대본
- `src/projects/{project-id}/config.ts` — 프로젝트 설정 (fps, 해상도 등)
- `public/projects/{project-id}/audio/scene{N}.wav` — 해당 Scene의 오디오

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
- 강조할 때만 `SPRING_CONFIG.POP` (살짝 튀어오르는 등장).
- 대형 제목에는 `SPRING_CONFIG.HEAVY` (무게감 있는 등장).
- Easing 기본값: `EASING_PRESET.SMOOTH_OUT` (빠른 시작 + 우아한 감속).

---

## 🏷️ SectionLabel 규칙

영상의 전체 흐름: `intro → 소제목1 → 소제목2 → ... → outro`

| 씬 위치 | `sectionTitle` prop | SectionLabel 표시 |
|---------|---------------------|-------------------|
| **intro** | 생략 | ❌ |
| **소제목의 첫 번째 씬** | **필수** (예: `"핵심 원리"`) | ✅ |
| **소제목의 후속 씬** (부수 설명) | 생략 가능 | ❌ |
| **outro** | 생략 | ❌ |

AI에게 씬을 요청할 때, **해당 씬이 소제목의 첫 번째인지 후속인지를 명시**해야 합니다.

```
예시:
Scene 3: sectionTitle="핵심 원리"   ← 소제목 첫 등장 ✅
Scene 4: sectionTitle 생략          ← 부수 설명 ❌
Scene 5: sectionTitle 생략          ← 부수 설명 ❌
```

---

## 개발 절차

### 1. 대본 확인

`script.ts`에서 요청된 Scene의 대본 텍스트를 읽습니다.

```ts
import { script } from "./script";
const sceneScript = script.find((s) => s.sceneId === "scene{N}");
```

### 2. 오디오 길이 확인

해당 Scene의 WAV 파일 길이를 확인하여, 애니메이션 타이밍의 참고로 삼습니다.

```bash
conda activate qwen3-tts
ffprobe -v error -show_entries format=duration -of csv=p=0 public/projects/{project-id}/audio/scene{N}.wav
```

### 3. Scene 컴포넌트 작성

파일 위치: `src/projects/{project-id}/scenes/scene{N}/Scene{N}.tsx`

```tsx
import React from "react";
import {
  SceneBackground,
  AnimatedTitle,
  AnimatedText,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";

export const Scene{N}: React.FC = () => {
  return (
    <SceneBackground variant="gradient">
      {/* 소제목 첫 씬이면 sectionTitle 필수 */}
      <CenteredLayout sectionTitle="소제목" gap={SPACING.LG}>
        <AnimatedTitle
          text="제목 텍스트"
          size="hero"
          animation="slideUp"
        />
        <AnimatedText
          text="본문 텍스트"
          variant="body"
          delay={0.3}
        />
      </CenteredLayout>
    </SceneBackground>
  );
};
```

### 4. index.tsx에 Scene 등록

```tsx
import { Scene{N} } from "./scenes/scene{N}/Scene{N}";

const SCENES: React.FC[] = [Scene1, ..., Scene{N}]; // ← 추가
```

**주의**: SCENES 배열의 순서는 `script.ts`의 scene 순서와 반드시 일치해야 합니다.

### 5. 미리보기 확인

```bash
npm run dev
```

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
```

---

## 추가 규칙 참조

복잡한 기능이 필요할 때는 Remotion 스킬의 세부 규칙을 참조합니다:

- 자막/캡션 → `.agents/skills/remotion-best-practices/rules/subtitles.md`
- 텍스트 애니메이션 → `.agents/skills/remotion-best-practices/rules/text-animations.md`
- 트랜지션 → `.agents/skills/remotion-best-practices/rules/transitions.md`
- 오디오 시각화 → `.agents/skills/remotion-best-practices/rules/audio-visualization.md`
- 차트/데이터 시각화 → `.agents/skills/remotion-best-practices/rules/charts.md`
