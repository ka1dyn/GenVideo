import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 방패/알약 형태의 미니멀 모션 (통통 튀기)
  const pop = spring({
    frame,
    fps,
    config: { damping: 10, mass: 1 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 쉴드 형태 베이스 라인 */}
      <div
        style={{
          position: 'absolute',
          transform: `scale(${pop})`,
          width: '500px',
          height: '500px',
          border: '10px solid #0071E3',
          borderTopLeftRadius: '250px',
          borderTopRightRadius: '250px',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'inset 0 0 50px rgba(0, 113, 227, 0.4)',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '110px',
            fontWeight: 900,
            fontFamily: 'Inter',
            textAlign: 'center',
            lineHeight: 1,
            textShadow: '0 10px 20px rgba(0,0,0,0.5)',
          }}
        >
          90%
          <br />
          <span style={{ fontSize: '50px', color: '#0071E3', fontWeight: 600 }}>BLOCKED</span>
        </div>
      </div>

    </AbsoluteFill>
  );
};
