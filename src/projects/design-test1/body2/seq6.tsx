import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 대각선 배치되며 입체감 형성
  const slide = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const translate = interpolate(slide, [0, 1], [50, 0]);
  const opacity = interpolate(slide, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{
          transform: `translate(${translate}px, ${translate}px)`,
          opacity,
          textAlign: 'right',
          position: 'relative',
          paddingRight: '100px',
        }}
      >
        <div style={{ color: '#0071E3', fontSize: '60px', fontWeight: 700, fontFamily: 'SF Pro Display', marginBottom: '10px' }}>
          [3]
        </div>
        <div style={{ color: '#FFFFFF', fontSize: '90px', fontWeight: 900, fontFamily: 'Inter', letterSpacing: '-2px' }}>
          REFACTORING
        </div>
        <div style={{ color: '#86868B', fontSize: '80px', fontWeight: 800, fontFamily: 'Inter' }}>
          & OPTIMIZE
        </div>
      </div>
      
    </AbsoluteFill>
  );
};
