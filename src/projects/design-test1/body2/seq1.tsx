import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();

  // 천천히 줌인되는 서스펜스 (0.3초 팝인 후 리니어 줌)
  const scale = interpolate(frame, [0, 10, 140], [0.8, 1, 1.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          color: '#FFFFFF',
          fontSize: '120px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display, Inter',
          textAlign: 'center',
          transform: `scale(${scale})`,
          textShadow: '0 10px 30px rgba(0,0,0,0.8)',
        }}
      >
        HOW TO
        <br />
        <span style={{ color: '#0071E3' }}>ADOPT?</span>
      </div>
    </AbsoluteFill>
  );
};
