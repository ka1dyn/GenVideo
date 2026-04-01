import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 삭제선 모션 (NO PAIN)
  const strike = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const lineWidth = interpolate(strike, [0, 1], [0, 480]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ color: '#000000', fontSize: '100px', fontWeight: 900, fontFamily: 'Inter', lineHeight: 1 }}>
          TEST CODE
        </div>
        
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <div style={{ color: '#86868B', fontSize: '100px', fontWeight: 900, fontFamily: 'Inter', lineHeight: 1 }}>
            NO PAIN
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: `${lineWidth}px`,
              height: '15px',
              backgroundColor: '#0071E3', // 파란 줄로 쫙 그어버림
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
