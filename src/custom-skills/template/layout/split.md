> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **SplitLayout 구조 분할**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`AnimatedText`, `ImageFrame` 등)를 아무 생각 없이 그대로 복사하지 마세요. 대본 테마(코드, 통계, 인용 등)를 분석하여 `shared/components` 내의 적합한 특수 컴포넌트(StatCard, Quote, CodeSnippet 등)로 교체해야 영상이 지루하지 않습니다.

```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  ImageFrame, // 또는 StatCard 등 우측에 들어갈 시각 자료 컴포넌트 자유롭게 선택
} from "../../../../shared/components";
import { SplitLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  const leftContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.MD }}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="좌우 분할 레이아웃" size="heading" animation="slideRight" />
      
      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideRight">
          {/* 🚨 (AI 창의 영역) 대본이 일반 텍스트가 아니면 AnimatedText 대신 다른 컴포넌트(CodeSnippet 등)를 고민하세요! */}
          {/* 🚨 (엄격) text={text} 처럼 원문을 그대로 쓰지 말고 15자 내외로 짧게 직접 요약하세요. */}
          <AnimatedText text="AI가 요약한 짧은 문장" variant="body" />
        </PhasedReveal>
      )}
    </div>
  );

  const rightContent = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      {/* Phase 2 이후부터 우측 시각자료가 서서히 나타남 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeScale">
          {/* 🚨 (AI 창의 영역) 통계 수치라면 StatCard, 이미지면 ImageFrame, 비교라면 ComparisonRow 사용! */}
          <ImageFrame src="/images/example.jpg" alt="분할 시각자료" />
        </PhasedReveal>
      )}
    </div>
  );

  return (
    /* ratio는 "50:50", "40:60", "60:40" 중 상황에 맞게 유동적으로 선택하세요. */
    <SplitLayout 
      sectionTitle={sectionTitle} 
      left={leftContent} 
      right={rightContent} 
      ratio="50:50" 
      gap={SPACING.XL} 
      alignItems="center"
    />
  );
};
```
