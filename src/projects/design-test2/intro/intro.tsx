import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { introSubtitles } from './intro_subtitles';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

/**
 * Section: intro
 * Audio Duration: 66320ms (3980 frames @60fps)
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_VOID,
      }}
    >
      <Audio src={staticFile('design-test2/intro/intro.wav')} />
      <Sequences />
      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};

