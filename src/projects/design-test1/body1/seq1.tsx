import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for scanning line
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 12 },
  });

  // Background dots rain effect
  const dotsPosition = (frame * 5) % 800;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Falling Data Dots (Background) */}
      <AbsoluteFill style={{ opacity: 0.15 }}>
          {[...Array(40)].map((_, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      top: ((dotsPosition + (i * 25)) % 900) - 100,
                      left: `${(i * 123) % 100}%`,
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                  }}
              />
          ))}
      </AbsoluteFill>

      {/* Central Scanning Bar */}
      <div
          style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '4px',
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 30px #3B82F6',
              transform: `translateY(${-50 + (Math.sin(frame / 5) * 200)}px)`,
              opacity: interpolate(entrance, [0, 1], [0, 0.6]),
          }}
      />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 10%' }}>
          <div style={{ transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})` }}>
              <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '10px', textAlign: 'center' }}>
                REAL WORLD DATA
              </div>
              <h1 style={{ color: '#FFFFFF', fontSize: '56px', fontFamily: 'Pretendard', fontWeight: 900, textAlign: 'center', lineHeight: 1.3 }}>
                실제 데이터를 바탕으로한<br />놀라운 변화의 결과
              </h1>
          </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
