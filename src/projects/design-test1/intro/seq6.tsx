import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();

  // 아래에서 위로 올라가는 코드블록 배경
  const scrollY = interpolate(frame, [0, 197], [1000, -1000]);
  
  // 가짜 코드 스니펫
  const fakeCodeLines = Array(50).fill("const pairProgrammer = new AIHelper({ autoReview: true, quality: 'premium' });");

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Code Background Scroll */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          opacity: 0.1,
          transform: `translateY(${scrollY}px)`,
          color: '#0071E3',
          fontFamily: 'SF Pro Display, JetBrains Mono, monospace',
          fontSize: '24px',
          lineHeight: 1.5,
          padding: '40px',
        }}
      >
        {fakeCodeLines.map((line, i) => (
          <div key={i}>{i + 1} &nbsp; {line}</div>
        ))}
      </div>

      <div
        style={{
          color: '#FFFFFF',
          fontSize: '100px',
          fontWeight: 800,
          fontFamily: 'Pretendard, sf pro display, sans-serif',
          textAlign: 'center',
          textShadow: '0px 10px 40px rgba(0,0,0,0.8)',
          opacity: interpolate(frame, [0, 20], [0, 1]),
          transform: `scale(${interpolate(frame, [0, 40], [0.9, 1])})`,
        }}
      >
        SENIOR
        <br />
        DEVELOPER
        <br />
        <span style={{ fontSize: '40px', color: '#86868B', letterSpacing: '10px' }}>ON BOARD</span>
      </div>

    </AbsoluteFill>
  );
};
