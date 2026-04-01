import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';

/**
 * Section: body2
 * Audio Duration: 45600ms (1368 frames @30fps)
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#020617' }}>
      <Audio src={staticFile('design-test1/body2/body2.wav')} />

      <Series>
        <Series.Sequence durationInFrames={436}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={430}>
          <Seq2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={502}>
          <Seq3 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
