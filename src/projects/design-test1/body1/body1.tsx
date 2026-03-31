import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';
import { CaptionOverlay } from '../components/CaptionOverlay';
import { body1Subtitles } from './body1_subtitles';

/**
 * Section: body1
 * Audio Duration: 67120ms (2014 frames @30fps)
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      
      {/* Principal Narration Audio */}
      <Audio src={staticFile('design-test1/body1/body1.wav')} />

      <Series>
        <Series.Sequence durationInFrames={294}>
          <Seq1 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={421}>
          <Seq2 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={434}>
          <Seq3 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={420}>
          <Seq4 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={445}>
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={body1Subtitles} />
    </AbsoluteFill>
  );
};
