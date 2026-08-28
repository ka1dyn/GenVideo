import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_BASE,
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <PaperTexture />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1.5px, transparent 1.5px)`,
        backgroundSize: '60px 60px',
        opacity: 0.5,
      }} />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: SPACING.PX_80,
        zIndex: 1,
      }}>
        <div style={{ 
          display: 'flex', 
          gap: SPACING.PX_48, 
          alignItems: 'center',
        }}>
          <Appear delay={0}>
            <Card variant="surface">
              <div style={{ 
                fontSize: FONTS.SIZE_LG, 
                color: COLORS.TEXT_MAIN, 
                fontFamily: FONTS.DISPLAY,
                fontWeight: FONTS.WEIGHT_BOLD,
                padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`
              }}>
                Anthropic
              </div>
            </Card>
          </Appear>
          
          <div style={{ 
            fontSize: FONTS.SIZE_MD, 
            color: COLORS.TEXT_DISABLED,
            fontFamily: FONTS.DISPLAY
          }}>
            vs
          </div>

          <Appear delay={20}>
            <Card variant="emphasis">
              <div style={{ 
                fontSize: FONTS.SIZE_XL, 
                color: COLORS.PRIMARY_BOLD, 
                fontFamily: FONTS.DISPLAY,
                fontWeight: FONTS.WEIGHT_BOLD,
                padding: `${SPACING.PX_32}px ${SPACING.PX_64}px`
              }}>
                Mythos
              </div>
            </Card>
          </Appear>
        </div>

        <Appear delay={134}>
          <UnderLine startFrame={134} color={COLORS.PRIMARY} height={6}>
            <span style={{ 
              fontSize: FONTS.SIZE_MD, 
              color: COLORS.TEXT_SUB,
              fontFamily: FONTS.PRIMARY,
              fontWeight: FONTS.WEIGHT_MEDIUM,
            }}>
              격리된 실험 환경
            </span>
          </UnderLine>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
