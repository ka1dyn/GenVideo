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
            <AnimatedText text={text} variant="body" color="rgba(255,255,255,0.8)" />
          </PhasedReveal>
        )}
      </div>
    </FullBleedLayout>
  );
};
```
