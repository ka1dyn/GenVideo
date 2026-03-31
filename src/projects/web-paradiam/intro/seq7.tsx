import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from 'remotion';

export const Seq7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agileSpring = spring({
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
      <div style={{ position: 'relative', width: 600, height: 600 }}>
        {/* Center: AI */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 150,
            height: 150,
            backgroundColor: '#22D3EE',
            borderRadius: '50%',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            fontWeight: 900,
            color: '#0F172A',
            boxShadow: '0 0 50px #22D3EE',
          }}
        >
          AI
        </div>

        {/* Team Members */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const memberSpring = spring({
            frame: frame - i * 10,
            fps,
          });
          const radius = 220;
          const x = Math.cos((deg * Math.PI) / 180) * radius * memberSpring;
          const y = Math.sin((deg * Math.PI) / 180) * radius * memberSpring;

          return (
            <React.Fragment key={deg}>
              {/* Line to AI */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: Math.abs(x) + Math.abs(y), // Simplified line
                  height: 2,
                  backgroundColor: '#334155',
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(${radius/2}px)`,
                  opacity: memberSpring,
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  width: 80,
                  height: 80,
                  backgroundColor: '#1E293B',
                  borderRadius: '50%',
                  border: '3px solid #334155',
                  opacity: memberSpring,
                  zIndex: 2,
                }}
              />
            </React.Fragment>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 150,
          fontSize: 60,
          fontWeight: 900,
          color: '#FFFFFF',
          opacity: agileSpring,
          transform: `scale(${agileSpring})`,
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}
      >
        애자일 협업 혁신
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
          이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어,{"\n"}
          팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
