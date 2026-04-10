import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { captions } from './captions';

/**
 * Section: intro
 * Audio Duration: 100123ms (3004 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/intro/intro.wav')
 *   Timestamps: staticFile('aiwar/intro/intro_timestamp.json')
 *
 * Plan: public/aiwar/intro/intro_plan.md
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('aiwar/intro/intro.wav')} />
      <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 48 }}>
        INTRO Scene
      </h1>

      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
