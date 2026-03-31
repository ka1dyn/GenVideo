import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq1: React.FC = () => {
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
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 800,
          height: 400,
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: 30,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 50,
          opacity: revealSpring,
          transform: `scale(${interpolate(revealSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        <div style={{ color: '#22D3EE', fontSize: 30, fontWeight: 600, marginBottom: 20 }}>도입 전략</div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          우리 팀에 AI를 어떻게 <br /> 성공적으로 도입할까요?
        </div>
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
          이렇게 강력한 AI 툴을 우리 팀에 성공적으로 도입하려면 어떻게 해야 할까요?
        </div>
      </div>
    </AbsoluteFill>
  );
};
