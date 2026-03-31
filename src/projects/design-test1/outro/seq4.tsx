import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for Core Mindset
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Background Grid Pulsing
  const pulse = Math.sin(frame / 5) * 0.1 * entrance;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Central Core Circle (Product Mindset) */}
      <div
          style={{
              width: `${interpolate(entrance, [0, 1], [0, 600])}px`,
              height: `${interpolate(entrance, [0, 1], [0, 600])}px`,
              border: '2px solid #3B82F6',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              transform: `scale(${1 + pulse})`,
              boxShadow: '0 0 80px rgba(59, 130, 246, 0.2)',
          }}
      >
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
            NEW ARMOR
          </div>
          <h1
              style={{
                  color: '#FFFFFF',
                  fontSize: '80px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  textAlign: 'center',
                  marginBottom: '10px',
              }}
          >
            프로덕트 마인드
          </h1>
          <div style={{ width: '100px', height: '4px', backgroundColor: '#FFFFFF', marginBottom: '10px' }} />
          <div style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 700, opacity: 0.8 }}>
            WHAT & WHY
          </div>
      </div>

      {/* Floating Debris (Broken Barriers) */}
      <AbsoluteFill style={{ opacity: entrance }}>
          {[...Array(6)].map((_, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      width: '60px',
                      height: '60px',
                      border: '1px solid #454545',
                      top: `${(i * 123) % 100}%`,
                      left: `${(i * 456) % 100}%`,
                      transform: `rotate(${frame + (i * 90)}deg)`,
                      opacity: 0.1,
                  }}
              />
          ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
