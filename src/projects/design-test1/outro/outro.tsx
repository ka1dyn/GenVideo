import React from "react";
import { AbsoluteFill, Series, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import { outroSubtitles } from "./outro_subtitles";
import { COLORS } from "../theme";

import { Seq1 } from "./seq1";
import { Seq2 } from "./seq2";
import { Seq3 } from "./seq3";
import { Seq4 } from "./seq4";
import { Seq5 } from "./seq5";

export const Outro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
      <Audio src={staticFile("design-test1/outro/outro.wav")} />

      <Series>
        <Series.Sequence durationInFrames={1075}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={780}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={563}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={872}>
          <Seq4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={756}>
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={outroSubtitles} />
    </AbsoluteFill>
  );
};
