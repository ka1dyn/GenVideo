import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { StepList } from '../../../../shared-components/StepList';
import { Card } from '../../../../shared-components/Card';

export const Scene4: React.FC = () => {
  const START_DELAY = 0; // 522 - 522
  const LIST_START = 71; // 593 - 522
  const CTA_DELAY = 186; // 708 - 522

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.PX_64,
      }}
    >
      <PaperTexture />

      {/* Background Pattern: Line (Simulated with CSS) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(${COLORS.STROKE_SUBTLE} 1px, transparent 1px)`,
          backgroundSize: '100% 40px',
          opacity: 0.2,
        }}
      />

      <Appear delay={START_DELAY} type="fadeUp">
        <span
          style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: FONTS.SIZE_XL,
            fontWeight: FONTS.WEIGHT_BOLD,
            color: COLORS.TEXT_MAIN,
          }}
        >
          여러분의 생각은?
        </span>
      </Appear>

      <div style={{ width: '100%', maxWidth: '600px' }}>
        <StepList
          items={['댓글 공유', '구독 부탁']}
          startFrame={LIST_START}
          stagger={30}
          labelType="dot"
          color={COLORS.TEXT_BODY}
          labelColor={COLORS.PRIMARY}
        />
      </div>

      <Appear delay={CTA_DELAY} type="scale">
        <Card variant="emphasis" shadow="lg">
          <span
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_EXTRABOLD,
              color: COLORS.STATE_SUCCESS_FG,
              padding: `${SPACING.PX_16}px ${SPACING.PX_48}px`,
            }}
          >
            SUBSCRIBE
          </span>
        </Card>
      </Appear>
    </AbsoluteFill>
  );
};
