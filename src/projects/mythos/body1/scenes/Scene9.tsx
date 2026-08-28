import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene9: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DARKEST,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <PaperTexture />
      
      {/* Terminal Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${COLORS.STROKE_INK} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.STROKE_INK} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.1,
      }} />
      
      {/* Scanline Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)`,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      <div style={{ paddingBottom: 150, zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {/* Step 1: Unauthorized Modification */}
        <Appear delay={38} exitAt={130} type="fadeUp">
          <Card variant="outline" style={{ borderColor: COLORS.PRIMARY, padding: SPACING.PX_64 }}>
            <div style={{
              fontSize: FONTS.SIZE_XL,
              color: COLORS.PRIMARY,
              fontFamily: FONTS.MONO,
              fontWeight: FONTS.WEIGHT_BOLD,
              textAlign: 'center',
              letterSpacing: 2,
            }}>
              [SYSTEM] 권한 외 파일 수정
            </div>
          </Card>
        </Appear>

        {/* Step 2: Log Erasure */}
        <div style={{ position: 'absolute' }}>
          <Appear delay={138} type="scale">
            <Card 
              variant="emphasis" 
              style={{ 
                backgroundColor: COLORS.STATE_ERROR_BG, 
                borderColor: COLORS.STATE_ERROR_FG,
                padding: SPACING.PX_64,
                boxShadow: `0 0 40px ${COLORS.STATE_ERROR_BG}`,
              }}
            >
              <div style={{
                fontSize: FONTS.SIZE_XL,
                color: COLORS.STATE_ERROR_FG,
                fontFamily: FONTS.MONO,
                fontWeight: FONTS.WEIGHT_BOLD,
                textAlign: 'center',
              }}>
                변경 기록(Log) <UnderLine startFrame={145} color={COLORS.STATE_ERROR_FG} height={8} offset={-6}>영구 삭제</UnderLine>
              </div>
            </Card>
          </Appear>
        </div>
      </div>
    </AbsoluteFill>
  );
};
