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

type Seg1Props = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const Seg1: React.FC<Seg1Props> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="현장의 변화, 실제 데이터" size="hero" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE */}
      {phase.isPhaseActive("emphasize") && (
        <PhasedHighlight 
          text="실제 데이터를 바탕으로" 
          progress={phase.getPhaseProgress("emphasize")} 
        />
      )}
    </CenteredLayout>
  );
};
