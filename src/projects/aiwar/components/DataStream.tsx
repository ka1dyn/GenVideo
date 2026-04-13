import React, { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../../constants/theme";

interface Props {
  progress: number;
  direction?: 'horizontal' | 'vertical';
  color?: string;
}

/**
 * @gallery: <DataStream progress={1} />
 */
export const DataStream: React.FC<Props> = ({ 
  progress, 
  direction = 'horizontal', 
  color = COLORS.PRIMARY 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    
    const layerCount = 5;
    const speed = 2;

    for (let l = 0; l < layerCount; l++) {
        ctx.globalAlpha = 0.2 + (l / layerCount) * 0.5;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1 + l;

        const gap = 100;
        const offset = (frame * speed * (l + 1)) % gap;

        if (direction === 'horizontal') {
            for (let y = 0; y < height; y += gap) {
                const currentY = y + (l * 20);
                ctx.beginPath();
                ctx.moveTo(0, currentY);
                ctx.lineTo(width * progress, currentY);
                ctx.stroke();

                // Draw moving packets
                for (let x = -offset; x < width; x += gap) {
                    if (x > width * progress) continue;
                    ctx.fillStyle = color;
                    ctx.fillRect(x, currentY - 5, 20, 10);
                }
            }
        } else {
            for (let x = 0; x < width; x += gap) {
                const currentX = x + (l * 20);
                ctx.beginPath();
                ctx.moveTo(currentX, 0);
                ctx.lineTo(currentX, height * progress);
                ctx.stroke();

                // Draw moving packets
                for (let y = -offset; y < height; y += gap) {
                    if (y > height * progress) continue;
                    ctx.fillStyle = color;
                    ctx.fillRect(currentX - 5, y, 10, 20);
                }
            }
        }
    }
    
    ctx.globalAlpha = 1;
  }, [progress, direction, color, width, height, frame]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};
