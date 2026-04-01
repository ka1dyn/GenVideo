import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { Subtitle } from '../types/Subtitle';

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
        zIndex: 9999,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '80px',
        pointerEvents: 'none',
        opacity,
      }}
    >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#FFFFFF',
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: '10px 20px',
            borderRadius: 10,
            display: 'inline-block',
          }}
        >
          {activeSubtitle.text}
        </div>
    </AbsoluteFill>
  );
};
