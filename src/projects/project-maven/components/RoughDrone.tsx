import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { Wobble } from "./Wobble";

interface RoughDroneProps {
  size?: number;
  color?: string;
  startFrame?: number;
}

/**
 * A hand-drawn style drone illustration using SVG paths.
 */
export const RoughDrone: React.FC<RoughDroneProps> = ({
  size = 400,
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

  const pathProgress = interpolate(entrance, [0, 1], [0, 1]);
  const scale = entrance;

  return (
    <Wobble intensity={2} interval={3}>
      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 200 120"
        fill="none"
        style={{
          overflow: "visible",
          transform: `scale(${scale})`,
          filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))",
        }}
      >
        {/* Main Body - Rough Rectangle */}
        <path
          d="M 60,50 Q 62,48 100,50 Q 138,52 140,50 Q 142,80 140,90 Q 138,92 100,90 Q 62,88 60,90 Q 58,80 60,50"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - pathProgress)}
        />
        
        {/* Left Arm */}
        <path
          d="M 60,70 Q 30,65 20,60"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - pathProgress)}
        />
        
        {/* Right Arm */}
        <path
          d="M 140,70 Q 170,65 180,60"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - pathProgress)}
        />

        {/* Rotors - Simple ellipses */}
        <ellipse
          cx="20" cy="55" rx="25" ry="8"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset={200 * (1 - pathProgress)}
          style={{ transform: `rotate(${frame * 10}deg)`, transformOrigin: "20px 55px" }}
        />
        <ellipse
          cx="180" cy="55" rx="25" ry="8"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset={200 * (1 - pathProgress)}
          style={{ transform: `rotate(${frame * -10}deg)`, transformOrigin: "180px 55px" }}
        />

        {/* Camera/Sensor */}
        <circle
          cx="100" cy="80" r="10"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - pathProgress)}
        />
        <path
          d="M 95,80 Q 100,75 105,80"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </Wobble>
  );
};
