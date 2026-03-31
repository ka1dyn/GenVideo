import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wallSpring = spring({
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
          fontSize: 60,
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: 100,
        }}
      >
        프로덕트 마인드셋
      </div>

      <div style={{ position: 'relative', width: 600, height: 100, backgroundColor: '#334155', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#0F172A',
            transform: `translateY(${wallSpring * 100}%)`,
            zIndex: 5,
          }}
        />
        <div style={{ fontSize: 50, fontWeight: 900, color: '#22D3EE' }}>무엇을 & 왜?</div>
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
          개발의 기술적 진입 장벽이 낮아짐에 따라, 앞으로는 기술의 숙련도보다{"\n"}
          '무엇을, 왜 만들 것인가'를 치열하게 고민하는 프로덕트 마인드가 가장 중요한 무기가 될 것입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
