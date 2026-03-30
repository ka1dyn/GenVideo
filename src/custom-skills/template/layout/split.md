```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  ImageFrame, // 또는 StatCard 등 우측에 들어갈 시각 자료 컴포넌트
} from "../../../../shared/components";
import { SplitLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  const leftContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.MD }}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="좌우 분할 레이아웃" size="heading" animation="slideRight" />
      
      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideRight">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}
    </div>
  );

  const rightContent = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      {/* Phase 2 이후부터 우측 시각자료가 서서히 나타남 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeScale">
          <ImageFrame src="/images/example.jpg" alt="분할 시각자료" />
        </PhasedReveal>
      )}
    </div>
  );

  return (
    /* ratio는 "50:50", "40:60", "60:40" 중 상황에 맞게 사용 가능합니다. */
    <SplitLayout 
      sectionTitle={sectionTitle} 
      left={leftContent} 
      right={rightContent} 
      ratio="50:50" 
      gap={SPACING.XL} 
      alignItems="center"
    />
  );
};
```
