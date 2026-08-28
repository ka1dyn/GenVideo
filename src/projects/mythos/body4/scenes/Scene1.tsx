import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PaperTexture />
      
      {/* 배경 그리드 패턴 */}
      <AbsoluteFill
        style={{
          zIndex: Z.BG,
          backgroundImage: `
            linear-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px)
          `,
          backgroundSize: `${SPACING.PX_80}px ${SPACING.PX_80}px`,
          opacity: 0.3,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_16,
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={8} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_SUB,
              fontWeight: FONTS.WEIGHT_MEDIUM,
            }}
          >
            Claude
          </div>
        </Appear>

        <Appear delay={23} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
              letterSpacing: '0.1em',
            }}
          >
            NEXT MODEL
          </div>
        </Appear>

        <Appear delay={42} type="scale">
          <UnderLine startFrame={59} color={COLORS.PRIMARY} height={8}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_3XL,
                color: COLORS.TEXT_MAIN,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
              }}
            >
              Mythos
            </div>
          </UnderLine>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
