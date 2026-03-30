import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  StepIndicator,
  PhasedReveal,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STEPS } from "../../../../shared/constants/phasePresets";

type Seg2Props = {
  text: string;
  duration: number;
};

export const Seg2: React.FC<Seg2Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STEPS, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="3단계 워크플로우" size="heading" animation="slideUp" />

      {/* Phase 2: STEPS */}
      {phase.isPhaseActive("steps") && (
        <div style={{ margin: `${SPACING.LG}px 0` }}>
          <StepIndicator 
            steps={["아키텍처 설계", "빠른 초안 작성", "리팩토링/최적화"]} 
            currentStep={3} 
            delay={phase.getPhaseStartSec("steps")} 
          />
        </div>
      )}

      {/* Phase 3: SUMMARY */}
      {phase.isPhaseActive("summary") && (
        <PhasedReveal progress={phase.getPhaseProgress("summary")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
