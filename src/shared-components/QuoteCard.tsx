import React from 'react';
import { COLORS, SPACING, EFFECTS } from '../constants/theme';

interface QuoteCardProps {
  children: React.ReactNode;
  /** 좌측 액센트 바 색상 (default: COLORS.PRIMARY) */
  accentColor?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 인용구 스타일 카드. 좌측에 컬러 액센트 바가 있습니다.
 *
 * @example
 * <QuoteCard accentColor={COLORS.STATE_ERROR_FG}>
 *   <span style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_LG }}>
 *     "능력을 의도적으로 숨겼다"
 *   </span>
 * </QuoteCard>
 */
export const QuoteCard: React.FC<QuoteCardProps> = ({
  children,
  accentColor = COLORS.PRIMARY,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.BG_SURFACE,
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: SPACING.RADIUS_LG,
        padding: `${SPACING.PX_24}px ${SPACING.PX_32}px`,
        boxShadow: EFFECTS.SHADOW_SM,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
