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
  const cameraZ = interpolate(frame, [0, 502], [1, 1.2]);
  const cameraRotateX = interpolate(frame, [0, 502], [0, 10]);

  // 2. Step Animation
  const step1Opacity = interpolate(frame, [20, 50, 450, 502], [0, 1, 1, 0]);
  const step2Opacity = interpolate(frame, [60, 90, 450, 502], [0, 1, 1, 0]);
  const step3Opacity = interpolate(frame, [100, 130, 450, 502], [0, 1, 1, 0]);

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1200px) scale(${cameraZ}) rotateX(${cameraRotateX}deg)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Workflow Title */}
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
          PRACTICAL<br />
          <span style={{ fontSize: 30, color: THEME.Primary, letterSpacing: '0.4em' }}>WORKFLOW</span>
        </div>

        {/* 3-Step Component Visualization */}
        <div
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'center',
            marginTop: '5%',
          }}
        >
          {/* Step 1 */}
          <div style={{ textAlign: 'center', opacity: step1Opacity, transform: `translateY(${interpolate(frame, [20, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)` }}>
             <div style={{ fontSize: 100, fontWeight: 900, color: THEME.Accent, marginBottom: 10 }}>01</div>
             <div style={{ fontSize: 24, letterSpacing: '0.4em', color: THEME.Text }}>PLAN</div>
             <div style={{ width: 150, height: 2, background: THEME.Accent, marginTop: 20 }} />
          </div>

          {/* Arrow */}
          <div style={{ color: THEME.Accent, fontSize: 30, opacity: 0.3 }}>&gt;</div>

          {/* Step 2 */}
          <div style={{ textAlign: 'center', opacity: step2Opacity, transform: `translateY(${interpolate(frame, [60, 90], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)` }}>
             <div style={{ fontSize: 100, fontWeight: 900, color: THEME.Primary, marginBottom: 10 }}>02</div>
             <div style={{ fontSize: 24, letterSpacing: '0.4em', color: THEME.Text }}>DRAFT</div>
             <div style={{ width: 150, height: 2, background: THEME.Primary, marginTop: 20 }} />
          </div>

          {/* Arrow */}
          <div style={{ color: THEME.Accent, fontSize: 30, opacity: 0.3 }}>&gt;</div>

          {/* Step 3 */}
          <div style={{ textAlign: 'center', opacity: step3Opacity, transform: `translateY(${interpolate(frame, [100, 130], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)` }}>
             <div style={{ fontSize: 100, fontWeight: 900, color: THEME.Accent, marginBottom: 10 }}>03</div>
             <div style={{ fontSize: 24, letterSpacing: '0.4em', color: THEME.Text }}>OPTIMIZE</div>
             <div style={{ width: 150, height: 2, background: THEME.Accent, marginTop: 20 }} />
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
            opacity: 0.5,
          }}
        >
          REDEFINING TEAM COLLABORATION
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="이렇게 강력한 AI 툴을 성공적으로 도입하려면 어떻게 해야 할까요?\n체계적인 3단계 실전 워크플로우를 제안합니다." />
    </CinematicLayout>
  );
};
