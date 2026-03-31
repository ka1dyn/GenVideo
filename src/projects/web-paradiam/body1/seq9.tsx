import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();

  const shake = interpolate(frame % 2, [0, 1], [-5, 5]);

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
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: '#FF3366',
          marginBottom: 50,
          transform: frame < 60 ? `translateX(${shake}px)` : 'none',
        }}
      >
        버그 발생률 급감
      </div>

      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center', width: '80%' }}>
        {Array.from({ length: 15 }).map((_, i) => {
          const bugStart = i * 2;
          const bugExplode = 40 + i * 3;
          
          if (frame > bugExplode) return null;

          return (
            <div
              key={i}
              style={{
                fontSize: 60,
                opacity: interpolate(frame, [0, Math.max(1, bugStart)], [0, 1]),
                transform: frame > bugExplode - 5 ? 'scale(1.5)' : 'scale(1)',
              }}
            >
              🐞
            </div>
          );
        })}
        {frame > 85 && (
          <div
            style={{
              fontSize: 120,
              color: '#22D3EE',
              fontWeight: 900,
              transform: `scale(${interpolate(frame, [85, 100], [0.5, 1], { extrapolateRight: 'clamp' })})`,
            }}
          >
            클린 코드
          </div>
        )}
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
          }}
        >
          버그 발생률 또한 눈에 띄게 줄었습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
