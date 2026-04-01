import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 글자가 화면 중앙에서부터 좌우로 갈라짐
  const split = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  const gap = interpolate(split, [0, 1], [0, 100]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ display: 'flex', gap: `${gap}px`, opacity }}>
        <div style={{ color: '#FFFFFF', fontSize: '120px', fontWeight: 900, fontFamily: 'Inter' }}>
          WORK
        </div>
        <div style={{ color: '#0071E3', fontSize: '120px', fontWeight: 900, fontFamily: 'Inter' }}>
          FLOW
        </div>
      </div>
      
    </AbsoluteFill>
  );
};
