import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS } from "../theme";

export const Seq2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 트리 뷰 단계 활성화 프레임
  const step1Start = 0;
  const step2Start = 196;
  const step3Start = 436;

  // 각 단계별 모션
  const step1Anim = spring({ frame: Math.max(0, frame - step1Start), fps, config: SPRINGS.SNAPPY });
  const step2Anim = spring({ frame: Math.max(0, frame - step2Start), fps, config: SPRINGS.SNAPPY });
  const step3Anim = spring({ frame: Math.max(0, frame - step3Start), fps, config: SPRINGS.SNAPPY });

  // 마지막 Zoom In
  const zoomIn = spring({
    frame: Math.max(0, frame - 640),
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, 
      display: "flex", justifyContent: "center", alignItems: "center",
      transform: `scale(${interpolate(zoomIn, [0, 1], [1, 4])})` // 마지막 스매시 컷 줌 인
    }}>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "800px" }}>
        
        {/* Step 1: Architecture */}
        <div style={{
          display: "flex", alignItems: "center", gap: "32px",
          padding: "24px", borderRadius: "12px",
          backgroundColor: frame >= step1Start ? COLORS.BG_SURFACE : "transparent",
          border: `2px solid ${frame >= step1Start ? COLORS.SECONDARY : COLORS.BORDER}`,
          opacity: interpolate(step1Anim, [0, 1], [0.3, 1]),
          transform: `translateX(${interpolate(step1Anim, [0, 1], [-100, 0])}px)`
        }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: COLORS.SECONDARY, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.BG_DEEP }}>
            1
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.TEXT_MAIN }}>아키텍처</div>
            <div style={{ height: "4px", width: "100%", backgroundColor: COLORS.BORDER, marginTop: "8px" }}>
              <div style={{ height: "100%", width: "100%", backgroundColor: COLORS.SECONDARY, transformOrigin: "left", transform: `scaleX(${step1Anim})` }} />
            </div>
          </div>
        </div>

        {/* Step 2: AI Draft */}
        <div style={{
          display: "flex", alignItems: "center", gap: "32px",
          padding: "24px", borderRadius: "12px",
          backgroundColor: frame >= step2Start ? COLORS.BG_SURFACE : "transparent",
          border: `2px solid ${frame >= step2Start ? COLORS.PRIMARY : COLORS.BORDER}`,
          opacity: interpolate(step2Anim, [0, 1], [0.3, 1]),
          transform: `translateX(${interpolate(step2Anim, [0, 1], [-100, 0])}px)`
        }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: COLORS.PRIMARY, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.BG_DEEP, boxShadow: `0 0 24px ${COLORS.PRIMARY_GLOW}` }}>
            2
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.PRIMARY, textShadow: `0 0 16px ${COLORS.PRIMARY_GLOW}` }}>AI 초안</div>
            <div style={{ height: "4px", width: "100%", backgroundColor: COLORS.BORDER, marginTop: "8px" }}>
              <div style={{ height: "100%", width: "100%", backgroundColor: COLORS.PRIMARY, transformOrigin: "left", transform: `scaleX(${step2Anim})` }} />
            </div>
          </div>
        </div>

        {/* Step 3: Refactoring (마지막 타겟) */}
        <div style={{
          display: "flex", alignItems: "center", gap: "32px",
          padding: "24px", borderRadius: "12px",
          backgroundColor: frame >= step3Start ? COLORS.BG_ELEVATED : "transparent",
          border: `2px solid ${frame >= step3Start ? COLORS.HIGHLIGHT : COLORS.BORDER}`,
          opacity: interpolate(step3Anim, [0, 1], [0.3, 1]),
          transform: `translateX(${interpolate(step3Anim, [0, 1], [-100, 0])}px)`
        }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: COLORS.POSITIVE, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.BG_DEEP }}>
            3
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.TEXT_MAIN }}>리팩토링</div>
            <div style={{ height: "4px", width: "100%", backgroundColor: COLORS.BORDER, marginTop: "8px" }}>
              <div style={{ height: "100%", width: "100%", backgroundColor: COLORS.POSITIVE, transformOrigin: "left", transform: `scaleX(${step3Anim})` }} />
            </div>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
