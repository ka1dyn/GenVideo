import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Card } from '../../../../shared-components/Card';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        gap: SPACING.PX_64,
        paddingBottom: 150, // 자막 영역 회피
      }}>
        <Appear delay={0} type="fadeUp">
          <Card variant="emphasis">
            <span style={{ 
              fontFamily: FONTS.PRIMARY, 
              fontSize: FONTS.SIZE_MD, 
              fontWeight: FONTS.WEIGHT_BOLD,
              color: COLORS.TEXT_MAIN,
              paddingLeft: SPACING.PX_24,
              paddingRight: SPACING.PX_24,
            }}>
              추가 분석 보고서
            </span>
          </Card>
        </Appear>

        <div style={{ 
          fontFamily: FONTS.DISPLAY, 
          fontSize: FONTS.SIZE_XL, 
          fontWeight: FONTS.WEIGHT_BOLD, 
          color: COLORS.TEXT_MAIN 
        }}>
          <UnderLine startFrame={27} color={COLORS.PRIMARY}>
            <span>이 뿐만이 아닙니다.</span>
          </UnderLine>
        </div>
      </div>
    </AbsoluteFill>
  );
};
