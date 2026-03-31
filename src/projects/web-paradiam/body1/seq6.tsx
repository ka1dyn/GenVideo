import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sideSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Left: Repetitive Tasks Down */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1E293B',
          opacity: interpolate(sideSpring, [0, 1], [0, 1]),
          transform: `translateX(${(1 - sideSpring) * -200}px)`,
        }}
      >
        <div style={{ fontSize: 60, color: '#FF3366', fontWeight: 900 }}>단순 반복</div>
        <div style={{ fontSize: 120, color: '#FF3366', fontWeight: 900 }}>-80%</div>
        <div style={{ fontSize: 200, marginTop: 20 }}>📉</div>
      </div>

      {/* Right: Creative Tasks Up */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0F172A',
          opacity: interpolate(sideSpring, [0, 1], [0, 1]),
          transform: `translateX(${(1 - sideSpring) * 200}px)`,
        }}
      >
        <div style={{ fontSize: 60, color: '#22D3EE', fontWeight: 900 }}>창의적 설계</div>
        <div style={{ fontSize: 120, color: '#22D3EE', fontWeight: 900 }}>3배 증가</div>
        <div style={{ fontSize: 200, marginTop: 20 }}>💡</div>
      </div>

      {/* Subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          단순 반복 작업에 쏟는 시간은 80% 감소한 반면,{"\n"}
          창의적인 아키텍처 설계와 비즈니스 로직 고민에 쏟는 시간은 3배 이상 늘어났습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
