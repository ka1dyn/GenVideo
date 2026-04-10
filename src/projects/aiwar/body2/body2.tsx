import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";

/**
 * Section: body2
 * Audio Duration: 79117ms (2374 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/body2/body2.wav')
 *   Timestamps: staticFile('aiwar/body2/body2_timestamp.json')
 *
 * Plan: public/aiwar/body2/body2_plan.md
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('aiwar/body2/body2.wav')} />
      <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 48 }}>
        BODY2 Scene
      </h1>
    </AbsoluteFill>
  );
};
