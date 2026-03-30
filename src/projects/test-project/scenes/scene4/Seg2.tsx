import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
} from "../../../../shared/components";
import { SplitLayout } from "../../../../shared/layouts";
import { COLORS, SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_COMPARISON } from "../../../../shared/constants/phasePresets";

type Seg2Props = {
  text: string;
  duration: number;
};

export const Seg2: React.FC<Seg2Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_COMPARISON, duration);

  return (
    <SplitLayout
      ratio="50:50"
      left={
        <div style={{ paddingRight: SPACING.XL }}>
          <AnimatedTitle text="AI의 대체 우려" size="heading" animation="slideUp" />
          <div style={{ marginTop: SPACING.MD, color: COLORS.TEXT_MUTED }}>
            <AnimatedText text="일각에서는 AI가 개발자의 일자리를 대체할 것이라는 막연한 우려도 있습니다." variant="body" delay={0.3} />
          </div>
        </div>
      }
      right={
        <div style={{ paddingLeft: SPACING.XL, borderLeft: `1px solid ${COLORS.BORDER}` }}>
          {phase.isPhaseActive("after") && (
            <PhasedReveal progress={phase.getPhaseProgress("after")} animation="fadeIn">
              <AnimatedTitle text="도구일 뿐, 무한한 확장" size="heading" animation="slideUp" />
              <div style={{ marginTop: SPACING.MD, color: COLORS.ACCENT }}>
                <AnimatedText text="하지만 역사가 증명하듯, 강력한 새로운 도구는 항상 인간의 잠재력과 한계를 더욱 확장시켜 왔습니다." variant="body" delay={0.3} />
              </div>
            </PhasedReveal>
          )}
        </div>
      }
    />
  );
};
