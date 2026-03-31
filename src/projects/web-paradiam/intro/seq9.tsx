import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spotlightSpring = spring({
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
      {/* Searchlight Effect */}
      <div
        style={{
          position: 'absolute',
          width: 2000,
          height: 2000,
          background: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, ${0.2 * spotlightSpring}) 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: '#FFFFFF',
          opacity: spotlightSpring,
          transform: `scale(${interpolate(spotlightSpring, [0, 1], [0.8, 1])})`,
          textAlign: 'center',
        }}
      >
        어느 유명한 개발자의 한 마디...
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
          유명한 개발자는 이렇게 말했습니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
