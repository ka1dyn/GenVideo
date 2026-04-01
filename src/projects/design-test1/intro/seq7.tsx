import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 거친 카메라 흔들림(Shake) 효과
  const shakeX = Math.sin(frame * 0.5) * interpolate(frame, [0, 15], [20, 0], { extrapolateRight: 'clamp' });
  const shakeY = Math.cos(frame * 0.7) * interpolate(frame, [0, 15], [20, 0], { extrapolateRight: 'clamp' });

  // 스케일 등장
  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${scale})`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#0071E3',
            fontSize: '130px',
            fontWeight: 900,
            fontFamily: 'Inter, Pretendard, sans-serif',
            lineHeight: 1.0,
            letterSpacing: '-2px',
          }}
        >
          REDEFINE
          <br />
          <span style={{ color: '#000000', fontSize: '150px' }}>AGILE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
