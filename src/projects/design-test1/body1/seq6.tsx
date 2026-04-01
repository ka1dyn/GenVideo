import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 시소 회전값
  const seesawAngle = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const angle = interpolate(seesawAngle, [0, 1], [-20, 20]); // 왼쪽이 높았다가 오른쪽이 높아지는 모션

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', perspective: 1000 }}>
      {/* 중앙 받침대 */}
      <div style={{ position: 'absolute', bottom: '30%', width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '50px solid #333336' }} />
      
      {/* 시소 판 */}
      <div
        style={{
          width: '70%',
          height: '20px',
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          bottom: '30%',
          transformOrigin: 'center bottom',
          transform: `translateY(-50px) rotateZ(${angle}deg)`,
          borderRadius: 10,
        }}
      >
        {/* Left Item (80% DOWN) */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            bottom: '40px',
            color: '#86868B',
            fontSize: '80px',
            fontWeight: 800,
            fontFamily: 'SF Pro Display',
            textAlign: 'center',
            lineHeight: 1,
            transform: `rotateZ(${-angle}deg)`, // 글자는 수평 유지 위해 역회전
          }}
        >
          80%<br/><span style={{ fontSize: '40px' }}>DOWN</span>
        </div>

        {/* Right Item (3X UP) */}
        <div
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '40px',
            color: '#0071E3',
            fontSize: '120px',
            fontWeight: 900,
            fontFamily: 'SF Pro Display',
            textAlign: 'center',
            lineHeight: 1,
            transform: `rotateZ(${-angle}deg) scale(${interpolate(seesawAngle, [0, 1], [0.8, 1.2])})`, 
          }}
        >
          3X<br/><span style={{ fontSize: '40px', color: '#FFFFFF' }}>UP</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
