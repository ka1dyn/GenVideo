import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  StatCard,
  PhasedReveal,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_DATA } from "../../../../shared/constants/phasePresets";

type Seg5Props = {
  text: string;
  duration: number;
};

export const Seg5: React.FC<Seg5Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_DATA, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="서비스 안정성 극대화" size="heading" animation="slideUp" />

      {/* Phase 2: BUILDUP (Stats) */}
      <div style={{ marginTop: SPACING.MD }}>
        <StatCard
          value={90}
          suffix="%"
          label="배포 전 치명적 오류 차단"
          trend="down"
          progress={phase.getPhaseProgress("buildup")}
        />
      </div>

      {/* Phase 3: REVEAL */}
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
