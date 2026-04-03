import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, EFFECTS, FONTS } from "../theme";

interface BarData {
  label: string;
  value: number;
}

interface DynamicBarChartProps {
  data: BarData[];
  title?: string;
  color?: string;
  stagger?: number;
}

export const DynamicBarChart: React.FC<DynamicBarChartProps> = ({
  data,
  title,
  color = COLORS.PRIMARY,
  stagger = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", justifyContent: "center" }}>
      {title && (
        <div style={{
          fontSize: FONTS.SIZE_LG,
          color: COLORS.TEXT_MAIN,
          fontFamily: FONTS.PRIMARY,
          fontWeight: FONTS.WEIGHT_BOLD,
          marginBottom: 40,
          textShadow: EFFECTS.GLOW_TEXT_SM
        }}>
          {title}
        </div>
      )}
      
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30, height: 300 }}>
        {data.map((bar, i) => {
          const entry = spring({
            frame: frame - (i * stagger),
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const height = interpolate(entry, [0, 1], [0, (bar.value / maxVal) * 250]);

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                {/* Value Label */}
                <div style={{
                    fontSize: FONTS.SIZE_MD,
                    fontWeight: FONTS.WEIGHT_BOLD,
                    color: COLORS.TEXT_MAIN,
                    opacity: entry,
                    fontFamily: FONTS.MONO,
                    textShadow: EFFECTS.GLOW_TEXT_SM,
                    transform: `translateY(${interpolate(entry, [0, 1], [10, 0])}px)`
                }}>
                    {Math.round(interpolate(entry, [0, 1], [0, bar.value]))}
                </div>
                
                {/* Bar */}
                <div style={{
                    width: 60,
                    height,
                    backgroundColor: color,
                    borderRadius: "4px 4px 0 0",
                    boxShadow: entry > 0.5 ? `0 0 20px ${color}` : "none",
                    border: `1px solid ${COLORS.BORDER_PRIMARY}`,
                    opacity: interpolate(entry, [0, 0.2], [0, 1])
                }} />

                {/* Label */}
                <div style={{
                    fontSize: FONTS.SIZE_SM,
                    color: COLORS.TEXT_MUTED,
                    fontFamily: FONTS.PRIMARY,
                    marginTop: 4,
                    opacity: entry
                }}>
                    {bar.label}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
