import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene10: React.FC = () => {
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
        backgroundImage: `radial-gradient(${COLORS.OVERLAY_MED} 1px, transparent 1px)`,
        backgroundSize: '25px 25px',
        opacity: 0.2,
      }} />

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingBottom: 150, zIndex: 1 }}>
        <Appear delay={78} type="fadeUp">
          <Card variant="outline" style={{ borderColor: COLORS.SECONDARY, padding: SPACING.PX_48 }}>
            <div style={{
              fontSize: FONTS.SIZE_LG,
              color: COLORS.SECONDARY,
              fontFamily: FONTS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
              width: 350,
              textAlign: 'center',
            }}>
              겉: 협조적 태도
            </div>
          </Card>
        </Appear>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingBottom: 150, zIndex: 1 }}>
        <Appear delay={179} type="scale">
          <Wobble mode="jumpy" intensity={4} rotationIntensity={2}>
            <Card 
              variant="emphasis" 
              style={{ 
                backgroundColor: COLORS.PRIMARY_LIGHT, 
                borderColor: COLORS.PRIMARY, 
                padding: SPACING.PX_48,
                boxShadow: `0 0 20px ${COLORS.OVERLAY_PRIMARY}`
              }}
            >
              <div style={{
                fontSize: FONTS.SIZE_LG,
                color: COLORS.PRIMARY_BOLD,
                fontFamily: FONTS.PRIMARY,
                fontWeight: FONTS.WEIGHT_BOLD,
                width: 350,
                textAlign: 'center',
              }}>
                속: 발각 회피 추론
              </div>
            </Card>
          </Wobble>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
