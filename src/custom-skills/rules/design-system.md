---
name: design system
description: Scene 생성에 공통적으로 적용되는 전체 디자인 규칙입니다.
metadata:
  tags: design, system, rule, layout, component, preset
---

## 🚨 4대 금지 원칙

| #   | 금지 사항                                                         | 대신 사용할 것                                                           |
| --- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | **🚫 원시 HTML 금지** (`<div>`, `<h1>`, `<p>` 직접 사용)          | `shared/components/` + `shared/layouts/`에서 import                      |
| 2   | **🚫 매직 넘버 금지** (인라인 spring config, px 값 직접 입력)     | `SPRING_CONFIG`, `TIMING`, `EASING_PRESET`, `SPACING`, `FONT_SIZES` 상수 |
| 3   | **🚫 자유 배치 금지** (커스텀 flexbox/grid 레이아웃)              | `shared/layouts/`에서 선택                                               |
| 4   | **🚫 하드코딩 duration 금지** (ffprobe, 절대 프레임 수 직접 입력) | `usePhase(preset, duration)` — duration은 `segmentDurations[i]`로 전달   |

> **핵심 원칙**: AI는 원시 HTML, 매직 넘버, 자유 배치를 사용하지 않으며,
> 반드시 `shared/components`와 `shared/layouts`에서 import하여 조립합니다.

> CSS transitions/animations은 Remotion에서 렌더링되지 않습니다. 반드시 `useCurrentFrame()` 기반 애니메이션을 사용하세요 (Phase-Aware 컴포넌트가 내부적으로 처리합니다).

## Phase System

Phase System에 대한 자세한 설명은 [./phase-system.md](./phase-system.md)를 참조하세요.

## 🎨 디자인 규칙 — Vercel Geist 기반

관련 상수들은 `src/shared/constants/design.ts`, `src/shared/constants/animations.ts`에 정의되어 있습니다.

- **색상**: `COLORS` 상수만 사용. 기본은 흑백+그레이, 강조는 `COLORS.ACCENT` (`#0070f3`).
- **타이포그래피**: `TYPOGRAPHY` 프리셋 사용 (`HERO` / `HEADING` / `BODY` / `LABEL` / `MONO`).
- **화면 구성**: 한 화면에 텍스트를 적게, 크고 시원하게. `SPACING` 상수로 넉넉한 여백.
- **Spring**: 기본 `SPRING_CONFIG.GENTLE` → 강조에만 `.POP` → 대형 제목에 `.HEAVY`.

## 공유 리소스 (Assembler Architecture)

모든 Scene은 아래의 공유 리소스를 사용하여 **일관된 디자인**을 유지합니다:

| 경로                                   | 설명                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `src/shared/constants/design.ts`       | Vercel Geist 기반 색상·폰트·간격·타이포 상수                              |
| `src/shared/constants/animations.ts`   | Spring·Timing·Easing 프리셋 + `PHASE_TIMING` 상수                         |
| `src/shared/constants/phasePresets.ts` | Phase 배분 프리셋 (STANDARD, DATA, COMPARISON, QUOTE, STEPS 등)           |
| `src/shared/hooks/usePhase.ts`         | Segment 내 Phase 기반 타이밍 Hook (비율 → 진행률 계산)                    |
| `src/shared/components/`               | UI 컴포넌트 (Typography, Surfaces, Data, Visual, Media, Phase-Aware, ...) |
| `src/shared/layouts/`                  | 레이아웃 (Centered, Split, Stack, FullBleed, ...)                         |
| `src/shared/types/project.ts`          | `SegmentScript`, `SceneScript`, `ProjectConfig`, `ProjectProps`           |
| `src/shared/utils/audio.ts`            | `getAudioDuration()` — mediabunny 래퍼                                    |
| `src/shared/styles/global.css`         | 공통 CSS (Geist 폰트 로드 + 디자인 토큰)                                  |

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
