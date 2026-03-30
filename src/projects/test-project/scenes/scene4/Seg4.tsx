import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
} from "../../../../shared/components";
import { FullBleedLayout } from "../../../../shared/layouts";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg4Props = {
  text: string;
  duration: number;
};

export const Seg4: React.FC<Seg4Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <FullBleedLayout
      darkenOverlay
      overlay={
        <div style={{ textAlign: "center", paddingBottom: 60 }}>
          {phase.isPhaseActive("develop") && (
            <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
              <AnimatedText text={text} variant="body" />
            </PhasedReveal>
          )}
        </div>
      }
    >
      <div style={{ textAlign: "center" }}>
        <AnimatedTitle text="무엇을, 왜 만들 것인가" size="hero" animation="fadeIn" />
        {phase.isPhaseActive("emphasize") && (
          <PhasedReveal progress={phase.getPhaseProgress("emphasize")} animation="slideUp">
            <AnimatedTitle text="프로덕트 마인드" size="hero" animation="slideUp" />
          </PhasedReveal>
        )}
      </div>
    </FullBleedLayout>
  );
};
