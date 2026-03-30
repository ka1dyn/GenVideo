import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  PhasedHighlight,
} from "../../../../shared/components";
import { StackLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg5Props = {
  text: string;
  duration: number;
};

export const Seg5: React.FC<Seg5Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <StackLayout
      header={
        <div style={{ textAlign: "center" }}>
          <AnimatedTitle text="상상력을 코드로 현실화할 시간" size="hero" animation="slideUp" />
        </div>
      }
      gap={SPACING.LG}
    >
      <div style={{ textAlign: "center", maxWidth: "80%", margin: "0 auto" }}>
        {phase.isPhaseActive("develop") && (
          <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
            <AnimatedText text={text} variant="body" />
          </PhasedReveal>
        )}
        
        {phase.isPhaseActive("emphasize") && (
          <div style={{ marginTop: SPACING.LG }}>
             <PhasedHighlight 
               text="새로운 개발 여정의 시작" 
               progress={phase.getPhaseProgress("emphasize")} 
             />
          </div>
        )}
      </div>
    </StackLayout>
  );
};
