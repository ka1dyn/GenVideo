import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { outroSubtitles } from './outro_subtitles';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

/**
 * Section: outro
 * Audio Duration: 67440ms (4047 frames @60fps)
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_VOID,
      }}
    >
      <Audio src={staticFile('design-test2/outro/outro.wav')} />
      <Sequences />
      <CaptionOverlay captions={outroSubtitles} />
    </AbsoluteFill>
  );
};

