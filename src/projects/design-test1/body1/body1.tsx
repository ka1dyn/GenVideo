import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
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
import { CaptionOverlay } from '../components/CaptionOverlay';
import { body1Subtitles } from './body1_subtitles';

export const Body1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Audio src={staticFile('design-test1/body1/body1.wav')} />
      
      <Series>
        <Series.Sequence durationInFrames={95}><Seq1 /></Series.Sequence>
        <Series.Sequence durationInFrames={200}><Seq2 /></Series.Sequence>
        <Series.Sequence durationInFrames={273}><Seq3 /></Series.Sequence>
        <Series.Sequence durationInFrames={149}><Seq4 /></Series.Sequence>
        <Series.Sequence durationInFrames={89}><Seq5 /></Series.Sequence>
        <Series.Sequence durationInFrames={286}><Seq6 /></Series.Sequence>
        <Series.Sequence durationInFrames={90}><Seq7 /></Series.Sequence>
        <Series.Sequence durationInFrames={330}><Seq8 /></Series.Sequence>
        <Series.Sequence durationInFrames={114}><Seq9 /></Series.Sequence>
        {/* Remaining Frames (Total 2014) = 2014 - (95+200+273+149+89+286+90+330+114) = 2014 - 1626 = 388 */}
        <Series.Sequence durationInFrames={388}><Seq10 /></Series.Sequence>
      </Series>
      
      <CaptionOverlay subtitles={body1Subtitles} />
    </AbsoluteFill>
  );
};
