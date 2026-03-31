import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const countProgress = interpolate(frame, [30, 90], [0, 55], {
    extrapolateRight: 'clamp',
  });

  const popSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12 },
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
        개발 생산성 향상
      </div>
      <div
        style={{
          fontSize: 250,
          fontWeight: 900,
          color: '#22D3EE',
          transform: `scale(${interpolate(popSpring, [0, 1], [0.5, 1])})`,
          textShadow: '0 0 50px rgba(34, 211, 238, 0.5)',
        }}
      >
        {Math.floor(countProgress)}%
      </div>
      
      {/* Upward Arrow */}
      <div
        style={{
          fontSize: 100,
          color: '#10B981',
          opacity: frame > 100 ? 1 : 0,
          transform: `translateY(${interpolate(frame, [100, 120], [20, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        ▲
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
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          실제로 최근 한 연구에 따르면,{"\n"}
          AI 코딩 어시스턴트를 도입한 조직의 개발 생산성은 무려 55%나 향상되었습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
