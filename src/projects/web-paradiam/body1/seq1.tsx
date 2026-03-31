import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomSpring = spring({
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
      }}
    >
      {/* Background Graphic (Office Desk Simulation) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1E293B',
          opacity: 0.5,
          filter: 'blur(10px)',
          position: 'absolute',
        }}
      />

      <div
        style={{
          transform: `scale(${interpolate(zoomSpring, [0, 1], [0.8, 1])})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 150,
            color: '#22D3EE',
            textShadow: '0 0 30px #22D3EE',
          }}
        >
          ?
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          실제 현장에서는 어떤 변화가 있을까요?
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
          그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?
        </div>
      </div>
    </AbsoluteFill>
  );
};
