import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the central circle
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Productivity Number Counting: 0 -> 55
  const count = Math.min(55, Math.floor(interpolate(frame, [15, 60], [0, 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Central Pulsing Circle */}
      <div
          style={{
              width: '450px',
              height: '450px',
              border: '6px solid #3B82F6',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${entrance})`,
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)',
              backgroundColor: '#0A0A0A',
          }}
      >
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '-20px' }}>
            PRODUCTIVITY UP
          </div>
          <div
              style={{
                  fontSize: '180px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  color: '#FFFFFF',
              }}
          >
              {count}%
          </div>
      </div>

      {/* Floating Keywords (Boilerplate Decrease) */}
      <div
          style={{
              position: 'absolute',
              bottom: '15%',
              display: 'flex',
              gap: '40px',
              opacity: interpolate(frame, [45, 60], [0, 1]),
          }}
      >
          <div style={{ color: '#FFFFFF', fontSize: '24px', fontFamily: 'Pretendard', fontWeight: 700, padding: '10px 20px', border: '1px solid #3B82F6', borderRadius: '4px' }}>
            반복 작업 감소 ↓
          </div>
          <div style={{ color: '#3B82F6', fontSize: '24px', fontFamily: 'Pretendard', fontWeight: 700, padding: '10px 20px', border: '1px solid #FFFFFF', borderRadius: '4px' }}>
            보일러플레이트 극복
          </div>
      </div>
    </AbsoluteFill>
  );
};
