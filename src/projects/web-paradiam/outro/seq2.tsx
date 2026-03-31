import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();

  const wave = Math.sin(frame / 10) * 20;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', width: 400, height: 400 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '2px solid #22D3EE',
              borderRadius: '50%',
              opacity: 0.3,
              transform: `scale(${interpolate(frame, [0, 150], [0.5 + i * 0.2, 1.5 + i * 0.2])})`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '35%',
            fontSize: 150,
            color: '#FFFFFF',
            transform: `translateY(${wave}px)`,
          }}
        >
          ?
        </div>
      </div>

      <div style={{ marginTop: 50, fontSize: 40, fontWeight: 700, color: '#94A3B8' }}>
        2025년에는 어떤 미래가?
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
          당장 내년에는 또 어떤 혁신적인 도구가 등장하여{"\n"}
          우리의 일하는 방식을 바꿀까요?
        </div>
      </div>
    </AbsoluteFill>
  );
};
