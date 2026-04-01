import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 587 frames): 거대한 파티클 및 차트 윤곽선
  const boxIn = spring({
    frame,
    fps,
    config: SPRINGS.SNAPPY,
  });

  const chartLineOp = interpolate(frame, [100, 150], [0, 1], { extrapolateRight: "clamp" });

  // SubSeq 2 (587 ~ 1133 frames): 55% 카운트업과 바 차트 상승
  const sub2Frame = Math.max(0, frame - 587);
  
  const percentValue = Math.floor(interpolate(sub2Frame, [0, 120], [0, 55], { extrapolateRight: "clamp", easing: EASINGS.DRAMATIC }));
  const numberScale = spring({
    frame: sub2Frame - 120,
    fps,
    config: SPRINGS.PUNCH,
  });

  const barHeight = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
    durationInFrames: 60,
  });

  // Smash Cut 전환(Z-축 스케일)을 위해 마지막 프레임에 확대
  const zTransition = spring({
    frame: Math.max(0, frame - 1100),
    fps,
    config: { damping: 10, stiffness: 50 },
  });
  const cameraZ = interpolate(zTransition, [0, 1], [1, 5]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, overflow: "hidden" }}>
      <div style={{ transform: `scale(${cameraZ})`, width: "100%", height: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        {/* 전체 컨테이너 */}
        <div style={{
          width: "800px", height: "500px",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          borderBottom: `4px solid ${COLORS.BORDER_STRONG}`,
          borderLeft: `4px solid ${COLORS.BORDER_STRONG}`,
          padding: "40px",
          opacity: chartLineOp,
          transform: `scale(${boxIn})`
        }}>
          
          {/* 바 차트 렌더링 컨테이너 */}
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            
            {/* 상승 바 */}
            {frame >= 587 && (
              <div style={{
                width: "40%",
                height: `${interpolate(barHeight, [0, 1], [0, 100])}%`,
                background: `linear-gradient(to top, ${COLORS.PRIMARY_GLOW}, ${COLORS.POSITIVE})`,
                boxShadow: `0 0 64px ${COLORS.PRIMARY_GLOW}`,
                borderRadius: "12px 12px 0 0",
              }} />
            )}
            
            {/* 55 카운트업 (타격 연출 포함) */}
            <div style={{
              position: "absolute",
              bottom: "40%",
              fontFamily: FONTS.MONO,
              fontSize: TEXT_SIZE.HERO,
              color: percentValue === 55 ? COLORS.PRIMARY : COLORS.TEXT_MAIN,
              transform: percentValue === 55 ? `scale(${interpolate(numberScale, [0, 1], [1.5, 1])})` : "none",
              textShadow: percentValue === 55 ? `0 0 48px ${COLORS.PRIMARY_GLOW}` : "none",
              zIndex: 2,
            }}>
              +{percentValue}%
            </div>

          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
