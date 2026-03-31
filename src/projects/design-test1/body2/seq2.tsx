import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  spring,
} from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrances for each step
  const step1Entrance = spring({ frame: frame - 15, fps, config: { stiffness: 80, damping: 10 } });
  const step2Entrance = spring({ frame: frame - 45, fps, config: { stiffness: 80, damping: 10 } });
  const step3Entrance = spring({ frame: frame - 75, fps, config: { stiffness: 80, damping: 10 } });

  const steps = [
      { id: 1, text: '아키텍처 설계', sub: 'ARCHITECTURE DESIGN', entrance: step1Entrance },
      { id: 2, text: 'AI 초안 작성', sub: 'AI DRAFTING', entrance: step2Entrance },
      { id: 3, text: '리팩토링 & 최적화', sub: 'REFACTORING', entrance: step3Entrance },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', padding: '5%' }}>
      <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '40px' }}>
        WORKFLOW CYCLE
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {steps.map((step) => (
              <div
                  key={step.id}
                  style={{
                      flex: 1,
                      backgroundColor: '#1A1A1A',
                      borderLeft: `12px solid ${interpolateColors(step.entrance, [0, 1], ['#454545', '#3B82F6'])}`,
                      borderRadius: '8px',
                      padding: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: step.entrance,
                      transform: `translateX(${interpolate(step.entrance, [0, 1], [-100, 0])}px)`,
                  } as React.CSSProperties}
              >
                  <div style={{ fontSize: '60px', fontWeight: 900, color: '#3B82F6', marginRight: '40px', width: '80px' }}>0{step.id}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ color: '#FFFFFF', fontSize: '40px', fontWeight: 900, fontFamily: 'Pretendard' }}>{step.text}</div>
                      <div style={{ color: '#454545', fontSize: '20px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{step.sub}</div>
                  </div>
              </div>
          ))}
      </div>
    </AbsoluteFill>
  );
};
