import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { COLORS, FONTS, Z, EFFECTS } from "../theme";

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const stream = (frame * 30) % 1000;
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
       {[...Array(10)].map((_, i) => (
         <div key={i} style={{ position: "absolute", left: `${i * 10}%`, top: stream - 200, width: 2, height: 200, backgroundColor: COLORS.PRIMARY_DIM, filter: "blur(2px)" }} />
       ))}
       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.PRIMARY, opacity: 0.1 }}>SPEED</div>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const stream = (frame * 50) % 1000;
  const pop = spring({ frame, fps: 60 });
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", overflow: "hidden" }}>
       {[...Array(20)].map((_, i) => (
         <div key={i} style={{ position: "absolute", left: `${(i * 5) % 100}%`, top: stream - 200, width: 4, height: 300, backgroundColor: COLORS.PRIMARY, opacity: 0.2 }} />
       ))}
       <h1 style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${pop * 1.2})`, fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.PRIMARY }}>EVOLUTION</h1>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 5, 20], [1, 1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "white", opacity: flash, zIndex: 100 }} />
       <div style={{ width: 100, height: 2, backgroundColor: COLORS.BORDER }} />
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const year = frame < 40 ? "2024" : frame < 80 ? "2025" : "2026";
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ padding: 40, backgroundColor: "white", borderRadius: 20, boxShadow: EFFECTS.SHADOW_LG, border: `2px solid ${COLORS.BORDER}` }}>
          <div style={{ fontSize: 120, fontFamily: FONTS.DISPLAY, color: COLORS.PRIMARY }}>{year}</div>
       </div>
       <div style={{ position: "absolute", width: 600, height: 600, border: `1px solid ${COLORS.PRIMARY_DIM}`, borderRadius: "50%", opacity: 0.2, rotate: `${frame}deg` }}>
          <div style={{ position: "absolute", top: 0, left: "50%", fontSize: 40 }}>🛠️</div>
          <div style={{ position: "absolute", bottom: 0, left: "50%", fontSize: 40 }}>⚡</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const whirl = frame * 10;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 150 }}>👤</div>
       <div style={{ position: "absolute", width: 500, height: 500, transform: `rotate(${whirl}deg)` }}>
          {[1,2,3,4,5,6].map(i => (
             <div key={i} style={{ position: "absolute", left: "50%", top: 0, fontSize: 40, transform: `rotate(${i * 60}deg)`, transformOrigin: "0 250px" }}>➔</div>
          ))}
       </div>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = (random("scene6-noise") - 0.5) * 5;
  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 150, transform: `translate(${noise}px, ${noise}px)` }}>😟</div>
       <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.05)", opacity: 0.5 }} />
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const smoke = interpolate(frame, [0, 220], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center" }}>
       <h2 style={{ 
         fontFamily: FONTS.DISPLAY, 
         fontSize: 100, 
         color: COLORS.TEXT_MUTED, 
         opacity: 1 - smoke, 
         transform: `translateY(${-smoke * 100}px) scale(${1 + smoke})`,
         filter: `blur(${smoke * 10}px)`
       }}>REPLACEMENT?</h2>
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const drawLine = interpolate(frame, [0, 152], [0, 100]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: "80%", height: 4, backgroundColor: COLORS.BORDER, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${drawLine}%`, backgroundColor: COLORS.PRIMARY }} />
          <div style={{ position: "absolute", left: 0, top: -20, width: 40, height: 40, backgroundColor: COLORS.PRIMARY_DIM, borderRadius: "50%" }} />
          <div style={{ position: "absolute", right: 0, top: -20, width: 40, height: 40, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", opacity: drawLine/100 }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const converge = interpolate(frame, [0, 140], [400, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       {["🚂", "💻", "📱"].map((emoji, i) => (
         <div key={i} style={{ position: "absolute", left: `calc(50% + ${Math.cos(i) * converge}px)`, top: `calc(50% + ${Math.sin(i) * converge}px)`, fontSize: 80, opacity: 1 - frame/140 }}>{emoji}</div>
       ))}
       <div style={{ width: 150, height: 150, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", boxShadow: EFFECTS.GLOW_LG, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontFamily: FONTS.DISPLAY, fontSize: 60 }}>AI</div>
    </AbsoluteFill>
  );
};

const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const size = interpolate(frame, [0, 156], [100, 500]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: size, height: size, backgroundColor: COLORS.PRIMARY, borderRadius: "50% 50% 0 0", opacity: 0.1 }} />
       <div style={{ fontSize: 100, position: "absolute" }}>👤</div>
    </AbsoluteFill>
  );
};

const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const exp = interpolate(frame, [0, 179], [0, 1000]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: exp, height: exp, border: `2px solid ${COLORS.PRIMARY}`, borderRadius: "50%", opacity: 1 - frame/179 }} />
       <h1 style={{ fontFamily: FONTS.DISPLAY, fontSize: 120, color: COLORS.PRIMARY }}>EXPANSION</h1>
    </AbsoluteFill>
  );
};

const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const showX = frame > 60;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ display: "flex", gap: 100 }}>
          <div style={{ fontSize: 150 }}>👤</div>
          <div style={{ alignSelf: "center", position: "relative" }}>
             <div style={{ fontSize: 60, color: COLORS.TEXT_MUTED }}>VS</div>
             {showX && <div style={{ position: "absolute", left: -20, top: -20, fontSize: 100, color: COLORS.NEGATIVE }}>❌</div>}
          </div>
          <div style={{ fontSize: 150 }}>🤖</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const float = interpolate(frame, [0, 166], [0, -400]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ transform: `translateY(${float}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 150 }}>🎈</div>
          <div style={{ alignSelf: "center", marginTop: 20, color: COLORS.TEXT_MUTED }}>Bye bye, repetitive tasks!</div>
       </div>
       <div style={{ position: "absolute", bottom: 100, fontSize: 120 }}>📦</div>
    </AbsoluteFill>
  );
};

const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = frame;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "absolute", left: "30%", top: "40%", fontSize: 100, transform: `rotate(${rotate}deg)` }}>💎</div>
       <div style={{ position: "absolute", right: "30%", bottom: "40%", fontSize: 100, transform: `rotate(${-rotate}deg)` }}>💡</div>
    </AbsoluteFill>
  );
};

const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 98], [2, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ 
         width: 500, 
         height: 500, 
         border: `50px solid black`, 
         borderRadius: "50%", 
         transform: `scale(${zoom})`,
         display: "flex",
         justifyContent: "center",
         alignItems: "center"
       }}>
          <div style={{ width: 100, height: 100, backgroundColor: COLORS.PRIMARY, borderRadius: "50%" }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const lever = interpolate(frame, [0, 50], [10, -20], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.SECONDARY, justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "relative", width: 600, height: 400 }}>
          <div style={{ position: "absolute", bottom: 0, left: "50%", width: 0, height: 0, borderLeft: "40px solid transparent", borderRight: "40px solid transparent", borderBottom: `60px solid white`, transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", bottom: 60, left: 0, width: "100%", height: 20, backgroundColor: "white", borderRadius: 10, transform: `rotate(${lever}deg)`, transformOrigin: "center" }} />
          <div style={{ position: "absolute", bottom: 100, right: 0, width: 200, height: 200, backgroundColor: "#334155", borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 40 }}>PROBLEM</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const sink = interpolate(frame, [0, 80], [0, 500], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "absolute", bottom: -sink, width: "100%", height: 500, backgroundColor: "#E2E8F0", borderTop: `10px solid ${COLORS.BORDER}` }} />
       <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.PRIMARY }}>PATH OPEN</div>
    </AbsoluteFill>
  );
};

const Scene18: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 139], [1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ opacity: fade, textAlign: "center" }}>
          <div style={{ fontSize: 40, color: COLORS.TEXT_MUTED }}>WPM (Typing Speed)</div>
          <div style={{ width: 400, height: 200, border: `2px solid ${COLORS.BORDER}`, borderBottom: "none", position: "relative", marginTop: 20 }}>
             <path d="M 0 100 L 100 80 L 200 120 L 300 40 L 400 90" fill="none" stroke={COLORS.NEGATIVE} strokeWidth="4" />
          </div>
       </div>
    </AbsoluteFill>
  );
};

const Scene19: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <h1 style={{ fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.PRIMARY, fontWeight: "bold" }}>WHAT & WHY</h1>
    </AbsoluteFill>
  );
};

const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const shiny = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, position: "relative" }}>
          🧠
          <div style={{ position: "absolute", left: "50%", top: "40%", width: 100, height: 100, backgroundColor: COLORS.PRIMARY_GLOW, borderRadius: "50%", transform: "translate(-50%, -50%)", filter: `blur(${shiny * 20}px)`, opacity: shiny }} />
       </div>
       <div style={{ marginTop: 20, fontFamily: FONTS.PRIMARY, color: COLORS.PRIMARY }}>PRODUCT MINDSET</div>
    </AbsoluteFill>
  );
};

const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const spark = interpolate(frame, [0, 20], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, transform: `rotate(-45deg)` }}>🪄</div>
       <div style={{ position: "absolute", width: 300, height: 300, background: `radial-gradient(circle, ${COLORS.ACCENT_DIM} 0%, transparent 70%)`, opacity: spark, boxShadow: EFFECTS.GLOW_LG }} />
    </AbsoluteFill>
  );
};

const Scene22: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.2) * 0.1;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <h1 style={{ fontFamily: FONTS.DISPLAY, fontSize: 200, color: COLORS.PRIMARY, transform: `scale(${pulse})`, textShadow: EFFECTS.GLOW_TEXT }}>GO!</h1>
    </AbsoluteFill>
  );
};

const Scene23: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200 }}>🤝</div>
       <div style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED }}>HUMAN & AI</div>
    </AbsoluteFill>
  );
};

const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const horizon = interpolate(frame, [0, 220], [0, 100]);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(to top, ${COLORS.BG_VOID}, #FFFFFF)`, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: "100%", height: 2, backgroundColor: COLORS.PRIMARY_DIM, position: "absolute", top: "60%" }} />
       <div style={{ width: 10, height: 400, backgroundColor: COLORS.PRIMARY, position: "absolute", top: "60%", transform: "perspective(100px) rotateX(60deg)", opacity: horizon/100 }} />
       <h1 style={{ fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.PRIMARY }}>START YOUR JOURNEY</h1>
    </AbsoluteFill>
  );
};

const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
       {[...Array(10)].map((_, i) => (
         <div key={i} style={{ 
            position: "absolute", 
            left: `${random(`smoke-x-${i}`) * 80 + 10}%`, 
            top: `${random(`smoke-y-${i}`) * 80 + 10}%`, 
            width: 100, 
            height: 100, 
            backgroundColor: [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.ACCENT][i%3], 
            borderRadius: "50%", 
            filter: "blur(40px)",
            opacity: 0.3,
            transform: `scale(${interpolate(frame, [0, 153], [1, 3])})`
         }} />
       ))}
    </AbsoluteFill>
  );
};

const Scene26: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ textAlign: "center", transform: `scale(${s})` }}>
          <div style={{ fontSize: 120, fontFamily: FONTS.DISPLAY, color: COLORS.PRIMARY, textShadow: EFFECTS.GLOW_TEXT }}>REALIZED BY AI</div>
          <div style={{ marginTop: 20, color: COLORS.TEXT_MUTED, letterSpacing: 5 }}>THANK YOU FOR WATCHING</div>
       </div>
       {[...Array(50)].map((_, i) => (
         <div key={i} style={{
            position: "absolute",
            width: 4,
            height: 4,
            backgroundColor: COLORS.PRIMARY,
            left: `${random(`star-x-${i}`) * 100}%`,
            top: `${random(`star-y-${i}`) * 100}%`,
            opacity: 0.5,
         }} />
       ))}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={106}><Scene1 /></Series.Sequence>
      <Series.Sequence durationInFrames={120}><Scene2 /></Series.Sequence>
      <Series.Sequence durationInFrames={73}><Scene3 /></Series.Sequence>
      <Series.Sequence durationInFrames={203}><Scene4 /></Series.Sequence>
      <Series.Sequence durationInFrames={183}><Scene5 /></Series.Sequence>
      <Series.Sequence durationInFrames={170}><Scene6 /></Series.Sequence>
      <Series.Sequence durationInFrames={220}><Scene7 /></Series.Sequence>
      <Series.Sequence durationInFrames={152}><Scene8 /></Series.Sequence>
      <Series.Sequence durationInFrames={140}><Scene9 /></Series.Sequence>
      <Series.Sequence durationInFrames={156}><Scene10 /></Series.Sequence>
      <Series.Sequence durationInFrames={179}><Scene11 /></Series.Sequence>
      <Series.Sequence durationInFrames={154}><Scene12 /></Series.Sequence>
      <Series.Sequence durationInFrames={166}><Scene13 /></Series.Sequence>
      <Series.Sequence durationInFrames={153}><Scene14 /></Series.Sequence>
      <Series.Sequence durationInFrames={98}><Scene15 /></Series.Sequence>
      <Series.Sequence durationInFrames={145}><Scene16 /></Series.Sequence>
      <Series.Sequence durationInFrames={220}><Scene17 /></Series.Sequence>
      <Series.Sequence durationInFrames={139}><Scene18 /></Series.Sequence>
      <Series.Sequence durationInFrames={127}><Scene19 /></Series.Sequence>
      <Series.Sequence durationInFrames={107}><Scene20 /></Series.Sequence>
      <Series.Sequence durationInFrames={135}><Scene21 /></Series.Sequence>
      <Series.Sequence durationInFrames={145}><Scene22 /></Series.Sequence>
      <Series.Sequence durationInFrames={104}><Scene23 /></Series.Sequence>
      <Series.Sequence durationInFrames={220}><Scene24 /></Series.Sequence>
      <Series.Sequence durationInFrames={153}><Scene25 /></Series.Sequence>
      <Series.Sequence durationInFrames={279}><Scene26 /></Series.Sequence>
    </Series>
  );
};
