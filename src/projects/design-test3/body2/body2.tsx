import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import body2Timeline from '../../../../public/design-test3/body2/body2_final_timeline.json';
import { Sequences } from './sequences';

/**
 * Section: body2
 * Audio Duration: 65920ms (3956 frames @60fps)
 * Visual Theme: 3-Step Practical Workflow (Snappy/Staccato)
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Background Audio */}
      <Audio src={staticFile(`design-test3/body2/body2.wav`)} />

      {/* Assembly of Local Sequences (Absolute Timing) */}
      <Sequences />

      {/* Synchronized Subtitles (Word-level JSON) */}
      <CaptionOverlay captions={body2Timeline.sentences} />
    </AbsoluteFill>
  );
};
