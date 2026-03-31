import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const draftSpring = spring({
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
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 800, height: 600 }}>
        {/* Rapid Fragments */}
        {Array.from({ length: 10 }).map((_, i) => {
          const fragSpring = spring({
            frame: frame - i * 5,
            fps,
          });
          const x = interpolate(fragSpring, [0, 1], [-500, 0]);
          return (
            <div
              key={i}
              style={{
                height: 40,
                width: 400 + i * 20,
                backgroundColor: '#22D3EE',
                opacity: 0.3 * fragSpring,
                margin: '10px 0',
                transform: `translateX(${x}px)`,
                borderRadius: 5,
              }}
            />
          );
        })}

        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: 100,
            fontSize: 100,
            fontWeight: 900,
            color: '#FFFFFF',
            zIndex: 10,
            opacity: draftSpring,
            transform: `scale(${draftSpring})`,
            textShadow: '0 0 30px #22D3EE',
          }}
        >
          AI 초안 작성
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
            color: '#0F172A',
            backgroundColor: 'rgba(34, 211, 238, 0.9)',
            padding: '10px 30px',
            borderRadius: 10,
            display: 'inline-block',
          }}
        >
          둘째, AI를 활용한 빠른 초안 작성.
        </div>
      </div>
    </AbsoluteFill>
  );
};
