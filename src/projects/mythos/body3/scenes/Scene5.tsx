import React from 'react';
import { AbsoluteFill, staticFile, Img } from 'remotion';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene5: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_MUTED,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.PX_80,
        paddingBottom: 230,
      }}
    >
      <PaperTexture />
      
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: SPACING.PX_40,
          zIndex: 1,
        }}
      >
        <Appear delay={8}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.TEXT_BODY,
              fontWeight: FONTS.WEIGHT_MEDIUM,
            }}
          >
            비전문가도
          </div>
        </Appear>

        <Appear delay={25} type="scale">
          <Card variant="emphasis">
            <div
              style={{
                padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`,
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_2XL,
                color: COLORS.TEXT_MAIN,
                fontWeight: FONTS.WEIGHT_BOLD,
              }}
            >
              딸깍 한 번
            </div>
          </Card>
        </Appear>

        <Appear delay={66}>
          <Wobble mode="smooth" intensity={2}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_3XL,
                color: COLORS.STATE_ERROR_FG,
                fontWeight: FONTS.WEIGHT_EXTRABOLD,
                marginTop: SPACING.PX_24,
              }}
            >
              시스템 해킹
            </div>
          </Wobble>
        </Appear>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Appear delay={25} type="scale">
          <Img
            src={staticFile('mythos/body3/images/릴리딸깍.png')}
            style={{
              width: '100%',
              maxWidth: 600,
              borderRadius: SPACING.RADIUS_XL,
              boxShadow: EFFECTS.SHADOW_LG,
            }}
          />
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
