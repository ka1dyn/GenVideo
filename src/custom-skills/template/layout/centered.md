```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedHighlight,
  PhasedReveal,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
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
    <CenteredLayout sectionTitle={sectionTitle} gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE — AnimatedTitle이 자체 애니메이션 처리 */}
      <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />

      {/* Phase 2: DEVELOP — 진입 후 등장, 이후 유지 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal
          progress={phase.getPhaseProgress("develop")}
          animation="slideUp"
        >
          <AnimatedText text={text} variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE — 핵심 강조 */}
      {phase.isPhaseActive("emphasize") && (
        <PhasedHighlight
          text="패러다임 전환"
          progress={phase.getPhaseProgress("emphasize")}
        />
      )}
    </CenteredLayout>
  );
};
```
