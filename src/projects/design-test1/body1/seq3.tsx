import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraRotateY = interpolate(frame, [0, 511], [-5, 5]);
  const cameraZ = interpolate(frame, [0, 511], [1.1, 1.0]);

  // 2. Donut Chart Animations
  const chartSpring = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  
  // Repetitive (80% reduction)

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) rotateY(${cameraRotateY}deg) scale(${cameraZ})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Workload Title */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            fontSize: 70,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.6em',
            textAlign: 'center',
          }}
        >
          WORKLOAD<br />
          <span style={{ fontSize: 30, color: THEME.Accent, letterSpacing: '0.4em' }}>DISTRIBUTION</span>
        </div>

        {/* 2-Column Insight Visualization */}
        <div
          style={{
            display: 'flex',
            gap: 120,
            alignItems: 'center',
            marginTop: '5%',
          }}
        >
          {/* Repetitive Task Column */}
          <div style={{ textAlign: 'center', opacity: interpolate(frame, [0, 20], [0, 1]) }}>
             <div style={{ fontSize: 24, color: '#94a3b8', marginBottom: 20 }}>REPETITIVE</div>
             <div style={{ 
               width: 250, 
               height: 250, 
               borderRadius: '50%', 
               border: '10px solid rgba(255,255,255,0.1)',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative'
             }}>
               <div style={{ fontSize: 60, fontWeight: 800, color: '#94a3b8' }}>-80%</div>
               <div style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, border: '10px solid #94a3b8', borderRadius: '50%', clipPath: `inset(0 ${interpolate(chartSpring, [0, 1], [0, 80])}% 0 0)` }} />
             </div>
          </div>

          {/* Creative Work Column */}
          <div style={{ textAlign: 'center', opacity: interpolate(frame, [40, 60], [0, 1]) }}>
             <div style={{ fontSize: 24, color: THEME.Primary, marginBottom: 20 }}>CREATIVE</div>
             <div style={{ 
               width: 250, 
               height: 250, 
               borderRadius: '50%', 
               border: `10px solid rgba(245, 158, 11, 0.1)`,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               position: 'relative',
               boxShadow: `0 0 30px rgba(245, 158, 11, 0.1)`,
               transform: `scale(${interpolate(chartSpring, [0, 1], [0.8, 1.2])})`,
             }}>
               <div style={{ fontSize: 60, fontWeight: 900, color: THEME.Primary }}>3X UP</div>
               <div style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, border: `10px solid ${THEME.Primary}`, borderRadius: '50%' }} />
             </div>
          </div>
        </div>

        {/* Global Insight Highlight */}
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            color: THEME.Text,
            fontSize: 20,
            letterSpacing: '0.4em',
            opacity: interpolate(frame, [450, 511], [0.6, 0]),
          }}
        >
          FROM TYPING TO ARCHITECTURE
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="단순 반복 작업은 80% 감소한 반면,\n창의적인 설계와 로직 고민 시간은 3배 이상 늘어났습니다." />
    </CinematicLayout>
  );
};
