import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLORS, SPACING, ANIMATION } from '../constants/theme';

interface ProgressBarProps {
  /** 목표 비율 0~1 (default: 1) */
  value?: number;
  /** 애니메이션 시작 프레임 (default: 0) */
  startFrame?: number;
  /** 애니메이션 지속 프레임 (default: DUR_LG) */
  duration?: number;
  /** 바 색상 (default: COLORS.PRIMARY) */
  color?: string;
  /** 트랙(배경) 색상 (default: COLORS.BG_MUTED) */
  trackColor?: string;
  /** 채워지는 방향 (default: 'ltr') */
  direction?: 'ltr' | 'rtl' | 'center';
  /** 바 높이 (default: 8) */
  height?: number;
  /** 추가 스타일 (컨테이너) */
  style?: React.CSSProperties;
}

/**
 * 수평 진행률 바.
 * spring 애니메이션으로 부드럽게 채워집니다.
 *
 * @example
 * <ProgressBar value={0.73} startFrame={30} color={COLORS.PRIMARY} />
 *
 * @example 양쪽에서 채워지는 바
 * <ProgressBar value={0.5} direction="center" startFrame={20} />
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 1,
  startFrame = 0,
  duration = ANIMATION.DUR_LG,
  color = COLORS.PRIMARY,
  trackColor = COLORS.BG_MUTED,
  direction = 'ltr',
  height = 8,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: ANIMATION.SPRING_GENTLE,
    durationInFrames: duration,
  });

  const fillWidth = progress * value;

  const originMap = {
    ltr: 'left center',
    rtl: 'right center',
    center: 'center center',
  };

  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundColor: trackColor,
        borderRadius: SPACING.RADIUS_PILL,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color,
          borderRadius: SPACING.RADIUS_PILL,
          transform: `scaleX(${fillWidth})`,
          transformOrigin: originMap[direction],
        }}
      />
    </div>
  );
};
