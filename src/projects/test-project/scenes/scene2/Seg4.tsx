import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  ComparisonRow,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_COMPARISON } from "../../../../shared/constants/phasePresets";

type Seg4Props = {
  text: string;
  duration: number;
};

export const Seg4: React.FC<Seg4Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_COMPARISON, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="진정한 프로세스 혁신" size="heading" animation="slideUp" />

      {/* Phase 2: COMPARISON (Before -> After) */}
      <div style={{ marginTop: SPACING.MD, width: "100%" }}>
        <ComparisonRow
          label="프로세스"
          before="수동 검색 및 타이핑"
          after="AI 제안 검토 및 승인"
          progress={phase.segmentProgress}
        />
      </div>

      {/* Phase 3: TEXT Reveal */}
      {/* 비교가 완료되는 시점쯤에 텍스트가 뜨면 좋습니다. */}
      {phase.isPhaseActive("after") && (
        <PhasedReveal progress={phase.getPhaseProgress("after")} animation="fadeIn">
          <div style={{ marginTop: SPACING.LG }}>
            <AnimatedText text={text} variant="body" />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
