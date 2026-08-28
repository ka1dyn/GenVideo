import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene5: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PaperTexture />

      <div style={{ zIndex: Z.CONTENT }}>
        {/* 질문: 성능이 낮을까? */}
        <Appear delay={28} exitAt={79} type="fade">
          <Wobble mode="smooth" intensity={2}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_LG,
                color: COLORS.TEXT_SUB,
                fontWeight: FONTS.WEIGHT_MEDIUM,
                textAlign: 'center',
              }}
            >
              성능이 낮을까?
            </div>
          </Wobble>
        </Appear>

        {/* 답변: 최상위권 성능 */}
        <Appear delay={79} type="scale">
          <UnderLine startFrame={91} color={COLORS.PRIMARY_BOLD} height={10}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_2XL,
                color: COLORS.PRIMARY_BOLD,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                textAlign: 'center',
              }}
            >
              최상위권 성능
            </div>
          </UnderLine>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
