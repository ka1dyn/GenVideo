import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#333336', justifyContent: 'center', alignItems: 'center' }}>
      
      <div
        style={{
          color: '#000000',
          fontSize: '200px',
          fontWeight: 900,
          fontFamily: 'Inter',
          filter: `blur(${interpolate(frame, [0, 60], [20, 2])}px)`,
          opacity: 0.5,
          letterSpacing: '-10px',
        }}
      >
        REPLACE?
      </div>
      
    </AbsoluteFill>
  );
};
