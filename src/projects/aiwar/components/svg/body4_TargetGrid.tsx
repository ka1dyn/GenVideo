import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, ANIMATION } from '../../../../constants/theme';

export const body4_TargetGrid: React.FC<{
  size?: number;
}> = ({
  size = 600,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = 2;
  const cols = 5;
  const total = rows * cols;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 20,
      width: size,
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const entryFrame = i * 5;
        const progress = spring({ frame: frame - entryFrame, fps, config: ANIMATION.SPRING_GENTLE });
        
        // Mark 4 out of 10 as "ERROR" / Misidentified
        const isError = i === 1 || i === 4 || i === 7 || i === 9;
        const errorFrame = 60 + (i * 2);
        const errorProgress = spring({ frame: frame - errorFrame, fps, config: ANIMATION.SPRING_SNAPPY });

        return (
          <div key={i} style={{
            width: size / cols - 20,
            height: size / cols - 20,
            border: `2px solid ${COLORS.TEXT_SUB}33`,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            opacity: progress,
            transform: `scale(${progress})`,
            backgroundColor: isError && frame > errorFrame ? `${COLORS.STATE_ERROR_BG}44` : 'transparent',
          }}>
            {/* Person Icon */}
            <span style={{ fontSize: 40, opacity: 0.8 }}>👤</span>
            
            {/* Error Overlay */}
            {isError && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: errorProgress,
                transform: `scale(${interpolate(errorProgress, [0, 1], [2, 1])})`,
              }}>
                <div style={{
                  width: '80%',
                  height: '80%',
                  position: 'relative',
                }}>
                  {/* Red Cross */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: 4,
                    backgroundColor: COLORS.STATE_ERROR_FG,
                    transform: 'rotate(45deg)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: 4,
                    backgroundColor: COLORS.STATE_ERROR_FG,
                    transform: 'rotate(-45deg)',
                  }} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
