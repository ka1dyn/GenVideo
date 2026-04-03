import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, EFFECTS, FONTS } from "../theme";

interface GaugeProps {
  targetValue: number;
  label: string;
  color?: string;
  entryDelay?: number;
}

export const Gauge: React.FC<GaugeProps> = ({
  targetValue,
  label,
  color = COLORS.PRIMARY,
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - entryDelay,
    fps,
    config: { stiffness: 60, damping: 15 },
  });

  const value = interpolate(progress, [0, 1], [0, targetValue]);
  const rotation = interpolate(progress, [0, 1], [-120, 120]); // Semi-circle gauge

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = interpolate(progress, [0, 1], [circumference, circumference * (1 - (targetValue / 100) * 0.66)]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Background Arc */}
        <path
          d="M 50 150 A 100 100 0 0 1 250 150"
          fill="none"
          stroke={COLORS.BORDER}
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <path
          d="M 50 150 A 100 100 0 0 1 250 150"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="471" /* ~ circumference for path */
          strokeDashoffset={interpolate(progress, [0, 1], [471, 471 * (1 - targetValue / 100)])}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
        
        {/* Needle */}
        <line
          x1="150" y1="150"
          x2="150" y2="70"
          stroke={COLORS.TEXT_MAIN}
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "150px 150px",
          }}
        />
        <circle cx="150" cy="150" r="8" fill={COLORS.TEXT_MAIN} />
      </svg>

      <div style={{
        marginTop: -40,
        fontSize: FONTS.SIZE_3XL,
        fontWeight: FONTS.WEIGHT_EXTRABOLD,
        color: COLORS.TEXT_MAIN,
        fontFamily: FONTS.MONO,
        textShadow: EFFECTS.GLOW_TEXT_LG
      }}>
        {Math.round(value)}%
      </div>
      <div style={{
        fontSize: FONTS.SIZE_MD,
        color: COLORS.TEXT_MUTED,
        fontFamily: FONTS.PRIMARY,
        marginTop: 10
      }}>
        {label}
      </div>
    </div>
  );
};
