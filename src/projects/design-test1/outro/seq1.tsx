import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();

  // Speed line animation
  const speed = interpolate(frame, [0, 343], [10, 50]);
  const dashOffset = -frame * speed;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Perspective Grid Road */}
      <div
          style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              perspective: '800px',
              perspectiveOrigin: '50% 50%',
          }}
      >
          <div
              style={{
                  position: 'absolute',
                  width: '200%',
                  height: '200%',
                  top: '-50%',
                  left: '-50%',
                  backgroundImage: `
                      linear-gradient(#3B82F6 2px, transparent 2px),
                      linear-gradient(90deg, #3B82F6 2px, transparent 2px)
                  `,
                  backgroundSize: '100px 100px',
                  backgroundPosition: `0px ${dashOffset}px`,
                  transform: 'rotateX(60deg)',
                  opacity: 0.2,
              }}
          />
      </div>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', letterSpacing: '0.5em', marginBottom: '10px' }}>
            SPEED OF LIGHT
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: '72px', fontFamily: 'Pretendard', fontWeight: 900, textAlign: 'center' }}>
            우리의 상상을 초월하는 <br />폭발적인 기술의 속도
          </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
