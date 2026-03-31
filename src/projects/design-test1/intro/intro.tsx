import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';
import { Seq6 } from './seq6';
import { CaptionOverlay } from '../components/CaptionOverlay';
import { introSubtitles } from './intro_subtitles';

/**
 * Section: intro
 * Audio Duration: 66320ms (1990 frames @30fps)
 */
export const Intro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Principal Narration Audio */}
      <Audio src={staticFile('design-test1/intro/intro.wav')} />

      <Series>
        <Series.Sequence durationInFrames={68}>
          <Seq1 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={256}>
          <Seq2 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={426}>
          <Seq3 />
        </Series.Sequence>

        {/* Adjusting for the gap in the plan (approx 1240ms / 37 frames) */}
        <Series.Sequence durationInFrames={37}>
            <AbsoluteFill style={{ backgroundColor: '#000000' }} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={371}>
          <Seq4 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={375}>
          <Seq5 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={457}>
          <Seq6 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={introSubtitles} />
    </AbsoluteFill>
  );
};
