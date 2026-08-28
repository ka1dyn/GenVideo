import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';

export const CUTS = {
  SCENE1: 0,
  SCENE2: 203,
  SCENE3: 324,
  SCENE4: 470,
  SCENE5: 583,
  END: 825
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={CUTS.SCENE1} durationInFrames={CUTS.SCENE2 - CUTS.SCENE1}>
        <Scene1 />
      </Sequence>
      <Sequence from={CUTS.SCENE2} durationInFrames={CUTS.SCENE3 - CUTS.SCENE2}>
        <Scene2 />
      </Sequence>
      <Sequence from={CUTS.SCENE3} durationInFrames={CUTS.SCENE4 - CUTS.SCENE3}>
        <Scene3 />
      </Sequence>
      <Sequence from={CUTS.SCENE4} durationInFrames={CUTS.SCENE5 - CUTS.SCENE4}>
        <Scene4 />
      </Sequence>
      <Sequence from={CUTS.SCENE5} durationInFrames={CUTS.END - CUTS.SCENE5}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
