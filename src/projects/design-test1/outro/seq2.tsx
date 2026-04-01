import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 나이테 궤적
  const linesCount = 10;
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {Array(linesCount).fill(0).map((_, i) => {
        const ringScale = spring({
          frame: frame - i * 5,
          fps,
          config: { damping: 15 },
        });
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              transform: `scale(${interpolate(ringScale, [0, 1], [0, 20])})`,
              opacity: interpolate(ringScale, [0, 1], [1, 0]),
            }}
          />
        );
      })}

      <div
        style={{
          color: '#FFFFFF',
          fontSize: '110px',
          fontWeight: 900,
          fontFamily: 'Inter',
          textAlign: 'center',
          zIndex: 10,
          textShadow: '0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        WHAT'S
        <br />
        <span style={{ color: '#0071E3' }}>NEXT?</span>
      </div>

    </AbsoluteFill>
  );
};
