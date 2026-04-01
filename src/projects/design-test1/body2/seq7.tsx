import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BEYOND MARKUP 강타
  const pop = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const scale = interpolate(pop, [0, 1], [1.5, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: 'center',
          color: '#000000',
        }}
      >
        <div style={{ fontSize: '150px', fontWeight: 900, fontFamily: 'SF Pro Display', letterSpacing: '-4px', lineHeight: 0.9 }}>
          BEYOND
          <br/>
          <span style={{ color: '#0071E3' }}>MARKUP</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
