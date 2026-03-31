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
  const { fps, height } = useVideoConfig();

  // Entrance for review bubbles
  const entrance = spring({
    frame,
    fps,
    config: {
      stiffness: 80,
      damping: 10,
    },
  });

  // Vertical scan line position
  const scanPos = interpolate(frame % 90, [0, 90], [0, height]);
  const scanOpacity = interpolate(frame % 90, [0, 10, 80, 90], [0, 0.5, 0.5, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* Code Background Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          fontFamily: 'JetBrains Mono',
          fontSize: '20px',
          color: '#FFFFFF',
          padding: '40px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`function optimize(architecture) {\n  const AI = new Developer();\n  const efficiency = AI.analyze(architecture);\n  if (efficiency < 1.0) {\n    return AI.suggestOptimizations();\n  }\n  return architecture;\n}`}
      </div>

      {/* Horizontal Scan Line (Electric Blue) */}
      <div
          style={{
            position: 'absolute',
            top: scanPos,
            left: 0,
            width: '100%',
            height: '2px',
            backgroundColor: '#3B82F6',
            boxShadow: '0 0 20px #3B82F6',
            opacity: scanOpacity,
          }}
      />

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: '0 10%' }}>
        <div style={{ transform: `scale(${interpolate(entrance, [0, 1], [0.95, 1])})` }}>
          <div style={{ color: '#3B82F6', fontSize: '32px', fontWeight: 800, fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
            SENIOR CODE REVIEW
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: '56px', fontFamily: 'Pretendard', fontWeight: 900, textAlign: 'center' }}>
            시니어 개발자가 <br />내 옆에 있는 것처럼
          </h1>
        </div>
      </AbsoluteFill>

      {/* Suggestion Bubble (Bottom Right) */}
      <div
          style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              width: '320px',
              backgroundColor: '#1A1A1A',
              borderLeft: '8px solid #3B82F6',
              padding: '20px',
              borderRadius: '8px',
              opacity: interpolate(frame, [20, 35], [0, 1]),
              transform: `translateX(${interpolate(frame, [20, 35], [50, 0])}px)`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
      >
          <div style={{ color: '#3B82F6', fontSize: '16px', fontWeight: 700, marginBottom: '5px' }}>OPTIMIZATION TIP</div>
          <div style={{ color: '#FFFFFF', fontSize: '20px', fontFamily: 'Pretendard' }}>
            "아키텍처 구조를 개선하여 성능을 2배 높일 수 있습니다."
          </div>
      </div>
    </AbsoluteFill>
  );
};
