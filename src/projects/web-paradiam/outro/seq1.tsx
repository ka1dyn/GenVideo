import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const speedSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Hyper-speed lines */}
      {Array.from({ length: 40 }).map((_, i) => {
        const speed = interpolate(frame, [0, 150], [0, 3000]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 2,
              height: 200,
              backgroundColor: '#22D3EE',
              opacity: 0.1,
              left: (i * 50) % 1920,
              top: (speed + i * 100) % 1080 - 200,
            }}
          />
        );
      })}

      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          transform: `scale(${interpolate(speedSpring, [0, 1], [0.5, 1.2])})`,
          textShadow: '0 0 50px rgba(255,255,255,0.5)',
        }}
      >
        기술 발전의 <br />
        기하급수적 가속화
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
          기술의 발전 속도는 우리의 예상을 뛰어넘을 정도로 점점 더 빨라지고 있습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
