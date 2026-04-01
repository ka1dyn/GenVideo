import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 어두운게 확 걷히며 밝은 화이트
  const expose = spring({
    frame,
    fps,
    config: { damping: 10 },
  });

  const radius = interpolate(expose, [0, 1], [0, 2000]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#333336', justifyContent: 'center', alignItems: 'center' }}>
      
      <AbsoluteFill
        style={{
          backgroundColor: '#FFFFFF',
          clipPath: `circle(${radius}px at 50% 50%)`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#0071E3',
            fontSize: '110px',
            fontWeight: 900,
            fontFamily: 'Inter',
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '-2px',
          }}
        >
          EXPAND
          <br />
          <span style={{ color: '#000000', fontSize: '130px' }}>LIMITS</span>
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
