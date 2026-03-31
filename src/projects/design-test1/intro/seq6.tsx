import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Entrance for final message
  const entrance = spring({
    frame,
    fps,
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  // Glitch Effect for the word PLANNING
  const glitch = Math.sin(frame) * 5 * (frame % 10 < 2 ? 1 : 0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      {/* Background Text Repeating */}
      <AbsoluteFill style={{ opacity: 0.05, overflow: 'hidden' }}>
          {[...Array(10)].map((_, i) => (
              <div
                  key={i}
                  style={{
                      fontSize: '150px',
                      fontFamily: 'JetBrains Mono',
                      fontWeight: 900,
                      color: '#000000',
                      whiteSpace: 'nowrap',
                      transform: `translateX(${interpolate(frame, [0, 422], [0, width / 2])}px)`,
                  }}
              >
                  CONVERSATION CONVERSATION CONVERSATION
              </div>
          ))}
      </AbsoluteFill>

      <div style={{ zIndex: 10, textAlign: 'center', padding: '0 10%', transform: `scale(${interpolate(entrance, [0, 1], [0.8, 1])})` }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
            THE FUTURE ARRIVED
          </div>
          <h1 style={{ color: '#000000', fontSize: '64px', fontFamily: 'Pretendard', fontWeight: 900, lineHeight: 1.2 }}>
            "미래의 코딩은 <br />타이핑이 아니라 <span style={{ color: '#3B82F6' }}>대화</span>가 될 것이다."
          </h1>
          
          <div
              style={{
                  marginTop: '40px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  padding: '20px 40px',
                  fontSize: '48px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                  transform: `translateX(${glitch}px)`,
              }}
          >
            기획력의 시대
          </div>
      </div>
    </AbsoluteFill>
  );
};
