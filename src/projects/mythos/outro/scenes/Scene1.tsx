import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { TypeWriter } from '../../../../shared-components/TypeWriter';
import { UnderLine } from '../../../../shared-components/UnderLine';
import { Appear } from '../../../../shared-components/Appear';

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.PX_40,
      }}
    >
      <PaperTexture />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SPACING.PX_16 }}>
        <UnderLine startFrame={82} color={COLORS.PRIMARY}>
          <TypeWriter
            text="Mythos: 성능과 사건들"
            startFrame={53}
            speed={2}
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_2XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              color: COLORS.TEXT_MAIN,
            }}
          />
        </UnderLine>
      </div>

      <Appear delay={169} type="fadeUp">
        <span
          style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: FONTS.SIZE_XL,
            color: COLORS.TEXT_SUB,
          }}
        >
          어떠셨나요?
        </span>
      </Appear>
    </AbsoluteFill>
  );
};
