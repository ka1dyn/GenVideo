import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const finalSpring = spring({
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
          color: '#FFFFFF',
          textAlign: 'center',
          opacity: finalSpring,
          transform: `scale(${interpolate(finalSpring, [0, 1], [0.8, 1])})`,
        }}
      >
        웹 패러다임 시프트
      </div>
      
      <div
        style={{
          marginTop: 40,
          fontSize: 30,
          color: '#94A3B8',
          opacity: finalSpring,
        }}
      >
        AI와 함께, 상상을 현실로
      </div>

      {/* Confetti (Simulated) */}
      {frame > 60 && Array.from({ length: 30 }).map((_, i) => {
        const fall = interpolate(frame - 60, [0, 100], [-100, 1000]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              backgroundColor: i % 2 === 0 ? '#22D3EE' : '#FF3366',
              left: (i * 70) % 1920,
              top: fall + (i * 20) % 500,
              opacity: 0.8,
              transform: `rotate(${frame * 10}deg)`,
            }}
          />
        );
      })}

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
            maxWidth: '80%',
          }}
        >
          한계 없는 여러분의 상상력을 완벽한 코드로 현실화할 시간입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
