import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  PhasedHighlight,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg4Props = {
  text: string;
  duration: number;
};

export const Seg4: React.FC<Seg4Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="애자일 협업의 재정의" size="heading" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE */}
      {phase.isPhaseActive("emphasize") && (
        <PhasedHighlight 
          text="빠르게 실패, 더 빠른 혁신" 
          progress={phase.getPhaseProgress("emphasize")} 
        />
      )}
    </CenteredLayout>
  );
};
