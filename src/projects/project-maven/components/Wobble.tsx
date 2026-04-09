import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

interface WobbleProps {
  children: React.ReactNode;
  /** 'jumpy' (boiling effect) or 'smooth' (gentle sway) */
  mode?: "jumpy" | "smooth";
  /** Intensity of the wobble in pixels (default: 1.5) */
  intensity?: number;
  /** How many frames between each wobble / frequency of sway (default: 3) */
  interval?: number;
  /** Rotation wobble in degrees (default: 0.5) */
  rotationIntensity?: number;
  style?: React.CSSProperties;
}

/**
 * A wrapper component that adds a hand-drawn "boiling" or "wobble" effect
 * by applying small random transformations every few frames.
 */
export const Wobble: React.FC<WobbleProps> = ({
  children,
  mode = "smooth",
  intensity = 1.0,
  interval = 4,
  rotationIntensity = 0.3,
  style,
}) => {
  const frame = useCurrentFrame();

  const transform = useMemo(() => {
    // Deterministic "random" based on seed
    const random = (s: number) => {
      const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    if (mode === "jumpy") {
      // Traditional boiling effect: jumps every N frames
      const seed = Math.floor(frame / interval);
      const x = (random(seed) - 0.5) * intensity;
      const y = (random(seed + 1) - 0.5) * intensity;
      const rotate = (random(seed + 2) - 0.5) * rotationIntensity;
      return `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    } else {
      // Smooth sway: using multiple sine waves for organic feel
      const t = frame / (interval * 4);
      const x = (Math.sin(t * 1.1) + Math.cos(t * 0.7)) * intensity;
      const y = (Math.cos(t * 0.9) + Math.sin(t * 1.3)) * intensity;
      const rotate = Math.sin(t * 0.5) * rotationIntensity;
      return `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    }
  }, [frame, mode, intensity, interval, rotationIntensity]);

  return (
    <div
      style={{
        display: "inline-block",
        transform,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
