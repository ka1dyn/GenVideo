import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, EASINGS } from "../theme";

export const Seq4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 314 frames): 조준(Lock-on) 및 텍스트 
  const textPunch = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: SPRINGS.PUNCH,
  });

  const radarScale = interpolate(frame, [0, 60], [3, 1], { extrapolateRight: "clamp", easing: EASINGS.DRAMATIC });
  const radarRotate = interpolate(frame, [0, 314], [0, 90]);

  // SubSeq 2 (314 ~ 820 frames): 제약조건 좁혀오기
  const sub2Frame = Math.max(0, frame - 314);
  const boxIn = spring({
    frame: sub2Frame,
    fps,
    config: SPRINGS.SNAPPY,
  });

  // 에러율 오차 "0%" 카운트다운
  const ErrorRate = Math.max(0, Math.floor(interpolate(sub2Frame, [60, 180], [100, 0])));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, zIndex: Z.BG }}>
      
      {/* 레이더 / 크로스헤어 모형 */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: "1000px", height: "1000px",
        marginLeft: "-500px", marginTop: "-500px",
        border: `2px dashed ${COLORS.BORDER_STRONG}`,
        borderRadius: "50%",
        transform: `scale(${radarScale}) rotate(${radarRotate}deg)`,
        opacity: interpolate(frame, [0, 20], [0, 0.4])
      }}>
        {/* 가로세로 축 */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: COLORS.BORDER_STRONG }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: COLORS.BORDER_STRONG }} />
      </div>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        
        {/* SubSeq 1: 메인 텍스트 */}
        <Sequence durationInFrames={820}>
          <div style={{
            fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.HERO,
            color: COLORS.TEXT_MAIN, textAlign: "center",
            lineHeight: 0.9,
            transform: `scale(${interpolate(textPunch, [0, 1], [0.8, 1])})`,
            textShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
            zIndex: 2,
            opacity: interpolate(sub2Frame, [200, 250], [1, 0]) // SubSeq 2 중반 이후 Fade Out
          }}>
            프롬프트<br />
            <span style={{ color: COLORS.PRIMARY }}>엔지니어링</span>
          </div>
        </Sequence>

        {/* SubSeq 2: 제약 조건 박스와 0% */}
        {frame >= 314 && (
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 3
          }}>
            {/* 4방향에서 좁혀오는 제약조건 Box */}
            <div style={{
              position: "absolute", top: `${interpolate(boxIn, [0, 1], [0, 25])}%`, left: "20%", right: "20%", height: "4px", backgroundColor: COLORS.SECONDARY, opacity: boxIn
            }} />
            <div style={{
              position: "absolute", bottom: `${interpolate(boxIn, [0, 1], [0, 25])}%`, left: "20%", right: "20%", height: "4px", backgroundColor: COLORS.SECONDARY, opacity: boxIn
            }} />
            <div style={{
              position: "absolute", left: `${interpolate(boxIn, [0, 1], [0, 30])}%`, top: "20%", bottom: "20%", width: "4px", backgroundColor: COLORS.SECONDARY, opacity: boxIn
            }} />
            <div style={{
              position: "absolute", right: `${interpolate(boxIn, [0, 1], [0, 30])}%`, top: "20%", bottom: "20%", width: "4px", backgroundColor: COLORS.SECONDARY, opacity: boxIn
            }} />

            {/* 오차율 0% 중앙 전시 */}
            {sub2Frame > 250 && (
              <div style={{
                fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.HERO,
                color: ErrorRate === 0 ? COLORS.POSITIVE : COLORS.ACCENT,
                transform: `scale(${spring({ frame: Math.max(0, sub2Frame - 250), fps, config: SPRINGS.PUNCH })})`,
                textShadow: `0 0 48px ${ErrorRate === 0 ? COLORS.POSITIVE : COLORS.ACCENT}`
              }}>
                {ErrorRate}% 오차율
              </div>
            )}
          </div>
        )}

      </AbsoluteFill>

    </AbsoluteFill>
  );
};
