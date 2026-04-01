import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0에서 55 카운트 업
  const countProgress = spring({
    frame,
    fps,
    config: { damping: 14, mass: 1 },
  });

  const value = Math.floor(interpolate(countProgress, [0, 1], [0, 55], { extrapolateRight: 'clamp' }));
  const scale = interpolate(countProgress, [0, 1], [0.5, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          color: '#0071E3', // 포인트 블루
          fontSize: '350px',
          fontWeight: 900,
          fontFamily: 'Inter, SF Pro Display, sans-serif',
          letterSpacing: '-10px',
          transform: `scale(${scale})`,
        }}
      >
        {value}%
      </div>
      
      <div
        style={{
          color: '#000000',
          fontSize: '40px',
          fontWeight: 600,
          fontFamily: 'Pretendard, sans-serif',
          opacity: interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [20, 30], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
        }}
      >
        PRODUCTIVITY BOOST
      </div>
    </AbsoluteFill>
  );
};
