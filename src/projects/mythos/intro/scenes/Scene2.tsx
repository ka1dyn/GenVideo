import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, Z } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { QuoteCard } from '../../../../shared-components/QuoteCard';
import { UnderLine } from '../../../../shared-components/UnderLine';

export const Scene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_SURFACE }}>
      <PaperTexture />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        paddingBottom: 150, // 자막 영역 확보
        zIndex: Z.CONTENT
      }}>
        <Appear delay={0} type="fadeUp">
          <QuoteCard accentColor={COLORS.PRIMARY}>
            <div style={{ 
              fontSize: FONTS.SIZE_LG, 
              color: COLORS.TEXT_MAIN, 
              fontFamily: FONTS.PRIMARY,
              lineHeight: 1.5,
              maxWidth: 1000,
              padding: '40px 60px'
            }}>
              "역대 어떤 AI보다 <br />
              <UnderLine startFrame={39} color={COLORS.PRIMARY_DARK} height={6}>
                사이버 능력
              </UnderLine>이 <br />
              압도적으로 앞선다."
            </div>
          </QuoteCard>
        </Appear>
      </div>
    </AbsoluteFill>
  );
};
