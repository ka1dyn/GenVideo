---
name: phase system
description: Segment duration을 분할하여, 각 Segment의 내용을 단계별로 시각화하는 시스템입니다.
metadata:
  tags: design, system, rule, layout, component, preset
---

## ⏱️ Phase 시스템

Segment duration을 **비율로 분할**하여 전체 구간에 걸쳐 연속적인 시각 변화를 만듭니다. 15초든 25초든 자동 스케일링됩니다.

`src/shared/hooks/usePhase.ts`, `src/shared/constants/phasePresets.ts`, `src/shared/components/PhasedReveal.tsx`, `src/shared/components/PhasedHighlight.tsx`, `src/shared/components/PhasedNumberCounter.tsx`를 참조하세요.

### PhaseState API

| 메서드/속성              | 반환      | 설명                                                      |
| ------------------------ | --------- | --------------------------------------------------------- |
| `isPhaseActive(name)`    | `boolean` | Phase start 이상이면 true (진입 후 계속 유지)             |
| `isPhaseComplete(name)`  | `boolean` | Phase end 이상이면 true                                   |
| `getPhaseProgress(name)` | `0~1`     | 해당 Phase 내 진행률 (미진입=0, 완료=1)                   |
| `getPhaseStartSec(name)` | `number`  | Phase 절대 시작 시각 (초) — 기존 `delay` prop에 전달 가능 |
| `segmentProgress`        | `0~1`     | Segment 전체 진행률                                       |

### Phase 프리셋 선택

| 프리셋               | Phase 구성                                 | 적합한 내용                         |
| -------------------- | ------------------------------------------ | ----------------------------------- |
| `PHASE_3_STANDARD`   | entrance → develop → emphasize             | **범용** — 핵심 개념, 일반 내러티브 |
| `PHASE_3_DATA`       | entrance → buildup → reveal                | 숫자, 통계, 차트                    |
| `PHASE_3_COMPARISON` | entrance → before → after                  | Before/After 비교                   |
| `PHASE_3_QUOTE`      | entrance → typing → attribution            | 인용문 + 저자 표시                  |
| `PHASE_3_STEPS`      | entrance → steps → summary                 | 단계별 설명                         |
| `PHASE_4_EXTENDED`   | entrance → developA → developB → emphasize | 20초+ 긴 Segment                    |

### 🌟 4단계 이상의 다중 Phase 수동 생성 (권장)
Segment 길이는 대부분 13~25초로 깁니다. 3-Phase 구조를 넘어서서, 여러 요소(Timeline, List, Cards 등)가 하나씩 차례로 등장해야 한다면 직접 프리셋 객체를 만들어 주입하세요:

> [!CAUTION]
> Phase 사이의 시간차(비율)가 현실의 '1초 단위'보다 짧으면 안 됩니다. 전체 길이를 고려하여 적당히 분할하세요.

```ts
// 例: Segment 길이가 20초인 경우 5개의 요소가 약 3.5초~4초 간격으로 등장
const phase = usePhase({
  name: "CUSTOM_5_STEPS",
  phases: {
    entrance: [0, 0.15],      // 0 ~ 3초 구간
    item1: [0.15, 0.35],      // 3 ~ 7초 구간
    item2: [0.35, 0.55],      // 7 ~ 11초 구간
    item3: [0.55, 0.75],      // 11 ~ 15초 구간
    summary: [0.75, 1.0],     // 15 ~ 20초 구간
  }
}, duration);

// 사용
{phase.isPhaseActive("item2") && <StatCard ... />}
```

### 대본 유형별 추천 조합

| 대본 내용      | 프리셋               | Phase별 컴포넌트                                                                        |
| -------------- | -------------------- | --------------------------------------------------------------------------------------- |
| 핵심 개념/정의 | `PHASE_3_STANDARD`   | E: `AnimatedTitle` / D: `PhasedReveal`+`AnimatedText` / Em: `PhasedHighlight`           |
| 숫자/통계      | `PHASE_3_DATA`       | E: `AnimatedTitle` / B: `PhasedNumberCounter` / R: `StatCard`                           |
| 비교/대조      | `PHASE_3_COMPARISON` | E: `AnimatedTitle` / Before: `ComparisonRow` / After: `ComparisonRow`+`PhasedHighlight` |
| 단계별 설명    | `PHASE_3_STEPS`      | E: `AnimatedTitle` / S: `PhasedReveal`+`StepIndicator` / Sum: `PhasedHighlight`         |
| 인용/강조      | `PHASE_3_QUOTE`      | E: `Quote` / T: `TypewriterText` / A: `PhasedHighlight`                                 |
| 코드/기술      | `PHASE_3_STANDARD`   | E: `AnimatedTitle` / D: `CodeSnippet` / Em: `PhasedHighlight`                           |

> **기존 컴포넌트 병용**: `AnimatedTitle`, `AnimatedText` 등 `delay` 기반 컴포넌트는 Phase 1(ENTRANCE)에서 그대로 사용. Phase 2~3에서는 Phased 컴포넌트를 쓰거나 `phase.getPhaseStartSec("develop")`을 `delay`에 전달.
