import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the split line
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Split position: 0 -> 0.5 (center)
  const splitPos = entrance * 0.5;

  // AI Content Opacity
  const aiOpacity = interpolate(frame, [15, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', flexDirection: 'row' }}>
      {/* Left Pane (Manual/Past) */}
      <div
        style={{
          width: `${splitPos * 100}%`,
          height: '100%',
          backgroundColor: '#1A1A1A',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRight: '4px solid #3B82F6',
          overflow: 'hidden',
        }}
      >
        <div style={{ color: '#454545', fontFamily: 'JetBrains Mono', fontSize: '24px', opacity: 0.5 }}>
          {`<div className="manual">\n  <h1>Manual Code</h1>\n  <button onClick={() => {}}>\n    Click Me\n  </button>\n</div>`}
        </div>
      </div>

      {/* Right Pane (AI/Future) */}
      <div
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 5%',
          opacity: aiOpacity,
        }}
      >
          <div
            style={{
              color: '#3B82F6',
              fontSize: '32px',
              fontWeight: 800,
              fontFamily: 'JetBrains Mono',
              marginBottom: '10px',
            }}
          >
            AI PAIR PROGRAMMER
          </div>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '56px',
              fontFamily: 'Pretendard',
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            우리의 가장 든든한<br />페어 프로그래머
          </h1>
      </div>
    </AbsoluteFill>
  );
};
