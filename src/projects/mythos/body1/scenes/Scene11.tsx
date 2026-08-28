import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene11: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DARK,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PaperTexture />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(135deg, ${COLORS.OVERLAY_MED} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.15,
      }} />

      <div style={{ paddingBottom: 150, zIndex: 1 }}>
        <Appear delay={66} type="scale">
          <QuoteCard accentColor={COLORS.PRIMARY}>
            <div style={{
              fontSize: FONTS.SIZE_3XL,
              color: COLORS.PRIMARY_BOLD,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`,
            }}>
              <UnderLine startFrame={66} color={COLORS.PRIMARY} height={12} offset={-8}>
                "경솔하다"
              </UnderLine>
            </div>
          </QuoteCard>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
