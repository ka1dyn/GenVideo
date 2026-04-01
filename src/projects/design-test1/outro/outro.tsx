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
import { outroSubtitles } from './outro_subtitles';

export const Outro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Audio src={staticFile('design-test1/outro/outro.wav')} />
      
      <Series>
        <Series.Sequence durationInFrames={150}><Seq1 /></Series.Sequence>
        <Series.Sequence durationInFrames={194}><Seq2 /></Series.Sequence>
        <Series.Sequence durationInFrames={195}><Seq3 /></Series.Sequence>
        <Series.Sequence durationInFrames={278}><Seq4 /></Series.Sequence>
        <Series.Sequence durationInFrames={113}><Seq5 /></Series.Sequence>
        <Series.Sequence durationInFrames={282}><Seq6 /></Series.Sequence>
        <Series.Sequence durationInFrames={364}><Seq7 /></Series.Sequence>
        <Series.Sequence durationInFrames={73}><Seq8 /></Series.Sequence>
        <Series.Sequence durationInFrames={162}><Seq9 /></Series.Sequence>
        <Series.Sequence durationInFrames={213}><Seq10 /></Series.Sequence>
      </Series>
      
      <CaptionOverlay subtitles={outroSubtitles} />
    </AbsoluteFill>
  );
};
