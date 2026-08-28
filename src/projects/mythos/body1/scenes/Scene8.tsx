import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { TypeWriter } from '../../../../shared-components/TypeWriter';

export const Scene8: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_MUTED,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PaperTexture />
      
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 150,
        zIndex: 1 
      }}>
        <Appear delay={0} exitAt={150} type="fade">
          <Img 
            src={staticFile('mythos/body1/images/footprint.png')} 
            style={{
              width: 600,
              height: 'auto',
              opacity: 0.7,
            }}
          />
        </Appear>

        <div style={{ 
          position: 'absolute', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Appear delay={150} type="scale">
            <div style={{
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.STATE_ERROR_FG,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_BOLD,
              backgroundColor: COLORS.BG_BASE,
              padding: `${SPACING.PX_32}px ${SPACING.PX_64}px`,
              borderRadius: SPACING.RADIUS_MD,
              border: `${SPACING.BORDER_THICK}px solid ${COLORS.STATE_ERROR_FG}`,
              boxShadow: EFFECTS.SHADOW_LG,
            }}>
              <TypeWriter text="흔적 삭제 완료" startFrame={150} speed={2} />
            </div>
          </Appear>
        </div>
      </div>
    </AbsoluteFill>
  );
};
