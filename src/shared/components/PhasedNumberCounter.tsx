import React from "react";
import { interpolate } from "remotion";
import { CLAMP, EASING_PRESET } from "../constants/animations";
import { COLORS, FONTS, FONT_SIZES } from "../constants/design";

type PhasedNumberCounterProps = {
  /** 시작 값 */
  from?: number;
  /** 목표 값 */
  to: number;
  /** 값 뒤에 붙는 접미사 (%, +, x 등) */
  suffix?: string;
  /** 값 앞에 붙는 접두사 ($, ₩ 등) */
  prefix?: string;
  /**
   * Phase 진행률 (0~1)
   * usePhase().getPhaseProgress("buildup") 등으로 전달
   */
  progress: number;
  /** 폰트 크기 (px). 기본값 FONT_SIZES.XXL */
  fontSize?: number;
  /** 숫자 색상. 기본값 COLORS.TEXT_PRIMARY */
  color?: string;
  /** 소수점 자릿수. 기본값 0 */
  decimals?: number;
  /** suffix/prefix 색상 (기본: color와 동일) */
  affixColor?: string;
};

/**
 * Phase 진행률에 연동되는 숫자 카운터.
 *
 * 기존 NumberCounter는 absolute frame 기반이라 Phase 타이밍과 맞추기 어려움.
 * 이 컴포넌트는 progress (0~1)만 받으면 자동으로 카운트업/다운합니다.
 *
 * @example
 * ```tsx
 * const phase = usePhase(PHASE_3_DATA, duration);
 *
 * <PhasedNumberCounter
 *   to={95}
 *   suffix="%"
 *   progress={phase.getPhaseProgress("buildup")}
 * />
 * ```
 */
export const PhasedNumberCounter: React.FC<PhasedNumberCounterProps> = ({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  progress,
  fontSize = FONT_SIZES.XXL,
  color = COLORS.TEXT_PRIMARY,
  decimals = 0,
  affixColor,
}) => {
  const p = Math.min(1, Math.max(0, progress));
  const eased = EASING_PRESET.SMOOTH_OUT(p);
  const currentValue = interpolate(eased, [0, 1], [from, to]);

  // 등장 opacity — progress 초기 10%에서 fade in
  const opacity = interpolate(p, [0, 0.1], [0, 1], CLAMP);
  // 등장 scale — 약간의 scale 효과
  const scale = interpolate(p, [0, 0.15], [0.9, 1], CLAMP);

  const formatted =
    decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 4,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {prefix && (
        <span
          style={{
            fontFamily: FONTS.MONO,
            fontSize: fontSize * 0.6,
            color: affixColor ?? color,
            fontWeight: 500,
          }}
        >
          {prefix}
        </span>
      )}
      <span
        style={{
          fontFamily: FONTS.MONO,
          fontSize,
          fontWeight: 700,
          color,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
        }}
      >
        {formatted}
      </span>
      {suffix && (
        <span
          style={{
            fontFamily: FONTS.MONO,
            fontSize: fontSize * 0.6,
            color: affixColor ?? color,
            fontWeight: 500,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
};
