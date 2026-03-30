import React from "react";
import {
  AnimatedTitle,
  AnimatedText,
  PhasedReveal,
  CodeSnippet,
} from "../../../../shared/components";
import { CenteredLayout } from "../../../../shared/layouts";
import { SPACING } from "../../../../shared/constants/design";
import { usePhase } from "../../../../shared/hooks";
import { PHASE_3_STANDARD } from "../../../../shared/constants/phasePresets";

type Seg3Props = {
  text: string;
  duration: number;
};

export const Seg3: React.FC<Seg3Props> = ({ text, duration }) => {
  const phase = usePhase(PHASE_3_STANDARD, duration);

  return (
    <CenteredLayout gap={SPACING.LG}>
      {/* Phase 1: ENTRANCE */}
      <AnimatedTitle text="복잡한 로직도 순식간에" size="heading" animation="slideUp" />

      {/* Phase 2: DEVELOP */}
      {phase.isPhaseActive("develop") && (
        <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="fadeIn">
          <AnimatedText text={text} variant="body" />
          <div style={{ marginTop: SPACING.LG, width: "100%" }}>
            <CodeSnippet
              code={`// 프롬프트: "상태 관리와 API 페칭이 포함된 컴포넌트 작성해줘"
export const DataFetcher = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};`}
              language="typescript"
            />
          </div>
        </PhasedReveal>
      )}
    </CenteredLayout>
  );
};
