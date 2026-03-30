> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **GridLayout 기반 구조 분할**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`StatCard` 등)를 앵무새처럼 그대로 복사하지 마세요. 대본 테마를 분석하여 `shared/components` 내의 적합한 특수 컴포넌트(이미지 카드, 특징 리스트 등)로 교체하세요.
> 🚨 절대 `text={text}` 원문을 쓰지 마세요! 모든 텍스트는 **15자 이내로 엄격히 요약**해야 합니다.

```tsx
import React from "react";
import {
  AnimatedTitle,
  PhasedReveal,
  StatCard,
} from "../../../../shared/components";
import { GridLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  // 🚨 Segment 호흡이 길 경우, 3Phase 대신 4~5Phase를 직접 정의하세요!
  const phase = usePhase({
    name: "CUSTOM_4_GRID",
    phases: {
      entrance: [0, 0.15],
      card1: [0.15, 0.4],
      card2: [0.4, 0.65],
      card3: [0.65, 1.0]
    }
  }, duration);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.XL, width: "100%", height: "100%", padding: SPACING.XXL }}>
      <AnimatedTitle text="데이터 통계 뷰" size="heading" align="center" />
      
      {/* 2열 또는 3열 이상은 columns prop으로 제어 */}
      <GridLayout sectionTitle={sectionTitle} columns={3} gap={SPACING.MD}>
        {/* Phase 2 */}
        <PhasedReveal progress={phase.getPhaseProgress("card1")} animation="fadeScale">
          <StatCard label="과거 속도" value="7.5s" />
        </PhasedReveal>
        
        {/* Phase 3 */}
        <PhasedReveal progress={phase.getPhaseProgress("card2")} animation="fadeScale">
          <StatCard label="현재 속도" value="3.2s" />
        </PhasedReveal>

        {/* Phase 4 */}
        <PhasedReveal progress={phase.getPhaseProgress("card3")} animation="fadeScale">
          <StatCard label="목표 속도 요약문" value="1.2s" highlight />
        </PhasedReveal>
      </GridLayout>
    </div>
  );
};
```
