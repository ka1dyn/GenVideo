import React from 'react';
import { AbsoluteFill, Audio, staticFile, Series } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';
import { Seq6 } from './seq6';
import { Seq7 } from './seq7';
import { Seq8 } from './seq8';
import { Seq9 } from './seq9';

/**
 * Section: outro
 * Audio Duration: 67440ms (2024 frames @30fps)
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <Audio src={staticFile('web-paradiam/outro/outro.wav')} />
      
      <Series>
        {/* Seq 1: 0 - 4980ms (149 frames) */}
        <Series.Sequence durationInFrames={149}>
          <Seq1 />
        </Series.Sequence>

        {/* Seq 2: 4980 - 11420ms (193 frames) */}
        <Series.Sequence durationInFrames={193}>
          <Seq2 />
        </Series.Sequence>

        {/* Seq 3: 11420 - 17920ms (195 frames) */}
        <Series.Sequence durationInFrames={195}>
          <Seq3 />
        </Series.Sequence>

        {/* Seq 4: 17920 - 27160ms (277 frames) */}
        <Series.Sequence durationInFrames={277}>
          <Seq4 />
        </Series.Sequence>

        {/* Seq 5: 27160 - 40300ms (394 frames) */}
        <Series.Sequence durationInFrames={394}>
          <Seq5 />
        </Series.Sequence>

        {/* Seq 6: 40300 - 52420ms (363 frames) */}
        <Series.Sequence durationInFrames={363}>
          <Seq6 />
        </Series.Sequence>

        {/* Seq 7: 52420 - 54840ms (72 frames) */}
        <Series.Sequence durationInFrames={72}>
          <Seq7 />
        </Series.Sequence>

        {/* Seq 8: 54840 - 60240ms (162 frames) */}
        <Series.Sequence durationInFrames={162}>
          <Seq8 />
        </Series.Sequence>

        {/* Seq 9: 60240 - 67440ms (216 frames) */}
        <Series.Sequence durationInFrames={216}>
          <Seq9 />
        </Series.Sequence>

        {/* Ending padding to match audio duration (67440ms = 2024 frames) */}
        <Series.Sequence durationInFrames={3}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
