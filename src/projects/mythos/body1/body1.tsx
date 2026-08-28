import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../core/CaptionOverlay';
import { captions } from './captions';
import { Sequences } from "./sequences";

/**
 * Section: body1
 * Audio Duration: 64693ms (1941 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('mythos/body1/body1.wav')
 *   Timestamps: staticFile('mythos/body1/body1_timestamp.json')
 *
 * Plan: src/projects/mythos/body1/make_video_plan.md
 */
export const Body1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('mythos/body1/body1.wav')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 자막 오버레이 */}
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
