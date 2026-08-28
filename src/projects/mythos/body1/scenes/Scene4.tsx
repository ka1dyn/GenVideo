import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';

export const Scene4: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_SURFACE,
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
        backgroundImage: `linear-gradient(45deg, ${COLORS.BG_MUTED} 25%, transparent 25%, transparent 50%, ${COLORS.BG_MUTED} 50%, ${COLORS.BG_MUTED} 75%, transparent 75%, transparent)`,
        backgroundSize: '100px 100px',
        opacity: 0.2,
      }} />
      
      <div style={{ flex: 1.2, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
        <Appear type="fadeRight" delay={34}>
          <Img 
            src={staticFile('mythos/body1/images/exit.png')} 
            style={{
              width: '100%',
              maxWidth: 800,
              height: 'auto',
              borderRadius: SPACING.RADIUS_XL,
              boxShadow: EFFECTS.SHADOW_LG,
              border: `${SPACING.BORDER_THICK}px solid ${COLORS.STROKE_INK}`,
            }}
          />
        </Appear>
      </div>

      <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center', zIndex: 1, paddingBottom: 150 }}>
        <Appear type="scale" delay={57}>
          <Card 
            variant="emphasis" 
            style={{ 
              backgroundColor: COLORS.STATE_SUCCESS_BG,
              borderColor: COLORS.STATE_SUCCESS_FG,
              borderWidth: SPACING.BORDER_THICK,
            }}
          >
            <div style={{
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.STATE_SUCCESS_FG,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_BOLD,
              padding: `${SPACING.PX_24}px ${SPACING.PX_40}px`,
              textAlign: 'center',
            }}>
              탈출 성공
            </div>
          </Card>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
