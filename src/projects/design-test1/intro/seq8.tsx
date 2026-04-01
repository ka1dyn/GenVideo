import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 위아래 교차 슬라이드
  const topSlide = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  const bottomSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Top Half */}
      <AbsoluteFill
        style={{
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateY(${interpolate(topSlide, [0, 1], [-100, 0])}%)`,
          backgroundColor: '#000000',
        }}
      >
        <div style={{ color: '#86868B', fontSize: '100px', fontWeight: 900, fontFamily: 'Inter' }}>
          FAIL <span style={{ color: '#FFFFFF' }}>FAST</span>.
        </div>
      </AbsoluteFill>

      {/* Bottom Half */}
      <AbsoluteFill
        style={{
          height: '50%',
          top: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateY(${interpolate(bottomSlide, [0, 1], [100, 0])}%)`,
          backgroundColor: '#000000',
        }}
      >
        <div style={{ color: '#86868B', fontSize: '100px', fontWeight: 900, fontFamily: 'Inter' }}>
          INNOVATE <span style={{ color: '#FFFFFF' }}>FASTER</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
