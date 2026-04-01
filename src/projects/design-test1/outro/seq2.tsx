import React from 'react';
import { AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraZ = interpolate(frame, [0, 619], [1, 1.2]);
  const cameraRotateY = interpolate(frame, [0, 619], [5, -5]);

  // 2. Prompt Engineering Title
  const promptOpacity = interpolate(frame, [20, 50, 569, 619], [0, 1, 1, 0]);

  // 3. Code Generation Visuals
  const codeLines = Array.from({ length: 10 }).map((_, i) => {
    const lineX = interpolate(frame, [i * 10, i * 10 + 60], [-500, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    const lineOpacity = interpolate(frame, [i * 10, i * 10 + 30], [0, 0.2], { extrapolateRight: 'clamp' });
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 100,
          top: 100 + i * 40,
          width: 400 + random(i) * 200,
          height: 15,
          background: THEME.Accent,
          opacity: lineOpacity,
          transform: `translateX(${lineX}px)`,
        }}
      />
    );
  });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) rotateY(${cameraRotateY}deg) scale(${cameraZ})`,
          opacity: promptOpacity,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Prompt Engineering Title */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            fontSize: 70,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.6em',
            textAlign: 'center',
            textShadow: `0 0 40px rgba(0,0,0,1)`,
          }}
        >
          PROMPT<br />
          <span style={{ fontSize: 30, color: THEME.Primary, letterSpacing: '0.4em' }}>ENGINEERING</span>
        </div>

        {/* Code Block Container */}
        <div
          style={{
            width: 800,
            height: 400,
            borderLeft: `4px solid ${THEME.Primary}`,
            background: 'rgba(0,0,0,0.5)',
            position: 'relative',
            marginTop: '10%',
            padding: '20px',
            overflow: 'hidden',
          }}
        >
           {/* 'TEST SUITE' Highlight */}
           <div
            style={{
               position: 'absolute',
               top: 20,
               right: 20,
               padding: '10px 30px',
               border: `2px solid ${THEME.Primary}`,
               color: THEME.Primary,
               fontWeight: 900,
               letterSpacing: '0.3em',
               opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' }),
               boxShadow: `0 0 20px ${THEME.Primary}`,
            }}
           >
             PERFECT TEST SUITE
           </div>
           {/* Animated Code lines */}
           {codeLines}
        </div>

        {/* Cinematic Particles */}
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            fontSize: 18,
            color: THEME.Accent,
            letterSpacing: '0.4em',
            opacity: 0.4,
          }}
        >
          CONSTRUCTING ARCHITECTURE...
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="단순 마크업을 넘어 복잡한 로직도 제약 조건을 명확히 제공하면\nAI가 원하는 형태의 코드를 오차 없이 생성해 냅니다." />
    </CinematicLayout>
  );
};
