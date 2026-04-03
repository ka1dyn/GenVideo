import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { OutroSequences } from './sequences';
import { outroTimeline } from './timeline';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';

/**
 * Section: outro
 * Audio Duration: 67440ms (4047 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test3/outro/outro.wav')
 *   Timeline:   src/projects/design-test3/outro/timeline.ts
 *
 * Plan: public/design-test3/outro/outro-plan.md
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('design-test3/outro/outro.wav')} />
      
      {/* Animation Sequences */}
      <OutroSequences />
      
      {/* Captions Overlay */}
      <CaptionOverlay captions={outroTimeline} />
    </AbsoluteFill>
  );
};
