import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';

/**
 * Section: intro
 * Audio Duration: 66320ms (1990 frames @30fps)
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#020617' }}>
      {/* Audio Layer - Individual section TTS */}
      <Audio src={staticFile('design-test1/intro/intro.wav')} />

      {/* Cinematic Sequences */}
      <Series>
        <Series.Sequence durationInFrames={323}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={426}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={370}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={374}>
          <Seq4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={497}> 
          {/* Note: Adjusting last duration to match total frames (1990) exactly */}
          <Seq5 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
