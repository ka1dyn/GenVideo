import React from "react";
import { interpolate } from "remotion";
import { EASING_PRESET, CLAMP } from "../constants/animations";

type PhasedRevealProps = {
  /** 순차 등장시킬 children 배열 */
  children: React.ReactNode;
  /** Phase 진행률 (0~1) — usePhase().getPhaseProgress("develop") 등 */
  progress: number;
  /** 등장 애니메이션 */
  animation?: "fadeIn" | "slideUp" | "scaleIn";
  /** children 간 등장 간격 (progress 기준, 0~1). 기본값 auto. */
  stagger?: number;
  /** 각 child의 등장에 소요되는 progress 범위. 기본값 0.3 */
  entranceWidth?: number;
};

/**
 * Phase 진행에 맞춰 children을 순차적으로 드러내는 범용 래퍼.
 *
 * @example
 * ```tsx
 * <PhasedReveal progress={phase.getPhaseProgress("develop")} animation="slideUp">
 *   <AnimatedTitle text="첫 번째" />
 *   <AnimatedText text="두 번째" />
 *   <StatCard value="95%" label="세 번째" />
 * </PhasedReveal>
 * ```
 */
export const PhasedReveal: React.FC<PhasedRevealProps> = ({
  children,
  progress,
  animation = "fadeIn",
  stagger,
  entranceWidth = 0.3,
}) => {
  const childArray = React.Children.toArray(children);
  const N = childArray.length;

  if (N === 0) return null;

  // Auto-calculate stagger if not provided
  // Spread children evenly, ensuring the last child has room to complete
  const effectiveStagger =
    stagger ?? (N > 1 ? (1 - entranceWidth) / (N - 1) : 0);

  const p = Math.min(1, Math.max(0, progress));

  return (
    <>
      {childArray.map((child, i) => {
        const startAt = i * effectiveStagger;
        const endAt = Math.min(1, startAt + entranceWidth);
        const childProgress = interpolate(p, [startAt, endAt], [0, 1], CLAMP);

        if (childProgress <= 0) {
          return (
            <div key={i} style={{ opacity: 0 }}>
              {child}
            </div>
          );
        }

        const eased = EASING_PRESET.SMOOTH_OUT(childProgress);
        const opacity = childProgress;

        let transform = "";
        if (animation === "slideUp") {
          const y = interpolate(eased, [0, 1], [30, 0]);
          transform = `translateY(${y}px)`;
        } else if (animation === "scaleIn") {
          const scale = interpolate(eased, [0, 1], [0.85, 1]);
          transform = `scale(${scale})`;
        }

        return (
          <div key={i} style={{ opacity, transform }}>
            {child}
          </div>
        );
      })}
    </>
  );
};
