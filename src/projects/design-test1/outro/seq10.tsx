import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // IMAGINE TO CODE
  // 아주 강한 줌인으로 화이트아웃
  const zoom = spring({
    frame: frame - 100,
    fps,
    config: { damping: 50 },
  });

  const scale = interpolate(zoom, [0, 1], [1, 50], { extrapolateRight: 'clamp' });
  const bgFade = interpolate(frame, [150, 200], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* 중심 글씨 */}
      <div
        style={{
          transform: `scale(${scale})`,
          color: '#FFFFFF',
          fontSize: '150px',
          fontWeight: 900,
          fontFamily: 'SF Pro Display',
          letterSpacing: '-2px',
          textAlign: 'center',
        }}
      >
        IMAGINE
        <br />
        TO <span style={{ color: '#0071E3' }}>CODE</span>
      </div>

      {/* 화이트 아웃 */}
      <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: bgFade, mixBlendMode: 'screen' }} />

    </AbsoluteFill>
  );
};
