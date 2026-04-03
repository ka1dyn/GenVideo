import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: body1
 * Audio Duration: 67120ms (4028 frames @60fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('design-test3/body1/body1.wav')
 *   Timestamps: staticFile('design-test3/body1/body1_timestamp.json')
 *
 * Plan: public/design-test3/body1/body1_plan.md
 */
import { CaptionOverlay } from '../../../shared-components/CaptionOverlay';
import body1Timeline from '../../../../public/design-test3/body1/body1_final_timeline.json';
import { Sequences } from './sequences';

export const Body1: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile(`design-test3/body1/body1.wav`)} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 화면 최상단 자막 오버레이 — JSON을 직접 소비 */}
      <CaptionOverlay captions={body1Timeline.sentences} />
    </AbsoluteFill>
  );
};
