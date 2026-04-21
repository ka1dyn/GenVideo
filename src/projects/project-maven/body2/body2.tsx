import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { CaptionOverlay } from '../../../core/CaptionOverlay';
import body2Timeline from '../../../../public/project-maven/body2/body2_final_timeline.json';
import { Sequences } from './sequences';
import { COLORS } from '../theme';

export const Body2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('project-maven/body2/body2.wav')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 화면 최상단 자막 오버레이 — JSON을 직접 소비 */}
      <CaptionOverlay captions={body2Timeline.sentences} />
    </AbsoluteFill>
  );
};
