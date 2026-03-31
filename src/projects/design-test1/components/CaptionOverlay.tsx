import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';

export interface Subtitle {
  text: string;
  startMs: number;
  endMs: number;
}

interface Props {
  captions: Subtitle[];
}

export const CaptionOverlay: React.FC<Props> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;

  // Find the active subtitle
  const activeSubtitle = captions.find(
    (cap) => currentTimeMs >= cap.startMs && currentTimeMs < cap.endMs
  );

  if (!activeSubtitle) {
    return null;
  }

  
  // Animation: subtle fade in when a new caption starts
  const entryFrame = (activeSubtitle.startMs / 1000) * fps;
  const opacity = interpolate(
    frame,
    [entryFrame, entryFrame + 5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '110px', // Roughly 10% from bottom
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          color: '#FFFFFF',
          fontSize: '40px',
          fontWeight: 700,
          fontFamily: 'Pretendard',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(59, 130, 246, 0.3)',
          opacity,
          lineHeight: 1.4,
          padding: '0 80px',
        }}
      >
        {activeSubtitle.text}
      </div>
    </AbsoluteFill>
  );
};
