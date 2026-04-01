import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Activity 링 스타일 그리기
  const draw = spring({
    frame,
    fps,
    config: { damping: 100, mass: 2 },
  });

  const circleLength = 2 * Math.PI * 200; // r=200

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 백그라운드 링 */}
      <svg width="600" height="600" style={{ position: 'absolute' }}>
        <circle cx="300" cy="300" r="200" stroke="#333336" strokeWidth="40" fill="none" />
      </svg>
      
      {/* 포그라운드 링 (Accent Blue) */}
      <svg width="600" height="600" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle
          cx="300"
          cy="300"
          r="200"
          stroke="#0071E3"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circleLength}
          strokeDashoffset={interpolate(draw, [0, 1], [circleLength, circleLength * 0.2])} // 80% 채우기
        />
      </svg>

      <div
        style={{
          color: '#FFFFFF',
          fontSize: '60px',
          fontWeight: 800,
          fontFamily: 'Inter',
          opacity: interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: 'clamp' }),
        }}
      >
        SHIFT
      </div>
    </AbsoluteFill>
  );
};
