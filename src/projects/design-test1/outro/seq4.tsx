import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 727 frames): 장벽 무너짐 -> 무엇을? 왜? 
  const wallDrop = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const typoDrop = spring({
    frame: Math.max(0, frame - 150),
    fps,
    config: SPRINGS.PUNCH,
  });

  const horizonY = interpolate(wallDrop, [0, 1], [100, 50], { extrapolateRight: "clamp" }); // 지평선이 열림

  // SubSeq 2 (727 ~ 872 frames): 망설임 없이
  const sub2Frame = Math.max(0, frame - 727);
  const hesitationAnim = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.PUNCH,
  });
  const zoomIn = interpolate(sub2Frame, [100, 145], [1, 2], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, overflow: "hidden", transform: `scale(${zoomIn})` }}>
      
      {/* SubSeq 1: 장벽(Wall) 내려감 */}
      <Sequence durationInFrames={727}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          
          {/* 하늘/Horizon 배경 (장벽 뒤) */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, bottom: "50%",
            background: `linear-gradient(to top, ${COLORS.PRIMARY_DIM}, transparent)`
          }} />

          {/* 무너지는 진입장벽 */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: `${horizonY}%`,
            backgroundColor: COLORS.BG_SURFACE,
            borderBottom: `8px solid ${COLORS.BORDER_STRONG}`,
            display: "flex", flexWrap: "wrap"
          }}>
            {/* 세로줄 패턴 무늬 */}
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} style={{ flex: 1, borderRight: `2px dashed ${COLORS.BORDER}` }} />
            ))}
          </div>

          {/* 무엇을? 왜? 등장 */}
          {frame > 150 && (
            <div style={{
              fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.HERO,
              color: COLORS.TEXT_MAIN,
              textAlign: "center",
              lineHeight: 0.9,
              transform: `scale(${interpolate(typoDrop, [0, 1], [2, 1])}) rotate(${interpolate(typoDrop, [0, 1], [-10, 0])}deg)`,
              textShadow: `0 20px 48px rgba(0,0,0,0.8)`,
              zIndex: 3
            }}>
              무엇을?<br/>
              <span style={{ color: COLORS.PRIMARY }}>왜?</span>
            </div>
          )}
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2: 망설임 없이 */}
      {frame >= 727 && (
        <Sequence from={727} durationInFrames={145}>
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: COLORS.BG_VOID, zIndex: 10 }}>
            <div style={{
              fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.XL,
              color: COLORS.ACCENT, // 경고/결단 컬러
              textShadow: `0 0 64px ${COLORS.ACCENT}`,
              transform: `scale(${hesitationAnim})`,
              opacity: hesitationAnim
            }}>
              망설임 없이
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

    </AbsoluteFill>
  );
};
