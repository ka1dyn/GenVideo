import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene3: React.FC = () => {
  const START_DELAY = 0; // 365 - 365
  const ALERT_DELAY = 59; // 424 - 365

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARK,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.PX_48,
      }}
    >
      <PaperTexture />

      <Appear delay={START_DELAY} type="fadeUp">
        <span
          style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_LG,
            color: COLORS.TEXT_ON_DARK,
            opacity: 0.8,
          }}
        >
          잠재적 위험성 경고
        </span>
      </Appear>

      <Appear delay={ALERT_DELAY} type="scale">
        <QuoteCard accentColor={COLORS.STATE_ERROR_FG}>
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.PX_16 }}>
            <span
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                color: COLORS.TEXT_MAIN,
              }}
            >
              실제 세상에 큰
            </span>
            <Wobble mode="jumpy" intensity={2}>
              <span
                style={{
                  fontFamily: FONTS.DISPLAY,
                  fontSize: FONTS.SIZE_2XL,
                  fontWeight: FONTS.WEIGHT_EXTRABOLD,
                  color: COLORS.STATE_ERROR_FG,
                }}
              >
                위험
              </span>
            </Wobble>
            <span
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_XL,
                fontWeight: FONTS.WEIGHT_BOLD,
                color: COLORS.TEXT_MAIN,
              }}
            >
              초래
            </span>
          </div>
        </QuoteCard>
      </Appear>
    </AbsoluteFill>
  );
};
