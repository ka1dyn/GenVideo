import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance for circle of dots
  const entrance = spring({
    frame,
    fps,
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  // Rotation of the ensemble
  const rotation = interpolate(frame, [0, 422], [0, 180]);

  // Expansion/Contraction
  const scale = 1 + Math.sin(frame / 10) * 0.05 * entrance;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Central Ensembling of Team Circles */}
      <div
          style={{
              position: 'relative',
              width: '800px',
              height: '800px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `rotate(${rotation}deg) scale(${scale})`,
          }}
      >
          {[...Array(8)].map((_, i) => (
              <div
                  key={i}
                  style={{
                      position: 'absolute',
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#3B82F6',
                      borderRadius: '50%',
                      transform: `rotate(${(360 / 8) * i}deg) translateY(${interpolate(entrance, [0, 1], [0, 200])}px)`,
                  }}
              />
          ))}
          <div
              style={{
                  width: '300px',
                  height: '300px',
                  border: '2px solid #3B82F6',
                  borderRadius: '50%',
                  opacity: entrance * 0.3,
                  boxShadow: '0 0 50px #3B82F6',
              }}
          />
      </div>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
            AGILE INNOVATION
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: '56px', fontFamily: 'Pretendard', fontWeight: 900, textAlign: 'center' }}>
            더 빠르게 실패하고,<br />더 빠르게 혁신하라.
          </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
