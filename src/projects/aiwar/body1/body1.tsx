import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";

/**
 * Section: body1
 * Audio Duration: 91730ms (2752 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/body1/body1.wav')
 *   Timestamps: staticFile('aiwar/body1/body1_timestamp.json')
 *
 * Plan: public/aiwar/body1/body1_plan.md
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('aiwar/body1/body1.wav')} />
      <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 48 }}>
        BODY1 Scene
      </h1>
    </AbsoluteFill>
  );
};
