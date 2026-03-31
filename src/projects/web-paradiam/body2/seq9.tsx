import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowSpring = spring({
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
          fontSize: 60,
          fontWeight: 600,
          color: '#94A3B8',
          marginBottom: 20,
        }}
      >
        핵심 역량
      </div>
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          color: '#EAB308',
          textShadow: `0 0 ${glowSpring * 50}px rgba(234, 179, 8, 0.5)`,
          transform: `scale(${interpolate(glowSpring, [0, 1], [0.8, 1])})`,
          textAlign: 'center',
        }}
      >
        프롬프트 <br />
        엔지니어링
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
          이때 가장 중요한 핵심 기술은 바로 '프롬프트 엔지니어링'입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
