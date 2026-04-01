import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 작은 인용구 팝업
  const scale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          transform: `scale(${scale})`,
          color: '#0071E3',
          fontSize: '250px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display, Inter, Pretendard, sans-serif',
          lineHeight: 1,
        }}
      >
        " "
      </div>
    </AbsoluteFill>
  );
};
