import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reviewProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
        {/* Senior Developer Silhouette (Placeholder) */}
        <div
          style={{
            width: 200,
            height: 300,
            backgroundColor: '#1E293B',
            borderRadius: '100px 100px 20px 20px',
            position: 'relative',
            opacity: interpolate(reviewProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(reviewProgress, [0, 1], [0.9, 1])})`,
          }}
        >
          <div style={{ position: 'absolute', top: 50, left: 50, width: 100, height: 100, backgroundColor: '#334155', borderRadius: '50%' }} />
        </div>

        {/* Review Bubbles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {['"훌륭한 로직입니다!"', '"여기 리팩토링은 어떨까요?"', '"완벽한 아키텍처네요"'].map((text, i) => {
            const bubbleSpring = spring({
              frame: frame - 20 - i * 30,
              fps,
            });
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#A855F7',
                  padding: '15px 25px',
                  borderRadius: '20px 20px 20px 0',
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 600,
                  opacity: bubbleSpring,
                  transform: `translateX(${(1 - bubbleSpring) * 50}px)`,
                }}
              >
                {text}
              </div>
            );
          })}
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
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: 10,
          }}
        >
          마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.
        </div>
      </div>
    </AbsoluteFill>
  );
};
