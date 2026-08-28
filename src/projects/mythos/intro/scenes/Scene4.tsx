import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Counter } from '../../../../shared-components/Counter';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_MUTED }}>
      <PaperTexture />
      
      {/* Background Line Pattern */}
      <div style={{ 
        position: 'absolute', 
        inset: 0, 
        backgroundImage: `linear-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
        backgroundSize: '100% 80px',
        opacity: 0.3
      }} />

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 확보
        zIndex: Z.CONTENT,
        gap: SPACING.PX_40
      }}>
        <Appear delay={0}>
          <div style={{ 
            fontSize: FONTS.SIZE_MD, 
            color: COLORS.TEXT_SUB, 
            fontFamily: FONTS.PRIMARY,
            fontWeight: FONTS.WEIGHT_MEDIUM 
          }}>
            성능
          </div>
        </Appear>

        <div style={{ 
          fontSize: FONTS.SIZE_4XL, 
          color: COLORS.PRIMARY_BOLD, 
          fontWeight: FONTS.WEIGHT_EXTRABOLD,
          fontFamily: FONTS.MONO,
          lineHeight: 1
        }}>
          <Counter to={99.9} decimals={1} suffix="%" startFrame={29} duration={45} />
        </div>

        <Appear delay={58}>
          <div style={{ 
            fontSize: FONTS.SIZE_LG, 
            color: COLORS.STATE_WARN_FG, 
            fontWeight: FONTS.WEIGHT_BOLD,
            fontFamily: FONTS.PRIMARY
          }}>
            <UnderLine startFrame={58} color={COLORS.STATE_WARN_FG}>
              전 세계 충격
            </UnderLine>
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
