import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pathSpring = spring({
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
      <div style={{ position: 'relative', width: 800, height: 400 }}>
        {/* Rocket Path Line */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 50,
            width: pathSpring * 700,
            height: 4,
            backgroundColor: '#22D3EE',
            transform: 'rotate(-30deg)',
            transformOrigin: 'left center',
          }}
        />
        
        {/* Rocket Emoji */}
        <div
          style={{
            position: 'absolute',
            fontSize: 100,
            left: 50 + pathSpring * 600,
            bottom: 50 + pathSpring * 350,
            transform: 'rotate(20deg)',
          }}
        >
          🚀
        </div>
      </div>

      <div
        style={{
          fontSize: 60,
          fontWeight: 900,
          color: '#FFFFFF',
          opacity: pathSpring,
          textAlign: 'center',
        }}
      >
        새로운 개발 여정 <br />
        <span style={{ color: '#22D3EE' }}>AI와 함께</span>
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
          }}
        >
          지금 바로 AI와 함께 완전히 새로운 개발 여정을 시작해 보세요.
        </div>
      </div>
    </AbsoluteFill>
  );
};
