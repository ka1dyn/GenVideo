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

  // Snappy entrance for the flow line
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Flow line width: 0 -> 100%
  const lineWidth = entrance * 100;

  // Prototype UI Frame scaling
  const frameScale = interpolate(frame, [30, 60], [0.5, 1], { extrapolateRight: 'clamp' });
  const frameOpacity = interpolate(frame, [30, 45], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      {/* Horizontal Flow Line (Electric Blue) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: `${lineWidth}%`,
          height: '4px',
          backgroundColor: '#3B82F6',
          boxShadow: '0 0 15px #3B82F6',
          transform: 'translateY(-50%)',
        }}
      />

      <div style={{ zIndex: 10, textAlign: 'center', transform: `translateY(${(-1 + entrance) * 50}px)` }}>
        <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
          SKETCH → PROTOTYPE
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: '48px', fontFamily: 'Pretendard', fontWeight: 900 }}>
          병목 현상 없는 개발 흐름
        </h1>
      </div>

      {/* Decorative Prototype Frame */}
      <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '300px',
            height: '200px',
            border: '2px solid #3B82F6',
            borderRadius: '12px',
            opacity: frameOpacity,
            transform: `scale(${frameScale}) rotate(-5deg)`,
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            backgroundColor: '#0A0A0A',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          }}
      >
          <div style={{ height: '20px', width: '60px', backgroundColor: '#3B82F6', marginBottom: '10px', borderRadius: '4px' }} />
          <div style={{ height: '10px', width: '100%', backgroundColor: '#27272A', marginBottom: '5px' }} />
          <div style={{ height: '10px', width: '80%', backgroundColor: '#27272A', marginBottom: '5px' }} />
          <div style={{ flex: 1 }} />
          <div style={{ height: '30px', width: '100%', backgroundColor: '#3B82F6', borderRadius: '4px' }} />
      </div>
    </AbsoluteFill>
  );
};
