import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: intro
 * Audio Duration: 66320ms (3980 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/intro/intro.wav')
 *   Timestamps: staticFile('design-test2/intro/intro_timestamp.json')
 *
 * Plan: public/design-test2/intro/intro_plan.md
 */
import { introSubtitles } from "./intro_subtitles";
import { Sequences } from "./sequences";
import { CaptionOverlay } from "../../../shared-components/CaptionOverlay";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test2/intro/intro.wav')} />
      <Sequences />
      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};
