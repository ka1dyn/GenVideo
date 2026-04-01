import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 바운스 애니메이션
  const bounce = spring({
    frame,
    fps,
    config: { damping: 10, mass: 0.8 },
  });

  const scale = interpolate(bounce, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${scale})`,
          color: '#000000',
          fontSize: '110px',
          fontWeight: 900,
          fontFamily: 'Inter, Pretendard, sans-serif',
          letterSpacing: '-3px',
          textAlign: 'center',
        }}
      >
        WHAT IS
        <br />
        <span style={{ color: '#0071E3' }}>CHANGING?</span>
      </div>
    </AbsoluteFill>
  );
};
