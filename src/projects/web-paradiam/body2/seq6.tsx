import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const refactorSpring = spring({
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
      <div
        style={{
          width: 800,
          height: 600,
          backgroundColor: '#1E293B',
          borderRadius: 20,
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          opacity: refactorSpring,
        }}
      >
        <div style={{ color: '#A855F7', fontSize: 32, fontWeight: 900, marginBottom: 40 }}>3단계: 리팩토링</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 25,
                width: i % 2 === 0 ? '70%' : '90%',
                backgroundColor: i === 3 || i === 4 ? '#A855F7' : '#334155',
                borderRadius: 5,
                opacity: i === 3 || i === 4 ? interpolate(Math.sin(frame / 5), [-1, 1], [0.5, 1]) : 1,
              }}
            />
          ))}
        </div>

        {/* Hand Icon (Placeholder) */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            right: 50,
            fontSize: 100,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `translateY(${Math.sin(frame / 5) * 20}px)`,
          }}
        >
          ✨
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
            fontSize: 40,
            fontWeight: 800,
            color: '#FFFFFF',
            backgroundColor: 'rgba(168, 85, 247, 0.7)',
            padding: '10px 30px',
            borderRadius: 10,
            display: 'inline-block',
          }}
        >
          셋째, 개발자의 디테일한 리팩토링 및 최적화입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
