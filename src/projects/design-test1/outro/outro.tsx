import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';

/**
 * Section: outro
 * Audio Duration: 66600ms (1998 frames @30fps)
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#020617' }}>
      <Audio src={staticFile('design-test1/outro/outro.wav')} />

      <Series>
        <Series.Sequence durationInFrames={435}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={619}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={518}>
          <Seq3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={426}>
          {/* Note: Adjusted last sequence to match total 1998 frames exactly */}
          <Seq4 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
