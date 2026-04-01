import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 중앙에서 뻗어나가는 라인 모션 (아키텍처 스케치 느낌)
  const drawProgress = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const scale = interpolate(frame, [0, 100], [0.95, 1.05], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Grid Lines rendering logic (simulated with SVG) */}
      <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.3 }}>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#333336" strokeWidth="2" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Draw a giant connection line to signify Architecture */}
        <path
          d="M 500,500 L 1000,200 L 1500,800"
          stroke="#0071E3"
          strokeWidth="6"
          fill="none"
          strokeDasharray="2000"
          strokeDashoffset={interpolate(drawProgress, [0, 1], [2000, 0])}
        />
      </svg>

      <div
        style={{
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: '90px', fontWeight: 900, fontFamily: 'Inter, sans-serif' }}>
          ARCHITECTURE
        </div>
        <div style={{ color: '#86868B', fontSize: '70px', fontWeight: 300, fontFamily: 'Inter, sans-serif' }}>
          & OPTIMIZE
        </div>
      </div>
    </AbsoluteFill>
  );
};
