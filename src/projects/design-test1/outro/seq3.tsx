import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the lever
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 10 },
  });

  // Oscillating the lever
  const pivotAngle = Math.sin(frame / 20) * 5 * entrance;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '90%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
            AI LEVERAGE
          </div>

          {/* Lever Bar */}
          <div
              style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#3B82F6',
                  transform: `rotate(${pivotAngle}deg)`,
                  position: 'relative',
                  marginTop: '100px',
                  boxShadow: '0 0 20px #3B82F6',
              }}
          >
              {/* Left Weight (Simple Tasks) */}
              <div
                  style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10%',
                      width: '200px',
                      height: '80px',
                      backgroundColor: '#1A1A1A',
                      border: '1px solid #454545',
                      color: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      fontSize: '20px',
                      fontWeight: 700,
                  }}
              >
                단순 반복 작업 ↓
              </div>

              {/* Right Force (Creative Innovation) */}
              <div
                  style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10%',
                      width: '300px',
                      height: '100px',
                      backgroundColor: '#3B82F6',
                      color: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '4px',
                      fontSize: '24px',
                      fontWeight: 900,
                      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                      transform: `translateY(${-Math.sin(frame / 20) * 100}px)`,
                  }}
              >
                창의적 문제 해결 ↑
              </div>
          </div>
          
          {/* Lever Support Point (Pivot) */}
          <div
              style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  position: 'absolute',
                  top: 'calc(50% + 55px)',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
              }}
          />
      </div>
    </AbsoluteFill>
  );
};
