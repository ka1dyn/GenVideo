```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  ImageFrame
} from "../../../../shared/components";
import { TopBottomLayout } from "../../../../shared/layouts";
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

  const topContent = (
    <div style={{ textAlign: "center", width: "100%" }}>
      {/* Phase 1: 상단 큰 레이아웃용 */}
      <AnimatedTitle text="핵심 주제부" size="hero" animation="zoomIn" />
    </div>
  );

  const bottomContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.MD, alignItems: "center", textAlign: "center" }}>
      {/* Phase 2: 하단 보조 설명 혹은 미디어 전개 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}
      {/* 사진 프레임 등과 조합하기 좋습니다 */}
    </div>
  );

  return (
    /* ratio="40:60" 이나 "50:50" 등 상하 비율을 자유롭게 설정 */
    <TopBottomLayout 
      sectionTitle={sectionTitle} 
      top={topContent} 
      bottom={bottomContent} 
      ratio="40:60" 
      gap={SPACING.LG}
    />
  );
};
```
