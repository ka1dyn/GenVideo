import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from 'remotion';

export const Seq9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 역동적인 글자 채우기 애니메이션
  const fill = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const width = interpolate(fill, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      
      <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
        
        {/* Outline Text */}
        <div
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px #333336',
            fontSize: '150px',
            fontWeight: 900,
            fontFamily: 'Inter',
            lineHeight: 1,
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          }}
        >
          PROMPT
          <br />
          ENGINEERING
        </div>

        {/* Filled Text (Masked) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${width}%`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '150px',
              fontWeight: 900,
              fontFamily: 'Inter',
              lineHeight: 1,
              width: '1920px',
              textAlign: 'center',
            }}
          >
            PROMPT
            <br />
            ENGINEERING
          </div>
        </div>

      </div>

    </AbsoluteFill>
  );
};
