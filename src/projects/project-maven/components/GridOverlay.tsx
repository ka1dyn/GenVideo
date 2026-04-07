import React from "react";

interface GridOverlayProps {
  /** Grid cell size in pixels */
  cellSize?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  cellSize = 60,
  color = "rgba(55, 138, 221, 0.12)",
  opacity = 1,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};
