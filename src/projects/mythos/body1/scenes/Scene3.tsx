import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene3: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_EMPHASIS,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PaperTexture />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 2px, transparent 2px)`,
        backgroundSize: '50px 50px',
        opacity: 0.3,
      }} />

      <Appear type="scale" delay={0}>
        <div style={{
          fontSize: FONTS.SIZE_4XL,
          color: COLORS.PRIMARY_BOLD,
          fontFamily: FONTS.DISPLAY,
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          textAlign: 'center',
          paddingBottom: 150, // Subtitle safety
        }}>
          "한번 <UnderLine startFrame={14} color={COLORS.PRIMARY} height={12} offset={-10}>탈출해봐</UnderLine>"
        </div>
      </Appear>
    </AbsoluteFill>
  );
};
