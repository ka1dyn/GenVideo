import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { spring, useVideoConfig, interpolate } from 'remotion';

interface Props {
  progress: number;
}

/**
 * @gallery: <EndingCard progress={1} />
 */
export const EndingCard: React.FC<Props> = ({ progress }) => {
  const { fps } = useVideoConfig();
  const bounce = spring({ frame: progress * 60 - 30, fps, config: { damping: 8, stiffness: 200 } });
  
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BG_DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '50px' }}>
      <Wobble intensity={2}>
        <div style={{ 
          padding: '40px 80px', 
          backgroundColor: COLORS.BG_SURFACE, 
          borderRadius: '40px',
          border: `4px solid ${COLORS.PRIMARY}`,
          fontSize: '48px',
          fontFamily: FONTS.HANDWRITING,
          color: COLORS.PRIMARY_BOLD,
          transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`
        }}>
          나만빼고 AI
        </div>
      </Wobble>
      
      <div style={{ 
        padding: '20px 60px', 
        backgroundColor: COLORS.PRIMARY_BOLD, 
        color: 'white', 
        borderRadius: '20px', 
        fontSize: '32px', 
        fontFamily: FONTS.DISPLAY,
        fontWeight: 'bold',
        transform: `scale(${0.8 + bounce * 0.2})`,
        opacity: progress > 0.5 ? 1 : 0
      }}>
        구독하기
      </div>
    </div>
  );
};
