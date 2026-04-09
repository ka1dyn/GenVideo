import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { Wobble } from "./Wobble";

interface RoughClockProps {
  size?: number;
  color?: string;
  startFrame?: number;
}

export const RoughClock: React.FC<RoughClockProps> = ({
  size = 150,
  color = COLORS.TEXT_MAIN,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: Math.max(0, frame - startFrame),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const progress = entrance;

  return (
    <Wobble intensity={1.5} interval={4}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        style={{
          overflow: "visible",
          transform: `scale(${progress})`,
        }}
      >
        {/* Clock Face - Rough Circle */}
        <circle
          cx="50" cy="50" r="40"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="300"
          strokeDashoffset={300 * (1 - progress)}
        />
        
        {/* Tick marks */}
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="50" y1="15" x2="50" y2="22"
            stroke={color}
            strokeWidth="2"
            transform={`rotate(${deg}, 50, 50)`}
            opacity={progress}
          />
        ))}

        {/* Hour Hand */}
        <line
          x1="50" y1="50" x2="50" y2="35"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${30 + frame * 0.1}, 50, 50)`}
        />
        
        {/* Minute Hand */}
        <line
          x1="50" y1="50" x2="50" y2="25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${frame * 2}, 50, 50)`}
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="3" fill={color} />
      </svg>
    </Wobble>
  );
};
