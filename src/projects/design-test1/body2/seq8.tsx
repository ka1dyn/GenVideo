import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, spring } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 타이핑 프롬프트가 순식간에 복잡한 리액트 트리로 확장
  const isAct2 = frame > 80;

  const typeLen = Math.min(Math.floor(frame), 20);
  const promptText = "> Build a Next.js App...".substring(0, typeLen);

  const expand = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15 },
  });
  
  const widthAct2 = interpolate(expand, [0, 1], [300, 1000]);
  const heightAct2 = interpolate(expand, [0, 1], [80, 600]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      {!isAct2 && (
        <div style={{
          width: '600px', height: '80px', borderRadius: '15px',
          backgroundColor: '#333336', display: 'flex', alignItems: 'center',
          padding: '0 30px', color: '#FFFFFF', fontSize: '30px', fontFamily: 'monospace'
        }}>
          {promptText}
          <span style={{ width: '15px', height: '30px', backgroundColor: '#0071E3', marginLeft: '10px', animation: 'blink 1s step-end infinite' }} />
        </div>
      )}

      {isAct2 && (
        <div style={{
          width: `${widthAct2}px`, height: `${heightAct2}px`, borderRadius: '30px',
          backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden'
        }}>
          {/* 가짜 코드 블럭 시각화 */}
          <div style={{ width: '100%', height: '80px', backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FF3B30', marginRight: '10px' }} />
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFCC00', marginRight: '10px' }} />
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#28CD41' }} />
          </div>
          <div style={{ flex: 1, padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', opacity: 0.3 }}>
            <div style={{ width: '40%', height: '20px', backgroundColor: '#0071E3', borderRadius: '5px' }} />
            <div style={{ width: '80%', height: '20px', backgroundColor: '#333336', borderRadius: '5px' }} />
            <div style={{ width: '60%', height: '20px', backgroundColor: '#333336', borderRadius: '5px' }} />
            <div style={{ width: '90%', height: '20px', backgroundColor: '#333336', borderRadius: '5px' }} />
          </div>
          <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <span style={{ fontSize: '80px', fontWeight: 900, color: '#0071E3', fontFamily: 'Inter' }}>FULL STACK</span>
          </AbsoluteFill>
        </div>
      )}
      
    </AbsoluteFill>
  );
};
