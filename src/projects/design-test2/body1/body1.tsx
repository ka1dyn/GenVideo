import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body1
 * Audio Duration: 67120ms (4028 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/body1/body1.wav')
 *   Timestamps: staticFile('design-test2/body1/body1_timestamp.json')
 *
 * Plan: public/design-test2/body1/body1_plan.md
 */
import { body1Subtitles } from "./body1_subtitles";
import { Sequences } from "./sequences";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";

export const Body1: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test2/body1/body1.wav')} />
      <Sequences />
      <CaptionOverlay captions={body1Subtitles} />
    </AbsoluteFill>
  );
};
