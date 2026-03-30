import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
} from "../../../../shared/components";
import { TopBottomLayout } from "../../../../shared/layouts";
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
    <TopBottomLayout
      sectionTitle={sectionTitle}
      ratio="40:60"
      top={
        <div style={{ paddingLeft: 40 }}>
          <AnimatedTitle text="끝없는 기술 혁신" size="hero" animation="slideUp" />
        </div>
      }
      bottom={
        <div style={{ paddingLeft: 40 }}>
          {phase.isPhaseActive("develop") && (
            <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
              <AnimatedText text={text} variant="body" />
            </PhasedReveal>
          )}
        </div>
      }
    />
  );
};
