> [!WARNING]
> 🚨 AI 주의: 아래 코드는 **FullBleedLayout 구조**의 예시일 뿐입니다!
> 내부에 렌더링된 컴포넌트(`AnimatedText` 등)를 아무 생각 없이 그대로 복사하지 마세요. 대본 테마(코드, 통계, 인용 등)를 분석하여 `shared/components` 내의 적합한 특수 컴포넌트로 교체해야 영상이 지루하지 않습니다.

```tsx
import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  SceneBackground, // Full Bleed를 위한 전면 배경 요소
} from "../../../../shared/components";
import { FullBleedLayout } from "../../../../shared/layouts";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <FullBleedLayout sectionTitle={sectionTitle}>
      {/* 
        FullBleedLayout은 패딩이 없으므로 SceneBackground나
        큰 이미지/영상을 꽉 채우기에 적합합니다. 
      */}
      <SceneBackground variant="image" src="/images/background.jpg" />
      
      {/* 콘텐츠는 오버레이 중앙 정렬됨 */}
      <div style={{ textAlign: "center", textShadow: "0 2px 4px rgba(0,0,0,0.5)", zIndex: 10, padding: "100px" }}>
        {/* Phase 1 */}
        <AnimatedTitle text="전면 전체 화면 레이아웃" size="hero" animation="zoomIn" color="white" />
        
        {/* Phase 2: 대본 내용 */}
        {phase.isPhaseActive("develop") && (
          <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
            {/* 🚨 (AI 창의 영역) 여기서도 AnimatedText만 쓰기보다는 강렬한 Quote나 중앙집중형 통계(NumberCounter) 고려! */}
            {/* 🚨 (엄격) text={text} 처럼 원문을 그대로 쓰지 말고 15자 내외로 직접 요약하세요! */}
            <AnimatedText text="AI가 요약한 짧은 문구" variant="body" color="rgba(255,255,255,0.8)" />
          </PhasedReveal>
        )}
      </div>
    </FullBleedLayout>
  );
};
```
