import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_SIZES, TYPOGRAPHY, SPACING } from "../constants/design";
import { SPRING_CONFIG, CLAMP } from "../constants/animations";

type SectionLabelProps = {
  title: string;
};

/**
 * 좌상단 소제목 라벨 (내부 전용)
 *
 * Layout 컴포넌트가 sectionTitle prop을 받으면 내부적으로 렌더합니다.
 * AI가 직접 import하지 않습니다.
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springVal = spring({
    frame,
    fps,
    config: SPRING_CONFIG.GENTLE,
  });

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], CLAMP);
  const x = interpolate(springVal, [0, 1], [-20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: SPACING.LG,
        left: SPACING.LG,
        display: "flex",
        alignItems: "center",
        gap: SPACING.SM,
        opacity,
        transform: `translateX(${x}px)`,
        zIndex: 10,
      }}
    >
      {/* Accent vertical line */}
      <div
        style={{
          width: 3,
          height: 20,
          backgroundColor: COLORS.ACCENT,
          borderRadius: 2,
        }}
      />
      {/* Label text */}
      <span
        style={{
          ...TYPOGRAPHY.LABEL,
          fontSize: FONT_SIZES.SM,
          color: COLORS.TEXT_SECONDARY,
        }}
      >
        {title}
      </span>
    </div>
  );
};
