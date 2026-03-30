import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  CodeSnippet,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg3Props = {
  text: string;
  duration: number;
};

export const Seg3: React.FC<Seg3Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="AI 시니어 개발자" size="heading" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
          <div style={{ marginTop: SPACING.LG, width: "100%" }}>
            <CodeSnippet
              code={`// AI Architecture Suggestion
export const calculateOptimization = () => {
  // Suggests caching to avoid bottleneck
  return useMemo(() => expensiveOps(), []);
};`}
              language="typescript"
            />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
