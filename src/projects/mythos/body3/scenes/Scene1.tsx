import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.PX_48,
        paddingBottom: 150, // 자막 영역 확보
      }}
    >
      <PaperTexture />
      
      {/* 그리드 패턴 배경 */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${COLORS.STROKE_SUBTLE} 1.5px, transparent 1.5px)`,
          backgroundSize: `${SPACING.PX_48}px ${SPACING.PX_48}px`,
          opacity: 0.4,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_32 }}>
        <Appear delay={18}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.TEXT_SUB,
              fontWeight: FONTS.WEIGHT_MEDIUM,
            }}
          >
            얼마나?
          </div>
        </Appear>

        <Appear delay={32}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.PRIMARY,
              fontWeight: FONTS.WEIGHT_BOLD,
            }}
          >
            뛰어난 능력
          </div>
        </Appear>

        <Appear delay={69} type="scale">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_3XL,
              color: COLORS.STATE_ERROR_FG,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              marginTop: SPACING.PX_16,
            }}
          >
            <UnderLine startFrame={84} color={COLORS.STATE_ERROR_FG} height={SPACING.PX_8}>
              위험성
            </UnderLine>
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
