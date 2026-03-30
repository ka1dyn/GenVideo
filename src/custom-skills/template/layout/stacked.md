```tsx
import React from "react";
import {
  AnimatedTitle,
  TimelineItem,
  PhasedReveal,
} from "../../../../shared/components";
import { StackLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STEPS } from "../../../../shared/constants/phasePresets";

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STEPS, duration);

  return (
    /* StackedLayout은 내부 자식들을 위에서 아래로 차곡차곡 쌓아줍니다 */
    <StackLayout sectionTitle={sectionTitle} gap={SPACING.LG} align="center">
      <AnimatedTitle text="단계별 프로세스" size="heading" />
      
      {/* 
        Phase 2: 첫 번째 단계 등장 
        timeline, process, list 등을 나열할 때 적합합니다.
      */}
      {phase.isPhaseActive("steps") && (
        <PhasedReveal progress={phase.getPhaseProgress("steps")} animation="slideUp">
          <TimelineItem step={1} title="분석 단계" text="데이터 및 요구사항 추출" />
        </PhasedReveal>
      )}

      {/* 
        Phase 3: 요약/결과 혹은 두 번째 단계 강조
      */}
      {phase.isPhaseActive("summary") && (
        <PhasedReveal progress={phase.getPhaseProgress("summary")} animation="slideUp">
          <TimelineItem step={2} title="적용 단계" text="AI 에이전트를 통한 실행" isActive />
        </PhasedReveal>
      )}
    </StackLayout>
  );
};
```
