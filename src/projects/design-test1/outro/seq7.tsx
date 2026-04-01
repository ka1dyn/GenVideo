import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      
      {/* 왼쪽의 거대 P */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '40px',
          color: '#0071E3',
          fontSize: '400px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display',
          lineHeight: 0.8,
          letterSpacing: '-20px',
        }}
      >
        P
      </div>
      
      {/* 오른쪽 문구 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ color: '#000000', fontSize: '90px', fontWeight: 900, fontFamily: 'Inter', transform: `translateY(${interpolate(frame, [0, 20], [50, 0], { extrapolateRight: 'clamp' })}px)`, opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }) }}>
          PRODUCT
        </div>
        <div style={{ color: '#86868B', fontSize: '80px', fontWeight: 600, fontFamily: 'Inter', transform: `translateY(${interpolate(frame, [10, 30], [50, 0], { extrapolateRight: 'clamp' })}px)`, opacity: interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' }) }}>
          MINDSET
        </div>
      </div>

    </AbsoluteFill>
  );
};
