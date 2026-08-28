import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING, Z, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';

export const Scene4: React.FC = () => {
  const imageSrc = staticFile('mythos/body4/images/bigtech.png');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARK,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.PX_80,
      }}
    >
      <PaperTexture />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_64,
          zIndex: Z.CONTENT,
        }}
      >
        {/* 빅테크 로고 */}
        <Appear delay={83} type="fade">
          <Img
            src={imageSrc}
            style={{
              width: 900,
              filter: `drop-shadow(${EFFECTS.SHADOW_LG}) brightness(1.2)`, // 다크 배경 가시성 확보
            }}
          />
        </Appear>

        {/* 설명 텍스트 */}
        <Appear delay={174} type="fadeUp">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_LG,
              color: COLORS.TEXT_ON_DARK,
              fontWeight: FONTS.WEIGHT_BOLD,
              textAlign: 'center',
            }}
          >
            빅테크 전용 비공개 제공
          </div>
        </Appear>

        {/* 제한 사항 카드 */}
        <Appear delay={241} type="scale">
          <Card variant="emphasis" shadow="lg">
            <div
              style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_MD,
                color: COLORS.STATE_ERROR_FG,
                fontWeight: FONTS.WEIGHT_BOLD,
                padding: `${SPACING.PX_16}px ${SPACING.PX_32}px`,
              }}
            >
              ⚠️ 방어 목적으로만 사용 제한
            </div>
          </Card>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
