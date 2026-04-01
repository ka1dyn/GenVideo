import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 두꺼운 라인 사각형 안으로 블록 끼워맞추기
  const slideIn = spring({
    frame,
    fps,
    config: { damping: 13 },
  });

  const translateY = interpolate(slideIn, [0, 1], [-500, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 테두리 타겟 */}
      <div style={{
          position: 'absolute',
          width: '600px', height: '200px',
          border: '15px dashed #333336',
          borderRadius: '20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <span style={{ color: '#333336', fontSize: '60px', fontWeight: 800, fontFamily: 'Inter' }}>CONSTRAINTS</span>
      </div>

      {/* 날아오는 블록 */}
      <div style={{
          position: 'absolute',
          width: '600px', height: '200px',
          backgroundColor: '#0071E3',
          borderRadius: '20px',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          transform: `translateY(${translateY}px)`,
          boxShadow: '0 20px 50px rgba(0, 113, 227, 0.5)'
      }}>
        <span style={{ color: '#FFFFFF', fontSize: '60px', fontWeight: 900, fontFamily: 'Inter', letterSpacing: '2px' }}>
          ZERO ERROR
        </span>
      </div>

    </AbsoluteFill>
  );
};
