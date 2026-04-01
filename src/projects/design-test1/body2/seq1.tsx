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
  const { width } = useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraRotateZ = interpolate(frame, [0, 436], [-2, 2]);
  const cameraZ = interpolate(frame, [0, 436], [1.0, 1.1]);

  // 2. Light Divider Animation (Light Saber)
  const dividerX = interpolate(frame, [0, 436], [0, width]);
  const dividerOpacity = interpolate(frame, [0, 20, 400, 436], [0, 1, 1, 0]);

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `scale(${cameraZ}) rotate(${cameraRotateZ}deg)`,
        }}
      >
        {/* Past Section (Left) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'grayscale(100%)',
          }}
        >
          <div style={{ textAlign: 'center', opacity: 0.4 }}>
             <div style={{ fontSize: 30, letterSpacing: '0.6em', color: '#fff' }}>PAST</div>
             <div style={{ fontSize: 60, fontWeight: 800, color: '#fff' }}>MANUAL<br />TYPING</div>
             <div style={{ width: 100, height: 2, background: '#fff', marginTop: 30, margin: '30px auto' }} />
          </div>
        </div>

        {/* Present Section (Right) */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: 30, letterSpacing: '0.6em', color: THEME.Primary }}>PRESENT</div>
             <div style={{ fontSize: 60, fontWeight: 900, color: THEME.Primary }}>AI<br />REVIEW</div>
             <div style={{ 
               padding: '10px 20px', 
               border: `2px solid ${THEME.Accent}`, 
               color: THEME.Accent, 
               fontSize: 20, 
               fontWeight: 800, 
               marginTop: 30,
               boxShadow: `0 0 20px ${THEME.Accent}`,
               transform: `scale(${interpolate(frame % 40, [0, 20, 40], [1, 1.1, 1])})`,
             }}>
               APPROVED
             </div>
          </div>
        </div>

        {/* Cinematic Divider (Light Effect) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 4,
            background: THEME.Primary,
            boxShadow: `0 0 30px ${THEME.Primary}`,
            opacity: dividerOpacity,
          }}
        />
        
        {/* Subtle Lens Flare that moves across */}
        <div
          style={{
            position: 'absolute',
            left: dividerX - 250,
            top: '30%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${THEME.Primary}11 0%, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: interpolate(frame, [0, 100, 300, 436], [0, 0.4, 0.4, 0]),
          }}
        />
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="수동으로 타이핑하며 밤을 새우던 작업들이,\n이제는 AI 제안을 검토하고 승인하는 효율적인 프로세스로 전환되었습니다." />
    </CinematicLayout>
  );
};
