import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineSpring = spring({
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
          border: '2px solid #334155',
          borderRadius: 20,
          backgroundColor: '#1E293B',
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint Lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div style={{ color: '#FF3366', fontSize: 32, fontWeight: 900, zIndex: 10, marginBottom: 40 }}>1단계: 아키텍처 설계</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, zIndex: 10 }}>
          {[1, 2, 3].map((i) => {
            const width = interpolate(lineSpring, [0, 1], [0, 100 - i * 10]);
            return (
              <div
                key={i}
                style={{
                  height: 40,
                  width: `${width}%`,
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: 5,
                }}
              />
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
            fontSize: 40,
            fontWeight: 800,
            color: '#FFFFFF',
            backgroundColor: 'rgba(255, 51, 102, 0.7)',
            padding: '10px 30px',
            borderRadius: 10,
            display: 'inline-block',
          }}
        >
          첫째, 전체적인 아키텍처 설계.
        </div>
      </div>
    </AbsoluteFill>
  );
};
