import React from 'react';
import { Series } from 'remotion';
import { Intro } from './intro/intro';
import { Body1 } from './body1/body1';
import { Outro } from './outro/outro';

export const TestProject: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={575} name="Intro">
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={599} name="Body1">
        <Body1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={623} name="Outro">
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
