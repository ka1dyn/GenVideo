import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the finale
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 12 },
  });

  // Background Flip from Black to White
  const bgColor = interpolate(frame, [0, 45], [0, 1]) > 0.5 ? '#FFFFFF' : '#000000';
  const textColor = bgColor === '#FFFFFF' ? '#000000' : '#FFFFFF';

  // Floating Particles
  const particles = [...Array(40)].map((_, i) => {
      const pEntrance = (frame - (i * 2)) % 100;
      const x = Math.sin(i * 123) * 600;
      const y = interpolate(pEntrance, [0, 100], [0, -1000]);
      const opacity = interpolate(pEntrance, [0, 20, 80, 100], [0, 0.4, 0.4, 0]);
      return { x, y, opacity };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Sparking Particles (Background) */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {particles.map((p, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      bottom: '20%',
                      left: `calc(50% + ${p.x}px)`,
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#3B82F6',
                      opacity: p.opacity,
                      transform: `translateY(${p.y}px)`,
                  }}
              />
          ))}
      </AbsoluteFill>

      <div style={{ transform: `scale(${entrance})`, textAlign: 'center', zIndex: 10 }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
            THE NEW ERA
          </div>
          <h1
              style={{
                  color: textColor,
                  fontSize: '80px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '10px',
                  textShadow: bgColor === '#000000' ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none',
              }}
          >
            당신의 상상력을 <br />현실화할 시간
          </h1>
          <div
              style={{
                  marginTop: '40px',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '48px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  padding: '10px 40px',
                  boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                  display: 'inline-block',
              }}
          >
            START NOW
          </div>
      </div>
    </AbsoluteFill>
  );
};
