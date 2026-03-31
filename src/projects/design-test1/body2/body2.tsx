import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body2
 * Audio Duration: 65920ms (1978 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test1/body2/body2.wav')
 *   Timestamps: staticFile('design-test1/body2/body2_timestamp.json')
 *
 * Plan: public/design-test1/body2/body2_plan.md
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('design-test1/body2/body2.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        BODY2 Scene
      </h1>
    </AbsoluteFill>
  );
};
