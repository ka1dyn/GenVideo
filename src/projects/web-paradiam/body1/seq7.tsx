import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const splitProgress = spring({
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
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' }}>
        {/* BEFORE AI */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#1E293B',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 80,
            fontWeight: 900,
            color: '#64748B',
            transform: `translateX(${(1 - splitProgress) * -500}px)`,
          }}
        >
          AI 도입 전
        </div>

        {/* VS */}
        <div
          style={{
            width: 200,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 120,
            fontWeight: 900,
            color: '#FF3366',
            opacity: splitProgress,
            transform: `scale(${interpolate(splitProgress, [0, 1], [0.5, 1])})`,
          }}
        >
          VS
        </div>

        {/* AFTER AI */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0F172A',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 80,
            fontWeight: 900,
            color: '#22D3EE',
            transform: `translateX(${(1 - splitProgress) * 500}px)`,
          }}
        >
          AI 도입 후
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
          AI 도입 전과 후를 비교해 볼까요?
        </div>
      </div>
    </AbsoluteFill>
  );
};
