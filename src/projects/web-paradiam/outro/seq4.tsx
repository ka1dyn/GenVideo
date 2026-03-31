import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lightSpring = spring({
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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${0.4 * lightSpring}) 0%, transparent 70%)`,
        }}
      />
      
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          zIndex: 10,
          transform: `scale(${interpolate(lightSpring, [0, 1], [0.8, 1])})`,
        }}
      >
        인간의 무한한 잠재력 <br />
        <span style={{ color: '#22D3EE' }}>해방과 확장</span>
      </div>

      <div style={{ display: 'flex', gap: 50, marginTop: 80, zIndex: 10 }}>
        {['🔨', '🔥', '🤖'].map((emoji, i) => (
          <div
            key={i}
            style={{
              fontSize: 80,
              opacity: spring({ frame: frame - i * 30, fps }),
              transform: `translateY(${(1 - spring({ frame: frame - i * 30, fps })) * 100}px)`,
            }}
          >
            {emoji}
          </div>
        ))}
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
          }}
        >
          하지만 역사가 증명하듯, 강력한 새로운 도구는 항상 인간의 잠재력과 한계를 더욱 확장시켜 왔습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
