---
name: segment create
description: segment를 생성하기 위한 규칙들을 설명하는 글입니다.
metadata:
  tags: segment, create, layout, component
---

추후 Scene Orchestrator에서 각 Segment에 개별 `<Audio>`가 붙어 음성과 화면이 정확히 싱크됩니다.

## Segment 설계 필수 규칙

1. 모든 Seg 파일은 **`duration` prop 필수**.
2. 모든 Seg는 **`usePhase`로 최소 3 Phase** 구성.
3. Phase 2 이후 요소는 **`phase.isPhaseActive()` 가드** 사용.
4. 연속 애니메이션에는 **Phase-Aware 컴포넌트** (`PhasedReveal`, `PhasedNumberCounter`, `PhasedHighlight`) 사용.

## Phase Preset 선택

preset 종류는 `src/shared/constants/phasePresets.ts`에서 확인 가능합니다.
> [!TIP]
> `usePhase` 동작 방식이나 API(`isPhaseActive` 등)가 잘 기억나지 않는 경우에만 [./phase-system.md](./phase-system.md)를 참조하세요.

## 컴포넌트 선택

> 컴포넌트의 정확한 Props는 `src/shared/components/` 파일을 직접 참조하세요.

### 1. Typography & Text
| 컴포넌트 | 용도 |
| :--- | :--- |
| `AnimatedTitle` | 제목 (Spring 애니메이션) |
| `AnimatedText` | 본문 텍스트 (Spring 애니메이션) |
| `HighlightedText` | 배경 강조가 포함된 텍스트 |
| `TypewriterText` | 타자기 효과 텍스트 |
| `NumberCounter` | 숫자가 올라가는 효과 (단순 카운터) |
| `Quote` | 인용구 (따옴표 디자인 포함) |
| `BulletList` | 불렛 포인트 목록 |

### 2. Data & Information
| 컴포넌트 | 용도 |
| :--- | :--- |
| `StatCard` | 통계 카드 (아이콘 + 값 + 라벨) |
| `ComparisonRow` | 좌우 비교 행 |
| `TimelineItem` | 타임라인 단계 |
| `BarChart` | 막대 그래프 |
| `StepIndicator` | 단계 표시 인디케이터 |

### 3. Surfaces & Containers
| 컴포넌트 | 용도 |
| :--- | :--- |
| `SceneBackground` | Scene의 전체 배경 (Glow 효과 등) |
| `ContentBox` | 콘텐츠를 감싸는 투명/반투명 박스 |
| `FadeWrapper` | 페이드 인/아웃 래퍼 |
| `GlassPanel` | Glassmorphism 스타일 패널 |
| `ProgressBar` | 진행률 표시 바 |

### 4. Visual & Media
| 컴포넌트 | 용도 |
| :--- | :--- |
| `ImageFrame` | 프레임이 있는 이미지 |
| `CodeSnippet` | 코드 블록 (Syntax Highlighting 스타일) |
| `Divider` | 구분선 |
| `IconBadge` | 작은 아이콘 배지 |
| `GlowOrb` | 장식용 빛나는 구체 |

### 5. Phase-Aware (연속 애니메이션 권장)
Phase 1, 2, 3의 상태에 맞춰 자동으로 동작하는 컴포넌트입니다.
- `PhasedReveal`: 단계별로 요소를 나타나게 함
- `PhasedNumberCounter`: Phase에 맞춰 숫자가 올라감
- `PhasedHighlight`: Phase에 맞춰 텍스트 강조가 나타남

## 레이아웃 선택

Segment 구성 시 다음 레이아웃 중 하나를 선택하고 연결된 템플릿 사용법을 참조하세요. 모든 레이아웃은 `sectionTitle?: string` prop을 가집니다.

| 레이아웃 | 용도 | 참조 템플릿 (작성 가이드) |
| --- | --- | --- |
| `CenteredLayout` | 중앙 정렬 (기본) | [./template/layout/centered.md](../template/layout/centered.md) |
| `SplitLayout` | 좌우 분할 (텍스트+이미지/차트) | [./template/layout/split.md](../template/layout/split.md) |
| `StackLayout` | 수직 스택 (여러 요소 위아래 배치) | [./template/layout/stacked.md](../template/layout/stacked.md) |
| `FullBleedLayout` | 전체 화면 (배경 꽉 채움) | [./template/layout/full-bleed.md](../template/layout/full-bleed.md) |
| `GridLayout` | 2~4열 그리드 (수치 비교 등) | [./template/layout/grid.md](../template/layout/grid.md) |
| `TopBottomLayout` | 상하 분할 (상단 큰 주제, 하단 설명) | [./template/layout/top-bottom.md](../template/layout/top-bottom.md) |

## 🏷️ SectionLabel 규칙

`sectionTitle`은 **Scene의 첫 번째 Segment에서만** 표시합니다.

```tsx
// Scene{N}.tsx의 SEGMENT_RENDERERS
const SEGMENT_RENDERERS = [
  (seg, dur) => (
    <Seg1
      text={seg.text}
      duration={dur}
      sectionTitle={sceneData?.sectionTitle}
    />
  ),
  (seg, dur) => <Seg2 text={seg.text} duration={dur} />, // sectionTitle 없음
];
```
