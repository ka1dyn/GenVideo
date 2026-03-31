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
import { Seq10 } from './seq10';
import { Seq11 } from './seq11';

/**
 * Section: body2
 * Audio Duration: 65920ms (1978 frames @30fps)
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <Audio src={staticFile('web-paradiam/body2/body2.wav')} />
      
      <Series>
        {/* Seq 1: 0 - 4660ms (140 frames) */}
        <Series.Sequence durationInFrames={140}>
          <Seq1 />
        </Series.Sequence>

        {/* Seq 2: 4660 - 9300ms (139 frames) */}
        <Series.Sequence durationInFrames={139}>
          <Seq2 />
        </Series.Sequence>

        {/* Seq 3: 9300 - 14800ms (165 frames) */}
        <Series.Sequence durationInFrames={165}>
          <Seq3 />
        </Series.Sequence>

        {/* Seq 4: 14800 - 18060ms (98 frames) */}
        <Series.Sequence durationInFrames={98}>
          <Seq4 />
        </Series.Sequence>

        {/* Seq 5: 18060 - 22060ms (120 frames) */}
        <Series.Sequence durationInFrames={120}>
          <Seq5 />
        </Series.Sequence>

        {/* Seq 6: 22060 - 26080ms (121 frames) */}
        <Series.Sequence durationInFrames={121}>
          <Seq6 />
        </Series.Sequence>

        {/* Seq 7: 26080 - 30960ms (146 frames) */}
        <Series.Sequence durationInFrames={146}>
          <Seq7 />
        </Series.Sequence>

        {/* Seq 8: 30860 - 38840ms (240 frames) */}
        <Series.Sequence durationInFrames={240}>
          <Seq8 />
        </Series.Sequence>

        {/* Seq 9: 38840 - 44080ms (157 frames) */}
        <Series.Sequence durationInFrames={157}>
          <Seq9 />
        </Series.Sequence>

        {/* Seq 10: 44080 - 52500ms (253 frames) */}
        <Series.Sequence durationInFrames={253}>
          <Seq10 />
        </Series.Sequence>

        {/* Seq 11: 52500 - 64800ms (369 frames) */}
        <Series.Sequence durationInFrames={369}>
          <Seq11 />
        </Series.Sequence>

        {/* Ending padding to match audio duration (65920ms = 1978 frames) */}
        <Series.Sequence durationInFrames={30}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
