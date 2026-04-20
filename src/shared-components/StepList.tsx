import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { COLORS, FONTS, SPACING, ANIMATION } from '../constants/theme';

type LabelType = 'number' | 'dot' | 'korean';

const KOREAN_LABELS = ['첫째,', '둘째,', '셋째,', '넷째,', '다섯째,', '여섯째,'];

interface StepListProps {
  /** 목록 항목 배열 */
  items: string[];
  /** 첫 번째 항목 등장 프레임 (default: 0) */
  startFrame?: number;
  /** 항목 간 등장 간격 프레임 (default: STAGGER_LG = 16) */
  stagger?: number;
  /** 번호 표시 형식 (default: 'number') */
  labelType?: LabelType;
  /** 텍스트 색상 (default: TEXT_MAIN) */
  color?: string;
  /** 번호/라벨 색상 (default: PRIMARY) */
  labelColor?: string;
  /** 추가 스타일 (컨테이너) */
  style?: React.CSSProperties;
}

function getLabel(type: LabelType, index: number): string {
  switch (type) {
    case 'number': return `${index + 1}.`;
    case 'dot': return '•';
    case 'korean': return KOREAN_LABELS[index] ?? `${index + 1}.`;
  }
}

/**
 * 순차 등장하는 목록 컴포넌트.
 * 각 항목이 stagger 간격으로 fadeUp 진입합니다.
 *
 * @example
 * <StepList
 *   items={["테스트 인지", "능력 은폐", "신뢰 붕괴"]}
 *   startFrame={41}
 *   stagger={30}
 *   labelType="korean"
 * />
 */
export const StepList: React.FC<StepListProps> = ({
  items,
  startFrame = 0,
  stagger = ANIMATION.STAGGER_LG,
  labelType = 'number',
  color = COLORS.TEXT_MAIN,
  labelColor = COLORS.PRIMARY,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.PX_16,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const itemDelay = startFrame + i * stagger;
        const progress = spring({
          frame: Math.max(0, frame - itemDelay),
          fps,
          config: ANIMATION.SPRING_GENTLE,
          durationInFrames: ANIMATION.DUR_MD,
        });

        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: SPACING.PX_12,
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [ANIMATION.ENTER_Y_MD, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.DISPLAY,
                fontSize: FONTS.SIZE_LG,
                fontWeight: FONTS.WEIGHT_BOLD,
                color: labelColor,
                flexShrink: 0,
              }}
            >
              {getLabel(labelType, i)}
            </span>
            <span
              style={{
                fontFamily: FONTS.PRIMARY,
                fontSize: FONTS.SIZE_LG,
                fontWeight: FONTS.WEIGHT_MEDIUM,
                color,
              }}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};
