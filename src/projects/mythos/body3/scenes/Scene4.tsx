import React from 'react';
import { AbsoluteFill, staticFile, Img } from 'remotion';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { Counter } from '../../../../shared-components/Counter';

export const Scene4: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DARK }}>
      <PaperTexture isDark />
      
      {/* 배경 이미지 */}
      <AbsoluteFill>
        <Img
          src={staticFile('mythos/body3/images/openbsd.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
          }}
        />
        <AbsoluteFill style={{ backgroundColor: EFFECTS.TINT_DARK }} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.PX_64,
          padding: SPACING.PX_80,
          paddingBottom: 230,
        }}
      >
        {/* 과거 데이터 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_32 }}>
          <div
            style={{
              fontFamily: FONTS.MONO,
              fontSize: FONTS.SIZE_3XL,
              color: COLORS.TEXT_ON_DARK,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              textShadow: EFFECTS.SHADOW_MD,
            }}
          >
            <Counter to={27} startFrame={150} duration={45} suffix="년" />
          </div>
          <Appear delay={150}>
            <Card variant="outline">
              <div
                style={{
                  padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_LG,
                  color: COLORS.TEXT_ON_DARK,
                }}
              >
                27년 동안 미발견
              </div>
            </Card>
          </Appear>
        </div>

        {/* 화살표 */}
        <Appear delay={200}>
          <div style={{ fontSize: FONTS.SIZE_2XL, color: COLORS.PRIMARY, opacity: 0.8 }}>→</div>
        </Appear>

        {/* Mythos 결과 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_32 }}>
          <Appear delay={223} type="scale">
            <div
              style={{
                fontFamily: FONTS.MONO,
                fontSize: FONTS.SIZE_3XL,
                color: COLORS.PRIMARY,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                textShadow: EFFECTS.SHADOW_PRIMARY,
              }}
            >
              1일
            </div>
          </Appear>
          <Appear delay={223} type="scale">
            <Card variant="emphasis">
              <div
                style={{
                  padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`,
                  fontFamily: FONTS.PRIMARY,
                  fontSize: FONTS.SIZE_XL,
                  color: COLORS.TEXT_MAIN,
                  fontWeight: FONTS.WEIGHT_BOLD,
                }}
              >
                단 하루 만에 발견
              </div>
            </Card>
          </Appear>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
