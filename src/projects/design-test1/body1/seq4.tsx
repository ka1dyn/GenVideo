import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flip animation for comparison: 0 (Before) -> 1 (After)
  const flip = spring({
    frame: frame - 240, // flip after 4 seconds
    fps,
    config: { stiffness: 80, damping: 10 },
  });

  // Rotation and scale for flip
  const rotateX = interpolate(flip, [0, 1], [0, 180]);
  const scale = interpolate(flip, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', perspective: '1000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
          style={{
              width: '80%',
              height: '60%',
              transform: `rotateX(${rotateX}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
              position: 'relative',
          }}
      >
          {/* Front Side (BEFORE) */}
          <div
              style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#1A1A1A',
                  border: '2px solid #454545',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <div style={{ color: '#454545', fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>BEFORE AI</div>
              <h1 style={{ color: '#FFFFFF', fontSize: '48px', fontFamily: 'Pretendard', textAlign: 'center' }}>
                수동 타이핑과 <br />끝없는 밤샘 작업
              </h1>
          </div>

          {/* Back Side (AFTER) */}
          <div
              style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#0A0A0A',
                  border: '4px solid #3B82F6',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transform: 'rotateX(180deg)',
                  boxShadow: '0 0 50px rgba(59, 130, 246, 0.4)',
              }}
          >
              <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>AFTER AI</div>
              <h1 style={{ color: '#FFFFFF', fontSize: '48px', fontFamily: 'Pretendard', textAlign: 'center' }}>
                똑똑한 제안을 <br />승인하는 워크플로우
              </h1>
          </div>
      </div>
    </AbsoluteFill>
  );
};
