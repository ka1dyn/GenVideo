import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { TypeWriter } from '../../../../shared-components/TypeWriter';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARKEST }}>
      <Img 
        src={staticFile('mythos/body1/images/prison.png')} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: EFFECTS.TINT_DARK }} />
      <PaperTexture />
      
      <AbsoluteFill style={{ 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 150,
      }}>
        <Wobble mode="smooth" intensity={2} rotationIntensity={0.5}>
          <div style={{
            fontSize: FONTS.SIZE_2XL,
            color: COLORS.TEXT_ON_DARK,
            fontFamily: FONTS.DISPLAY,
            fontWeight: FONTS.WEIGHT_BOLD,
            textAlign: 'center',
            textShadow: EFFECTS.SHADOW_LG,
          }}>
            <TypeWriter text="아무것도 못하는 방" startFrame={28} speed={3} />
          </div>
        </Wobble>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
