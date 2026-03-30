import React from "react";
import {
  AnimatedText,
  Quote,
  PhasedReveal,
  PhasedHighlight,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_QUOTE } from "../../../../shared/constants/phasePresets";

type Seg5Props = {
  text: string;
  duration: number;
};

export const Seg5: React.FC<Seg5Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_QUOTE, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedText text="유명한 개발자는 이렇게 말했습니다." variant="body" animation="fadeIn" />

      {/* Phase 2: TYPING (or Reveal Quote) */}
      <div style={{ marginTop: SPACING.MD }}>
        <Quote 
          text="미래의 코딩은 타이핑이 아니라 대화가 될 것이다." 
          author="미래의 시니어 개발자"
          progress={phase.getPhaseProgress("typing")}
        />
      </div>

      {/* Phase 3: ATTRIBUTION / EMPHASIZE */}
      {phase.isPhaseActive("attribution") && (
        <PhasedReveal progress={phase.getPhaseProgress("attribution")} animation="slideUp">
          <div style={{ marginTop: SPACING.XL }}>
            <PhasedHighlight 
              text="가장 필요한 역량은 기획력" 
              progress={phase.getPhaseProgress("attribution")} 
            />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
