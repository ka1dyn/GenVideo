import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body2
 * Audio Duration: 65920ms (3956 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/body2/body2.wav')
 *   Timestamps: staticFile('design-test2/body2/body2_timestamp.json')
 *
 * Plan: public/design-test2/body2/body2_plan.md
 */
import { body2Subtitles } from "./body2_subtitles";
import { Sequences } from "./sequences";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";

export const Body2: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test2/body2/body2.wav')} />
      <Sequences />
      <CaptionOverlay captions={body2Subtitles} />
    </AbsoluteFill>
  );
};
