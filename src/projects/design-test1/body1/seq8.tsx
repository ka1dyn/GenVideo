import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, random } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1막: 수많은 작은 타이포들이 어지럽게 배치되어있다가
  // 2막 (frame > 100): 중앙으로 싹 수렴하며 파란 버튼으로 바뀜
  const isAct2 = frame > 100;
  
  const gather = spring({
    frame: frame - 100,
    fps,
    config: { damping: 15 },
  });

  const opacityAct1 = interpolate(gather, [0, 1], [1, 0]);
  const scaleAct2 = interpolate(gather, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

  // 산만한 텍스트 더미
  const particleLines = Array(30).fill("document.getElementById('test')");

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {!isAct2 && (
        <AbsoluteFill style={{ opacity: opacityAct1, padding: 50 }}>
          {particleLines.map((text, i) => (
             <div
               key={i}
               style={{
                 position: 'absolute',
                 left: `${random(`left-${i}`) * 80 + 10}%`,
                 top: `${random(`top-${i}`) * 80 + 10}%`,
                 color: '#333336',
                 fontFamily: 'monospace',
                 fontSize: '20px',
                 transform: `rotate(${random(`rot-${i}`) * 360}deg)`,
               }}
             >
               {text}
             </div>
          ))}
        </AbsoluteFill>
      )}

      {/* 액트 2: 승인 버튼 쾅! */}
      <div
        style={{
          width: '500px',
          height: '180px',
          backgroundColor: '#0071E3',
          borderRadius: '90px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${isAct2 ? scaleAct2 : 0})`,
          boxShadow: '0 20px 50px rgba(0, 113, 227, 0.5)',
        }}
      >
        <span style={{ color: '#FFFFFF', fontSize: '60px', fontWeight: 800, fontFamily: 'Inter' }}>
          APPROVE
        </span>
      </div>
      
    </AbsoluteFill>
  );
};
