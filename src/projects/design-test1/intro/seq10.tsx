import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();

  // 거대한 따옴표 속에 "CONVERSATION IS THE NEW CODING" 문구 표시 (1막)
  // 화면 전체가 다이나믹하게 기울어지며(3D Rotate) "CONDUCT AI" (AI를 지휘하라) 강조 문구 (2막)

  // 1막 -> 2막 트랜지션 (프레임 150쯤)
  
  const rotateY = interpolate(frame, [150, 200], [0, -30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const rotateX = interpolate(frame, [150, 200], [0, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [150, 300], [1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act1Opacity = interpolate(frame, [140, 160], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const act2Opacity = interpolate(frame, [160, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}>
      {/* 3D 래퍼 */}
      <AbsoluteFill
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Act 1 */}
        <div
          style={{
            position: 'absolute',
            opacity: act1Opacity,
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '90px',
            fontWeight: 800,
            fontFamily: 'Inter, sans-serif',
            maxWidth: '80%',
          }}
        >
          <span style={{ color: '#86868B', fontSize: '150px', position: 'absolute', top: -50, left: -60 }}>"</span>
          CONVERSATION
          <br />
          IS THE NEW
          <br />
          <span style={{ color: '#0071E3' }}>CODING</span>
        </div>

        {/* Act 2 */}
        <div
          style={{
            position: 'absolute',
            opacity: act2Opacity,
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '120px',
            fontWeight: 900,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span style={{ color: '#0071E3', fontSize: '150px' }}>CONDUCT</span>
          <br />
          AI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
