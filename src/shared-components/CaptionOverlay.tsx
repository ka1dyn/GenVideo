import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

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

  // Animation: subtle fade in when a new caption starts
  const entryFrame = activeSubtitle.startFrame;
  const opacity = interpolate(
    frame,
    [entryFrame, entryFrame + 5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        zIndex: 9999,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '50px',
        pointerEvents: 'none',
        opacity,
      }}
    >
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
            whiteSpace: 'pre-line',
          }}
        >
          {getCaptionText(activeSubtitle)}
        </div>
    </AbsoluteFill>
  );
};
