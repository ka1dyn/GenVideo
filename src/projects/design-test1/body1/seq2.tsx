import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Draw chart paths
  const drawWidth = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  // 슬라이드 업 텍스트
  const yOffset = interpolate(frame, [0, 20], [50, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background chart subtle lines */}
      <svg width="100%" height="50%" style={{ position: 'absolute', bottom: 0, opacity: 0.6 }}>
        <path
          d="M 0,300 Q 200,300 400,100 T 800,200 T 1200,50 T 1920,0"
          stroke="#333336"
          strokeWidth="4"
          fill="none"
          strokeDasharray="2500"
          strokeDashoffset={interpolate(drawWidth, [0, 1], [2500, 0])}
        />
      </svg>

      <div
        style={{
          color: '#FFFFFF',
          fontSize: '120px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display, Inter, sans-serif',
          textAlign: 'center',
          transform: `translateY(${yOffset}px)`,
          opacity,
          zIndex: 10,
        }}
      >
        BASED ON
        <br />
        <span style={{ color: '#86868B' }}>DATA</span>
      </div>
    </AbsoluteFill>
  );
};
