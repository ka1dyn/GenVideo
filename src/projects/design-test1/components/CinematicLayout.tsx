import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const CinematicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  
  // Subtle Film Grain effect simulation
  const grainOpacity = 0.03;
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#020617', overflow: 'hidden' }}>
      {/* Background Layer */}
      {children}
      
      {/* Vignette Effect */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />
      
      {/* Film Grain (Simulated with a subtle noise-like gradient or pulsing) */}
      <AbsoluteFill
        style={{
          opacity: grainOpacity,
          backgroundColor: '#ffffff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />

      {/* Letterbox Bars (2.35:1 Aspect Ratio) */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        {/* Top Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12%',
            backgroundColor: 'black',
          }}
        />
        {/* Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '12%',
            backgroundColor: 'black',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
