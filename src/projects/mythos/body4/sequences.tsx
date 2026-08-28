import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';

export const CUTS = {
  SCENE1: 0,
  SCENE2: 126,
  SCENE3: 254,
  SCENE4: 470,
  SCENE5: 817,
  SCENE6: 931,
  SCENE7: 1085,
  SCENE8: 1253,
  END: 1414
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
      <Sequence from={CUTS.SCENE5} durationInFrames={CUTS.SCENE6 - CUTS.SCENE5}>
        <Scene5 />
      </Sequence>
      <Sequence from={CUTS.SCENE6} durationInFrames={CUTS.SCENE7 - CUTS.SCENE6}>
        <Scene6 />
      </Sequence>
      <Sequence from={CUTS.SCENE7} durationInFrames={CUTS.SCENE8 - CUTS.SCENE7}>
        <Scene7 />
      </Sequence>
      <Sequence from={CUTS.SCENE8} durationInFrames={CUTS.END - CUTS.SCENE8}>
        <Scene8 />
      </Sequence>
    </AbsoluteFill>
  );
};
