import React, { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../../constants/theme";

interface Props {
  progress: number;
  type?: 'scatter' | 'converge';
  count?: number;
  color?: string;
}

/**
 * @gallery: <SwarmGrid progress={1} />
 */
export const SwarmGrid: React.FC<Props> = ({ 
  progress, 
  type = 'scatter', 
  count = 100, 
  color = COLORS.STATE_WARN_FG 
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
    
    // Seed for deterministic randomness
    const seed = 12345;
    
    for (let i = 0; i < count; i++) {
        const randX = (Math.sin(i * seed) * 0.5 + 0.5) * width;
        const randY = (Math.cos(i * (seed + 1)) * 0.5 + 0.5) * height;
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        let x, y;
        if (type === 'scatter') {
            // Move from center to random position
            x = centerX + (randX - centerX) * progress;
            y = centerY + (randY - centerY) * progress;
        } else {
            // Move from random position to center
            x = randX + (centerX - randX) * progress;
            y = randY + (centerY - randY) * progress;
        }
        
        const size = 6 + Math.sin(frame * 0.1 + i) * 2;
        const opacity = interpolate(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
        
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 1.5;
        
        // Draw square target marker [+] style
        const half = size / 2;
        ctx.beginPath();
        // Corners
        ctx.moveTo(x - half, y - half + 4); ctx.lineTo(x - half, y - half); ctx.lineTo(x - half + 4, y - half);
        ctx.moveTo(x + half - 4, y - half); ctx.lineTo(x + half, y - half); ctx.lineTo(x + half, y - half + 4);
        ctx.moveTo(x + half, y + half - 4); ctx.lineTo(x + half, y + half); ctx.lineTo(x + half - 4, y + half);
        ctx.moveTo(x - half + 4, y + half); ctx.lineTo(x - half, y + half); ctx.lineTo(x - half, y + half - 4);
        ctx.stroke();
        
        // Center dot
        if (progress > 0.5) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    ctx.globalAlpha = 1;
  }, [progress, type, count, color, width, height, frame]);

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
