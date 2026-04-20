import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, SPACING, ANIMATION } from '../constants/theme';

interface UnderLineProps {
  /** 애니메이션 시작 프레임 (default: 0) */
  startFrame?: number;
  /** 색상 (default: COLORS.PRIMARY) */
  color?: string;
  /** 두께 (default: 4) */
  height?: number;
  /** 너비 (default: '100%') */
  width?: number | string;
  /** 방향 (default: 'ltr') */
  direction?: 'ltr' | 'rtl';
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 텍스트 아래 밑줄 draw 애니메이션.
 * DrawLine의 리팩토링 버전 — glow 제거, 토큰 기반.
 *
 * @example
 * <span style={{ fontSize: FONTS.SIZE_2XL }}>핵심 키워드</span>
 * <UnderLine startFrame={15} color={COLORS.PRIMARY} width={300} />
 */
export const UnderLine: React.FC<UnderLineProps> = ({
  startFrame = 0,
  color = COLORS.PRIMARY,
  height = 4,
  width = '100%',
  direction = 'ltr',
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: ANIMATION.DUR_MD,
  });

  return (
    <div
      style={{
        height,
        width,
        backgroundColor: color,
        borderRadius: SPACING.RADIUS_PILL,
        transform: `scaleX(${progress})`,
        transformOrigin: direction === 'ltr' ? 'left center' : 'right center',
        ...style,
      }}
    />
  );
};
