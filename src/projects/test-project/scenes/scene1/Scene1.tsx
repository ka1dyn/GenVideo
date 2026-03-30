import React from "react";
import { 
  Audio, 
  staticFile, 
  useVideoConfig, 
  Series
} from "remotion";
import { SceneBackground, FadeWrapper } from "../../../../shared/components";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";
import { Seg1 } from "./Seg1";
import { Seg2 } from "./Seg2";
import { Seg3 } from "./Seg3";
import { Seg4 } from "./Seg4";
import { Seg5 } from "./Seg5";

export const Scene1: React.FC<{ segmentDurations: number[] }> = ({
  segmentDurations,
}) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene1");
  const segments = sceneData?.segments || [];
  
  // 페이드 효과에 사용할 프레임 수
  const transitionFrames = Math.round(fps * TIMING.SEGMENT_TRANSITION);

  const SEGMENT_RENDERERS = [
    (seg: SegmentScript, dur: number) => (
      <Seg1 text={seg.text} duration={dur} sectionTitle={sceneData?.sectionTitle} />
    ),
    (seg: SegmentScript, dur: number) => <Seg2 text={seg.text} duration={dur} />,
    (seg: SegmentScript, dur: number) => <Seg3 text={seg.text} duration={dur} />,
    (seg: SegmentScript, dur: number) => <Seg4 text={seg.text} duration={dur} />,
    (seg: SegmentScript, dur: number) => <Seg5 text={seg.text} duration={dur} />,
  ];

  return (
    <SceneBackground variant="gradient">
      {/* TransitionSeries 대신 일반 Series 사용 */}
      <Series>
        {segments.map((seg, i) => {
          const render = SEGMENT_RENDERERS[i];
          const durationInFrames = Math.ceil(segmentDurations[i] * fps);

          return (
            <Series.Sequence 
              key={seg.segmentId} 
              durationInFrames={durationInFrames}
            >
              {/* FadeWrapper로 감싸서 개별적인 페이드 인/아웃 적용 */}
              <FadeWrapper 
                durationInFrames={durationInFrames} 
                transitionFrames={transitionFrames}
              >
                {/* 📌 버그 픽스: durationInFrames 대신 원래대로 초 단위의 segmentDurations[i]를 전달해야 usePhase가 정상 동작합니다! */}
                {render(seg, segmentDurations[i])}
              </FadeWrapper>
              
              {/* 오디오도 해당 시퀀스 안에서만 재생되므로 겹치지 않음 */}
              <Audio src={staticFile(seg.audioFile)} />
            </Series.Sequence>
          );
        })}
      </Series>
    </SceneBackground>
  );
};