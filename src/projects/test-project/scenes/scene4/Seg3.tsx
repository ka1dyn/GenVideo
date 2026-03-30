import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  PhasedHighlight,
} from "../../../../shared/components";
import { TopBottomLayout } from "../../../../shared/layouts";
import { usePhase } from "../../../../shared/hooks";
import { SPACING } from "../../../../shared/constants/design";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg3Props = {
  text: string;
  duration: number;
};

export const Seg3: React.FC<Seg3Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <TopBottomLayout
      ratio="50:50"
      top={
        <div style={{ textAlign: "center", width: "100%" }}>
          <AnimatedTitle text="AI는 경쟁자가 아닙니다" size="heading" animation="slideUp" />
          <div style={{ marginTop: SPACING.MD }}>
            <AnimatedText text="오히려 강력한 지렛대 역할을 합니다" variant="body" delay={0.3} />
          </div>
        </div>
      }
      bottom={
        <div style={{ padding: `0 ${SPACING.XXL}px`, textAlign: "center" }}>
          {phase.isPhaseActive("develop") && (
            <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
              <AnimatedText text={text} variant="body" />
              {phase.isPhaseActive("emphasize") && (
                <div style={{ marginTop: SPACING.LG }}>
                  <PhasedHighlight text="창의적인 문제 해결" progress={phase.getPhaseProgress("emphasize")} />
                </div>
              )}
            </PhasedReveal>
          )}
        </div>
      }
    />
  );
};
