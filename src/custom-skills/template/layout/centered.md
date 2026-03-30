> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **CenteredLayout 구조 구성**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`AnimatedText`, `PhasedHighlight` 등)를 아무 생각 없이 그대로 복사하지 마세요. 대본 테마(코드, 통계, 인용 등)를 분석하여 `shared/components` 내의 적합한 특수 컴포넌트(StatCard, Quote, CodeSnippet 등)로 교체해야 영상이 지루하지 않습니다.

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
      {/* Phase 1: ENTRANCE — 제목 또는 큰 텍스트 (AnimatedTitle 유지 추천) */}
      <AnimatedTitle text="핵심 키워드" size="hero" animation="slideUp" />

      {/* Phase 2: DEVELOP — 진입 후 등장, 이후 유지 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal
          progress={phase.getPhaseProgress("develop")}
          animation="slideUp"
        >
          {/* 🚨 (AI 창의 영역) 단순 AnimatedText만 쓰지 말고 대본에 어울리는 컴포넌트를 직접 고를 것! */}
          {/* 🚨 (엄격) text={text} 처럼 전체 대본을 넣지 마세요! 15~20자 이내의 단문/키워드로 직접 요약하세요! */}
          <AnimatedText text="AI가 요약한 15자 내외 문장" variant="body" />
        </PhasedReveal>
      )}

      {/* Phase 3: EMPHASIZE — 추가 내용 또는 강조 */}
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
