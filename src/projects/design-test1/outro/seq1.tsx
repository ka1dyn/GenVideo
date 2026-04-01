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
  useVideoConfig();

  // 1. Continuous Drift - Slow Ken Burns
  const cameraRotateY = interpolate(frame, [0, 435], [-5, 5]);
  const cameraZ = interpolate(frame, [0, 435], [1.1, 1.2]);

  // 2. Step Animation
  const stepOpacity = interpolate(frame, [0, 20, 415, 435], [0, 1, 1, 0]);

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
        {/* Step Title Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            fontSize: 60,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.8em',
            opacity: 0.15,
          }}
        >
          DEVELOPMENT FLOW
        </div>

        {/* 3 Steps Visualization */}
        <div
          style={{
            display: 'flex',
            gap: 100,
            alignItems: 'center',
            opacity: stepOpacity,
          }}
        >
          {/* Step 1: Architecture */}
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: 24, fontWeight: 800, color: THEME.Accent, marginBottom: 10 }}>ARCHITECTURE</div>
             <div style={{ width: 150, height: 150, border: `2px solid ${THEME.Accent}`, background: 'rgba(13, 148, 136, 0.1)', flexShrink: 0 }} />
          </div>
          {/* Connector */}
          <div style={{ width: 50, height: 2, background: THEME.Accent }} />
          {/* Step 2: AI Draft */}
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: 24, fontWeight: 900, color: THEME.Primary, marginBottom: 10 }}>AI DRAFT</div>
             <div style={{ 
               width: 200, 
               height: 200, 
               border: `4px solid ${THEME.Primary}`, 
               background: 'rgba(245, 158, 11, 0.1)',
               boxShadow: `0 0 40px rgba(245, 158, 11, 0.2)`,
               transform: `scale(${interpolate(frame % 50, [0, 25, 50], [1, 1.05, 1])})`,
             }} />
          </div>
          {/* Connector */}
          <div style={{ width: 50, height: 2, background: THEME.Accent }} />
          {/* Step 3: Refactor */}
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: 24, fontWeight: 800, color: THEME.Accent, marginBottom: 10 }}>REFACTOR</div>
             <div style={{ width: 150, height: 150, border: `2px solid ${THEME.Accent}`, background: 'rgba(13, 148, 136, 0.1)' }} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="AI 개발 워크플로우는 설계, 빠른 초안 작성,\n그리고 디테일한 리팩토링 및 최적화의 3단계로 진행됩니다." />
    </CinematicLayout>
  );
};
