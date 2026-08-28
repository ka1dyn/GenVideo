import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { ProgressBar } from '../../../../shared-components/ProgressBar';

export const Scene6: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARKEST,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.PX_80,
        paddingBottom: 150,
      }}
    >
      <PaperTexture isDark />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_40 }}>
        <Appear delay={10}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.TEXT_ON_DARK,
              fontWeight: FONTS.WEIGHT_MEDIUM,
              opacity: 0.8,
            }}
          >
            AI 공개의 위험성
          </div>
        </Appear>

        <Appear delay={77} type="scale">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_3XL,
              color: COLORS.STATE_ERROR_FG,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              textAlign: 'center',
            }}
          >
            전세계 시스템 공격
          </div>
        </Appear>
      </div>

      <div style={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_24 }}>
        <ProgressBar
          value={1.0}
          startFrame={97}
          duration={45}
          color={COLORS.STATE_ERROR_FG}
          trackColor={COLORS.BG_DARK}
          height={SPACING.PX_16}
        />
        <Appear delay={142}>
          <div
            style={{
              fontFamily: FONTS.MONO,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.STATE_ERROR_FG,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            위험 지수: 100%
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
