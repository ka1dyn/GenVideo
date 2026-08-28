import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { StepList } from '../../../../shared-components/StepList';

export const Scene7: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.PX_120,
      }}
    >
      <PaperTexture />

      {/* 배경 그리드 */}
      <AbsoluteFill
        style={{
          zIndex: Z.BG,
          backgroundImage: `
            radial-gradient(${COLORS.STROKE_SUBTLE} 1.5px, transparent 1.5px)
          `,
          backgroundSize: `${SPACING.PX_40}px ${SPACING.PX_40}px`,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: SPACING.PX_64,
          zIndex: Z.CONTENT,
          width: '100%',
        }}
      >
        <Appear delay={68} type="fadeDown">
          <Card variant="outline">
            <div
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_MD,
                color: COLORS.TEXT_SUB,
                padding: `${SPACING.PX_8}px ${SPACING.PX_24}px`,
              }}
            >
              전문직 영역 활용
            </div>
          </Card>
        </Appear>

        <div style={{ width: 800 }}>
          <StepList
            items={["법률 문서 처리", "복잡한 데이터 분석"]}
            startFrame={0}
            stagger={34}
            color={COLORS.TEXT_MAIN}
            labelColor={COLORS.SECONDARY_BOLD}
          />
        </div>

        <Appear delay={107} type="scale">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.SECONDARY_BOLD,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              backgroundColor: COLORS.SECONDARY_LIGHT,
              padding: `${SPACING.PX_16}px ${SPACING.PX_48}px`,
              borderRadius: SPACING.RADIUS_PILL,
              boxShadow: COLORS.SECONDARY_SOFT,
            }}
          >
            최상위 수준
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
