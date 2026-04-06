import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body3
 * Audio Duration: 60916ms (3655 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('project-maven/body3/body3.wav')
 *   Timestamps: staticFile('project-maven/body3/body3_timestamp.json')
 *
 * Plan: public/project-maven/body3/body3_plan.md
 */
export const Body3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('project-maven/body3/body3.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        BODY3 Scene
      </h1>
    </AbsoluteFill>
  );
};
