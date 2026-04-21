import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPACING, ANIMATION } from '../constants/theme';

interface UnderLineProps {
  /** 텍스트 노드 */
  children: React.ReactNode;
  /** 애니메이션 시작 프레임 (default: 0) */
  startFrame?: number;
  /** 색상 (default: COLORS.PRIMARY) */
  color?: string;
  /** 두께 (default: 4) */
  height?: number;
  /** 밑줄 위치 조정을 위한 bottom 오프셋 (default: -4) */
  offset?: number;
  /** 방향 (default: 'ltr') */
  direction?: 'ltr' | 'rtl';
  /** 추가 스타일 (컨테이너) */
  style?: React.CSSProperties;
}

/**
 * 텍스트 아래 밑줄 draw 애니메이션.
 * 컴포넌트가 자식 요소를 감싸는 형태로, 자식 요소의 width에 정확히 일치하는 밑줄을 그립니다.
 *
 * @example
 * <UnderLine startFrame={15} color={COLORS.PRIMARY}>
 *   <span style={{ fontSize: FONTS.SIZE_2XL }}>핵심 키워드</span>
 * </UnderLine>
 */
export const UnderLine: React.FC<UnderLineProps> = ({
  children,
  startFrame = 0,
  color = COLORS.PRIMARY,
  height = 4,
  offset = -4,
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
        display: 'inline-block',
        position: 'relative',
        ...style,
      }}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          bottom: offset,
          left: 0,
          right: 0,
          height,
          backgroundColor: color,
          borderRadius: SPACING.RADIUS_PILL,
          transform: `scaleX(${progress})`,
          transformOrigin: direction === 'ltr' ? 'left center' : 'right center',
          zIndex: -1,
        }}
      />
    </div>
  );
};
