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

  // Core Entrance
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Background Grid scaling
  const gridScale = interpolate(frame, [0, 410], [1, 2]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Precision Grid (Background) */}
      <AbsoluteFill
        style={{
          opacity: 0.1,
          backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: `scale(${gridScale})`,
        }}
      />

      <div style={{ transform: `scale(${entrance})`, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
            CORE TECHNOLOGY
          </div>
          <h1
              style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontSize: '80px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  padding: '10px 40px',
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
                  display: 'inline-block',
                  marginBottom: '30px',
              }}
          >
            프롬프트 엔지니어링
          </h1>

          <div style={{ display: 'flex', gap: '20px', opacity: entrance }}>
              <div style={{ border: '2px solid #3B82F6', color: '#3B82F6', padding: '10px 30px', borderRadius: '40px', fontWeight: 700 }}>
                  명확한 컨텍스트
              </div>
              <div style={{ border: '2px solid #3B82F6', color: '#3B82F6', padding: '10px 30px', borderRadius: '40px', fontWeight: 700 }}>
                  엄격한 제약 조건
              </div>
          </div>
      </div>
    </AbsoluteFill>
  );
};
