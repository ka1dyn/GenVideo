import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import { captions } from './captions';

/**
 * Section: outro
 * Audio Duration: 44323ms (1330 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/outro/outro.wav')
 *   Timestamps: staticFile('aiwar/outro/outro_timestamp.json')
 *
 * Plan: public/aiwar/outro/outro_plan.md
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('aiwar/outro/outro.wav')} />
      <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 48 }}>
        OUTRO Scene
      </h1>
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
