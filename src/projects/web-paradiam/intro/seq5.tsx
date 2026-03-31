import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const scale = interpolate(zoom, [0, 1], [0.8, 1]);

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
      <div
        style={{
          transform: `scale(${scale})`,
          width: '80%',
          height: '60%',
          border: '2px solid #334155',
          borderRadius: 20,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1E293B',
          padding: 30,
        }}
      >
        {/* Architecture Diagram */}
        <div style={{ color: '#22D3EE', fontSize: 24, fontWeight: 800, marginBottom: 20 }}>시스템 아키텍처 최적화</div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => {
            const nodeProgress = spring({
              frame: frame - i * 10,
              fps,
            });
            return (
              <div
                key={i}
                style={{
                  width: 150,
                  height: 100,
                  backgroundColor: '#334155',
                  borderRadius: 10,
                  opacity: nodeProgress,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  border: i === 3 ? '2px solid #22D3EE' : 'none',
                  boxShadow: i === 3 ? '0 0 20px rgba(34, 211, 238, 0.5)' : 'none',
                }}
              >
                모듈 {i}
              </div>
            );
          })}
        </div>

        {/* Suggestion Bubble */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 50,
            width: 250,
            backgroundColor: '#A855F7',
            padding: 15,
            borderRadius: 10,
            color: '#FFFFFF',
            opacity: frame > 100 ? 1 : 0,
            transformOrigin: 'bottom left',
            transform: `scale(${frame > 100 ? 1 : 0})`,
          }}
        >
          "성능 최적화를 위한 모듈 3 개선 제안"
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
          단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
