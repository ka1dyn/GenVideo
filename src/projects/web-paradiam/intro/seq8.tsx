import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq8: React.FC = () => {
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
      {/* Background Speed Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 500,
            height: 2,
            backgroundColor: '#334155',
            left: -500 + interpolate(frame, [0, 30], [0, 2000]),
            top: i * 50,
            opacity: 0.2,
          }}
        />
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50, zIndex: 10 }}>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: '#FF3366',
            transform: `translateX(${interpolate(speedSpring, [0, 1], [-1000, 0])}px)`,
            textShadow: '0 0 30px #FF3366',
          }}
        >
          더 빠른 실패
        </div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: '#22D3EE',
            transform: `translateX(${interpolate(speedSpring, [0, 1], [1000, 0])}px)`,
            textShadow: '0 0 30px #22D3EE',
          }}
        >
          더 빠른 혁신
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
          우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
