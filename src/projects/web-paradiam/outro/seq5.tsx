import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leverSpring = spring({
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
      <div style={{ fontSize: 100, fontWeight: 900, color: '#A855F7', marginBottom: 50 }}>강력한 지렛대</div>
      
      <div style={{ position: 'relative', width: 600, height: 20 }}>
        {/* Lever Base */}
        <div style={{ position: 'absolute', bottom: -50, left: '50%', width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderBottom: '50px solid #334155' }} />
        
        {/* Lever Beam */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            transform: `rotate(${interpolate(leverSpring, [0, 1], [-15, 15])}deg)`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 50px',
          }}
        >
          <div style={{ fontSize: 60 }}>🤖</div>
          <div style={{ fontSize: 60 }}>🌎</div>
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
            maxWidth: '80%',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
          }}
        >
          AI는 우리를 밀어내는 경쟁자가 아닙니다.{"\n"}
          오히려 우리가 단순 작업에서 벗어나 더 가치 있고 창의적인 문제 해결에 집중할 수 있도록 돕는 가장 강력한 지렛대입니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
