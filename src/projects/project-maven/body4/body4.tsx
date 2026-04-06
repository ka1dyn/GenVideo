import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body4
 * Audio Duration: 122803ms (7369 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('project-maven/body4/body4.wav')
 *   Timestamps: staticFile('project-maven/body4/body4_timestamp.json')
 *
 * Plan: public/project-maven/body4/body4_plan.md
 */
export const Body4: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('project-maven/body4/body4.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        BODY4 Scene
      </h1>
    </AbsoluteFill>
  );
};
