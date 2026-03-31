import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideSpring = spring({
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
          width: '80%',
          height: '60%',
          backgroundColor: '#1E293B',
          borderRadius: 20,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          transform: `translateX(${(1 - slideSpring) * 1000}px)`,
        }}
      >
        <div style={{ color: '#22D3EE', fontSize: 30, fontWeight: 800, marginBottom: 40 }}>실제 데이터 분석</div>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 30, flex: 1 }}>
          {[60, 80, 45, 95, 70].map((h, i) => {
            const barSpring = spring({
              frame: frame - 20 - i * 10,
              fps,
            });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: i === 3 ? '#A855F7' : '#334155',
                  height: `${h * barSpring}%`,
                  borderRadius: '10px 10px 0 0',
                  position: 'relative',
                }}
              >
                {i === 3 && (
                  <div style={{ position: 'absolute', top: -40, width: '100%', textAlign: 'center', color: '#A855F7', fontWeight: 900 }}>
                    최대
                  </div>
                )}
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
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          막연한 기대감이 아닌,{"\n"}
          실제 데이터를 바탕으로 AI 도입의 극적인 효과를 살펴보겠습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
