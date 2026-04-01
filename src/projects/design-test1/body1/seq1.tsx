import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Continuous Drift - Fast Camera Flight
  const cameraZ = interpolate(frame, [0, 373], [1, 2.5], { extrapolateRight: 'clamp' });
  const cameraRotateY = interpolate(frame, [0, 373], [0, 15]);

  // 2. 'REAL DATA' Sliding Title
  const titleX = interpolate(frame, [0, 40], [-width, 0], { extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20, 350, 373], [0, 1, 1, 0]);

  // 3. Grid Visualization
  const gridCells = Array.from({ length: 40 }).map((_, i) => {
    const x = (i * 150) % width;
    const y = (i * 120) % height;
    const gScale = interpolate(frame, [i * 5, i * 5 + 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 80,
          height: 1,
          backgroundColor: THEME.Accent,
          opacity: 0.1 * gScale,
          transform: `scaleX(${gScale})`,
        }}
      />
    );
  });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1200px) translateZ(${interpolate(frame, [0, 373], [0, 500])}px) rotateY(${cameraRotateY}deg)`,
          opacity: titleOpacity,
        }}
      >
        {/* Background Grid */}
        <div style={{ position: 'absolute', width: '200%', height: '200%', top: '-50%', left: '-50%', transform: 'rotateX(70deg)' }}>
          {gridCells}
        </div>

        {/* Sliding Title */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '10%',
            transform: `translateX(${titleX}px)`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: THEME.Text,
              letterSpacing: '0.4em',
              textShadow: `0 0 20px ${THEME.Accent}`,
            }}
          >
            REAL DATA
          </div>
          <div
            style={{
              fontSize: 30,
              color: THEME.Accent,
              letterSpacing: '1em',
              marginTop: -10,
              opacity: 0.6,
            }}
          >
            GLOBAL RESEARCH
          </div>
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?\n막연한 기대감이 아닌, 실제 데이터를 바탕으로 AI 도입의 효과를 살펴보겠습니다." />
    </CinematicLayout>
  );
};
