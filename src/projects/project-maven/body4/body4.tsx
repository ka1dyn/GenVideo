import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import body4Timeline from '../../../../public/project-maven/body4/body4_final_timeline.json';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

export const Body4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('project-maven/body4/body4.wav')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 화면 최상단 자막 오버레이 — JSON을 직접 소비 */}
      <CaptionOverlay captions={body4Timeline.sentences} />
    </AbsoluteFill>
  );
};
