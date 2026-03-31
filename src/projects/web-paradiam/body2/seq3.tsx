import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineProgress = spring({
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
      <div style={{ position: 'relative', width: 800, height: 10, backgroundColor: '#334155', borderRadius: 5 }}>
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: `${lineProgress * 100}%`,
            backgroundColor: '#22D3EE',
            borderRadius: 5,
            boxShadow: '0 0 20px #22D3EE',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 100, marginTop: 40 }}>
        {['아키텍처 설계', '초안 작성', '리팩토링'].map((text, i) => {
          const textOpacity = spring({
            frame: frame - i * 20,
            fps,
          });
          return (
            <div
              key={text}
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: i === 0 ? '#FF3366' : i === 1 ? '#22D3EE' : '#A855F7',
                opacity: textOpacity,
                transform: `translateX(${(1 - textOpacity) * 20}px)`,
              }}
            >
              {text}
            </div>
          );
        })}
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
          }}
        >
          AI와 함께하는 개발 워크플로우는 보통 다음 세 단계로 진행됩니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
