import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
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

  // 1. Continuous Drift
  const scale = interpolate(frame, [0, 426], [1.08, 1.0], { extrapolateRight: 'clamp' });
  const cameraRotate = interpolate(frame, [0, 426], [1, -1]);

  // 2. Split Screen Animation
  const splitOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 3. Scanline Animation
  const scanLineY = interpolate(frame % 100, [0, 100], [-100, 1180]);

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) rotate(${cameraRotate}deg)`,
          opacity: splitOpacity,
        }}
      >
        {/* Left Side: Design (Conceptual) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            height: '100%',
            borderRight: `2px solid ${THEME.Accent}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(13, 148, 136, 0.05)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: THEME.Text, opacity: 0.5, fontSize: 30, letterSpacing: '0.4em' }}>DESIGN</div>
            <div style={{ 
              fontSize: 80, 
              color: THEME.Accent, 
              fontWeight: 800, 
              marginTop: 20,
              filter: `blur(${interpolate(frame, [0, 100], [10, 0])}px)`,
            }}>
              SKETCH
            </div>
            {/* Conceptual UI lines */}
            <div style={{ width: 200, height: 4, backgroundColor: THEME.Accent, marginTop: 40, opacity: 0.3 }} />
            <div style={{ width: 150, height: 4, backgroundColor: THEME.Accent, marginTop: 10, opacity: 0.2 }} />
          </div>
        </div>

        {/* Right Side: Development */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(2, 6, 23, 0.5)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: THEME.Text, opacity: 0.5, fontSize: 30, letterSpacing: '0.4em' }}>DEVELOPMENT</div>
            <div style={{ fontSize: 80, color: THEME.Primary, fontWeight: 800, marginTop: 20 }}>
              CODE
            </div>
            {/* Conceptual Code lines */}
            <div style={{ 
              width: 250, 
              height: 2, 
              backgroundColor: THEME.Primary, 
              marginTop: 40, 
              opacity: interpolate(frame % 20, [0, 10, 20], [0.1, 0.8, 0.1]) 
            }} />
            <div style={{ width: 180, height: 2, backgroundColor: THEME.Primary, marginTop: 15, opacity: 0.3 }} />
          </div>
        </div>

        {/* Scanline Overlay */}
        <div
          style={{
            position: 'absolute',
            top: scanLineY,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(to right, transparent, ${THEME.Accent}, transparent)`,
            opacity: 0.4,
            boxShadow: `0 0 20px ${THEME.Accent}`,
          }}
        />

        {/* Center Text: Bottleneck Dissolving */}
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: THEME.Text,
              letterSpacing: '0.8em',
              textShadow: '0 0 30px rgba(0,0,0,1)',
              opacity: interpolate(frame, [100, 150, 300, 350], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              transform: `translateY(${interpolate(frame, [100, 350], [20, -20])}px)`,
            }}
          >
            BOTTLE NECK
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.\n디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다." />
    </CinematicLayout>
  );
};
