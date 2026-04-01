import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 스피드감 강조 (모션 블러 느낌의 슬라이드 인)
  const slide = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const translateX = interpolate(slide, [0, 1], [-1000, 0]);
  const skewX = interpolate(slide, [0, 1], [-30, -10]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      <div
        style={{
          transform: `translateX(${translateX}px) skewX(${skewX}deg)`,
          color: '#0071E3',
          fontSize: '120px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display, Inter',
          fontStyle: 'italic',
          letterSpacing: '5px',
          filter: `blur(${interpolate(slide, [0, 1], [20, 0])}px)`,
        }}
      >
        ACCELERATION
      </div>
    </AbsoluteFill>
  );
};
