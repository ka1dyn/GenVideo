import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();

  const transitionProgress = interpolate(frame, [60, 150], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A' }}>
      {/* Dynamic Background Transition */}
      <AbsoluteFill
        style={{
          backgroundColor: '#1E293B',
          opacity: 1 - transitionProgress,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: '#0F172A',
          opacity: transitionProgress,
        }}
      />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Manual Process Icons */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            opacity: 1 - transitionProgress,
            transform: `translateY(${transitionProgress * -100}px)`,
          }}
        >
          <div style={{ fontSize: 100 }}>📄</div>
          <div style={{ fontSize: 100 }}>⌨️</div>
          <div style={{ fontSize: 100 }}>☕</div>
        </div>

        {/* AI Process Icons */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            gap: 40,
            opacity: transitionProgress,
            transform: `translateY(${(1 - transitionProgress) * 100}px)`,
          }}
        >
          <div style={{ fontSize: 100 }}>🤖</div>
          <div style={{ fontSize: 100 }}>✨</div>
          <div style={{ fontSize: 100 }}>✅</div>
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
          예전에는 공식 문서를 뒤지며 수동으로 타이핑하며 밤을 새우던 작업들이,{"\n"}
          이제는 AI의 똑똑한 제안을 검토하고 승인하는 효율적인 프로세스로 전환되었습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
