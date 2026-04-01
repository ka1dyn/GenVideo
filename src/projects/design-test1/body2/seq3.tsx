import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, FONTS, TEXT_SIZE, Z, SPRINGS, STAGGER } from "../theme";

export const Seq3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SubSeq 1 (0 ~ 233 frames): HTML 뼈대 -> 더 굳건한 컴포넌트
  const htmlOut = interpolate(frame, [150, 200], [1, 0]);
  

  // SubSeq 2 (233 ~ 766 frames): 프롬프트 -> 다이어그램 확장
  const sub2Frame = Math.max(0, frame - 233);
  const promptText = "Create Next.js Component...";
  const charsToShow = Math.floor(interpolate(sub2Frame, [0, 90], [0, promptText.length], { extrapolateRight: "clamp" }));
  const typedPrompt = promptText.slice(0, charsToShow);

  // 트리 다이어그램 Slam In (프롬프트 입력 직후)
  const treeSlam = spring({
    frame: Math.max(0, sub2Frame - 100),
    fps,
    config: SPRINGS.PUNCH,
  });

  const nodes = ["API 연동", "상태 관리", "UI 렌더링"];
  const nodeAnims = nodes.map((_, i) =>
    spring({
      frame: Math.max(0, sub2Frame - 120 - i * STAGGER.NORMAL),
      fps,
      config: SPRINGS.SNAPPY,
    })
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, zIndex: Z.BG, flexDirection: "row", padding: "80px", gap: "60px" }}>
      
      {/* 왼쪽: 프롬프트 패널 / HTML 뼈대 모델 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "40px" }}>
        
        {/* 구형 마크업 */}
        <Sequence durationInFrames={233}>
          <div style={{
            flex: 1, border: `4px dashed ${COLORS.TEXT_MUTED}`, borderRadius: "16px",
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: htmlOut, color: COLORS.TEXT_MUTED, fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD
          }}>
            &lt;div&gt; 정적 HTML &lt;/div&gt;
          </div>
        </Sequence>

        {/* 터미널 프롬프트 (233프레임부터 활성화) */}
        {frame >= 233 && (
          <div style={{
            height: "120px", backgroundColor: COLORS.BG_VOID, border: `2px solid ${COLORS.BORDER_STRONG}`,
            borderRadius: "12px", padding: "32px",
            fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.MD, color: COLORS.TEXT_MAIN,
            boxShadow: `0 0 32px ${COLORS.PRIMARY_GLOW}`
          }}>
            <span style={{ color: COLORS.PRIMARY }}>$</span> {typedPrompt}
            <span style={{ opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0 }}>_</span>
          </div>
        )}

      </div>

      {/* 오른쪽: 결과물 (Next.js 로고 & 트리) */}
      <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {frame >= 233 + 100 && (
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
            transform: `scale(${treeSlam})`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "48px"
          }}>
            {/* 메인 노드 */}
            <div style={{
              width: "200px", height: "200px",
              backgroundColor: "transparent", border: `6px solid ${COLORS.PRIMARY}`,
              transform: "rotate(45deg)", // 마름모
              display: "flex", justifyContent: "center", alignItems: "center",
              boxShadow: `0 0 64px ${COLORS.PRIMARY_GLOW}`
            }}>
              <div style={{ transform: "rotate(-45deg)", fontFamily: FONTS.DISPLAY, fontSize: TEXT_SIZE.LG, color: COLORS.PRIMARY }}>NEXT.JS</div>
            </div>

            {/* 서브 노드들 */}
            <div style={{ display: "flex", gap: "32px" }}>
              {nodes.map((txt, i) => (
                <div key={i} style={{
                  padding: "16px 24px", backgroundColor: COLORS.BG_ELEVATED, border: `2px solid ${COLORS.SECONDARY}`,
                  borderRadius: "8px", fontFamily: FONTS.MONO, fontSize: TEXT_SIZE.SM, color: COLORS.TEXT_MAIN,
                  transform: `scale(${nodeAnims[i]})`,
                  boxShadow: `0 8px 16px rgba(0,0,0,0.5)`
                }}>
                  {txt}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </AbsoluteFill>
  );
};
