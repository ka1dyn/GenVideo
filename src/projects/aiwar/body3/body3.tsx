import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { captions } from './captions';

/**
 * Section: body3
 * Audio Duration: 38404ms (1153 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/body3/body3.wav')
 *   Timestamps: staticFile('aiwar/body3/body3_timestamp.json')
 *
 * Plan: public/aiwar/body3/body3_plan.md
 */
export const Body3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('aiwar/body3/body3.wav')} />
      <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 48 }}>
        BODY3 Scene
      </h1>
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
