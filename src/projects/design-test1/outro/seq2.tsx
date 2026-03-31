import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for Diamond
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 100, damping: 10 },
  });

  // Diamond Rotation
  const rotation = interpolate(frame, [0, 472], [0, 360]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Central Diamond (Symbol of Expansion) */}
      <div
          style={{
              position: 'relative',
              width: `${interpolate(entrance, [0, 1], [0, 400])}px`,
              height: `${interpolate(entrance, [0, 1], [0, 400])}px`,
              border: '4px solid #3B82F6',
              transform: `rotate(${rotation + 45}deg)`,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              boxShadow: '0 0 100px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
          }}
      >
          <div
              style={{
                  transform: `rotate(-${rotation + 45}deg)`,
                  color: '#FFFFFF',
                  fontSize: '48px',
                  fontWeight: 900,
                  fontFamily: 'Pretendard',
                  textAlign: 'center',
              }}
          >
            대체가 아닌 <br />확장
          </div>
      </div>

      {/* Radiant Lines (Expanding) */}
      <AbsoluteFill style={{ opacity: entrance }}>
          {[...Array(12)].map((_, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '2px',
                      height: '1000px',
                      backgroundColor: '#3B82F6',
                      transform: `rotate(${(360 / 12) * i}deg) translateY(${interpolate(frame % 30, [0, 30], [0, 100])}px)`,
                      opacity: interpolate(frame % 30, [0, 30], [0.3, 0]),
                  }}
              />
          ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
