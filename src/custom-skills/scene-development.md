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

Scene은 **nested TransitionSeries**로 여러 Segment를 시퀀싱합니다.
각 Segment에 개별 `<Audio>`가 붙어 음성과 화면이 정확히 싱크됩니다.

---

## 파일 구조

Segment 하나당 파일 하나를 생성합니다. `Scene{N}.tsx`는 얇은 오케스트레이터 역할만 합니다.

```
src/projects/{project-id}/scenes/scene{N}/
├── Scene{N}.tsx   ← Scene 오케스트레이터 (import + TransitionSeries만)
├── Seg1.tsx       ← Segment 1 컴포넌트
├── Seg2.tsx       ← Segment 2 컴포넌트
└── Seg3.tsx       ← Segment 3 컴포넌트 ...
```

---

## 사전 조건

Scene 개발 전에 아래 파일이 존재하는지 확인합니다:

- `src/projects/{project-id}/script.ts` — Scene·Segment별 대본
- `src/projects/{project-id}/config.ts` — 프로젝트 설정
- `public/projects/{project-id}/audio/scene{N}/seg{M}.wav` — Segment별 오디오

하나라도 없으면 사용자에게 알리고 대기합니다.

---

## 🚨 4대 금지 원칙

| # | 금지 사항 | 대신 사용할 것 |
|---|----------|---------------|
| 1 | **🚫 원시 HTML 금지** (`<div>`, `<h1>`, `<p>` 직접 사용) | `shared/components/` + `shared/layouts/`에서 import |
| 2 | **🚫 매직 넘버 금지** (인라인 spring config, px 값 직접 입력) | `SPRING_CONFIG`, `TIMING`, `EASING_PRESET`, `SPACING`, `FONT_SIZES` 상수 |
| 3 | **🚫 자유 배치 금지** (커스텀 flexbox/grid 레이아웃) | 6가지 레이아웃 중 선택 |
| 4 | **🚫 하드코딩 duration 금지** (ffprobe, 절대 프레임 수 직접 입력) | `usePhase(preset, duration)` — duration은 `segmentDurations[i]`로 전달 |

> CSS transitions/animations은 Remotion에서 렌더링되지 않습니다. 반드시 `useCurrentFrame()` 기반 애니메이션을 사용하세요 (Phase-Aware 컴포넌트가 내부적으로 처리합니다).

---

## 🎨 디자인 규칙 — Vercel Geist 기반

- **색상**: `COLORS` 상수만 사용. 기본은 흑백+그레이, 강조는 `COLORS.ACCENT` (`#0070f3`).
- **타이포그래피**: `TYPOGRAPHY` 프리셋 사용 (`HERO` / `HEADING` / `BODY` / `LABEL` / `MONO`).
- **화면 구성**: 한 화면에 텍스트를 적게, 크고 시원하게. `SPACING` 상수로 넉넉한 여백.
- **Spring**: 기본 `SPRING_CONFIG.GENTLE` → 강조에만 `.POP` → 대형 제목에 `.HEAVY`.

---

## 🏷️ SectionLabel 규칙

`sectionTitle`은 **Scene의 첫 번째 Segment에서만** 표시합니다.

```tsx
// Scene{N}.tsx의 SEGMENT_RENDERERS
const SEGMENT_RENDERERS = [
  (seg, dur) => <Seg1 text={seg.text} duration={dur} sectionTitle={sceneData?.sectionTitle} />,
  (seg, dur) => <Seg2 text={seg.text} duration={dur} />,  // sectionTitle 없음
];
```

---

## 개발 절차

### 1. 대본 확인

```ts
import { script } from "../../script";
const sceneData = script.find((s) => s.sceneId === "scene{N}");
const segments = sceneData?.segments || [];
```

### 2. Segment 파일 작성 (Seg별로 독립 파일)

각 Segment의 `text` 내용에 맞는 Phase 프리셋 + 레이아웃·컴포넌트 조합을 설계하고, **Seg마다 별도 파일**로 작성합니다.

**`Seg1.tsx` 템플릿:**

```tsx
import React from "react";
import {
  AnimatedTitle, AnimatedText, PhasedHighlight, PhasedReveal,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg1Props = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const Seg1: React.FC<Seg1Props> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE — AnimatedTitle이 자체 애니메이션 처리 */}
      <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />

      {/* Phase 2: DEVELOP — 진입 후 등장, 이후 유지 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE — 핵심 강조 */}
      {phase.isPhaseActive("emphasize") && (
        <PhasedHighlight text="패러다임 전환" progress={phase.getPhaseProgress("emphasize")} />
      )}
    </CenteredLayout>
  );
};
```

### 3. Scene 오케스트레이터 작성

`Scene{N}.tsx`는 Seg 파일들을 import하고 TransitionSeries로 시퀀싱하는 역할만 합니다.

**`Scene{N}.tsx` 템플릿:**

```tsx
import React from "react";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneBackground } from "../../../../shared/components";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";
import { Seg1 } from "./Seg1";
import { Seg2 } from "./Seg2";
// import { Seg3 } from "./Seg3"; ...

export const Scene{N}: React.FC<{ segmentDurations: number[] }> = ({ segmentDurations }) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene{N}");
  const segments = sceneData?.segments || [];
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  // Segment 수만큼 추가 — script.ts의 순서와 반드시 일치
  const SEGMENT_RENDERERS = [
    (seg: SegmentScript, dur: number) => (
      <Seg1 text={seg.text} duration={dur} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript, dur: number) => (
      <Seg2 text={seg.text} duration={dur} />
    ),
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
                {render(seg, segmentDurations[i])}
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

const SCENES = [Scene1, ..., Scene{N}]; // script.ts의 scene 순서와 반드시 일치
```

### 5. 미리보기 확인

```bash
npm run dev
```

---

## ⏱️ Phase 시스템

Segment duration을 **비율로 분할**하여 전체 구간에 걸쳐 연속적인 시각 변화를 만듭니다. 15초든 25초든 자동 스케일링됩니다.

### PhaseState API

| 메서드/속성 | 반환 | 설명 |
|---|---|---|
| `isPhaseActive(name)` | `boolean` | Phase start 이상이면 true (진입 후 계속 유지) |
| `isPhaseComplete(name)` | `boolean` | Phase end 이상이면 true |
| `getPhaseProgress(name)` | `0~1` | 해당 Phase 내 진행률 (미진입=0, 완료=1) |
| `getPhaseStartSec(name)` | `number` | Phase 절대 시작 시각 (초) — 기존 `delay` prop에 전달 가능 |
| `segmentProgress` | `0~1` | Segment 전체 진행률 |

### Phase 프리셋 선택

| 프리셋 | Phase 구성 | 적합한 내용 |
|-------|-----------|------------|
| `PHASE_3_STANDARD` | entrance → develop → emphasize | **범용** — 핵심 개념, 일반 내러티브 |
| `PHASE_3_DATA` | entrance → buildup → reveal | 숫자, 통계, 차트 |
| `PHASE_3_COMPARISON` | entrance → before → after | Before/After 비교 |
| `PHASE_3_QUOTE` | entrance → typing → attribution | 인용문 + 저자 표시 |
| `PHASE_3_STEPS` | entrance → steps → summary | 단계별 설명 |
| `PHASE_4_EXTENDED` | entrance → developA → developB → emphasize | 20초+ 긴 Segment |

### 대본 유형별 추천 조합

| 대본 내용 | 프리셋 | Phase별 컴포넌트 |
|----------|--------|----------------|
| 핵심 개념/정의 | `PHASE_3_STANDARD` | E: `AnimatedTitle` / D: `PhasedReveal`+`AnimatedText` / Em: `PhasedHighlight` |
| 숫자/통계 | `PHASE_3_DATA` | E: `AnimatedTitle` / B: `PhasedNumberCounter` / R: `StatCard` |
| 비교/대조 | `PHASE_3_COMPARISON` | E: `AnimatedTitle` / Before: `ComparisonRow` / After: `ComparisonRow`+`PhasedHighlight` |
| 단계별 설명 | `PHASE_3_STEPS` | E: `AnimatedTitle` / S: `PhasedReveal`+`StepIndicator` / Sum: `PhasedHighlight` |
| 인용/강조 | `PHASE_3_QUOTE` | E: `Quote` / T: `TypewriterText` / A: `PhasedHighlight` |
| 코드/기술 | `PHASE_3_STANDARD` | E: `AnimatedTitle` / D: `CodeSnippet` / Em: `PhasedHighlight` |

> **기존 컴포넌트 병용**: `AnimatedTitle`, `AnimatedText` 등 `delay` 기반 컴포넌트는 Phase 1(ENTRANCE)에서 그대로 사용. Phase 2~3에서는 Phased 컴포넌트를 쓰거나 `phase.getPhaseStartSec("develop")`을 `delay`에 전달.

---

## Segment 설계 필수 규칙

1. 모든 Seg 파일은 **`duration` prop 필수**.
2. 모든 Seg는 **`usePhase`로 최소 3 Phase** 구성.
3. Phase 2 이후 요소는 **`phase.isPhaseActive()` 가드** 사용.
4. 연속 애니메이션에는 **Phase-Aware 컴포넌트** (`PhasedReveal`, `PhasedNumberCounter`, `PhasedHighlight`) 사용.

### 컴포넌트 선택

> 컴포넌트의 정확한 Props는 `src/shared/components/` 파일을 직접 참조하세요.

| 대본 내용 | 추천 컴포넌트 |
|----------|-------------|
| 핵심 개념/정의 | `AnimatedTitle` + `AnimatedText` |
| 숫자/통계 | `PhasedNumberCounter`, `StatCard`, `BarChart` |
| 단계별 설명 | `BulletList`, `StepIndicator` |
| 비교/대조 | `ComparisonRow`, `SplitLayout` |
| 코드/기술 | `CodeSnippet`, `TypewriterText` |
| 인용/강조 | `Quote`, `PhasedHighlight`, `HighlightedText` |
| 시간순 설명 | `TimelineItem` |
| 순차 등장 래퍼 | `PhasedReveal` |

### 레이아웃

| 레이아웃 | 용도 |
|---------|------|
| `CenteredLayout` | 중앙 정렬 (기본) |
| `SplitLayout` | 좌우 분할 |
| `StackLayout` | 수직 스택 |
| `FullBleedLayout` | 전체 화면 |
| `GridLayout` | 그리드 (2\|3\|4열) |
| `TopBottomLayout` | 상하 분할 |

모든 레이아웃은 `sectionTitle?: string` prop을 가집니다.

---

## Import 경로 참조

**Seg 파일** (`scene{N}/Seg{M}.tsx`) 기준:

```ts
import { AnimatedTitle, AnimatedText, PhasedReveal, PhasedNumberCounter, PhasedHighlight, ... } from "../../../../shared/components";
import { CenteredLayout, SplitLayout, ... } from "../../../../shared/layouts";
import { COLORS, TYPOGRAPHY, SPACING, FONT_SIZES } from "../../../../shared/constants/design";
import { SPRING_CONFIG, TIMING, CLAMP, EASING_PRESET } from "../../../../shared/constants/animations";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD, PHASE_3_DATA, PHASE_3_COMPARISON, PHASE_3_QUOTE, PHASE_3_STEPS, PHASE_4_EXTENDED } from "../../../../shared/constants/phasePresets";
```

**Scene 오케스트레이터** (`Scene{N}.tsx`) 기준:

```ts
import { SceneBackground } from "../../../../shared/components";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";
import { Seg1 } from "./Seg1";
import { Seg2 } from "./Seg2";
```

---

## 추가 규칙 참조

복잡한 기능이 필요할 때는 Remotion 스킬의 세부 규칙을 참조합니다:

- 자막/캡션 → `.agents/skills/remotion-best-practices/rules/subtitles.md`
- 텍스트 애니메이션 → `.agents/skills/remotion-best-practices/rules/text-animations.md`
- 트랜지션 → `.agents/skills/remotion-best-practices/rules/transitions.md`
- 오디오 시각화 → `.agents/skills/remotion-best-practices/rules/audio-visualization.md`
- 차트/데이터 시각화 → `.agents/skills/remotion-best-practices/rules/charts.md`
