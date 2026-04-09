import React, { useRef, useEffect } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../theme";

interface RoughCanvasAIProps {
  width: number;
  height: number;
  startFrame?: number;
}

/**
 * Canvas를 사용하여 손으로 직접 그린 듯한 AI 분석 박스와 
 * 데이터 텍스트를 표현하는 실험적인 컴포넌트입니다.
 */
export const RoughCanvasAI: React.FC<RoughCanvasAIProps> = ({
  width,
  height,
  startFrame = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);

  // 선을 그리는 함수 (약간의 떨림 효과 포함)
  const drawRoughLine = (
    ctx: CanvasRenderingContext2D,
    x1: number, y1: number,
    x2: number, y2: number,
    progress: number
  ) => {
    if (progress <= 0) return;

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    // 선 사이사이에 미세한 제어점을 두어 곡선처럼 떨리게 만듦
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 4;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 4;
    
    // 현재 진행도에 따른 끝점 계산
    const currentX = x1 + (x2 - x1) * progress;
    const currentY = y1 + (y2 - y1) * progress;

    if (progress > 0.5) {
      ctx.quadraticCurveTo(midX, midY, currentX, currentY);
    } else {
      ctx.lineTo(currentX, currentY);
    }
    
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 클리어
    ctx.clearRect(0, 0, width, height);
    
    // 스타일 설정
    ctx.strokeStyle = COLORS.TEXT_MAIN;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    // 1. 분석 박스 그리기 (사각 테두리)
    // 4개의 변을 각각 애니메이션
    const p1 = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
    const p2 = interpolate(localFrame, [10, 20], [0, 1], { extrapolateRight: "clamp" });
    const p3 = interpolate(localFrame, [20, 30], [0, 1], { extrapolateRight: "clamp" });
    const p4 = interpolate(localFrame, [30, 40], [0, 1], { extrapolateRight: "clamp" });

    // 박스 좌표
    const offset = 40;
    const bx = offset, by = offset, bw = width - offset * 2, bh = height - offset * 2;

    drawRoughLine(ctx, bx, by, bx + bw, by, p1); // Top
    drawRoughLine(ctx, bx + bw, by, bx + bw, by + bh, p2); // Right
    drawRoughLine(ctx, bx + bw, by + bh, bx, by + bh, p3); // Bottom
    drawRoughLine(ctx, bx, by + bh, bx, by, p4); // Left

    // 2. 내부 데이터 텍스트 (마커 느낌)
    if (localFrame > 45) {
      ctx.fillStyle = COLORS.PRIMARY;
      ctx.font = "bold 32px 'Arial'"; // 폰트가 로드되었다면 'Pretendard' 등 사용 가능
      
      const textProgress = interpolate(localFrame, [45, 60], [0, 1], { extrapolateRight: "clamp" });
      ctx.globalAlpha = textProgress;
      
      ctx.fillText("[ AI ANALYSIS ]", bx + 20, by + 50);
      
      ctx.fillStyle = COLORS.TEXT_BODY;
      ctx.font = "24px 'Arial'";
      if (localFrame > 60) ctx.fillText("- OBJECT: VEHICLE", bx + 20, by + 100);
      if (localFrame > 75) ctx.fillText("- TYPE: MILITARY", bx + 20, by + 140);
      if (localFrame > 90) {
        ctx.strokeStyle = COLORS.STATE_WARN_FG;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(bx + 15, by + 115, 200, 40);
        ctx.setLineDash([]);
        ctx.fillText("(!) CONFIDENCE: 92%", bx + 20, by + 180);
      }
      ctx.globalAlpha = 1;
    }

    // 3. 스캔라인 효과 (Canvas만의 느낌)
    const scanPos = (localFrame * 5) % height;
    ctx.strokeStyle = COLORS.OVERLAY_PRIMARY;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, scanPos);
    ctx.lineTo(bx + bw, scanPos);
    ctx.stroke();

  }, [localFrame, width, height]);

  return (
    <div style={{ position: "relative", width, height }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))",
        }}
      />
    </div>
  );
};
