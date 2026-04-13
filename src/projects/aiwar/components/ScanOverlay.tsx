import React, { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../../constants/theme";

interface Props {
  progress: number;
  intensity?: number;
}

/**
 * @gallery: <ScanOverlay progress={1} />
 */
export const ScanOverlay: React.FC<Props> = ({ 
  progress, 
  intensity = 0.5 
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
    
    // 1. Scanlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // 2. Animated Scanbar
    const barPos = (frame * 4) % height;
    const grad = ctx.createLinearGradient(0, barPos - 50, 0, barPos + 50);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 * intensity})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, barPos - 50, width, 100);

    // 3. Digital Noise (Static)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.03 * intensity})`;
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
    }

    // 4. Vignette / IR Frame
    const vignette = ctx.createRadialGradient(width/2, height/2, width/3, width/2, height/2, width/1.5);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, `rgba(0, 20, 0, ${0.3 * intensity})`); // Subtle green tint for IR
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

  }, [progress, intensity, width, height, frame]);

  return (
    <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};
