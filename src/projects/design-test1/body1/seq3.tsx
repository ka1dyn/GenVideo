import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the bar display
  const entrance = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 10 },
  });

  // Bar Progress: 0 -> Target
  const repeatBar = interpolate(frame, [15, 60], [1, 0.2], { extrapolateRight: 'clamp' }) * entrance;
  const creativeBar = interpolate(frame, [15, 60], [1, 3.0], { extrapolateRight: 'clamp' }) * entrance;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', display: 'flex', flexDirection: 'column', padding: '10%' }}>
      <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '20px' }}>
        TIME RECHARGE
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
          {/* Repeat Tasks Bar */}
          <div style={{ width: '100%' }}>
              <div style={{ color: '#FFFFFF', fontSize: '24px', fontFamily: 'Pretendard', marginBottom: '10px' }}>반복적인 수동 작업 (Routine Tasks)</div>
              <div style={{ position: 'relative', width: '100%', height: '60px', backgroundColor: '#1A1A1A', borderRadius: '4px' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: `${repeatBar * 70}%`, height: '100%', backgroundColor: '#454545' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#FFFFFF', fontWeight: 700 }}>80% 감소</span>
                  </div>
              </div>
          </div>

          <div style={{ height: '40px' }} />

          {/* Creative Tasks Bar */}
          <div style={{ width: '100%' }}>
              <div style={{ color: '#3B82F6', fontSize: '24px', fontFamily: 'Pretendard', marginBottom: '10px' }}>창의적 설계 & 로직 고민 (Creative Mode)</div>
              <div style={{ position: 'relative', width: '100%', height: '60px', backgroundColor: '#1A1A1A', borderRadius: '4px' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: `${creativeBar * 30}%`, height: '100%', backgroundColor: '#3B82F6', boxShadow: '0 0 20px #3B82F6' }}>
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#FFFFFF', fontWeight: 900 }}>3배 이상 증가</span>
                  </div>
              </div>
          </div>
      </div>
    </AbsoluteFill>
  );
};
