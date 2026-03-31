import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropSpring = spring({
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
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: '#22D3EE',
          marginBottom: 60,
          opacity: dropSpring,
          transform: `translateY(${interpolate(dropSpring, [0, 1], [-100, 0])}px)`,
        }}
      >
        3단계 실전 워크플로우
      </div>

      <div style={{ display: 'flex', gap: 40 }}>
        {[1, 2, 3].map((i) => {
          const stepSpring = spring({
            frame: frame - i * 15,
            fps,
          });
          return (
            <div
              key={i}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: i === 1 ? '#FF3366' : i === 2 ? '#22D3EE' : '#A855F7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 80,
                fontWeight: 900,
                color: '#FFFFFF',
                opacity: stepSpring,
                transform: `translateY(${(1 - stepSpring) * 100}px)`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              {i}
            </div>
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
          체계적이고 효율적인 3단계 실전 워크플로우를 제안합니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
