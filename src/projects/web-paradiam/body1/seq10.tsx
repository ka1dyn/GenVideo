import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldSpring = spring({
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
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 600, height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Shield Outer Ring */}
        <div
          style={{
            position: 'absolute',
            width: 500 * shieldSpring,
            height: 500 * shieldSpring,
            border: '8px solid #22D3EE',
            borderRadius: '50%',
            boxShadow: '0 0 50px rgba(34, 211, 238, 0.5)',
          }}
        />
        
        {/* Scanning Line */}
        <div
          style={{
            position: 'absolute',
            width: 450,
            height: 4,
            backgroundColor: '#22D3EE',
            boxShadow: '0 0 20px #22D3EE',
            opacity: 0.3,
            transform: `translateY(${Math.sin(frame / 10) * 200}px)`,
          }}
        />

        <div style={{ zIndex: 10, textAlign: 'center' }}>
          <div style={{ fontSize: 100, fontWeight: 900, color: '#FFFFFF' }}>90%</div>
          <div style={{ fontSize: 40, fontWeight: 600, color: '#22D3EE' }}>오류 사전 차단</div>
        </div>
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 40,
          fontWeight: 700,
          color: '#FFFFFF',
          opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        안정성 최우선
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
          실시간 정적 분석과 코드 리뷰를 통해 배포 전 치명적인 오류의 90% 이상을{"\n"}
          사전에 차단하며 서비스의 안정성을 크게 높여주고 있습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
