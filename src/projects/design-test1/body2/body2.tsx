import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { body2Subtitles } from "./body2_subtitles";
import { COLORS } from "../theme";

import { Seq1 } from "./seq1";
import { Seq2 } from "./seq2";
import { Seq3 } from "./seq3";
import { Seq4 } from "./seq4";
import { Seq5 } from "./seq5";

export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
      <Audio src={staticFile("design-test1/body2/body2.wav")} />

      <Series>
        <Series.Sequence durationInFrames={888}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={677}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={766}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={820}>
          <Seq4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={806}>
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={body2Subtitles} />
    </AbsoluteFill>
  );
};
