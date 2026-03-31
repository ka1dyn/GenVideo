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
 * Section: intro
 * Audio Duration: 66320ms (1990 frames @30fps)
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      <Audio src={staticFile('web-paradiam/intro/intro.wav')} />
      
      <Series>
        {/* Seq 1: 0 - 2260ms (68 frames) */}
        <Series.Sequence durationInFrames={68}>
          <Seq1 />
        </Series.Sequence>

        {/* Seq 2: 2260 - 10780ms (256 frames) */}
        <Series.Sequence durationInFrames={256}>
          <Seq2 />
        </Series.Sequence>

        {/* Seq 3: 10780 - 16720ms (179 frames) */}
        <Series.Sequence durationInFrames={179}>
          <Seq3 />
        </Series.Sequence>

        {/* Seq 4: 16720 - 24980ms (248 frames) */}
        <Series.Sequence durationInFrames={248}>
          <Seq4 />
        </Series.Sequence>

        {/* GAP: 24980 - 26220ms (37 frames) - Extending Seq 4 or adding empty */}
        <Series.Sequence durationInFrames={37}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }} />
        </Series.Sequence>

        {/* Seq 5: 26220 - 32020ms (174 frames) */}
        <Series.Sequence durationInFrames={174}>
          <Seq5 />
        </Series.Sequence>

        {/* Seq 6: 32020 - 38560ms (197 frames) */}
        <Series.Sequence durationInFrames={197}>
          <Seq6 />
        </Series.Sequence>

        {/* Seq 7: 38560 - 46540ms (240 frames) */}
        <Series.Sequence durationInFrames={240}>
          <Seq7 />
        </Series.Sequence>

        {/* Seq 8: 46540 - 51040ms (135 frames) */}
        <Series.Sequence durationInFrames={135}>
          <Seq8 />
        </Series.Sequence>

        {/* Seq 9: 51040 - 53800ms (83 frames) */}
        <Series.Sequence durationInFrames={83}>
          <Seq9 />
        </Series.Sequence>

        {/* Seq 10: 53800 - 57460ms (110 frames) */}
        <Series.Sequence durationInFrames={110}>
          <Seq10 />
        </Series.Sequence>

        {/* Seq 11: 57460 - 65100ms (230 frames) */}
        <Series.Sequence durationInFrames={230}>
          <Seq11 />
        </Series.Sequence>

        {/* Ending padding to match audio duration (66320ms = 1990 frames) */}
        <Series.Sequence durationInFrames={33}>
          <AbsoluteFill style={{ backgroundColor: '#0F172A' }} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
