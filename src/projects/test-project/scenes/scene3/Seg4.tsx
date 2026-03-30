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
      <AnimatedTitle text="핵심은 오직 하나" size="heading" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE */}
      {phase.isPhaseActive("emphasize") && (
        <div style={{ marginTop: SPACING.MD }}>
          <PhasedHighlight 
            text="프롬프트 엔지니어링" 
            progress={phase.getPhaseProgress("emphasize")} 
          />
        </div>
      )}
    </CenteredLayout>
  );
};
