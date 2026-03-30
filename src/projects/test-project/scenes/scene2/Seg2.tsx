import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  PhasedNumberCounter,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING, COLORS } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_DATA } from "../../../../shared/constants/phasePresets";

type Seg2Props = {
  text: string;
  duration: number;
};

export const Seg2: React.FC<Seg2Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_DATA, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="개발 생산성 향상" size="heading" animation="slideUp" />

      {/* Phase 2: BUILDUP (Data Reveal) */}
      <div style={{ marginTop: SPACING.MD }}>
        <PhasedNumberCounter
          to={55}
          suffix="%"
          color={COLORS.ACCENT}
          progress={phase.getPhaseProgress("buildup")}
        />
      </div>

      {/* Phase 3: REVEAL (Explanation) */}
      {phase.isPhaseActive("reveal") && (
        <PhasedReveal progress={phase.getPhaseProgress("reveal")} animation="fadeIn">
          <div style={{ marginTop: SPACING.LG }}>
            <AnimatedText text={text} variant="body" />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
