import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { body1Subtitles } from './body1_subtitles';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

/**
 * Section: body1
 * Audio Duration: 67120ms (4028 frames @60fps)
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_VOID,
      }}
    >
      <Audio src={staticFile('design-test2/body1/body1.wav')} />
      <Sequences />
      <CaptionOverlay captions={body1Subtitles} />
    </AbsoluteFill>
  );
};

