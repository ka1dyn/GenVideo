import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene6: React.FC = () => {
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DARK,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <PaperTexture />
      
      <div style={{ paddingBottom: 150, zIndex: 1 }}>
        <Appear type="blur" delay={28}>
          <Wobble mode="smooth" intensity={3} rotationIntensity={1}>
            <div style={{
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.TEXT_ON_DARK,
              fontFamily: FONTS.DISPLAY,
              fontWeight: FONTS.WEIGHT_BOLD,
              textAlign: 'center',
            }}>
              진짜 소름 돋는 사실
            </div>
          </Wobble>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
