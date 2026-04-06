import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: intro
 * Audio Duration: 32006ms (1921 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('project-maven/intro/intro.wav')
 *   Timestamps: staticFile('project-maven/intro/intro_timestamp.json')
 *
 * Plan: public/project-maven/intro/intro_plan.md
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('project-maven/intro/intro.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        INTRO Scene
      </h1>
    </AbsoluteFill>
  );
};
