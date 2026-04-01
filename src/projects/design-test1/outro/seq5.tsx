import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // NOT COMPETITOR 가로 지우기 선
  const strike = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const width = interpolate(strike, [0, 1], [0, 900]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ position: 'relative' }}>
        <div style={{ color: '#000000', fontSize: '100px', fontWeight: 900, fontFamily: 'Inter', letterSpacing: '-2px' }}>
          NOT COMPETITOR
        </div>
        
        {/* 취소선 (Red) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-10px',
            width: `${width}px`,
            height: '15px',
            backgroundColor: '#FF3B30',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

    </AbsoluteFill>
  );
};
