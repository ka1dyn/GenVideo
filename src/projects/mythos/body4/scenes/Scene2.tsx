import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, Z, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';

export const Scene2: React.FC = () => {
  const imageSrc = staticFile('mythos/body4/images/opus4_7.png');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_MUTED,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.PX_120,
        gap: SPACING.PX_80,
      }}
    >
      <PaperTexture />

      {/* 좌측 텍스트 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={5} type="fadeRight">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_SUB,
              fontWeight: FONTS.WEIGHT_MEDIUM,
              marginBottom: SPACING.PX_24,
            }}
          >
            4월 16일
          </div>
        </Appear>

        <Appear delay={59} type="scale">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.PRIMARY_BOLD,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
            }}
          >
            Opus 4.7
          </div>
        </Appear>
      </div>

      {/* 우측 이미지 영역 */}
      <div
        style={{
          flex: 1.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={27} type="fade">
          <Img
            src={imageSrc}
            style={{
              width: '100%',
              borderRadius: SPACING.RADIUS_LG,
              boxShadow: EFFECTS.SHADOW_LG,
              border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
            }}
          />
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
