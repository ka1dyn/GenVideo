import React, { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONTS } from "../../../constants/theme";

interface Props {
  progress: number;
  color?: string;
  particleCount?: number;
}

/**
 * @gallery: <MatrixTunnel progress={1} />
 */
export const MatrixTunnel: React.FC<Props> = ({ 
  progress, 
  color = COLORS.PRIMARY,
  particleCount = 50 
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
    
    // Background glow
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw tunnel particles
    for (let i = 0; i < particleCount; i++) {
        // Pseudo-random but deterministic based on index
        const angle = (i * 137.5) % 360;
        const radiusBase = (i * 20) % (width / 2);
        
        // Motion: from center to outside based on progress + offset
        const moveProgress = (progress * 2 + (i / particleCount)) % 1;
        const currentRadius = moveProgress * (width / 1.5);
        
        const x = width / 2 + Math.cos(angle * Math.PI / 180) * currentRadius;
        const y = height / 2 + Math.sin(angle * Math.PI / 180) * currentRadius;
        
        // Depth effect: size and opacity increases as it gets closer
        const size = moveProgress * 8;
        const opacity = Math.max(0, interpolate(moveProgress, [0, 0.2, 0.8, 1], [0, 0.5, 1, 0]));
        
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        
        // Random shapes: points or small squares
        if (i % 3 === 0) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        } else if (i % 3 === 1) {
            ctx.fillRect(x - size, y - size, size * 2, size * 2);
        } else {
            // Draw a small sketch-style line connecting toward center
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(width/2 + (x - width/2) * 0.9, height/2 + (y - height/2) * 0.9);
            ctx.stroke();
        }
        
        // Add random data strings
        if (i % 10 === 0 && moveProgress > 0.5) {
            ctx.font = `bold ${10 + size * 2}px ${FONTS.MONO}`;
            const dataText = i % 2 === 0 ? "10110" : "클로드 엔진";
            ctx.fillText(dataText, x + size, y + size);
        }
    }
    
    ctx.globalAlpha = 1;
  }, [progress, width, height, color, particleCount]);

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: COLORS.BG_DARKEST }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  );
};
