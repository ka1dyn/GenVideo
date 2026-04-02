import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONTS, Z, EFFECTS } from "../theme";

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
       {[1, 2, 3, 4, 5].map(i => {
         const s = spring({ frame: frame - i * 5, fps });
         const x = interpolate(frame, [0, 100], [Math.cos(i) * 500, 0]);
         const y = interpolate(frame, [0, 100], [Math.sin(i) * 500, 0]);
         return (
           <div key={i} style={{ 
              position: "absolute", 
              left: `calc(50% + ${x}px)`, 
              top: `calc(50% + ${y}px)`, 
              width: 100, 
              height: 100, 
              backgroundColor: "white", 
              borderRadius: 20, 
              boxShadow: EFFECTS.SHADOW_LG,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translate(-50%, -50%)",
              opacity: s,
           }}>
              {["💻", "🤖", "⚡", "⚛️", "🚀"][i%5]}
           </div>
         );
       })}
       {frame > 100 && (
         <div style={{ width: 120, height: 120, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", boxShadow: EFFECTS.GLOW_LG }} />
       )}
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 132], [0, 360]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "absolute", width: 400, height: 400, border: `2px dashed ${COLORS.PRIMARY_DIM}`, borderRadius: "50%", transform: `rotate(${rotate}deg)` }}>
          {[1, 2, 3, 4].map(i => (
             <div key={i} style={{ position: "absolute", left: "50%", top: 0, fontSize: 40, transform: `translate(-50%, -50%) rotate(${i * 90}deg)`, transformOrigin: "0 200px" }}>?</div>
          ))}
       </div>
       <h1 style={{ fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.PRIMARY, textShadow: EFFECTS.GLOW_TEXT }}>HOW TO?</h1>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-end", paddingBottom: 100, gap: 100 }}>
       {[1, 2, 3].map(i => {
         const jump = spring({ frame: frame - i * 15, fps, config: { damping: 10 } });
         return (
           <div key={i} style={{ 
             width: 150, 
             height: 150, 
             backgroundColor: [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.ACCENT][i-1], 
             borderRadius: 30, 
             display: "flex", 
             justifyContent: "center", 
             alignItems: "center", 
             fontSize: 80, 
             color: "white", 
             transform: `translateY(${-jump * 300}px)`,
             boxShadow: EFFECTS.SHADOW_LG
           }}>{i}</div>
         );
       })}
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 155], [0, 100]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: "80%", height: 100, backgroundColor: "#E2E8F0", borderRadius: 50, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", position: "relative", zIndex: 1, paddingTop: 20 }}>
             {[1, 2, 3].map(i => <div key={i} style={{ color: progress > i*30 ? "white" : COLORS.TEXT_MUTED, fontSize: 40, fontWeight: "bold" }}>STEP {i}</div>)}
          </div>
       </div>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [0, 158], [20, 80]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
       <div style={{ position: "absolute", bottom: 200, left: 100, right: 100, height: 10, backgroundColor: COLORS.BORDER, borderRadius: 5 }} />
       <div style={{ position: "absolute", bottom: 210, left: `${move}%`, transform: "translateX(-50%)", fontSize: 100 }}>🚶‍♂️🤖</div>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, display: "flex", flexDirection: "row", padding: 60, gap: 40 }}>
       {[1, 2, 3].map(i => (
         <div key={i} style={{ flex: 1, backgroundColor: "white", borderRadius: 30, boxShadow: EFFECTS.SHADOW_LG, border: `1px solid ${COLORS.BORDER}` }} />
       ))}
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row", padding: 60, gap: 40 }}>
       <div style={{ flex: 1.5, backgroundColor: "white", borderRadius: 30, boxShadow: EFFECTS.SHADOW_LG, border: `4px solid ${COLORS.PRIMARY}`, padding: 40, transform: `scale(${1 + s * 0.05})` }}>
          <div style={{ fontSize: 40, color: COLORS.PRIMARY, marginBottom: 40 }}>1. Architecture</div>
          <svg width="100%" height="300">
             <rect x="10" y="40" width="100" height="60" fill={COLORS.PRIMARY_DIM} stroke={COLORS.PRIMARY} />
             <line x1="110" y1="70" x2="200" y2="70" stroke={COLORS.BORDER} />
             <rect x="200" y="40" width="100" height="60" fill={COLORS.SECONDARY_DIM} stroke={COLORS.SECONDARY} />
          </svg>
       </div>
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const stream = (frame * 20) % 800;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row", padding: 60, gap: 40 }}>
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
       <div style={{ flex: 1.5, backgroundColor: "white", borderRadius: 30, boxShadow: EFFECTS.SHADOW_LG, border: `4px solid ${COLORS.SECONDARY}`, padding: 40, overflow: "hidden" }}>
          <div style={{ fontSize: 40, color: COLORS.SECONDARY, marginBottom: 40 }}>2. AI Draft</div>
          <div style={{ fontFamily: FONTS.MONO, color: COLORS.SECONDARY, fontSize: 20, transform: `translateY(${-stream}px)` }}>
             {[...Array(20)].map((_, i) => <div key={i}>AI Generated Code Line {i}...</div>)}
          </div>
       </div>
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
    </AbsoluteFill>
  );
};

const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const sparkle = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.5, 1]);
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row", padding: 60, gap: 40 }}>
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
       <div style={{ flex: 1, backgroundColor: "white", borderRadius: 30, opacity: 0.3 }} />
       <div style={{ flex: 1.5, backgroundColor: "white", borderRadius: 30, boxShadow: EFFECTS.SHADOW_LG, border: `4px solid ${COLORS.ACCENT}`, padding: 40 }}>
          <div style={{ fontSize: 40, color: COLORS.ACCENT, marginBottom: 40 }}>3. Refactor</div>
          <div style={{ fontSize: 100, textAlign: "center" }}>🔍✨</div>
          <div style={{ width: "100%", height: 10, backgroundColor: COLORS.SECONDARY, marginTop: 40, boxShadow: `0 0 ${sparkle * 20}px ${COLORS.SECONDARY}` }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 80 }}>
       <div style={{ color: COLORS.TEXT_MUTED, fontSize: 30, marginBottom: 20 }}>{"<html>"}</div>
       {[1, 2, 3, 4, 5].map(i => {
         const s = spring({ frame: frame - i * 10, fps });
         return (
           <div key={i} style={{ 
             marginLeft: i * 40, 
             marginTop: 10, 
             width: `${i * 10}%`, 
             height: 30, 
             backgroundColor: COLORS.PRIMARY_DIM, 
             borderLeft: `5px solid ${COLORS.PRIMARY}`,
             transform: `scaleX(${s})`,
             transformOrigin: "left"
           }} />
         );
       })}
       <div style={{ position: "absolute", right: 100, bottom: 100, fontSize: 80 }}>🌳</div>
    </AbsoluteFill>
  );
};

const Scene11: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: "80%", height: 300, backgroundColor: "white", borderRadius: 20, boxShadow: EFFECTS.SHADOW_LG, border: `2px solid ${COLORS.BORDER}`, padding: 40 }}>
          <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 40, color: COLORS.TEXT_MAIN }}>Describe your app...</div>
          <div style={{ width: 100, height: 40, backgroundColor: COLORS.PRIMARY, borderRadius: 20, marginTop: 100, alignSelf: "flex-end" }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene12: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ display: "flex", gap: 40 }}>
          <div style={{ padding: "20px 40px", backgroundColor: COLORS.BG_SURFACE, borderRadius: 15, border: `3px solid ${COLORS.SECONDARY}`, color: COLORS.SECONDARY, fontWeight: "bold" }}>API FETCH</div>
          <div style={{ alignSelf: "center", fontSize: 40 }}>↔️</div>
          <div style={{ padding: "20px 40px", backgroundColor: COLORS.BG_SURFACE, borderRadius: 15, border: `3px solid ${COLORS.ACCENT}`, color: COLORS.ACCENT, fontWeight: "bold" }}>STATE</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene13: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 80 }}>
       <div style={{ fontSize: 60, color: COLORS.TEXT_MAIN, marginBottom: 40 }}>Next.js Component</div>
       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ marginLeft: i * 40, color: COLORS.PRIMARY, fontFamily: FONTS.MONO, fontSize: 24 }}>{`└── Component ${i}.tsx`}</div>
          ))}
       </div>
    </AbsoluteFill>
  );
};

const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 10, 30], [0, 1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, transform: `scale(${interpolate(frame, [0, 20], [0.5, 1.5], { extrapolateRight: "clamp" })})` }}>⚡</div>
       <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: flash }} />
    </AbsoluteFill>
  );
};

const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 100, marginBottom: 40 }}>🔑</div>
       <div style={{ width: 150, height: 150, backgroundColor: COLORS.ACCENT, borderRadius: 20, boxShadow: EFFECTS.GLOW_MD, transform: `rotate(${frame * 2}deg)` }}>
          <div style={{ fontSize: 60, textAlign: "center", lineHeight: "150px" }}>💎</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0F0F0F", justifyContent: "center", alignItems: "center" }}>
       <h1 style={{ 
         fontFamily: FONTS.DISPLAY, 
         fontSize: 120, 
         color: COLORS.ACCENT, 
         textShadow: `0 0 ${glow * 40}px ${COLORS.ACCENT}`,
         letterSpacing: 10
       }}>PROMPT ENGINEERING</h1>
    </AbsoluteFill>
  );
};

const Scene17: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
       <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: 1, borderRight: `5px solid ${COLORS.PRIMARY}`, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.PRIMARY }}>CONTEXT</div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.NEGATIVE }}>CONSTRAINTS</div>
       </div>
       <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: 4, backgroundColor: COLORS.BORDER }} />
    </AbsoluteFill>
  );
};

const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const arrowX = interpolate(frame, [0, 40], [-400, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: 400, height: 400, borderRadius: "50%", border: "20px solid red", position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 200, height: 200, borderRadius: "50%", backgroundColor: "red", transform: "translate(-50%, -50%)" }} />
       </div>
       <div style={{ position: "absolute", left: `calc(50% + ${arrowX}px)`, fontSize: 100, transform: "translate(-50%, -50%)" }}>🏹</div>
    </AbsoluteFill>
  );
};

const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const fit = spring({ frame, fps: 60 });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: 200, height: 200, border: `5px dashed ${COLORS.PRIMARY}`, borderRadius: 20, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: interpolate(fit, [0, 1], [-200, 0]), width: "100%", height: "100%", backgroundColor: COLORS.PRIMARY, borderRadius: 15 }} />
       </div>
       <div style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, color: COLORS.PRIMARY }}>PERFECT MATCH</div>
    </AbsoluteFill>
  );
};

const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const burst = interpolate(frame, [0, 30], [0, 5], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: 10, height: 10, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", boxShadow: `0 0 ${burst * 100}px ${COLORS.PRIMARY}`, transform: `scale(${burst * 20})` }} />
    </AbsoluteFill>
  );
};

const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const straighten = interpolate(frame, [0, 40], [20, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <svg width="600" height="200">
          <path d={`M 0 100 Q 150 ${100 - straighten * 5} 300 100 Q 450 ${100 + straighten * 5} 600 100`} fill="none" stroke={COLORS.PRIMARY} strokeWidth="5" />
       </svg>
    </AbsoluteFill>
  );
};

const Scene22: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200 }}>🧘‍♂️</div>
       <div style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, fontSize: 40, color: COLORS.TEXT_MUTED }}>COMPORTABLE WORK</div>
    </AbsoluteFill>
  );
};

const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0, 20]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ padding: 60, backgroundColor: "#0F172A", borderRadius: 20, boxShadow: `0 0 ${glow}px ${COLORS.SECONDARY}`, border: `2px solid ${COLORS.SECONDARY}` }}>
          <div style={{ fontFamily: FONTS.MONO, color: "white", fontSize: 30 }}>CORE_LOGIC();</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene24: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
          {[...Array(25)].map((_, i) => <div key={i} style={{ fontSize: 30 }}>✅</div>)}
       </div>
    </AbsoluteFill>
  );
};

const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const armMove = Math.sin(frame * 0.1) * 30;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
       <div style={{ position: "absolute", top: 100, right: 100, width: 200, height: 400, borderLeft: "20px solid silver", borderBottom: "20px solid silver", transformOrigin: "top right", transform: `rotate(${armMove}deg)` }} />
       <div style={{ position: "absolute", bottom: 200, left: 200, width: "60%", height: 100, border: `5px solid ${COLORS.SECONDARY}`, borderRadius: 20, backgroundColor: COLORS.SECONDARY_DIM }}>
          <div style={{ textAlign: "center", lineHeight: "100px", color: COLORS.SECONDARY, fontWeight: "bold" }}>SAFETY NET</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene26: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 150, color: COLORS.SECONDARY, textShadow: EFFECTS.GLOW_TEXT }}>PASS</div>
       <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
          {[1,2,3].map(i => <div key={i} style={{ width: 100, height: 10, backgroundColor: COLORS.SECONDARY, borderRadius: 5 }} />)}
       </div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={147}><Scene1 /></Series.Sequence>
      <Series.Sequence durationInFrames={132}><Scene2 /></Series.Sequence>
      <Series.Sequence durationInFrames={124}><Scene3 /></Series.Sequence>
      <Series.Sequence durationInFrames={155}><Scene4 /></Series.Sequence>
      <Series.Sequence durationInFrames={158}><Scene5 /></Series.Sequence>
      <Series.Sequence durationInFrames={172}><Scene6 /></Series.Sequence>
      <Series.Sequence durationInFrames={196}><Scene7 /></Series.Sequence>
      <Series.Sequence durationInFrames={240}><Scene8 /></Series.Sequence>
      <Series.Sequence durationInFrames={241}><Scene9 /></Series.Sequence>
      <Series.Sequence durationInFrames={287}><Scene10 /></Series.Sequence>
      <Series.Sequence durationInFrames={84}><Scene11 /></Series.Sequence>
      <Series.Sequence durationInFrames={140}><Scene12 /></Series.Sequence>
      <Series.Sequence durationInFrames={140}><Scene13 /></Series.Sequence>
      <Series.Sequence durationInFrames={114}><Scene14 /></Series.Sequence>
      <Series.Sequence durationInFrames={136}><Scene15 /></Series.Sequence>
      <Series.Sequence durationInFrames={178}><Scene16 /></Series.Sequence>
      <Series.Sequence durationInFrames={182}><Scene17 /></Series.Sequence>
      <Series.Sequence durationInFrames={133}><Scene18 /></Series.Sequence>
      <Series.Sequence durationInFrames={120}><Scene19 /></Series.Sequence>
      <Series.Sequence durationInFrames={71}><Scene20 /></Series.Sequence>
      <Series.Sequence durationInFrames={124}><Scene21 /></Series.Sequence>
      <Series.Sequence durationInFrames={160}><Scene22 /></Series.Sequence>
      <Series.Sequence durationInFrames={157}><Scene23 /></Series.Sequence>
      <Series.Sequence durationInFrames={136}><Scene24 /></Series.Sequence>
      <Series.Sequence durationInFrames={103}><Scene25 /></Series.Sequence>
      <Series.Sequence durationInFrames={126}><Scene26 /></Series.Sequence>
    </Series>
  );
};
