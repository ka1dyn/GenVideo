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

  // Staggered checkmarks: 0 -> 1
  const checks = [
      { id: 1, text: 'Edge Case Detection', delay: 15 },
      { id: 2, text: 'Business Logic Validation', delay: 30 },
      { id: 3, text: 'Unit Test Coverage 100%', delay: 45 },
      { id: 4, text: 'Auto Test Suite Ready', delay: 60 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', padding: '10%' }}>
      <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '40px' }}>
        TEST QUALITY ASSURANCE
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
          {checks.map((check) => {
              const checkEntrance = spring({
                  frame: frame - check.delay,
                  fps,
                  config: { stiffness: 100, damping: 12 },
              });

              return (
                  <div
                      key={check.id}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          opacity: checkEntrance,
                          transform: `translateX(${interpolate(checkEntrance, [0, 1], [-50, 0])}px)`,
                      }}
                  >
                      <div
                          style={{
                              width: '40px',
                              height: '40px',
                              border: '2px solid #3B82F6',
                              borderRadius: '4px',
                              marginRight: '30px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: checkEntrance > 0.8 ? '#3B82F6' : 'transparent',
                          }}
                      >
                          {checkEntrance > 0.8 && <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '24px' }}>V</div>}
                      </div>
                      <div style={{ color: '#FFFFFF', fontSize: '36px', fontFamily: 'Pretendard', fontWeight: 700 }}>
                          {check.text}
                      </div>
                  </div>
              );
          })}
      </div>
    </AbsoluteFill>
  );
};
