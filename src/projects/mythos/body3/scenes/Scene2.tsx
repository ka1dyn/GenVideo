import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { StepList } from '../../../../shared-components/StepList';

export const Scene2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_SURFACE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.PX_80,
        paddingBottom: 150,
      }}
    >
      <PaperTexture />
      
      <Appear delay={23} type="scale">
        <Card variant="emphasis">
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_2XL,
              color: COLORS.TEXT_MAIN,
              fontWeight: FONTS.WEIGHT_BOLD,
              padding: `${SPACING.PX_24}px ${SPACING.PX_48}px`,
            }}
          >
            제로데이 취약점
          </div>
        </Card>
      </Appear>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_48 }}>
        <StepList
          items={["아직 공개되지 않음", "아무도 모르는 버그"]}
          startFrame={122}
          color={COLORS.TEXT_BODY}
          labelColor={COLORS.PRIMARY}
          labelType="dot"
        />

        <Appear delay={188}>
          <div
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              color: COLORS.STATE_WARN_FG,
              fontWeight: FONTS.WEIGHT_BOLD,
              marginTop: SPACING.PX_24,
            }}
          >
            보안 허점
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
