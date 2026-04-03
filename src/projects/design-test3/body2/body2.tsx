import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { Body2Sequences } from './sequences';
import { body2Timeline } from './timeline';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';

/**
 * Section: body2
 * Audio Duration: 65920ms (3956 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test3/body2/body2.wav')
 *   Timeline:   src/projects/design-test3/body2/timeline.ts
 *
 * Plan: public/design-test3/body2/body2-plan.md
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test3/body2/body2.wav')} />
      
      {/* Animation Sequences */}
      <Body2Sequences />
      
      {/* Captions Overlay */}
      <CaptionOverlay captions={body2Timeline} />
    </AbsoluteFill>
  );
};
