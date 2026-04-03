import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { Body1Sequences } from './sequences';
import { body1Timeline } from './timeline';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';

/**
 * Section: body1
 * Audio Duration: 67120ms (4028 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test3/body1/body1.wav')
 *   Timeline:   src/projects/design-test3/body1/timeline.ts
 *
 * Plan: public/design-test3/body1/body1-plan.md
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test3/body1/body1.wav')} />
      
      {/* Animation Sequences */}
      <Body1Sequences />
      
      {/* Captions Overlay */}
      <CaptionOverlay captions={body1Timeline} />
    </AbsoluteFill>
  );
};
