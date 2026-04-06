import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body2
 * Audio Duration: 90485ms (5430 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('project-maven/body2/body2.wav')
 *   Timestamps: staticFile('project-maven/body2/body2_timestamp.json')
 *
 * Plan: public/project-maven/body2/body2_plan.md
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
      <Audio src={staticFile('project-maven/body2/body2.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        BODY2 Scene
      </h1>
    </AbsoluteFill>
  );
};
