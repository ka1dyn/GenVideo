```tsx
import React from "react";
import {
  AnimatedTitle,
  PhasedReveal,
  StatCard,
} from "../../../../shared/components";
import { GridLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_DATA } from "../../../../shared/constants/phasePresets"; // Data 프리셋 활용

type SegProps = {
  text: string;
  duration: number;
  sectionTitle?: string;
};

export const SegX: React.FC<SegProps> = ({ text, duration, sectionTitle }) => {
  const phase = usePhase(PHASE_3_DATA, duration);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: SPACING.XL, width: "100%", height: "100%", padding: SPACING.XXL }}>
      {/* 데이터/통계 테마이므로 상단에 제목 배치 */}
      <AnimatedTitle text="데이터 통계 뷰" size="heading" animation="slideUp" align="center" />
      
      {/* 2열 또는 3열 이상은 columns prop으로 제어 */}
      <GridLayout sectionTitle={sectionTitle} columns={2} gap={SPACING.LG}>
        {/* Phase 2: 첫 번째 카드 */}
        <PhasedReveal progress={phase.getPhaseProgress("buildup")} animation="fadeScale">
          <StatCard label="과거 모델 처리 속도" value="7.5s" />
        </PhasedReveal>
        
        {/* Phase 3: 대비되는 두 번째 카드 강조 */}
        <PhasedReveal progress={phase.getPhaseProgress("reveal")} animation="fadeScale">
          {/* highlight 속성으로 파란색 혹은 테마색상 강조 */}
          <StatCard label="신규 모델 로드 시간" value="1.2s" highlight />
        </PhasedReveal>
      </GridLayout>
    </div>
  );
};
```
