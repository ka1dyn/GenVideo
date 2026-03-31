import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revealSpring = spring({
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
        padding: 60,
      }}
    >
      {/* Quote Marks */}
      <div
        style={{
          fontSize: 300,
          color: '#334155',
          position: 'absolute',
          top: 100,
          left: 100,
          fontFamily: 'serif',
          opacity: 0.3,
        }}
      >
        “
      </div>

      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.2,
          opacity: revealSpring,
          transform: `translateY(${interpolate(revealSpring, [0, 1], [50, 0])}px)`,
        }}
      >
        “미래의 코딩은 <br />
        타이핑이 아니라 <br />
        <span style={{ color: '#22D3EE', textShadow: '0 0 30px #22D3EE' }}>대화</span>가 될 것이다.”
      </div>

      {/* Waveform Visualization (Simulated) */}
      <div style={{ display: 'flex', gap: 10, marginTop: 100, height: 100, alignItems: 'center' }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const height = interpolate(Math.sin(frame / 5 + i), [-1, 1], [20, 80]);
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: revealSpring * height,
                backgroundColor: '#A855F7',
                borderRadius: 4,
              }}
            />
          );
        })}
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
          "미래의 코딩은 타이핑이 아니라 대화가 될 것이다."
        </div>
      </div>
    </AbsoluteFill>
  );
};
