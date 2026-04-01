import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { body2Subtitles } from './body2_subtitles';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

/**
 * Section: body2
 * Audio Duration: 65920ms (3956 frames @60fps)
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_VOID,
      }}
    >
      <Audio src={staticFile('design-test2/body2/body2.wav')} />
      <Sequences />
      <CaptionOverlay captions={body2Subtitles} />
    </AbsoluteFill>
  );
};

