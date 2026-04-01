import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Subtitle } from '../components/Subtitle';
import { CinematicLayout } from '../components/CinematicLayout';

const THEME = {
  Primary: '#F59E0B', // Gold
  Accent: '#0D9488', // Teal
  Text: '#F8FAFC',
};

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraRotateX = interpolate(frame, [0, 484], [10, 0]);
  const cameraZ = interpolate(frame, [0, 484], [1, 1.1]);

  // 2. Bar Chart Animations
  const countSpring = spring({ frame: frame - 40, fps, config: { stiffness: 60 } });
  
  const count = interpolate(countSpring, [0, 1], [0, 55]);
  const barAfterHeight = interpolate(countSpring, [0, 1], [300, 465]); // 1.55x increase

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
        {/* Productivity Title */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            fontSize: 70,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.6em',
            textAlign: 'center',
            textShadow: `0 0 40px rgba(0,0,0,1)`,
          }}
        >
          PRODUCTIVITY<br />
          <span style={{ fontSize: 30, color: THEME.Accent, letterSpacing: '0.4em', opacity: 0.8 }}>EVOLUTION</span>
        </div>

        {/* Bar Chart Visualization */}
        <div
          style={{
            display: 'flex',
            gap: 100,
            alignItems: 'flex-end',
            marginBottom: '10%',
          }}
        >
          {/* Before AI Bar */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: 300, width: 120, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative' }}>
               <div style={{ position: 'absolute', bottom: -40, left: 0, right: 0, color: '#fff', fontSize: 16 }}>BEFORE AI</div>
            </div>
            <div style={{ color: '#fff', fontSize: 24, marginTop: 10 }}>100%</div>
          </div>

          {/* After AI Bar */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              height: barAfterHeight, 
              width: 120, 
              background: `linear-gradient(to top, rgba(245, 158, 11, 0.4), ${THEME.Primary})`, 
              boxShadow: `0 0 30px rgba(245, 158, 11, 0.3)`,
              position: 'relative' 
            }}>
               <div style={{ position: 'absolute', bottom: -40, left: 0, right: 0, color: THEME.Primary, fontSize: 16, fontWeight: 800 }}>AFTER AI</div>
               {/* 55% Accent Label */}
               <div style={{ position: 'absolute', top: -60, left: -40, right: -40, fontSize: 60, fontWeight: 900, color: THEME.Primary }}>
                 +{Math.floor(count)}%
               </div>
            </div>
          </div>
        </div>

        {/* Global Stats Highlight */}
        <div
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '20%',
            padding: '20px',
            borderRight: `4px solid ${THEME.Primary}`,
            textAlign: 'right',
            opacity: interpolate(frame, [100, 130, 450, 484], [0, 1, 1, 0]),
          }}
        >
          <div style={{ color: THEME.Primary, fontSize: 40, fontWeight: 800 }}>55% UP</div>
          <div style={{ color: THEME.Text, fontSize: 16, letterSpacing: '0.2em' }}>AVERAGE PRODUCTIVITY GAIN</div>
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="최근 연구에 따르면, AI 어시스턴트를 도입한 조직의 생산성은\n무려 55%나 향상되었습니다." />
    </CinematicLayout>
  );
};
