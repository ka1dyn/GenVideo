import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface CounterProps {
  /** 시작 숫자 (default: 0) */
  from?: number;
  /** 목표 숫자 */
  to: number;
  /** 카운트 시작 프레임 (default: 0) */
  startFrame?: number;
  /** 카운트 지속 프레임 (default: 30) */
  duration?: number;
  /** 접두어 (예: "정확도 ") */
  prefix?: string;
  /** 접미어 (예: "%", "건") */
  suffix?: string;
  /** 소수점 자릿수 (default: 0) */
  decimals?: number;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

/**
 * 숫자 카운트업/다운 컴포넌트.
 * linear interpolation으로 숫자가 서서히 변합니다.
 *
 * @example
 * <Counter to={97.3} suffix="%" startFrame={30} decimals={1}
 *   style={{ fontFamily: FONTS.MONO, fontSize: FONTS.SIZE_3XL, color: COLORS.PRIMARY }}
 * />
 *
 * @example 카운트다운
 * <Counter from={100} to={0} suffix="건" startFrame={10} duration={45} />
 */
export const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  startFrame = 0,
  duration = 30,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  const value = interpolate(
    frame - startFrame,
    [0, duration],
    [from, to],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return (
    <span style={style}>
      {formatted}
    </span>
  );
};
