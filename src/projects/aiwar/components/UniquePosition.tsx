import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { spring, useVideoConfig } from 'remotion';

interface Props {
  progress: number;
}

/**
 * @gallery: <UniquePosition progress={1} />
 */
export const UniquePosition: React.FC<Props> = ({ progress }) => {
  const { fps } = useVideoConfig();
  const fitSpring = spring({ frame: progress * 60 - 20, fps, config: { damping: 12, stiffness: 150 } });
  
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BG_BASE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '400px', height: '400px', border: `4px dashed ${COLORS.STROKE_DEFAULT}`, borderRadius: '40px' }}>
        {/* The Core Piece */}
        <Wobble intensity={2}>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            backgroundColor: COLORS.SECONDARY_BOLD,
            borderRadius: '20px',
            border: `4px solid ${COLORS.STROKE_INK}`,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) translate(${(1 - fitSpring) * 100}px, ${(1 - fitSpring) * -150}px) rotate(${(1 - fitSpring) * 15}deg)`,
            boxShadow: `0 0 ${fitSpring * 40}px ${COLORS.SECONDARY}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: FONTS.DISPLAY,
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            CLAUDE
          </div>
        </Wobble>
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          width: '100%',
          textAlign: 'center',
          fontFamily: FONTS.HANDWRITING,
          fontSize: '32px',
          opacity: fitSpring
        }}>
          No Alternative
        </div>
      </div>
    </div>
  );
};
