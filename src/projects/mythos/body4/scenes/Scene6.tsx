import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene6: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARKEST,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PaperTexture />

      {/* 배경 패턴 (코드 느낌) */}
      <AbsoluteFill
        style={{
          zIndex: Z.BG,
          opacity: 0.1,
          fontFamily: FONTS.MONO,
          fontSize: SPACING.PX_24,
          color: COLORS.TEXT_ON_DARK,
          overflow: 'hidden',
          padding: SPACING.PX_40,
          lineHeight: 1.5,
          userSelect: 'none',
        }}
      >
        {Array(20).fill(0).map((_, i) => (
          <div key={i}>
            {`const model = "opus4.7"; function evaluate(ai) { return ai === model ? 1 : null; }`.repeat(2)}
          </div>
        ))}
      </AbsoluteFill>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_32,
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={10} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.MONO,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.TEXT_SUB,
              letterSpacing: '0.2em',
            }}
          >
            CODING PERFORMANCE
          </div>
        </Appear>

        <Appear delay={82} type="scale">
          <UnderLine startFrame={107} color={COLORS.PRIMARY} height={12}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_3XL,
                color: COLORS.PRIMARY,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                textAlign: 'center',
              }}
            >
              공개된 AI 중 1위
            </div>
          </UnderLine>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
