import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();

  const morphProgress = interpolate(frame, [45, 120], [0, 1], {
    extrapolateRight: 'clamp',
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
      <div style={{ position: 'relative', width: 600, height: 400 }}>
        {/* Sketch Layer */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '2px dashed #94A3B8',
            borderRadius: 20,
            opacity: 1 - morphProgress,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#94A3B8',
          }}
        >
          스케치
        </div>

        {/* UI Layer */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#1E293B',
            borderRadius: 20,
            border: '2px solid #22D3EE',
            opacity: morphProgress,
            transform: `scale(${interpolate(morphProgress, [0, 1], [0.8, 1])})`,
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            gap: 10,
          }}
        >
          <div style={{ height: 40, width: '60%', backgroundColor: '#22D3EE', borderRadius: 5 }} />
          <div style={{ height: 150, width: '100%', backgroundColor: '#334155', borderRadius: 5 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ height: 40, width: 80, backgroundColor: '#A855F7', borderRadius: 5 }} />
            <div style={{ height: 40, width: 80, backgroundColor: '#334155', borderRadius: 5 }} />
          </div>
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
          이제는 스케치 한 장이나 간단한 프롬프트만으로도{"\n"}
          곧바로 작동하는 프로토타입이 생성되는 마법 같은 일이 일어납니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
