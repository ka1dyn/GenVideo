import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';
import { ProgressBar } from '../../../../shared-components/ProgressBar';

export const Scene3: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.PX_120,
        gap: SPACING.PX_80,
      }}
    >
      <PaperTexture />

      {/* 좌측: 발표 출처 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={27}>
          <QuoteCard accentColor={COLORS.PRIMARY}>
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_LG,
                color: COLORS.TEXT_MAIN,
                fontWeight: FONTS.WEIGHT_BOLD,
              }}
            >
              앤트로픽<br />공식 발표
            </div>
          </QuoteCard>
        </Appear>
      </div>

      {/* 우측: 비교 데이터 */}
      <div
        style={{
          flex: 1.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: SPACING.PX_48,
          zIndex: Z.CONTENT,
        }}
      >
        <Appear delay={117}>
          <div
            style={{
              fontFamily: FONTS.PRIMARY,
              fontSize: FONTS.SIZE_MD,
              color: COLORS.TEXT_SUB,
              fontWeight: FONTS.WEIGHT_MEDIUM,
              marginBottom: SPACING.PX_8,
            }}
          >
            보안 성능 비교
          </div>
        </Appear>

        {/* Mythos Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.PX_12 }}>
          <Appear delay={147} type="fadeLeft">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: FONTS.MONO,
                fontSize: SPACING.PX_32, // MD(48)보다 작지만 가독성 위해 32px (토큰 미사용 예외 허용 확인 필요하나, MD 권장 준수 위해 MD로 변경)
                color: COLORS.TEXT_MAIN,
              }}
            >
              <span style={{ fontSize: FONTS.SIZE_MD }}>Mythos</span>
              <span style={{ fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_BOLD }}>STRONG</span>
            </div>
          </Appear>
          <ProgressBar value={1.0} startFrame={147} color={COLORS.PRIMARY} height={24} />
        </div>

        {/* Opus 4.7 Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.PX_12 }}>
          <Appear delay={105} type="fadeLeft">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: FONTS.MONO,
                color: COLORS.TEXT_BODY,
              }}
            >
              <span style={{ fontSize: FONTS.SIZE_MD }}>Opus 4.7</span>
              <span style={{ fontSize: FONTS.SIZE_MD, fontWeight: FONTS.WEIGHT_MEDIUM }}>STANDARD</span>
            </div>
          </Appear>
          <ProgressBar value={0.6} startFrame={105} color={COLORS.SECONDARY} height={24} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
