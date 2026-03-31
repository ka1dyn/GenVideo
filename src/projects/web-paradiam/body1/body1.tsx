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

/**
 * Section: body1
 * Audio Duration: 67120ms (2014 frames @30fps)
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <Audio src={staticFile('web-paradiam/body1/body1.wav')} />
      
      <Series>
        {/* Seq 1: 0 - 3140ms (94 frames) */}
        <Series.Sequence durationInFrames={94}>
          <Seq1 />
        </Series.Sequence>

        {/* Seq 2: 3140 - 9780ms (199 frames) */}
        <Series.Sequence durationInFrames={199}>
          <Seq2 />
        </Series.Sequence>

        {/* Seq 3: 9780 - 18880ms (273 frames) */}
        <Series.Sequence durationInFrames={273}>
          <Seq3 />
        </Series.Sequence>

        {/* Seq 4: 18880 - 23840ms (149 frames) */}
        <Series.Sequence durationInFrames={149}>
          <Seq4 />
        </Series.Sequence>

        {/* Seq 5: 23840 - 28780ms (148 frames) */}
        <Series.Sequence durationInFrames={148}>
          <Seq5 />
        </Series.Sequence>

        {/* Seq 6: 28780 - 38300ms (286 frames) */}
        <Series.Sequence durationInFrames={286}>
          <Seq6 />
        </Series.Sequence>

        {/* Seq 7: 38300 - 41300ms (90 frames) */}
        <Series.Sequence durationInFrames={90}>
          <Seq7 />
        </Series.Sequence>

        {/* Seq 8: 41300 - 52300ms (330 frames) */}
        <Series.Sequence durationInFrames={330}>
          <Seq8 />
        </Series.Sequence>

        {/* Seq 9: 52300 - 56100ms (114 frames) */}
        <Series.Sequence durationInFrames={114}>
          <Seq9 />
        </Series.Sequence>

        {/* Seq 10: 56100 - 65940ms (295 frames) */}
        <Series.Sequence durationInFrames={295}>
          <Seq10 />
        </Series.Sequence>

        {/* Ending padding to match audio duration (67120ms = 2014 frames) */}
        <Series.Sequence durationInFrames={36}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
