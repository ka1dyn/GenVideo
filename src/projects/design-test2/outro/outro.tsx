import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: outro
 * Audio Duration: 67440ms (4047 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/outro/outro.wav')
 *   Timestamps: staticFile('design-test2/outro/outro_timestamp.json')
 *
 * Plan: public/design-test2/outro/outro_plan.md
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('design-test2/outro/outro.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        OUTRO Scene
      </h1>
    </AbsoluteFill>
  );
};
