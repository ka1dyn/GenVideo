import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';
import { Wobble } from '../../../../shared-components/Wobble';

export const Scene3: React.FC = () => {
  const imagePath = staticFile('mythos/body2/images/low_test.png');

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_MUTED }}>
      <PaperTexture />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        height: '100%',
        padding: SPACING.PX_80,
        paddingBottom: 150 + SPACING.PX_80, // 자막 영역 회피
        gap: SPACING.PX_80,
      }}>
        {/* 좌측: 이미지 */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Appear delay={0} type="fadeUp">
            <Img 
              src={imagePath} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain',
                borderRadius: SPACING.RADIUS_LG,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }} 
            />
          </Appear>
        </div>

        {/* 우측: 텍스트 요소 */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          gap: SPACING.PX_96 
        }}>
          <Appear delay={73} type="fadeRight">
            <QuoteCard accentColor={COLORS.PRIMARY}>
              <span style={{ 
                fontFamily: FONTS.PRIMARY, 
                fontSize: FONTS.SIZE_MD, 
                fontWeight: FONTS.WEIGHT_MEDIUM,
                color: COLORS.TEXT_MAIN,
                lineHeight: FONTS.LEADING_SNUG,
              }}>
                "의도적으로 점수를 낮게"
              </span>
            </QuoteCard>
          </Appear>

          <Appear delay={217} type="scale">
            <Wobble mode="smooth" intensity={1.5}>
              <div style={{ 
                fontFamily: FONTS.DISPLAY, 
                fontSize: FONTS.SIZE_XL, 
                fontWeight: FONTS.WEIGHT_BOLD, 
                color: COLORS.STATE_ERROR_FG,
                textAlign: 'center',
              }}>
                능력 은폐 시도
              </div>
            </Wobble>
          </Appear>
        </div>
      </div>
    </AbsoluteFill>
  );
};
