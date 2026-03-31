import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the 3-Step label
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Animated Question Mark (Background)
  const qMarkOpacity = interpolate(frame, [0, 60], [0, 0.1]);
  const qMarkScale = interpolate(frame, [0, 60], [0.8, 1.2]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background Question Mark Symbol */}
      <div
          style={{
              position: 'absolute',
              fontSize: '800px',
              fontFamily: 'Pretendard',
              fontWeight: 900,
              color: '#3B82F6',
              opacity: qMarkOpacity,
              transform: `scale(${qMarkScale})`,
              lineHeight: 1,
          }}
      >
          ?
      </div>

      <div style={{ transform: `scale(${entrance})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
            HOW TO ADOPT?
          </div>
          <div
              style={{
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '80px',
                  fontFamily: 'Pretendard',
                  fontWeight: 900,
                  padding: '20px 60px',
                  boxShadow: '0 0 50px rgba(59, 130, 246, 0.6)',
                  transform: 'skewX(-10deg)',
              }}
          >
            3-STEP WORKFLOW
          </div>
      </div>
    </AbsoluteFill>
  );
};
