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

type Seg5Props = {
  text: string;
  duration: number;
};

export const Seg5: React.FC<Seg5Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="테스트 코드까지 완벽하게" size="heading" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
          <div style={{ marginTop: SPACING.LG, width: "100%" }}>
            <CodeSnippet
              code={`describe('BusinessLogic', () => {
  it('handles edge cases correctly', () => {
    const result = processData({ extreme: true });
    expect(result).toBe(expected);
  });
});`}
              language="typescript"
            />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
