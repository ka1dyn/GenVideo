import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { body1Subtitles } from "./body1_subtitles";
import { COLORS } from "../theme";

import { Seq1 } from "./seq1";
import { Seq2 } from "./seq2";
import { Seq3 } from "./seq3";
import { Seq4 } from "./seq4";

export const Body1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
      <Audio src={staticFile("design-test1/body1/body1.wav")} />

      <Series>
        <Series.Sequence durationInFrames={1133}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={1165}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={840}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={890}>
          <Seq4 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={body1Subtitles} />
    </AbsoluteFill>
  );
};
