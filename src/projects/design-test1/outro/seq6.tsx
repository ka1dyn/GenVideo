import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 지렛대 (Leverage) 형상화한 기울어진 단순 선(Line) 모션
  const lift = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const angle = interpolate(lift, [0, 1], [0, -20]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* 바닥 받침 */}
      <div style={{ position: 'absolute', bottom: '20%', width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '50px solid #0071E3' }} />

      {/* 지렛대 선 */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          width: '120%',
          height: '10px',
          backgroundColor: '#333336',
          transformOrigin: 'center bottom',
          transform: `translateY(-50px) rotateZ(${angle}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '25%',
            bottom: '20px',
            color: '#FFFFFF',
            fontSize: '120px',
            fontWeight: 900,
            fontFamily: 'Inter',
            transform: `rotateZ(${-angle}deg)`,
            textShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }}
        >
          LEVERAGE
        </div>
      </div>

    </AbsoluteFill>
  );
};
