import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraZ = interpolate(frame, [0, 518], [1.2, 1.0]);
  const cameraRotateX = interpolate(frame, [0, 518], [-5, 5]);

  // 2. Expanding Circles (Human Potential)
  const circleOpacity = interpolate(frame, [20, 50, 468, 518], [0, 0.4, 0.4, 0]);
  const circleScale = interpolate(frame, [20, 518], [0.8, 1.5]);

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) rotateX(${cameraRotateX}deg) scale(${cameraZ})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Potential Circles */}
        <div style={{ position: 'absolute', width: 600, height: 600, border: `2px solid ${THEME.Primary}`, borderRadius: '50%', opacity: circleOpacity, transform: `scale(${circleScale})` }} />
        <div style={{ position: 'absolute', width: 400, height: 400, border: `2px solid ${THEME.Accent}`, borderRadius: '50%', opacity: circleOpacity * 0.5, transform: `scale(${circleScale * 1.2})` }} />

        {/* Human Potential Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.6em',
            textAlign: 'center',
            textShadow: `0 0 50px rgba(0,0,0,1)`,
            zIndex: 1,
            opacity: interpolate(frame, [0, 20, 468, 518], [0, 1, 1, 0]),
          }}
        >
          HUMAN<br />
          <span style={{ fontSize: 36, color: THEME.Primary, letterSpacing: '0.4em' }}>POTENTIAL</span>
        </div>

        {/* Leverage Visual Highlight */}
        <div
          style={{
             position: 'absolute',
             bottom: '25%',
             padding: '15px 40px',
             background: 'rgba(245, 158, 11, 0.1)',
             border: `2px solid ${THEME.Primary}`,
             color: THEME.Primary,
             fontSize: 30,
             fontWeight: 800,
             letterSpacing: '0.5em',
             opacity: interpolate(frame, [100, 130, 440, 470], [0, 1, 1, 0]),
             boxShadow: `0 0 30px ${THEME.Primary}`,
          }}
        >
          AI AS A LEVERAGE
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="강력한 새로운 도구는 항상 인간의 잠재력과 한계를 확장시켜 왔습니다.\nAI는 우리를 밀어내는 경쟁자가 아닌 지렛대입니다." />
    </CinematicLayout>
  );
};
