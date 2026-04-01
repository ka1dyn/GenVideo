import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { introSubtitles } from "./intro_subtitles";
import { COLORS } from "../theme";

import { Seq1 } from "./seq1";
import { Seq2 } from "./seq2";
import { Seq3 } from "./seq3";
import { Seq4 } from "./seq4";
import { Seq5 } from "./seq5";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
      <Audio src={staticFile("design-test1/intro/intro.wav")} />

      <Series>
        <Series.Sequence durationInFrames={647}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={852}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={815}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={749}>
          <Seq4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={917}>
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};
