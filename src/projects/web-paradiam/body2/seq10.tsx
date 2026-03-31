import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const formulaSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 30,
          fontSize: 80,
          fontWeight: 900,
          color: '#FFFFFF',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#22D3EE', transform: `translateY(${(1 - formulaSpring) * 100}px)`, opacity: formulaSpring }}>컨텍스트</div>
        <div style={{ color: '#94A3B8' }}>+</div>
        <div style={{ color: '#FF3366', transform: `translateY(${(1 - formulaSpring) * -100}px)`, opacity: formulaSpring }}>제약 조건</div>
      </div>
      
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          marginTop: 50,
          color: '#EAB308',
          opacity: frame > 60 ? 1 : 0,
          transform: `scale(${frame > 60 ? 1 : 0.5})`,
        }}
      >
        = 성공적인 결과
      </div>

      {/* Subtitles */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          명확한 컨텍스트와 엄격한 제약 조건을 제공할수록,{"\n"}
          AI는 우리가 정확히 원하는 형태의 코드를 오차 없이 생성해 냅니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
