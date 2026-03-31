import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();

  const shrinkProgress = interpolate(frame, [30, 90], [1, 0.2], {
    extrapolateRight: 'clamp',
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
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          transform: `scale(${shrinkProgress})`,
          opacity: shrinkProgress,
        }}
      >
        <div style={{ width: 400, height: 40, backgroundColor: '#334155' }} />
        <div style={{ width: 600, height: 40, backgroundColor: '#334155' }} />
        <div style={{ width: 500, height: 40, backgroundColor: '#334155' }} />
        <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: 30, marginTop: 20 }}>
          보일러플레이트
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          fontSize: 100,
          fontWeight: 900,
          color: '#22D3EE',
          opacity: 1 - shrinkProgress,
          transform: `scale(${interpolate(1 - shrinkProgress, [0, 1], [0.5, 1])})`,
        }}
      >
        획기적인 효율성
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
          반복적인 보일러플레이트 작성 시간이 획기적으로 줄어든 덕분이죠.
        </div>
      </div>
    </AbsoluteFill>
  );
};
