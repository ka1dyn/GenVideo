import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const Seq12: React.FC = () => {
  const frame = useCurrentFrame();

  // 미니멀 그리드 빠르게 채워지기
  // 10x5 그리드. 프레임당 2개씩 순차적으로 켜짐
  const columns = 10;
  const rows = 5;
  const total = columns * rows;

  const getBackgroundColor = (i: number) => {
    // 순차적으로 불이 켜지며 녹색 체크박스 느낌
    const turnOnFrame = i * 2;
    if (frame >= turnOnFrame) {
      return '#34C759'; // Apple Green
    }
    return '#333336';
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 40px)`,
          gridTemplateRows: `repeat(${rows}, 40px)`,
          gap: '20px',
          opacity: 0.8,
        }}
      >
        {Array(total).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: getBackgroundColor(i),
              transition: 'background-color 0.1s ease-out',
            }}
          />
        ))}
      </div>

      {/* 중앙 텍스트 */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '110px',
            fontWeight: 900,
            fontFamily: 'Inter',
            letterSpacing: '5px',
            textShadow: '0 10px 40px rgba(0,0,0,0.8)',
          }}
        >
          ALL CLEAR
        </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
