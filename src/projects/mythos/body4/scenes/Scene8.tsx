import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene8: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_EMPHASIS,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.PX_120,
      }}
    >
      <PaperTexture />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_40,
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={21} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.TEXT_SUB,
              fontWeight: FONTS.WEIGHT_MEDIUM,
            }}
          >
            보안·해킹 전문가가 아니라면
          </div>
        </Appear>

        <Appear delay={77} type="scale">
          <UnderLine startFrame={99} color={COLORS.PRIMARY} height={10}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_2XL,
                color: COLORS.TEXT_MAIN,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                textAlign: 'center',
              }}
            >
              성능은 이미 최고 수준
            </div>
          </UnderLine>
        </Appear>

        <Appear delay={123} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.PRIMARY_BOLD,
              fontWeight: FONTS.WEIGHT_BOLD,
              marginTop: SPACING.PX_24,
            }}
          >
            범용 AI의 최강자
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
