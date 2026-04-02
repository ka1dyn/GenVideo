import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: outro
 * Audio Duration: 67440ms (4047 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/outro/outro.wav')
 *   Timestamps: staticFile('design-test2/outro/outro_timestamp.json')
 *
 * Plan: public/design-test2/outro/outro_plan.md
 */
import { outroSubtitles } from "./outro_subtitles";
import { Sequences } from "./sequences";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";

export const Outro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test2/outro/outro.wav')} />
      <Sequences />
      <CaptionOverlay captions={outroSubtitles} />
    </AbsoluteFill>
  );
};
