> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **TopBottomLayout 구조**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`AnimatedText` 등)를 아무 생각 없이 복사하지 마세요. 대본 테마를 분석하여 `shared/components` 내의 적합한 특수 컴포넌트(차트, 이미지 프레임 등)로 교체하세요.

```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  ImageFrame
} from "../../../../shared/components";
import { TopBottomLayout } from "../../../../shared/layouts";
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

  const topContent = (
    <div style={{ textAlign: "center", width: "100%" }}>
      {/* Phase 1: 상단 큰 레이아웃용 */}
      <AnimatedTitle text="핵심 주제부" size="hero" animation="zoomIn" />
    </div>
  );

  const bottomContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.MD, alignItems: "center", textAlign: "center" }}>
      {/* Phase 2: 하단 보조 설명 혹은 미디어 전개 */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
          {/* 🚨 (AI 창의 영역) 여기서 단순히 텍스트만 띄우지 말고 데이터 차트나 대형 이미지를 활용하세요! */}
          {/* 🚨 (엄격) text={text} 처럼 원문을 그대로 쓰지 말고 15자 내외로 짧게 직접 요약하세요! */}
          <AnimatedText text="AI 15자 내외 요약문" variant="body" />
        </PhasedReveal>
      )}
    </div>
  );

  return (
    /* ratio="40:60" 이나 "50:50" 등 상하 비율을 자유롭게 설정 */
    <TopBottomLayout 
      sectionTitle={sectionTitle} 
      top={topContent} 
      bottom={bottomContent} 
      ratio="40:60" 
      gap={SPACING.LG}
    />
  );
};
```
