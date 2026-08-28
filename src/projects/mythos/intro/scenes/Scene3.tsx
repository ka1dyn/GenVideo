import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';

export const Scene3: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <PaperTexture isDark />
      
      {/* 1. Base Background Image (Starts from 0f) */}
      <AbsoluteFill style={{ zIndex: Z.BG }}>
        <Img 
          src={staticFile('/mythos/intro/images/주가하락.png')} 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }} 
        />
        {/* Subtle initial overlay for readability of 'Mythos' */}
        <AbsoluteFill style={{ backgroundColor: COLORS.OVERLAY_LIGHT, opacity: 0.3 }} />
      </AbsoluteFill>

      {/* 2. Dark Overlay Wipe (Starts at 96f) */}
      <Appear 
        delay={30} 
        type="wipe" 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: Z.BG + 1 
        }}
      >
        <AbsoluteFill style={{ backgroundColor: "#000000", opacity: 0.8 }} />
      </Appear>

      {/* Centered Content */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        paddingBottom: 150, // 자막 영역 확보
        zIndex: Z.CONTENT,
        gap: SPACING.PX_48
      }}>
        {/* Mythos Title (Starts from 0f) */}
        <Appear delay={50} type="scale">
          <div style={{ 
            fontSize: FONTS.SIZE_4XL, 
            color: COLORS.PRIMARY, 
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            fontFamily: FONTS.DISPLAY,
            textShadow: `0 0 40px ${COLORS.OVERLAY_PRIMARY}`
          }}>
            Mythos
          </div>
        </Appear>
        
        {/* Stock Crash Label (Starts at 96f) */}
        <Appear delay={96} type="fadeUp">
          <div style={{ 
            fontSize: FONTS.SIZE_2XL, 
            color: COLORS.STATE_ERROR_FG,
            fontWeight: FONTS.WEIGHT_BOLD,
            fontFamily: FONTS.PRIMARY,
            backgroundColor: COLORS.STATE_ERROR_BG,
            padding: `${SPACING.PX_16}px ${SPACING.PX_40}px`,
            borderRadius: SPACING.RADIUS_MD,
            boxShadow: `0 0 30px ${COLORS.STATE_ERROR_BG}`,
            letterSpacing: -2
          }}>
            주가 폭락
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
