import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  spring,
} from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for the shield
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Bug particles flying in
  const bugs = [...Array(12)].map((_, i) => {
      const bugEntrance = (frame - (i * 10)) % 100;
      const x = interpolate(bugEntrance, [0, 80], [1200, 600]);
      const opacity = interpolate(bugEntrance, [70, 85], [1, 0]);
      return { x, opacity, y: (i * 80) % 600 - 300 };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Central Shield UI */}
      <div
          style={{
              position: 'relative',
              width: '500px',
              height: '600px',
              border: `4px solid ${interpolateColors(entrance, [0, 1], ['#000000', '#3B82F6'])}`,
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: `0 0 ${interpolate(entrance, [0, 1], [0, 50])}px rgba(59, 130, 246, 0.4)`,
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              transform: `scale(${entrance})`,
          } as React.CSSProperties}
      >
          <div style={{ color: '#3B82F6', fontSize: '24px', fontWeight: 800, marginBottom: '10px' }}>ANTIVIRUS & SCAN</div>
          <div style={{ fontSize: '120px', fontWeight: 900, color: '#FFFFFF' }}>90%</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#3B82F6' }}>BUG BLOCKED</div>
      </div>

      {/* Bug Particles (Small gray squares) */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {bugs.map((bug, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      top: `calc(50% + ${bug.y}px)`,
                      left: bug.x,
                      width: '20px',
                      height: '2px',
                      backgroundColor: '#454545',
                      opacity: bug.opacity,
                  }}
              />
          ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
