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

type Seg3Props = {
  text: string;
  duration: number;
};

export const Seg3: React.FC<Seg3Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_DATA, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="업무 시간의 재구성" size="heading" animation="slideUp" />

      {/* Phase 2: BUILDUP (Stats) */}
      <div 
        style={{ 
          display: "flex", 
          gap: SPACING.MD,
          justifyContent: "center",
          marginTop: SPACING.MD,
          width: "100%",
        }}
      >
        <StatCard
          value={80}
          suffix="%"
          label="단순 반복 작업 코딩"
          trend="down"
          progress={phase.getPhaseProgress("buildup")}
        />
        <StatCard
          value={3}
          suffix="배"
          label="창의적 아키텍처 설계"
          trend="up"
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
