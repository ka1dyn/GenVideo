import React from "react";
import { interpolate } from "remotion";
import { CLAMP, EASING_PRESET } from "../constants/animations";
import { COLORS, FONTS, FONT_SIZES } from "../constants/design";

type PhasedHighlightProps = {
  /** 표시할 텍스트 */
  text: string;
  /**
   * Phase 진행률 (0~1)
   * usePhase().getPhaseProgress("emphasize") 등으로 전달
   */
  progress: number;
  /** 하이라이트 바 색상. 기본값 COLORS.ACCENT */
  highlightColor?: string;
  /** 텍스트 폰트 크기 (px). 기본값 FONT_SIZES.LG */
  fontSize?: number;
  /** 텍스트 색상. 기본값 COLORS.TEXT_PRIMARY */
  textColor?: string;
  /** 하이라이트 바 높이 비율 (텍스트 대비). 기본값 0.35 */
  barHeightRatio?: number;
};

/**
 * Phase 진행에 따라 하이라이트 바가 드러나는 강조 텍스트.
 *
 * Phase 시작 전: 텍스트만 보임 (dimmed)
 * Phase 진행 중: 하이라이트 바가 왼→오 확장 + 텍스트 밝아짐
 * Phase 완료: 완전히 하이라이트된 상태
 *
 * @example
 * ```tsx
 * const phase = usePhase(PHASE_3_STANDARD, duration);
 *
 * <PhasedHighlight
 *   text="55% 생산성 향상"
 *   progress={phase.getPhaseProgress("emphasize")}
 * />
 * ```
 */
export const PhasedHighlight: React.FC<PhasedHighlightProps> = ({
  text,
  progress,
  highlightColor = COLORS.ACCENT,
  fontSize = FONT_SIZES.LG,
  textColor = COLORS.TEXT_PRIMARY,
  barHeightRatio = 0.35,
}) => {
  const p = Math.min(1, Math.max(0, progress));

  // ── 하이라이트 바 너비 (0% → 100%) ──
  const barEased = EASING_PRESET.SMOOTH_OUT(
    interpolate(p, [0, 0.7], [0, 1], CLAMP),
  );
  const barWidth = `${barEased * 100}%`;

  // ── 텍스트 등장 opacity ──
  const textOpacity = interpolate(p, [0, 0.15], [0.3, 1], CLAMP);

  // ── 텍스트 슬라이드 (약간의 위→아래) ──
  const translateY = interpolate(p, [0, 0.2], [8, 0], CLAMP);

  // ── Glow 효과 (progress 후반에 강조) ──
  const glowOpacity = interpolate(p, [0.6, 1], [0, 0.4], CLAMP);

  const barHeight = Math.round(fontSize * barHeightRatio);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        padding: `0 ${Math.round(fontSize * 0.2)}px`,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {/* 하이라이트 바 */}
      <div
        style={{
          position: "absolute",
          bottom: Math.round(fontSize * 0.08),
          left: 0,
          height: barHeight,
          width: barWidth,
          backgroundColor: highlightColor,
          opacity: 0.25,
          borderRadius: barHeight / 2,
        }}
      />

      {/* Glow 레이어 */}
      <div
        style={{
          position: "absolute",
          bottom: Math.round(fontSize * 0.08),
          left: 0,
          height: barHeight,
          width: barWidth,
          backgroundColor: highlightColor,
          opacity: glowOpacity,
          borderRadius: barHeight / 2,
          filter: `blur(${barHeight}px)`,
        }}
      />

      {/* 텍스트 */}
      <span
        style={{
          position: "relative",
          fontFamily: FONTS.SANS,
          fontSize,
          fontWeight: 700,
          color: textColor,
          opacity: textOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </span>
    </div>
  );
};
