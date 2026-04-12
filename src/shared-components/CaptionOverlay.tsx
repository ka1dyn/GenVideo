import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { COLORS } from '../constants/theme';

// _final_timeline.json의 sentence 구조 (신규 방식)
export interface TimelineSentence {
  sentence: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  words: { text: string; startFrame: number; endFrame: number }[];
}

// 레거시 Subtitle 타입 (하위호환용, 이제 프레임 기반으로 동작)
interface LegacySubtitle {
  text: string;
  startFrame: number;
  endFrame: number;
}

type Caption = TimelineSentence | LegacySubtitle;

interface Props {
  captions: Caption[];
}

function getCaptionText(cap: Caption): string {
  if ('sentence' in cap) return cap.sentence;
  return cap.text;
}

export const CaptionOverlay: React.FC<Props> = ({ captions }) => {
  const frame = useCurrentFrame();

  // Find the active subtitle based on frames
  const activeSubtitle = captions.find(
    (cap) => frame >= cap.startFrame && frame < cap.endFrame
  );

  if (!activeSubtitle) {
    return null;
  }

  const fadeInFrames = 3;
  const fadeOutFrames = 3;

  // 진입/퇴장 시 페이드인/아웃 안전하게 계산 (문장이 짧을 경우 겹치지 않게 Math.min 사용)
  const opacityIn = interpolate(
    frame,
    [activeSubtitle.startFrame, activeSubtitle.startFrame + fadeInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacityOut = interpolate(
    frame,
    [activeSubtitle.endFrame - fadeOutFrames, activeSubtitle.endFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = Math.min(opacityIn, opacityOut);

  return (
    <AbsoluteFill
      style={{
        zIndex: 9999,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '50px',
        pointerEvents: 'none',
      }}
    >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            WebkitTextStroke: `8px ${COLORS.BG_DARKEST}`,
            paintOrder: 'stroke fill',
            textShadow: `0 6px 16px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.5)`,
            padding: '10px 20px',
            display: 'inline-block',
            whiteSpace: 'pre-line',
            textAlign: 'center',
            opacity,
          }}
        >
          {getCaptionText(activeSubtitle)}
        </div>
    </AbsoluteFill>
  );
};
