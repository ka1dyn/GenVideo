import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body1
 * Audio Duration: 67120ms (4028 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/body1/body1.wav')
 *   Timestamps: staticFile('design-test2/body1/body1_timestamp.json')
 *
 * Plan: public/design-test2/body1/body1_plan.md
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('design-test2/body1/body1.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        BODY1 Scene
      </h1>
    </AbsoluteFill>
  );
};
