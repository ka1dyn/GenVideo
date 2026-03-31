import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introSpring = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const blur = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(introSpring, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          filter: `blur(${blur}px)`,
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        <span style={{ color: '#22D3EE' }}>웹 개발 패러다임</span>의 전환
      </div>

      {/* Subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
          padding: '0 50px',
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: 10,
          }}
        >
          웹 개발의 패러다임이 완전히 바뀌고 있습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
