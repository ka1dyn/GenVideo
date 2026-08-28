import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene6: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARK }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 회피
        gap: SPACING.PX_80,
      }}>
        <Appear delay={0} type="fadeDown">
          <Card variant="outline">
            <span style={{ 
              fontFamily: FONTS.PRIMARY, 
              fontSize: FONTS.SIZE_MD, 
              color: COLORS.TEXT_ON_DARK,
              padding: `0 ${SPACING.PX_32}px`,
            }}>
              신뢰의 근거
            </span>
          </Card>
        </Appear>

        <Appear delay={49} type="scale">
          <Wobble mode="jumpy" intensity={3}>
            <div style={{ 
              fontFamily: FONTS.DISPLAY, 
              fontSize: FONTS.SIZE_2XL, 
              fontWeight: FONTS.WEIGHT_BOLD, 
              color: COLORS.STATE_ERROR_FG,
              textShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}>
              근거의 붕괴
            </div>
          </Wobble>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
