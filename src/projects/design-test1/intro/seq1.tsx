import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Continuous Drift (Ken Burns)
  const scale = interpolate(frame, [0, 323], [1, 1.08], { extrapolateRight: 'clamp' });
  const cameraX = interpolate(frame, [0, 323], [0, -20]);

  // 2. Title Animation (Gold, Staggered)
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // 3. Particle simulation (Simulated with simple divs for immersion)
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const startX = (i * 137) % width;
    const startY = (i * 241) % height;
    const pScale = interpolate(frame, [0, 323], [0.5, 1.2], { extrapolateRight: 'clamp' });
    const pOpacity = interpolate(frame, [0, 50, 280, 323], [0, 0.4, 0.4, 0]);
    const pX = startX + Math.sin(frame / 60 + i) * 30;
    const pY = startY - frame * 0.5; // Upward drift
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: pX,
          top: pY,
          width: 2,
          height: 15,
          backgroundColor: THEME.Accent,
          opacity: pOpacity,
          transform: `scale(${pScale})`,
          boxShadow: `0 0 8px ${THEME.Accent}`,
        }}
      />
    );
  });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${cameraX}px, 0)`,
        }}
      >
        {/* Background Particles */}
        {particles}

        {/* Cinematic Title */}
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 800,
              color: THEME.Primary,
              letterSpacing: '0.2em',
              textAlign: 'center',
              textShadow: `0 0 20px rgba(245, 158, 11, 0.3)`,
              fontFamily: 'Pretendard, sans-serif',
            }}
          >
            THE NEW<br />
            PARADIGM
          </div>
          
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              color: THEME.Text,
              letterSpacing: '0.4em',
              opacity: 0.8,
            }}
          >
            WEB DEVELOPMENT REVOLUTION
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Subtitles (Animated internally by the component) */}
      <Subtitle text="웹 개발의 패러다임이 완전히 바뀌고 있습니다.\n과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만," />
    </CinematicLayout>
  );
};
