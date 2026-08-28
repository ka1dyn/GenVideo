import React from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONTS, SPACING } from '../../../../constants/theme';
import { PaperTexture } from '../../../../core/PaperTexture';
import { Appear } from '../../../../shared-components/Appear';
import { Counter } from '../../../../shared-components/Counter';
import { ProgressBar } from '../../../../shared-components/ProgressBar';

export const Scene2: React.FC = () => {
  // Relative timings (Absolute - 210)
  const START_DELAY = 0; // 210 - 210
  const PROGRESS_START = 31; // 241 - 210

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_SURFACE,
        flexDirection: 'row',
        padding: SPACING.PX_80,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <PaperTexture />

      {/* Left: Text */}
      <div style={{ flex: 1 }}>
        <Appear delay={START_DELAY} type="fadeRight">
          <span
            style={{
              fontFamily: FONTS.DISPLAY,
              fontSize: FONTS.SIZE_XL,
              fontWeight: FONTS.WEIGHT_BOLD,
              color: COLORS.TEXT_MAIN,
            }}
          >
            AI 발전 가속화
          </span>
        </Appear>
      </div>

      {/* Right: Graphic */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: SPACING.PX_24,
        }}
      >
        <Counter
          to={100}
          suffix="%"
          startFrame={PROGRESS_START}
          duration={60}
          style={{
            fontFamily: FONTS.MONO,
            fontSize: FONTS.SIZE_3XL,
            fontWeight: FONTS.WEIGHT_EXTRABOLD,
            color: COLORS.PRIMARY,
          }}
        />
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <ProgressBar
            value={1}
            startFrame={PROGRESS_START}
            duration={60}
            color={COLORS.PRIMARY}
            height={12}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
