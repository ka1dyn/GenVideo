import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 스케일 변화: 0.2에서 1로 커짐
  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  // 페이드 인
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 끝무렵 로켓처럼 치솟으면서 위로 빠짐
  const translateY = interpolate(frame, [50, 68], [0, -1000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          color: '#FFFFFF',
          fontSize: '120px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display, Inter, Pretendard, sans-serif',
          textAlign: 'center',
          letterSpacing: '-2px',
        }}
      >
        PARADIGM
        <br />
        <span style={{ color: '#0071E3' }}>SHIFT</span>
      </div>
    </AbsoluteFill>
  );
};
