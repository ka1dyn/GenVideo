import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();

  // 깜빡이는 Strobe 이펙트 (15프레임 이후 깜빡임)
  const isBlink = frame > 15 && Math.floor(frame / 3) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          color: '#000000',
          fontSize: '150px',
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-5px',
          opacity: isBlink ? 0 : 1,
        }}
      >
        BEFORE
      </div>
      <div
        style={{
          position: 'absolute',
          top: '65%',
          color: '#86868B',
          fontSize: '60px',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        VS
      </div>
      <div
        style={{
          color: '#0071E3',
          fontSize: '150px',
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-5px',
          opacity: isBlink ? 1 : 0,
        }}
      >
        AFTER
      </div>
    </AbsoluteFill>
  );
};
