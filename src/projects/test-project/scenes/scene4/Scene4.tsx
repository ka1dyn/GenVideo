import React from "react";
import { Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneBackground } from "../../../../shared/components";
import { TIMING } from "../../../../shared/constants/animations";
import type { SegmentScript } from "../../../../shared/types/project";
import { script } from "../../script";
import { Seg1 } from "./Seg1";
import { Seg2 } from "./Seg2";
import { Seg3 } from "./Seg3";
import { Seg4 } from "./Seg4";
import { Seg5 } from "./Seg5";

export const Scene4: React.FC<{ segmentDurations: number[] }> = ({
  segmentDurations,
}) => {
  const { fps } = useVideoConfig();
  const sceneData = script.find((s) => s.sceneId === "scene4");
  const segments = sceneData?.segments || [];
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
      <TransitionSeries>
        {segments.map((seg, i) => {
          const render = SEGMENT_RENDERERS[i];
          return (
            <React.Fragment key={seg.segmentId}>
              {i > 0 && (
                <TransitionSeries.Transition
                  presentation={fade()}
                  timing={linearTiming({
                    durationInFrames: transitionFrames,
                  })}
                />
              )}
              <TransitionSeries.Sequence
                durationInFrames={Math.ceil(segmentDurations[i] * fps)}
              >
                {render(seg, segmentDurations[i])}
                <Audio src={staticFile(seg.audioFile)} />
              </TransitionSeries.Sequence>
            </React.Fragment>
          );
        })}
      </TransitionSeries>
    </SceneBackground>
  );
};
