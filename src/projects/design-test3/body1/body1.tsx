import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";
import body1Timeline from "../../../../public/design-test3/body1/body1_final_timeline.json";
import { Sequences } from "./sequences";

export const Body1: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile(`design-test3/body1/body1.wav`)} />
      <Sequences />
      <CaptionOverlay captions={body1Timeline.sentences} />
    </AbsoluteFill>
  );
};
