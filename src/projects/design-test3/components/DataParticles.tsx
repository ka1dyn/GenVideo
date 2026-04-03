import React, { useMemo } from "react";
import { AbsoluteFill, useVideoConfig, random, interpolate, useCurrentFrame } from "remotion";

interface DataParticlesProps {
  count?: number;
  color?: string;
  speed?: number;
  sizeRange?: [number, number];
  opacityRange?: [number, number];
  drift?: number;
}

export const DataParticles: React.FC<DataParticlesProps> = ({
  count = 50,
  color = "#00FFCC",
  speed = 1,
  sizeRange = [2, 5],
  opacityRange = [0.1, 0.6],
  drift = 0,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: random(`p-x-${i}`) * width,
      y: random(`p-y-${i}`) * height,
      size: interpolate(random(`p-s-${i}`), [0, 1], sizeRange),
      opacity: interpolate(random(`p-o-${i}`), [0, 1], opacityRange),
      speedFactor: random(`p-sp-${i}`) * 0.5 + 0.5,
      delay: random(`p-d-${i}`) * 100,
    }));
  }, [count, width, height, sizeRange, opacityRange]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const yOffset = ((frame * speed * p.speedFactor + p.y) % height);
        const xOffset = p.x + Math.sin(frame / 50 + p.delay) * drift;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: xOffset,
              top: yOffset,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              borderRadius: "50%",
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
