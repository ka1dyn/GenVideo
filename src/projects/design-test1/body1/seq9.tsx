import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 지우개로 빨간 라인 지우기 (마스킹)
  const erase = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
  });

  const width = interpolate(erase, [0, 1], [100, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 에러 라인 (Red) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${width}%`,
            height: '20px',
            backgroundColor: '#FF3B30', // Apple Red
            filter: 'blur(10px)',
            opacity: interpolate(erase, [0.8, 1], [1, 0]),
            zIndex: 0,
          }}
        />

        <div
          style={{
            color: '#FFFFFF',
            fontSize: '110px',
            fontWeight: 800,
            fontFamily: 'SF Pro Display',
            zIndex: 10,
            letterSpacing: '-2px',
          }}
        >
          BUG RATE
        </div>
        <div
          style={{
            color: '#86868B',
            fontSize: '80px',
            fontWeight: 700,
            fontFamily: 'SF Pro Display',
            zIndex: 10,
          }}
        >
          PLUMMETS
        </div>
      </div>
    </AbsoluteFill>
  );
};
