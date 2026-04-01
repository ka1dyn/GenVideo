import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Continuous Drift
  const scale = interpolate(frame, [0, 458], [1.2, 1.0], { extrapolateRight: 'clamp' });
  const cameraZ = interpolate(frame, [0, 458], [0, -100]);

  // 2. Glowing Cursor Animation
  const cursorOpacity = interpolate(frame % 30, [0, 15, 30], [0.1, 1, 0.1]);
  const dialogueOpacity = interpolate(frame, [20, 60, 400, 458], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 3. Bokeh Particles (Out of focus circles)
  const bokehNodes = Array.from({ length: 12 }).map((_, i) => {
    const startX = (i * 247) % width;
    const startY = (i * 531) % height;
    const bScale = interpolate(frame, [0, 458], [1, 2], { extrapolateRight: 'clamp' });
    const bOpacity = interpolate(frame, [0, 100, 400, 458], [0, 0.2, 0.2, 0]);
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: startX,
          top: startY,
          width: 200,
          height: 200,
          background: i % 2 === 0 ? THEME.Primary : THEME.Accent,
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: bOpacity,
          transform: `scale(${bScale})`,
        }}
      />
    );
  });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateZ(${cameraZ}px)`,
          opacity: dialogueOpacity,
        }}
      >
        {/* Background Bokeh */}
        {bokehNodes}

        {/* Central Dialog Title */}
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 300,
              color: THEME.Text,
              letterSpacing: '0.8em',
              textAlign: 'center',
              textShadow: `0 0 40px rgba(0,0,0,1)`,
            }}
          >
            FUTURE OF CODING IS
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: THEME.Primary,
              letterSpacing: '0.2em',
              textAlign: 'center',
              textShadow: `0 0 50px rgba(245, 158, 11, 0.4)`,
              marginTop: 20,
            }}
          >
            DIALOGUE
          </div>

          {/* Glowing Cursor */}
          <div
            style={{
              marginTop: 60,
              width: 100,
              height: 4,
              backgroundColor: THEME.Primary,
              opacity: cursorOpacity,
              boxShadow: `0 0 20px ${THEME.Primary}`,
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.\n미래의 코딩은 타이핑이 아니라 대화가 될 것입니다." />
    </CinematicLayout>
  );
};
