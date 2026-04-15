import React from 'react';
import { Series } from 'remotion';
import { Intro } from './intro/intro';
import { Body1 } from './body1/body1';
import { Body2 } from './body2/body2';
import { Body3 } from './body3/body3';
import { Body4 } from './body4/body4';
import { Outro } from './outro/outro';

export const Aiwar: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={1051} name="Intro">
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={1634} name="Body1">
        <Body1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2250} name="Body2">
        <Body2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={1294} name="Body3">
        <Body3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={3315} name="Body4">
        <Body4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2918} name="Outro">
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
