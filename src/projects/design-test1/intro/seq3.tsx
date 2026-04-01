import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 폭발하듯 뚫리는 바 모션
  const width = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12 },
  });

  const translateProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15 },
  });

  const maskSize = interpolate(width, [0, 1], [5, 120]);
  const yPos = interpolate(translateProgress, [0, 1], [0, -30]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '100%',
          height: `${maskSize}px`,
          backgroundColor: '#0071E3',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transform: `translateY(${yPos}px)`,
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '90px',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            fontFamily: 'Inter, Pretendard, sans-serif',
            opacity: interpolate(frame, [15, 30], [0, 1]),
          }}
        >
          BOTTLENECK CLEARED
        </div>
      </div>
    </AbsoluteFill>
  );
};
