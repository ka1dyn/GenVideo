import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const complexitySpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

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
      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#334155',
              borderRadius: 10,
              transform: `rotate(${frame * (i + 1)}deg)`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          opacity: complexitySpring,
          transform: `scale(${complexitySpring})`,
        }}
      >
        복잡한 로직도? <br />
        <span style={{ color: '#22D3EE' }}>문제없습니다!</span>
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
          단순한 마크업을 넘어 복잡한 로직도 문제없습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
