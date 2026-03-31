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

  // Snappy spring animation for entrance
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Background Grid Animation
  const gridTranslateY = interpolate(frame, [0, 68], [0, 50]);
  const gridOpacity = interpolate(frame, [0, 15], [0, 0.2]);

  // Text Animation
  const textScale = interpolate(entrance, [0, 1], [0.8, 1]);
  const textOpacity = interpolate(frame, [0, 10], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Dynamic Background Grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(#3B82F6 1px, transparent 1px),
            linear-gradient(90deg, #3B82F6 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `translateY(${gridTranslateY}px) perspective(1000px) rotateX(60deg)`,
          transformOrigin: 'center top',
        }}
      />

      {/* Main Kinetic Typography */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 10%',
        }}
      >
        <div
          style={{
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              color: '#3B82F6',
              fontSize: '40px',
              fontFamily: 'JetBrains Mono',
              fontWeight: 800,
              letterSpacing: '0.2em',
              marginBottom: '20px',
            }}
          >
            PARADIGM SHIFT
          </span>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '80px',
              fontFamily: 'Pretendard',
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: 1.2,
              margin: 0,
              textShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            }}
          >
            웹 개발의 패러다임이<br />완전히 바뀌고 있습니다.
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
