import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  ComparisonRow,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_COMPARISON } from "../../../../shared/constants/phasePresets";

type Seg2Props = {
  text: string;
  duration: number;
};

export const Seg2: React.FC<Seg2Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_COMPARISON, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="병목현상 제로" size="heading" animation="fadeIn" />
      
      <AnimatedText text={text} variant="body" delay={0.3} />

      {/* Phase 2 & 3: BEFORE -> AFTER Comparison */}
      <div style={{ width: "100%", marginTop: SPACING.MD }}>
        <ComparisonRow
          label="디자인에서 개발"
          before="디자인 스케치 ➡️ 수작업 코딩 (며칠 소요)"
          after="간단한 프롬프트 ➡️ 즉시 작동하는 프로토타입"
          progress={phase.segmentProgress} 
        />
      </div>
    </CenteredLayout>
  );
};
