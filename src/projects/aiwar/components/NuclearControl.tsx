import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { interpolate, useVideoConfig } from 'remotion';

interface Props {
  progress: number;
}

/**
 * @gallery: <NuclearControl progress={1} />
 */
export const NuclearControl: React.FC<Props> = ({ progress }) => {
  const pulse = Math.sin(progress * 20) * 0.5 + 0.5;
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      backgroundColor: progress > 0.5 ? COLORS.STATE_ERROR_BG : COLORS.BG_DARKEST,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px'
    }}>
      <Wobble intensity={progress > 0.8 ? 5 : 2}>
        <div style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: COLORS.STATE_ERROR_FG,
          border: `10px solid ${COLORS.STROKE_INK}`,
          boxShadow: `0 0 ${progress * 100}px ${COLORS.STATE_ERROR_FG}`,
          opacity: progress > 0.2 ? 1 : 0,
          transform: `scale(${progress > 0.5 ? 1 + pulse * 0.1 : 1})`,
        }} />
      </Wobble>
      
      <div style={{ 
        fontFamily: FONTS.MONO, 
        fontSize: '48px', 
        fontWeight: 'bold', 
        color: progress > 0.5 ? COLORS.STATE_ERROR_FG : COLORS.TEXT_ON_DARK,
        textAlign: 'center'
      }}>
        {progress > 0.6 ? "핵전쟁 시뮬레이션: 95%" : "계산 중..."}
      </div>
    </div>
  );
};
