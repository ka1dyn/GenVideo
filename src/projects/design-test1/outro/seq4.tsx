import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraZ = interpolate(frame, [0, 425], [1.0, 1.4]);
  const cameraRotateY = interpolate(frame, [0, 425], [0, 10]);

  // 2. Final Message Animation
  const messageOpacity = interpolate(frame, [0, 50, 375, 425], [0, 1, 1, 0]);

  // 3. Bokeh Finale Particles
  const bokehCount = 20;
  const bokehNodes = Array.from({ length: bokehCount }).map((_, i) => {
    const x = (i * 321) % width;
    const y = (i * 211) % height;
    const bOpacity = interpolate(frame, [0, 100, 350, 425], [0, 0.3, 0.3, 0]);
    const bScale = interpolate(frame, [0, 425], [1, 2]);
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x - 100,
          top: y - 100,
          width: 200,
          height: 200,
          background: i % 2 === 0 ? THEME.Primary : THEME.Accent,
          borderRadius: '50%',
          filter: 'blur(60px)',
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
          transform: `perspective(1000px) rotateY(${cameraRotateY}deg) scale(${cameraZ})`,
          opacity: messageOpacity,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Bokeh */}
        {bokehNodes}

        {/* Finale Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.4em',
            textAlign: 'center',
            textShadow: `0 0 40px rgba(0,0,0,1)`,
          }}
        >
          THE POWER OF<br />
          <span style={{ fontSize: 90, fontWeight: 900, color: THEME.Primary, letterSpacing: '0.2em' }}>PRODUCT MINDSET</span>
        </div>

        {/* Imagine & Create Finale */}
        <div
          style={{
             marginTop: 60,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             opacity: interpolate(frame, [150, 180, 425], [0, 1, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div style={{ color: THEME.Accent, fontSize: 32, letterSpacing: '0.8em', fontWeight: 300 }}>IMAGINE & CREATE</div>
          <div style={{ width: 300, height: 2, background: THEME.Primary, marginTop: 20, boxShadow: `0 0 20px ${THEME.Primary}` }} />
        </div>

        {/* Closing Logo (Conceptual) */}
        <div
          style={{
             position: 'absolute',
             bottom: '20%',
             fontSize: 14,
             color: THEME.Text,
             letterSpacing: '0.1em',
             opacity: 0.3,
          }}
        >
          REDEFINING WEB DEVELOPMENT WITH AI
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="앞으로는 창의적인 문제 해결에 집중하는 프로덕트 마인드가 중요해질 것입니다.\n여러분의 상상력을 코드로 현실화할 시간입니다." />
    </CinematicLayout>
  );
};
