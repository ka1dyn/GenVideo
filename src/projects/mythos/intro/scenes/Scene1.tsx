import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture isDark />
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%',
        height: '100%',
        padding: `0 ${SPACING.PX_80}px`,
        paddingBottom: 150, // 자막 영역 확보
      }}>
        {/* Left Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: SPACING.PX_24, zIndex: Z.CONTENT }}>
          <Appear delay={0}>
            <div style={{ 
              color: COLORS.TEXT_ON_DARK, 
              fontSize: FONTS.SIZE_2XL, 
              fontWeight: FONTS.WEIGHT_BOLD,
              fontFamily: FONTS.DISPLAY 
            }}>
              2026. 03. 26
            </div>
          </Appear>
          <Appear delay={69}>
            <div style={{ 
              color: COLORS.PRIMARY, 
              fontSize: FONTS.SIZE_MD, 
              fontWeight: FONTS.WEIGHT_MEDIUM,
              fontFamily: FONTS.PRIMARY,
              letterSpacing: '0.1em'
            }}>
              ANTHROPIC
            </div>
          </Appear>
        </div>

        {/* Right Content */}
        <div style={{ 
          flex: 1.2, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: Z.CONTENT 
        }}>
          <Appear delay={113} type="scale">
            <div style={{
              position: 'relative',
              boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
              borderRadius: SPACING.RADIUS_MD,
              overflow: 'hidden',
              transform: 'rotate(2deg)' // 약간의 기울기로 유출 문서 느낌 강조
            }}>
              <Img 
                src={staticFile('/mythos/intro/images/내부문서.png')} 
                style={{ 
                  width: '100%',
                  maxWidth: 850,
                  display: 'block'
                }} 
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                border: `${SPACING.BORDER_THIN}px solid ${COLORS.STROKE_STRONG}`,
                pointerEvents: 'none'
              }} />
            </div>
          </Appear>
        </div>
      </div>
    </AbsoluteFill>
  );
};
