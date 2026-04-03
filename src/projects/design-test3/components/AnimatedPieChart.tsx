import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, EFFECTS } from "../theme";

interface PieSegment {
  label: string;
  value: number;
  color: string;
}

interface AnimatedPieChartProps {
  data: PieSegment[];
  size?: number;
  entryDelay?: number;
}

export const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({
  data,
  size = 400,
  entryDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const radius = size / 3;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((segment, i) => {
          const segmentProgress = spring({
            frame: frame - entryDelay - (i * 10),
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          const segmentLength = (segment.value / total) * circumference;
          const strokeDashoffset = interpolate(
            segmentProgress,
            [0, 1],
            [segmentLength, 0]
          );

          const startOffset = currentOffset;
          currentOffset += segmentLength;

          return (
            <React.Fragment key={i}>
                <circle
                r={radius}
                cx={center}
                cy={center}
                fill="none"
                stroke={segment.color}
                strokeWidth={radius * 0.6}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(${(startOffset / circumference) * 360 - 90} ${center} ${center})`}
                style={{
                    opacity: interpolate(segmentProgress, [0, 0.2], [0, 1]),
                    filter: segmentProgress > 0.5 ? `drop-shadow(0 0 12px ${segment.color})` : "none"
                }}
                />
            </React.Fragment>
          );
        })}
      </svg>

      {/* Labels */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {data.map((segment, i) => {
            const entry = spring({ frame: frame - entryDelay - 100 - (i * 10), fps });
            const percentage = Math.round((segment.value / total) * 100);
            return (
                <div key={i} style={{
                    position: "absolute",
                    top: "10%",
                    left: 20 + i * 120,
                    opacity: entry,
                    transform: `translateY(${interpolate(entry, [0, 1], [10, 0])}px)`
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 12, height: 12, backgroundColor: segment.color, borderRadius: 2 }} />
                        <div style={{ fontSize: FONTS.SIZE_SM, color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY }}>{segment.label}</div>
                    </div>
                    <div style={{ fontSize: FONTS.SIZE_MD, color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO, marginLeft: 20 }}>{percentage}%</div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
