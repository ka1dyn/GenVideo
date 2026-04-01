import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 좌우 스플릿 화면.
  // 왼쪽에서 오른쪽으로 슬라이드 인
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  const translateX = interpolate(slideIn, [0, 1], [100, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFFFFF',
        transform: `translateX(${translateX}%)`,
        flexDirection: 'row',
      }}
    >
      {/* Left: SKETCH / PROMPT */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '70px',
            fontFamily: 'SF Pro Display, sans-serif',
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: '#86868B' }}>from </span>SKETCH
          <br />
          <span style={{ color: '#86868B' }}>or </span>PROMPT
        </div>
      </div>

      {/* Right: PROTOTYPE */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            width: '80%',
            height: '60%',
            border: '8px solid #000000',
            borderRadius: '40px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
            transform: `scale(${interpolate(frame, [30, 45], [0.8, 1], { extrapolateRight: 'clamp' })})`,
            opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: 'clamp' }),
          }}
        >
          <div style={{ height: '60px', borderBottom: '4px solid #000', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#000' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '50px', fontWeight: 900, color: '#0071E3' }}>PROTOTYPE</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
