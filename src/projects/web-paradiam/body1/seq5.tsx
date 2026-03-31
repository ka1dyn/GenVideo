import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotateSpring = spring({
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
      <div style={{ position: 'relative', width: 400, height: 400 }}>
        {/* Analog Clock Face */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '10px solid #334155',
            position: 'absolute',
            transform: `rotate(${rotateSpring * 360}deg)`,
          }}
        >
          <div style={{ position: 'absolute', top: 20, left: '50%', width: 4, height: 20, backgroundColor: '#FFFFFF' }} />
          <div style={{ position: 'absolute', bottom: 20, left: '50%', width: 4, height: 20, backgroundColor: '#FFFFFF' }} />
          <div style={{ position: 'absolute', left: 20, top: '50%', width: 20, height: 4, backgroundColor: '#FFFFFF' }} />
          <div style={{ position: 'absolute', right: 20, top: '50%', width: 20, height: 4, backgroundColor: '#FFFFFF' }} />
          
          {/* Hand */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 150,
              height: 6,
              backgroundColor: '#22D3EE',
              transformOrigin: 'left center',
              transform: `rotate(${frame * 5}deg)`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 150,
          fontSize: 50,
          fontWeight: 800,
          color: '#FFFFFF',
          opacity: rotateSpring,
        }}
      >
        업무 시간 분배의 변화
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
          개발자들의 업무 시간 분배도 완전히 달라졌습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
