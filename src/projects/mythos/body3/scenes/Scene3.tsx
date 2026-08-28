import React from 'react';
import { AbsoluteFill, staticFile, Img } from 'remotion';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_DARK,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.PX_80,
        paddingBottom: 230, // 150 + 80
      }}
    >
      <PaperTexture isDark />
      
      {/* 왼쪽 텍스트 영역 */}
      <div
        style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: SPACING.PX_48,
          zIndex: 1,
        }}
      >
        <Appear delay={0}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            Mythos의 성능
          </div>
        </Appear>

        <Appear delay={54}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_3XL,
              color: COLORS.STATE_ERROR_FG,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
            }}
          >
            <UnderLine startFrame={76} color={COLORS.STATE_ERROR_FG} height={SPACING.PX_8}>
              대량 공격
            </UnderLine>
          </div>
        </Appear>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Appear delay={22} type="fadeRight">
          <Img
            src={staticFile('mythos/body3/images/hacker.png')}
            style={{
              width: '100%',
              maxWidth: 700,
              borderRadius: SPACING.RADIUS_LG,
              boxShadow: EFFECTS.SHADOW_LG,
            }}
          />
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
