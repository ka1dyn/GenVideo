import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 대각선 트랜지션 로직: 0~30프레임에서 블랙 배경(과거)에서 화이트로 전환
  const maskProgress = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 100 },
  });

  // 자간 모션 (AI PAIR PROGRAMMER)
  const letterSpacing = interpolate(frame, [30, 250], [20, -2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacityOut = interpolate(frame, [230, 256], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden', opacity: opacityOut }}>
      {/* 바닥 베이스 (블랙) */}
      <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#333336', fontSize: '100px', fontWeight: 700, fontFamily: 'monospace' }}>
          MANUAL BUILD
        </div>
      </AbsoluteFill>

      {/* 덮어씌워지는 화이트 영역 (대각선 마스킹) */}
      <AbsoluteFill
        style={{
          backgroundColor: '#FFFFFF',
          justifyContent: 'center',
          alignItems: 'center',
          clipPath: `polygon(0 0, ${maskProgress * 150}% 0, ${maskProgress * 150 - 50}% 100%, 0 100%)`,
        }}
      >
        <div
          style={{
            color: '#0071E3',
            fontSize: '110px',
            fontWeight: 900,
            fontFamily: 'Inter, Pretendard, sans-serif',
            letterSpacing: `${letterSpacing}px`,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          AI PAIR
          <br />
          <span style={{ color: '#000000' }}>PROGRAMMER</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
