import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
      }}
    >
      <div
        style={{
          width: 900,
          height: 500,
          backgroundColor: '#1E293B',
          borderRadius: 20,
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          position: 'relative',
        }}
      >
        <div style={{ color: '#10B981', fontSize: 32, fontWeight: 900 }}>테스트 스위트: 통과</div>
        
        {Array.from({ length: 6 }).map((_, i) => {
          const checkSpring = spring({
            frame: frame - 20 - i * 15,
            fps,
          });
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                opacity: checkSpring,
                transform: `translateX(${(1 - checkSpring) * 50}px)`,
              }}
            >
              <div style={{ color: '#10B981', fontSize: 30 }}>✅</div>
              <div style={{ height: 20, width: 600, backgroundColor: '#334155', borderRadius: 5 }} />
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
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          까다로웠던 테스트 코드 작성도 더 이상 고통스러운 작업이 아닙니다.{"\n"}
          핵심 비즈니스 로직만 주어지면 엣지 케이스까지 꼼꼼하게 고려한 완벽한 테스트 스위트를 자동으로 구성해 줍니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
