import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const finalSpring = spring({
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
      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#22D3EE',
            opacity: finalSpring,
            transform: `scale(${interpolate(finalSpring, [0, 1], [1.2, 1])})`,
            textShadow: '0 0 50px #22D3EE',
          }}
        >
          AI 지휘와 조율
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: '#FFFFFF',
            textAlign: 'center',
            marginTop: 20,
            opacity: finalSpring,
          }}
        >
          문제 정의 및 AI 오케스트레이션
        </div>
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
          결국 우리에게 가장 필요한 역량은 타건 속도가 아니라,{"\n"}
          문제를 정의하고 AI를 지휘하는 기획력이 될 것입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
