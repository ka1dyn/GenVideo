import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface CounterTextProps {
  /** Frame at which counting starts (local) */
  startFrame?: number;
  /** Duration of count animation in frames */
  durationInFrames?: number;
  /** Start value */
  from?: number;
  /** End value */
  to: number;
  /** Prefix string (e.g. "$") */
  prefix?: string;
  /** Suffix string (e.g. "H", "%") */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  letterSpacing?: string;
  textShadow?: string;
  style?: React.CSSProperties;
  /** Custom easing bezier params */
  easing?: readonly [number, number, number, number];
}

export const CounterText: React.FC<CounterTextProps> = ({
  startFrame = 0,
  durationInFrames = 60,
  from = 0,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  color = "#E8EEFA",
  fontSize = 100,
  fontWeight = 800,
  fontFamily = "'Pretendard Variable', 'Inter', sans-serif",
  letterSpacing,
  textShadow,
  style,
  easing,
}) => {
  const frame = useCurrentFrame();

  const value = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [from, to],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easing ? Easing.bezier(easing[0], easing[1], easing[2], easing[3]) : undefined,
    }
  );

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <div
      style={{
        color,
        fontSize,
        fontWeight,
        fontFamily,
        letterSpacing,
        textShadow,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {prefix}
      {display}
      {suffix}
    </div>
  );
};
