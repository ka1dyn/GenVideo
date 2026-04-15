# Chunk 5 구현 계획 (Scene 9~10)

## Scene 9: 메이븐의 8년 진화
- **연출**: 화면을 가로지르는 수평 타임라인을 통해 8년간의 성장을 시각화. 좌우 대비를 통해 시스템의 확장을 강조.
- **컴포넌트**:
  - `EvolutionLine`: `SECONDARY_MID` 컬러의 수평 `DrawLine`.
  - `MilestoneLabel`: '분석 도구(2017)'와 '전략 시스템(2025)'을 나타내는 각 지점의 텍스트.
  - `GrowthLabel`: 상단에 배치된 '8년간의 비약적 성장' 타이포그래피.

## Scene 10: 클로드의 역할 공개
- **연출**: 가장 세련되고 현대적인 AI 이미지를 시각화. 부드럽게 박동하는 원형 요소와 'Claude' 텍스트의 결합.
- **컴포넌트**:
  - `ClaudeCore`: `PRIMARY_BOLD` 컬러와 `SIZE_2XL` 폰트의 핵심 로고 텍스트.
  - `PulseRings`: `Wobble`과 투명도 애니메이션이 적용된 여러 겹의 원형 테두리.
  - `ConclusionText`: '시스템의 심장, AI 클로드'를 나타내는 하단 강조 텍스트.
