import React from 'react';
import { Series } from 'remotion';
import { Intro } from './intro/intro';
import { Body1 } from './body1/body1';
import { Body2 } from './body2/body2';
import { Body3 } from './body3/body3';
import { Outro } from './outro/outro';

export const Aiwar: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={3004} name="Intro">
        <Intro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2752} name="Body1">
        <Body1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2374} name="Body2">
        <Body2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={1153} name="Body3">
        <Body3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={1330} name="Outro">
        <Outro />
      </Series.Sequence>
    </Series>
  );
};
