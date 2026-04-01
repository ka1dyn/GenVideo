import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 버튼 애니메이션
  const hover = Math.sin(frame * 0.1) * 10;
  const click = frame > 100 ? interpolate(frame, [100, 110], [1, 0.9]) : 1;

  // 마우스 커서 스르륵 다가옴
  const cursorX = interpolate(frame, [60, 100], [400, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [60, 100], [300, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      {/* 둥근 거대 버튼 */}
      <div
        style={{
          width: '700px',
          height: '200px',
          backgroundColor: '#0071E3',
          borderRadius: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateY(${hover}px) scale(${click})`,
          boxShadow: '0 20px 50px rgba(0, 113, 227, 0.6)',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#FFFFFF', fontSize: '60px', fontWeight: 800, fontFamily: 'Inter' }}>
          START NOW
        </span>
      </div>

      {/* 마우스 커서 */}
      <div
        style={{
           position: 'absolute',
           zIndex: 10,
           transform: `translate(${cursorX}px, ${cursorY}px)`,
           marginLeft: '150px',
           marginTop: '150px',
        }}
      >
        <svg width="60" height="90" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,0 L 25,60 L 25,40 L 40,40 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        </svg>
      </div>

    </AbsoluteFill>
  );
};
