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

  // 1. Continuous Drift
  const cameraZ = interpolate(frame, [0, 370], [1, 1.15], { extrapolateRight: 'clamp' });
  const diagramRotation = interpolate(frame, [0, 370], [5, -5]);

  // 2. 3D Architecture Diagram Simulation
  const boxSpring = spring({ frame, fps, config: { damping: 12 } });
  const boxOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const boxY = interpolate(boxSpring, [0, 1], [60, 0]);

  // 3. Optimization Highlights
  const optOpacity = interpolate(frame, [150, 180, 300, 350], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const optScale = interpolate(frame, [150, 180], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `perspective(1000px) scale(${cameraZ})`,
          opacity: boxOpacity,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Architecture Title */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            fontSize: 80,
            fontWeight: 800,
            color: THEME.Text,
            letterSpacing: '0.6em',
            opacity: 0.2,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          ARCHITECTURE
        </div>

        {/* 3D Diagram (Conceptual) */}
        <div
          style={{
            width: 800,
            height: 400,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            transform: `rotateX(40deg) rotateY(${diagramRotation}deg) translateY(${boxY}px)`,
          }}
        >
          {/* Node 1 */}
          <div style={{ width: 150, height: 100, border: `2px solid ${THEME.Accent}`, background: 'rgba(13, 148, 136, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: THEME.Accent, fontSize: 16 }}>DATABASE</div>
          </div>
          {/* Connector */}
          <div style={{ width: 100, height: 2, background: THEME.Accent }} />
          {/* Node 2 (Center) */}
          <div style={{ width: 250, height: 150, border: `3px solid ${THEME.Primary}`, background: 'rgba(245, 158, 11, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ color: THEME.Primary, fontSize: 18, fontWeight: 700 }}>CORE ENGINE</div>
            {/* Optimization Glow */}
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                padding: '4px 8px',
                background: THEME.Primary,
                color: '#000',
                fontSize: 14,
                fontWeight: 800,
                opacity: optOpacity,
                transform: `scale(${optScale})`,
              }}
            >
              OPTIMIZED
            </div>
          </div>
          {/* Connector */}
          <div style={{ width: 100, height: 2, background: THEME.Accent }} />
          {/* Node 3 */}
          <div style={{ width: 150, height: 100, border: `2px solid ${THEME.Accent}`, background: 'rgba(13, 148, 136, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ color: THEME.Accent, fontSize: 16 }}>CLIENT UI</div>
          </div>
        </div>

        {/* Floating Code Snippets */}
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '15%',
            color: THEME.Accent,
            fontFamily: 'JetBrains Mono',
            fontSize: 14,
            opacity: 0.3,
            transform: 'rotate(-5deg)',
          }}
        >
          {`{ architecture: "Distributed",\n  loadBalancer: true,\n  cache: "Redis" }`}
        </div>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="단순히 코드를 짜주는 것을 넘어,\n시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다." />
    </CinematicLayout>
  );
};
