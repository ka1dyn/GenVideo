import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const arrowHead = interpolate(progress, [0, 1], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 50, zIndex: 5 }}>
        {/* DESIGN */}
        <div
          style={{
            width: 250,
            height: 250,
            borderRadius: 50,
            backgroundColor: '#FF3366',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            fontWeight: 800,
            color: '#FFFFFF',
            boxShadow: '0 0 50px rgba(255, 51, 102, 0.5)',
          }}
        >
          디자인
        </div>

        {/* BOTTLE-NECK ARROW */}
        <div style={{ position: 'relative', width: 300, height: 10 }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${arrowHead}%`,
              backgroundColor: '#22D3EE',
              boxShadow: '0 0 20px #22D3EE',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: -20,
              top: -15,
              width: 0,
              height: 0,
              borderTop: '20px solid transparent',
              borderBottom: '20px solid transparent',
              borderLeft: '40px solid #22D3EE',
              opacity: progress > 0.9 ? 1 : 0,
            }}
          />
        </div>

        {/* DEV */}
        <div
          style={{
            width: 250,
            height: 250,
            borderRadius: 50,
            backgroundColor: '#22D3EE',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            fontWeight: 800,
            color: '#0F172A',
            boxShadow: '0 0 50px rgba(34, 211, 238, 0.5)',
          }}
        >
          개발
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: 10,
          }}
        >
          디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
