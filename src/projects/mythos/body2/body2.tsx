import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../core/CaptionOverlay';
import { captions } from './captions';
import { Sequences } from "./sequences";

/**
 * Section: body2
 * Audio Duration: 28676ms (861 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('mythos/body2/body2.wav')
 *   Timestamps: staticFile('mythos/body2/body2_timestamp.json')
 *
 * Plan: src/projects/mythos/body2/make_video_plan.md
 */
export const Body2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('mythos/body2/body2.wav')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 자막 오버레이 */}
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
