import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface SubtitleProps {
  text: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 5, 10], [0, 1, 1], { extrapolateRight: 'clamp' });

  // Handle new lines for subtitles (2 lines max)
  const lines = text.split('\n');

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '14%', // Positioned within or near the bottom letterbox
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          opacity,
          color: '#F8FAFC', // Off-white/slate
          fontSize: 34,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.4,
          textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9)',
          maxWidth: '85%',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
