import React from 'react';
import { Series } from 'remotion';
import { Intro } from './intro/intro';
import { Body1 } from './body1/body1';
import { Body2 } from './body2/body2';
import { Outro } from './outro/outro';

export const WebParadiam: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={300} name="Intro">
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300} name="Body1">
        <Body1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300} name="Body2">
        <Body2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300} name="Outro">
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
