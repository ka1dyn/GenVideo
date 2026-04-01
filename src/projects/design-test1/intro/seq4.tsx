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

  // 1. Continuous Drift
  const scale = interpolate(frame, [0, 374], [1.0, 1.2], { extrapolateRight: 'clamp' });
  const cameraX = interpolate(frame, [0, 374], [0, 50]);

  // 2. Collaborative Network Visuals
  const nodes = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2 + frame / 150;
    const x = width / 2 + Math.cos(angle) * 300;
    const y = height / 2 + Math.sin(angle) * 300;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 20,
          height: 20,
          background: THEME.Accent,
          borderRadius: '50%',
          boxShadow: `0 0 15px ${THEME.Accent}`,
          opacity: 0.6,
        }}
      />
    );
  });

  // 3. Central Title Animation
  const agileOpacity = interpolate(frame, [20, 50, 320, 374], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const agileY = interpolate(frame, [20, 374], [20, -20]);

  // 4. Highlight Phrases
  const failOpacity = interpolate(frame, [100, 130, 200, 230], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const innovateOpacity = interpolate(frame, [230, 260, 330, 360], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <CinematicLayout>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${cameraX}px)`,
          opacity: agileOpacity,
        }}
      >
        {/* Network Circles */}
        {nodes}

        {/* Central Title */}
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 900,
              color: THEME.Text,
              letterSpacing: '1.2em',
              textAlign: 'center',
              textShadow: `0 0 40px rgba(0,0,0,1)`,
              transform: `translateY(${agileY}px)`,
            }}
          >
            AGILE<br />
            REVOLUTION
          </div>

          {/* Fail Fast Highlight */}
          <div
            style={{
              marginTop: 60,
              fontSize: 36,
              color: THEME.Primary,
              fontWeight: 800,
              letterSpacing: '0.5em',
              opacity: failOpacity,
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '10px 40px',
              border: `2px solid ${THEME.Primary}`,
            }}
          >
            FAIL FAST
          </div>

          {/* Innovate Faster Highlight */}
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              color: THEME.Accent,
              fontWeight: 800,
              letterSpacing: '0.4em',
              opacity: innovateOpacity,
              background: 'rgba(13, 148, 136, 0.1)',
              padding: '10px 30px',
              border: `2px solid ${THEME.Accent}`,
            }}
          >
            INNOVATE FASTER
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Subtitles */}
      <Subtitle text="마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.\n이러한 변화는 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다." />
    </CinematicLayout>
  );
};
