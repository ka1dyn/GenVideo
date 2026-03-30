> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **StackLayout 구조**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`TimelineItem` 등)를 아무 생각 없이 그대로 복사하지 마세요. 통계, 리스트 등 대본 테마에 맞는 컴포넌트로 교체하세요. 
> 🚨 텍스트 길이: 절대 `text={text}` 원문을 넣지 마세요! 각 요소마다 **15자 이내로 엄격히 요약**해야 합니다.

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

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  // 🚨 Segment가 15~25초로 길다면, 3 Phase에 얽매이지 말고 아래처럼 4~5단계로 직접 나누세요!
  const phase = usePhase({
    name: "CUSTOM_4_STEPS",
    phases: {
      entrance: [0, 0.2],
      step1: [0.2, 0.45],
      step2: [0.45, 0.7],
      step3: [0.7, 1.0]
    }
  }, duration);

  return (
    <StackLayout sectionTitle={sectionTitle} gap={SPACING.LG} align="center">
      <AnimatedTitle text="단계별 프로세스" size="heading" />
      
      {phase.isPhaseActive("step1") && (
        <PhasedReveal progress={phase.getPhaseProgress("step1")} animation="slideUp">
          {/* 🚨 (엄격) text={text} (X). 대본을 15자 내외의 아주 짧은 문구로 요약할 것! */}
          <TimelineItem step={1} title="분석 단계" text="AI 요구사항 15자 요약" />
        </PhasedReveal>
      )}

      {phase.isPhaseActive("step2") && (
        <PhasedReveal progress={phase.getPhaseProgress("step2")} animation="slideUp">
          <TimelineItem step={2} title="적용 단계" text="AI 아키텍처 15자 설정" />
        </PhasedReveal>
      )}
      
      {phase.isPhaseActive("step3") && (
        <PhasedReveal progress={phase.getPhaseProgress("step3")} animation="slideUp">
          <TimelineItem step={3} title="배포 단계" text="AI 에이전트 최종 요약결과" isActive />
        </PhasedReveal>
      )}
    </StackLayout>
  );
};
```
