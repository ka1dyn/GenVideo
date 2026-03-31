import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1E293B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: '#F43F5E',
          marginBottom: 30,
        }}
      >
        막연한 우려
      </div>
      <div style={{ fontSize: 40, color: '#94A3B8', textAlign: 'center' }}>
        "AI가 개발자를 대체할까요?"
      </div>
      
      <div style={{ marginTop: 100, display: 'flex', gap: 20 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#334155',
              transform: `translateY(${Math.sin(frame / 10 + i) * 30}px)`,
            }}
          />
        ))}
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
          일각에서는 AI가 개발자의 일자리를 대체할 것이라는 막연한 우려도 있습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
