import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: intro
 * Audio Duration: 66320ms (3980 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test2/intro/intro.wav')
 *   Timestamps: staticFile('design-test2/intro/intro_timestamp.json')
 *
 * Plan: public/design-test2/intro/intro_plan.md
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
      <Audio src={staticFile('design-test2/intro/intro.wav')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        INTRO Scene
      </h1>
    </AbsoluteFill>
  );
};
