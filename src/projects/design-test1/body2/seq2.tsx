import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();

  // 1, 2, 3 순차적 불켜짐
  const step1 = frame > 10;
  const step2 = frame > 30;
  const step3 = frame > 50;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      
      <div style={{ color: '#FFFFFF', fontSize: '90px', fontWeight: 900, fontFamily: 'Inter', marginBottom: '50px' }}>
        3 STEPS
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{
          width: '50px', height: '50px', borderRadius: '50%',
          backgroundColor: step1 ? '#0071E3' : '#333336',
          boxShadow: step1 ? '0 0 30px #0071E3' : 'none',
          transition: 'all 0.1s'
        }} />
        <div style={{
          width: '50px', height: '50px', borderRadius: '50%',
          backgroundColor: step2 ? '#0071E3' : '#333336',
          boxShadow: step2 ? '0 0 30px #0071E3' : 'none',
          transition: 'all 0.1s'
        }} />
        <div style={{
          width: '50px', height: '50px', borderRadius: '50%',
          backgroundColor: step3 ? '#0071E3' : '#333336',
          boxShadow: step3 ? '0 0 30px #0071E3' : 'none',
          transition: 'all 0.1s'
        }} />
      </div>

    </AbsoluteFill>
  );
};
