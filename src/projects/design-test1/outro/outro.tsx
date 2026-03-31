import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';
import { CaptionOverlay } from '../components/CaptionOverlay';
import { outroSubtitles } from './outro_subtitles';

/**
 * Section: outro
 * Audio Duration: 67440ms (2024 frames @30fps)
 */
export const Outro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      
      {/* Principal Narration Audio */}
      <Audio src={staticFile('design-test1/outro/outro.wav')} />

      <Series>
        <Series.Sequence durationInFrames={343}>
          <Seq1 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={472}>
          <Seq2 />
        </Series.Sequence>

        {/* Adjusting for the gap in the plan (approx 1200ms / 36 frames) */}
        <Series.Sequence durationInFrames={36}>
            <AbsoluteFill style={{ backgroundColor: '#000000' }} />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={358}>
          <Seq3 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={436}>
          <Seq4 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={379}> {/* Adjusted slightly to reach the end of audio/clip */}
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={outroSubtitles} />
    </AbsoluteFill>
  );
};
