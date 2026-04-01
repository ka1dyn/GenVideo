import React from 'react';
import { Sequence, AbsoluteFill } from 'remotion';

export interface Subtitle {
  startFrame: number;
  endFrame: number;
  text: string;
}

interface CaptionOverlayProps {
  subtitles: Subtitle[];
}

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({ subtitles }) => {
  return (
    <AbsoluteFill style={{ zIndex: 9999, pointerEvents: 'none' }}>
      {subtitles.map((sub, index) => {
        const duration = Math.max(1, sub.endFrame - sub.startFrame);
        return (
          <Sequence
            key={index}
            from={sub.startFrame}
            durationInFrames={duration}
            name={`Subtitle-${index}`}
          >
            <div
              style={{
                position: 'absolute',
                bottom: '10%', // 화면 높이 90% 지점
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Pretendard, sans-serif',
                  fontWeight: 600,
                  fontSize: '28px', // 대본 전용 고정 자막
                  lineHeight: '1.4',
                  whiteSpace: 'pre-line',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
                  background: 'transparent',
                }}
              >
                {sub.text}
              </div>
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
