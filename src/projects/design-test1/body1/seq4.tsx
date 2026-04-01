import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 압축(Collapse) 모션
  const collapse = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const gap = interpolate(collapse, [0, 1], [50, 5]);
  const scaleY = interpolate(collapse, [0, 1], [1, 0.1]);
  const yShift = interpolate(collapse, [0, 1], [-200, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* 찌부러지는 박스들 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${gap}px`,
          position: 'absolute',
          transform: `scaleY(${scaleY}) translateY(${yShift}px)`,
          opacity: interpolate(frame, [0, 30], [1, 0]),
        }}
      >
        {Array(10).fill(0).map((_, i) => (
          <div key={i} style={{ width: '400px', height: '60px', backgroundColor: '#333336', borderRadius: '10px' }} />
        ))}
      </div>

      <div
        style={{
          color: '#FFFFFF',
          fontSize: '100px',
          fontWeight: 900,
          fontFamily: 'Inter, sans-serif',
          zIndex: 10,
          letterSpacing: '-3px',
          opacity: interpolate(collapse, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        REDUCE <span style={{ color: '#0071E3' }}>WORK</span>
      </div>
    </AbsoluteFill>
  );
};
