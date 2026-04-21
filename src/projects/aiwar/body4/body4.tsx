import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../core/CaptionOverlay';
import { captions } from './captions';
import { Sequences } from "./sequences";

/**
 * Section: body4
 * Audio Duration: 110500ms (3315 frames @30fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('aiwar/body4/body4.wav')
 *   Timestamps: staticFile('aiwar/body4/body4_timestamp.json')
 *
 * Plan: public/aiwar/body4/body4_plan.md
 */
export const Body4: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('aiwar/body4/body4.wav')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 자막 오버레이 */}
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
