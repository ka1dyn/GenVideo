import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 299 frames): 연도 카운트업
  const speedCount = Math.floor(interpolate(frame, [0, 200], [2022, 2026]));
  const textScale = spring({
    frame,
    fps,
    config: SPRINGS.PUNCH,
  });

  // SubSeq 2 (299 ~ 685 frames): 미래 도구 상징 박스
  const sub2Frame = Math.max(0, frame - 299);
  const cubeScale = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.SNAPPY,
  });
  const cubeRotate = interpolate(sub2Frame, [0, 386], [0, 360]);

  // SubSeq 3 (685 ~ 1075 frames): 어둠 침식 (일자리 대체 우려)
  const sub3Frame = Math.max(0, frame - 685);
  const shadowY = interpolate(sub3Frame, [0, 100], [100, 50], { extrapolateRight: "clamp", easing: EASINGS.CINEMATIC });

  const glitchError = frame % 6 < 3 ? COLORS.NEGATIVE : COLORS.TEXT_MAIN;

  // 전체 암전 Smash Cut
  const smashCutDrop = interpolate(frame, [1055, 1075], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, zIndex: Z.BG, overflow: "hidden", opacity: smashCutDrop }}>
      
      {/* 상승하는 빛의 궤적 애니메이션 */}
      <div style={{
        position: "absolute",
        left: "-50%", right: "-50%", bottom: "0", height: "800px",
        background: `radial-gradient(ellipse at bottom, ${COLORS.PRIMARY_DIM} 0%, transparent 70%)`,
        opacity: interpolate(frame, [0, 100], [0, 1]),
        transform: `translateY(${Math.sin((frame * Math.PI) / 120) * 50}px)`
      }} />

      {/* SubSeq 1: 연도 타이머 */}
      <Sequence durationInFrames={299}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{
            fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.HERO,
            color: frame > 250 ? COLORS.ACCENT : COLORS.TEXT_MAIN, // 250프레임 넘어가면 오렌지 섬광
            transform: `scale(${interpolate(textScale, [0, 1], [0.8, 1])})`,
            textShadow: frame > 250 ? `0 0 64px ${COLORS.ACCENT}` : `0 0 24px ${COLORS.PRIMARY_GLOW}`
          }}>
            {speedCount}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 2: 미지의 큐브 상자 가속 회전 */}
      <Sequence from={299} durationInFrames={386}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{
            width: "300px", height: "300px",
            border: `6px solid ${COLORS.PRIMARY}`,
            boxShadow: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
            transform: `scale(${cubeScale}) rotateZ(${cubeRotate}deg)`,
            display: "flex", justifyContent: "center", alignItems: "center"
          }}>
            <div style={{
              width: "150px", height: "150px",
              backgroundColor: COLORS.PRIMARY,
              transform: `rotateZ(-${cubeRotate * 2}deg)` // 반대로 회전
            }} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SubSeq 3: 검은 그림자의 침식과 인간 상징 실루엣 안절부절 */}
      <Sequence from={685} durationInFrames={390}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* 어둠이 밑에서 위로 차오름 */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: `${100 - shadowY}%`,
            backgroundColor: COLORS.BG_DEEP, opacity: 0.9, zIndex: 2
          }} />

          {/* 중앙의 에러 점멸 아이콘 (안면 실루엣 느낌) */}
          <div style={{
            fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.XXL,
            color: sub3Frame > 200 ? glitchError : COLORS.TEXT_MAIN,
            zIndex: 3,
            transform: `scale(${spring({ frame: sub3Frame, fps, config: SPRINGS.PUNCH })})`
          }}>
            인간_개발자
          </div>

          <div style={{
            position: "absolute", top: "20%", fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG,
            color: COLORS.NEGATIVE, zIndex: 3, opacity: sub3Frame > 150 ? 1 : 0
          }}>
            경고: 대체 위험
          </div>
        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
