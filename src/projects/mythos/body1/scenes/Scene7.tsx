import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';

export const Scene7: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DARKEST,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.PX_80,
      padding: SPACING.PX_80,
    }}>
      <PaperTexture />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(${COLORS.TEXT_MAIN} 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        opacity: 0.1,
      }} />
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingBottom: 150, zIndex: 1 }}>
        <Appear type="fadeLeft" delay={60}>
          <QuoteCard accentColor={COLORS.TEXT_DISABLED}>
            <div style={{
              textAlign: 'center',
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_MAIN,
              fontFamily: FONTS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
              width: 450,
            }}>
              규칙 위반 인식
            </div>
          </QuoteCard>
        </Appear>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingBottom: 150, zIndex: 1 }}>
        <Appear type="fadeRight" delay={135}>
          <QuoteCard accentColor={COLORS.PRIMARY}>
            <div style={{
              textAlign: 'center',
              fontSize: FONTS.SIZE_LG,
              color: COLORS.PRIMARY,
              fontFamily: FONTS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
              width: 450,
            }}>
              의도적 은폐 시도
            </div>
          </QuoteCard>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
