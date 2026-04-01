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
import { Seq11 } from './seq11';
import { Seq12 } from './seq12';
import { CaptionOverlay } from '../components/CaptionOverlay';
import { body2Subtitles } from './body2_subtitles';

export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Audio src={staticFile('design-test1/body2/body2.wav')} />
      
      <Series>
        <Series.Sequence durationInFrames={140}><Seq1 /></Series.Sequence>
        <Series.Sequence durationInFrames={140}><Seq2 /></Series.Sequence>
        <Series.Sequence durationInFrames={165}><Seq3 /></Series.Sequence>
        <Series.Sequence durationInFrames={98}><Seq4 /></Series.Sequence>
        <Series.Sequence durationInFrames={120}><Seq5 /></Series.Sequence>
        <Series.Sequence durationInFrames={121}><Seq6 /></Series.Sequence>
        <Series.Sequence durationInFrames={117}><Seq7 /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><Seq8 /></Series.Sequence>
        <Series.Sequence durationInFrames={158}><Seq9 /></Series.Sequence>
        <Series.Sequence durationInFrames={253}><Seq10 /></Series.Sequence>
        <Series.Sequence durationInFrames={142}><Seq11 /></Series.Sequence>
        <Series.Sequence durationInFrames={284}><Seq12 /></Series.Sequence>
      </Series>
      
      <CaptionOverlay subtitles={body2Subtitles} />
    </AbsoluteFill>
  );
};
