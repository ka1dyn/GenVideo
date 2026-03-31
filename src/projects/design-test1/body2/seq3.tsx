import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Prompt Bar entrance
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Code blocks flying up (Fountain)
  const codeBlocks = [...Array(15)].map((_, i) => {
      const codeEntrance = (frame - (i * 5)) % 60;
      const y = interpolate(codeEntrance, [0, 60], [height, -200]);
      const x = Math.sin(i * 123) * 400;
      const opacity = interpolate(codeEntrance, [0, 10, 50, 60], [0, 1, 1, 0]);
      return { x, y, opacity, width: 200 + (i % 5) * 50 };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Code Fountain (Background) */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
          {codeBlocks.map((block, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      left: `calc(50% + ${block.x}px)`,
                      width: `${block.width}px`,
                      height: '30px',
                      backgroundColor: '#1A1A1A',
                      borderLeft: '4px solid #3B82F6',
                      opacity: block.opacity,
                      transform: `translateY(${block.y}px)`,
                  }}
              />
          ))}
      </AbsoluteFill>

      {/* Central Prompt Bar */}
      <div
          style={{
              width: `${entrance * 80}%`,
              height: '80px',
              backgroundColor: '#1A1A1A',
              border: '2px solid #3B82F6',
              borderRadius: '40px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 30px',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
              zIndex: 10,
          }}
      >
          <div style={{ color: '#3B82F6', fontSize: '24px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginRight: '20px' }}>PROMPT:</div>
          <div style={{ color: '#FFFFFF', fontSize: '28px', fontFamily: 'Pretendard', fontWeight: 600 }}>
            "Build a complex Next.js dashboard with API integration..."
          </div>
      </div>
    </AbsoluteFill>
  );
};
