import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { IntroSequences } from './sequences';
import { introTimeline } from './timeline';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';

/**
 * Section: intro
 * Audio Duration: 66320ms (3980 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test3/intro/intro.wav')
 *   Timeline:   src/projects/design-test3/intro/timeline.ts
 *
 * Plan: public/design-test3/intro/intro-plan.md
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test3/intro/intro.wav')} />
      
      {/* Animation Sequences */}
      <IntroSequences />
      
      {/* Captions Overlay */}
      <CaptionOverlay captions={introTimeline} />
    </AbsoluteFill>
  );
};
