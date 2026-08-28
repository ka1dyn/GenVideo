import React from 'react';
import { COLORS, SPACING, EFFECTS } from '../constants/theme';

type CardVariant = 'surface' | 'emphasis' | 'outline';
type ShadowSize = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  /** 스타일 변형 (default: 'surface') */
  variant?: CardVariant;
  /** 그림자 크기. 생략 시 variant에 맞는 기본값 사용 */
  shadow?: ShadowSize;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

const VARIANT_STYLES: Record<CardVariant, {
  bg: string;
  color: string;
  border: string;
  defaultShadow: string;
}> = {
  surface: {
    bg: COLORS.BG_SURFACE,
    color: COLORS.TEXT_MAIN,
    border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_SUBTLE}`,
    defaultShadow: EFFECTS.SHADOW_SM,
  },
  emphasis: {
    bg: COLORS.BG_EMPHASIS,
    color: COLORS.TEXT_MAIN,
    border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
    defaultShadow: EFFECTS.SHADOW_MD,
  },
  outline: {
    bg: 'transparent',
    color: 'inherit',
    border: `${SPACING.BORDER_THICK}px solid ${COLORS.STROKE_STRONG}`,
    defaultShadow: 'none',
  },
};

const SHADOW_MAP: Record<ShadowSize, string> = {
  none: 'none',
  sm: EFFECTS.SHADOW_SM,
  md: EFFECTS.SHADOW_MD,
  lg: EFFECTS.SHADOW_LG,
};

/**
 * 데이터 카드 컴포넌트. 그림자·테두리를 토큰으로 캡슐화하여 하드코딩을 방지합니다.
 *
 * @example
 * <Card variant="emphasis" shadow="lg">
 *   <span style={{ fontFamily: FONTS.DISPLAY, fontSize: FONTS.SIZE_XL }}>
 *     테스트 모드
 *   </span>
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'surface',
  shadow,
  style,
}) => {
  const variantStyle = VARIANT_STYLES[variant];
  const resolvedShadow = shadow !== undefined
    ? SHADOW_MAP[shadow]
    : variantStyle.defaultShadow;

  return (
    <div
      style={{
        backgroundColor: variantStyle.bg,
        color: variantStyle.color,
        border: variantStyle.border,
        borderRadius: SPACING.RADIUS_LG,
        padding: SPACING.PX_32,
        boxShadow: resolvedShadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
