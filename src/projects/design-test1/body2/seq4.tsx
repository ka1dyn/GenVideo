import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 30], [0.9, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: 'center',
        }}
      >
        <div style={{ color: '#0071E3', fontSize: '60px', fontWeight: 700, fontFamily: 'SF Pro Display', marginBottom: '20px' }}>
          [1]
        </div>
        <div style={{ color: '#FFFFFF', fontSize: '110px', fontWeight: 900, fontFamily: 'SF Pro Display' }}>
          ARCHITECTURE
        </div>
      </div>
    </AbsoluteFill>
  );
};
