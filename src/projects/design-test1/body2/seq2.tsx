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
  const { fps, width } = useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraRotateY = interpolate(frame, [0, 430], [5, -5]);
  const cameraZ = interpolate(frame, [0, 430], [1.1, 1.2]);

  // 2. Laser Scanner Animation
  const scannerX = interpolate(frame % 100, [0, 100], [-300, width + 300]);
  
  // 3. 90% Counter Animation
  const countSpring = spring({ frame: frame - 40, fps, config: { damping: 12 } });
  const count = interpolate(countSpring, [0, 1], [0, 90]);

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
        {/* Stability Title */}
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
          SERVICE<br />
          <span style={{ fontSize: 30, color: THEME.Primary, letterSpacing: '0.4em' }}>STABILITY</span>
        </div>

        {/* Bug Scanning Visualization */}
        <div style={{ position: 'relative', width: 800, height: 400, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
           {/* 'BUG' text being scanned */}
           <div style={{ position: 'absolute', top: 50, left: 100, color: '#f00', fontSize: 20, opacity: scannerX > 100 ? 0 : 0.5 }}>[ERROR: NULL_POINTER]</div>
           <div style={{ position: 'absolute', top: 150, left: 200, color: THEME.Accent, fontSize: 24, fontWeight: 800, opacity: scannerX > 200 ? 1 : 0 }}>FIXED: TYPE_SAFE_AUTO</div>
           <div style={{ position: 'absolute', top: 250, left: 150, color: '#f00', fontSize: 20, opacity: scannerX > 150 ? 0 : 0.5 }}>[BUG: MEMORY_LEAK]</div>

           {/* Laser Line */}
           <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: scannerX,
              width: 2,
              background: THEME.Accent,
              boxShadow: `0 0 20px ${THEME.Accent}`,
            }}
           />
        </div>

        {/* Big 90% Stat */}
        <div
          style={{
             marginTop: 50,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             opacity: interpolate(frame, [0, 20, 400, 430], [0, 1, 1, 0]),
          }}
        >
          <div style={{ fontSize: 120, fontWeight: 900, color: THEME.Primary, textShadow: `0 0 30px rgba(245, 158, 11, 0.3)` }}>
            {Math.floor(count)}%
          </div>
          <div style={{ color: THEME.Text, fontSize: 24, letterSpacing: '0.4em', opacity: 0.6 }}>ERROR REDUCTION</div>
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="버그 발생률도 눈에 띄게 줄었습니다. 배포 전 오류의 90% 이상을 차단하여\n서비스 안정성을 크게 높여주고 있습니다." />
    </CinematicLayout>
  );
};
