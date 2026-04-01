import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 지렛대 모션 중심(Slam In)
  const pivotSub = Math.max(0, frame - 60);
  const pivotIn = spring({
    frame: pivotSub,
    fps,
    config: SPRINGS.PUNCH,
  });

  // 단순 작업 블록들 날려버리는 Lever 효과
  const leverAction = spring({
    frame: Math.max(0, pivotSub - 120),
    fps,
    config: { damping: 10, stiffness: 200 }, // 퉁~ 튕기는 효과
  });

  // 크리에이터 전구 `Scale Punch`
  const creatorSpring = spring({
    frame: Math.max(0, pivotSub - 180),
    fps,
    config: SPRINGS.PUNCH,
  });

  // 마지막 터짐 Glitch Flash
  const flashOp = frame > 550 ? interpolate(frame, [550, 562], [0, 1]) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, overflow: "hidden" }}>
      
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* 지렛대 시스템 렌더링 */}
        
        {/* 받침점 (Pivot) */}
        <div style={{
          position: "absolute", bottom: "30%",
          width: 0, height: 0,
          borderLeft: "60px solid transparent",
          borderRight: "60px solid transparent",
          borderBottom: `100px solid ${COLORS.SECONDARY}`, // 라임 색상
          transform: `scale(${interpolate(pivotIn, [0, 1], [0.1, 1])}) translateY(${interpolate(pivotIn, [0, 1], [300, 0])}px)`,
          zIndex: 2,
        }} />

        {/* 지렛대 막대 (Lever) */}
        {pivotSub > 30 && (
          <div style={{
            position: "absolute", bottom: "30%", // 받침점 위
            width: "800px", height: "16px",
            backgroundColor: COLORS.BORDER_STRONG,
            borderRadius: "8px",
            transformOrigin: "center",
            transform: `translateY(-90px) rotate(${interpolate(leverAction, [0, 1], [-15, 15])}deg)`, // 왼쪽 내려감 -> 오른쪽 내려가면서 튕김
            zIndex: 1,
          }}>
            {/* 좌측 무거운 단순 코딩 박스 (튕겨나감) */}
            <div style={{
              position: "absolute", left: "20px", bottom: "16px",
              width: "120px", height: "120px", backgroundColor: COLORS.BG_SURFACE,
              border: `4px solid ${COLORS.TEXT_MUTED}`, borderRadius: "12px",
              display: "flex", justifyContent: "center", alignItems: "center",
              transformOrigin: "bottom center",
              transform: `translateY(${leverAction > 0.5 ? interpolate(leverAction, [0.5, 1], [0, -1000], { easing: EASINGS.DRAMATIC }) : 0}px) rotate(${interpolate(leverAction, [0.5, 1], [0, -90])}deg)`
            }}>
              <span style={{ fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.XS, color: COLORS.TEXT_MUTED }}>단순<br/>작업</span>
            </div>

            {/* 우측 아이디어/크리에이터 전구 */}
            <div style={{
              position: "absolute", right: "20px", bottom: "16px",
              width: "140px", height: "140px",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
              transform: `scale(${interpolate(creatorSpring, [0, 1], [0, 1])})`,
              transformOrigin: "bottom center"
            }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                backgroundColor: COLORS.PRIMARY,
                boxShadow: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
              }} />
              <div style={{ fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MAIN, marginTop: "16px", textShadow: `0 0 16px ${COLORS.PRIMARY_GLOW}` }}>
                크리에이터
              </div>
            </div>
          </div>
        )}

      </AbsoluteFill>

      {/* 전환용 섬광 */}
      <div style={{
        position: "absolute", width: "100%", height: "100%",
        backgroundColor: COLORS.TEXT_MAIN, opacity: flashOp, zIndex: 10
      }} />

    </AbsoluteFill>
  );
};
