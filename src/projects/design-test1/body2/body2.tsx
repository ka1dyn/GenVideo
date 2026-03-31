import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
import { Seq3 } from './seq3';
import { Seq4 } from './seq4';
import { Seq5 } from './seq5';
import { CaptionOverlay } from '../components/CaptionOverlay';
import { body2Subtitles } from './body2_subtitles';

/**
 * Section: body2
 * Audio Duration: 65920ms (1978 frames @30fps)
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      
      {/* Principal Narration Audio */}
      <Audio src={staticFile('design-test1/body2/body2.wav')} />

      <Series>
        <Series.Sequence durationInFrames={279}>
          <Seq1 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={503}>
          <Seq2 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={383}>
          <Seq3 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={410}>
          <Seq4 />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={403}>
          <Seq5 />
        </Series.Sequence>
      </Series>

      <CaptionOverlay captions={body2Subtitles} />
    </AbsoluteFill>
  );
};
