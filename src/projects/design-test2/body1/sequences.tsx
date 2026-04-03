import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, spring, useVideoConfig, random } from "remotion";
import { COLORS, FONTS, Z, EFFECTS } from "../theme";

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 150, opacity: 0.2, marginBottom: 20 }}>?</div>
      <h2 style={{ fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MAIN, opacity, textAlign: "center", padding: "0 100px" }}>
        그렇다면 실제 현장에서는 어떤 변화가 일어나고 있을까요?
      </h2>
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 20,
          height: 20,
          backgroundColor: COLORS.PRIMARY_DIM,
          borderRadius: "50%",
          left: `${random(`dots-x-${i}`) * 100}%`,
          top: `${random(`dots-y-${i}`) * 100}%`,
          opacity: 0.5,
          transform: `translateY(${Math.sin(frame * 0.05 + i) * 20}px)`
        }} />
      ))}
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const fogOpacity = interpolate(frame, [0, 40], [1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 120, opacity: 0.5 }}>☁️</div>
       <div style={{
         position: "absolute",
         width: "100%",
         height: "100%",
         backgroundColor: "rgba(255,255,255,0.8)",
         opacity: fogOpacity
       }} />
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_SURFACE, padding: 100, justifyContent: "flex-end", display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 20 }}>
      {[1.2, 1.5, 2.0, 2.5, 3.0].map((h, i) => {
        const s = spring({ frame: frame - i * 10, fps });
        return (
          <div key={i} style={{
            width: 80,
            height: `${s * h * 100}px`,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: "10px 10px 0 0",
            boxShadow: EFFECTS.SHADOW_SM,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const magX = interpolate(frame, [0, 150], [20, 80]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP }}>
      <div style={{ position: "absolute", left: `${magX}%`, top: "50%", width: 250, height: 250, border: `10px solid ${COLORS.HIGHLIGHT}`, borderRadius: "50%", backgroundColor: "rgba(245, 158, 11, 0.1)", transform: "translate(-50%, -50%)", zIndex: 10 }}>
         <div style={{ position: "absolute", right: -50, bottom: -50, width: 100, height: 15, backgroundColor: COLORS.HIGHLIGHT, transform: "rotate(45deg)" }} />
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontSize: 40, fontFamily: FONTS.MONO }}>
         0101101010101011010101010110
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, transform: `scale(${s})` }}>📄</div>
       <h3 style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED }}>REPORT</h3>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
         {[1, 2, 3].map(i => (
           <div key={i} style={{ width: 120, height: 120, backgroundColor: COLORS.BG_SURFACE, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${COLORS.BORDER}` }}>
              {frame > i * 20 ? <span style={{ fontSize: 40 }}>🤖</span> : "👤"}
           </div>
         ))}
      </div>
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.floor(interpolate(frame, [0, 60], [0, 55], { extrapolateRight: "clamp" }));
  const up = interpolate(frame % 20, [0, 20], [0, -100]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 200, color: COLORS.PRIMARY, fontWeight: "bold" }}>{count}%</div>
       <div style={{ position: "absolute", right: 200, top: "50%", transform: `translateY(${up}px)`, fontSize: 80, color: COLORS.SECONDARY }}>↑</div>
       <div style={{ position: "absolute", left: 200, top: "30%", transform: `translateY(${up * 0.5}px)`, fontSize: 60, color: COLORS.SECONDARY, opacity: 0.5 }}>↑</div>
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const move = (frame * 10) % 400;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, overflow: "hidden" }}>
       <div style={{ display: "flex", flexWrap: "wrap", gap: 40, padding: 100, transform: `translateY(${-move}px)` }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{ width: "100%", height: 60, backgroundColor: COLORS.BG_SURFACE, borderRadius: 10, border: `1px solid ${COLORS.BORDER}` }} />
          ))}
       </div>
    </AbsoluteFill>
  );
};

const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = interpolate(frame, [10, 40], [100, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 100, marginBottom: 40 }}>✂️</div>
       <div style={{ width: 600, height: 100, backgroundColor: COLORS.BG_SURFACE, overflow: "hidden", borderRadius: 10 }}>
          <div style={{ width: `${cut}%`, height: "100%", backgroundColor: COLORS.NEGATIVE, opacity: 0.3 }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ width: 300, height: 300, borderRadius: "50%", border: `10px solid ${COLORS.BORDER}`, position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 50, width: 6, height: 100, backgroundColor: COLORS.TEXT_MAIN, transformOrigin: "bottom center", transform: `rotate(${frame * 10}deg)` }} />
          <div style={{ position: "absolute", left: "50%", top: 70, width: 4, height: 80, backgroundColor: COLORS.PRIMARY, transformOrigin: "bottom center", transform: `rotate(${frame * 2}deg)` }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ 
         width: 400, 
         height: 400, 
         background: `conic-gradient(${COLORS.PRIMARY} 0% 40%, ${COLORS.SECONDARY} 40% 70%, ${COLORS.TEXT_MUTED} 70% 100%)`, 
         borderRadius: "50%",
         transform: `scale(${s}) rotate(-90deg)`,
         boxShadow: EFFECTS.SHADOW_LG
       }} />
    </AbsoluteFill>
  );
};

const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const size = interpolate(frame, [0, 131], [40, 5]);

  return (
      <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center",}}>
            <div style={{ 
                width: 400, 
                height: 400, 
                background: `conic-gradient(${COLORS.PRIMARY} 0% ${100-size}%, ${COLORS.TEXT_MUTED} ${100-size}% 100%)`, 
                borderRadius: "50%",
                transform: `rotate(-90deg)`,
                boxShadow: EFFECTS.SHADOW_LG
            }} />
            <div style={{ position: "absolute", bottom: 100, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED, fontSize: 40 }}>REPETITIVE TASK</div>
        </AbsoluteFill> 
    
  );
};

const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const falling = interpolate(frame, [0, 30], [-200, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ transform: `translateY(${falling}px)`, textAlign: "center" }}>
          <div style={{ fontSize: 120, color: COLORS.NEGATIVE, fontWeight: "bold" }}>80% DOWN</div>
          <div style={{ fontSize: 80, color: COLORS.NEGATIVE }}>↓</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 180, filter: `drop-shadow(0 0 20px ${COLORS.PRIMARY_GLOW})` }}>💡</div>
       <div style={{ display: "flex", gap: 10, marginTop: 40 }}>
          <div style={{ width: 60, height: 60, backgroundColor: COLORS.PRIMARY, borderRadius: 10 }} />
          <div style={{ width: 60, height: 60, backgroundColor: COLORS.SECONDARY, borderRadius: 10 }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene15: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [0, 60], [1, 3], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
        <div style={{ 
         width: 200, 
         height: 200, 
         backgroundColor: COLORS.PRIMARY,
         borderRadius: "50%",
         transform: `scale(${grow})`,
         boxShadow: EFFECTS.GLOW_MD,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         color: "white",
         fontFamily: FONTS.DISPLAY,
         fontSize: 20,
       }}>CREATIVE</div>
    </AbsoluteFill>
  );
};

const Scene16: React.FC = () => {
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
       <div style={{ flex: 1, backgroundColor: COLORS.BG_VOID, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.TEXT_MUTED }}>BEFORE</div>
       <div style={{ flex: 1, backgroundColor: COLORS.BG_SURFACE, display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.PRIMARY }}>AFTER</div>
    </AbsoluteFill>
  );
};

const Scene17: React.FC = () => {
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
       <div style={{ flex: 1, backgroundColor: "#E5E7EB", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: 100 }}>📚📄📉</div>
       </div>
       <div style={{ flex: 1 }} />
    </AbsoluteFill>
  );
};

const Scene18: React.FC = () => {
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
       <div style={{ flex: 1, backgroundColor: "#111827", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
             <div style={{ width: 200, height: 120, border: "2px solid #374151" }} />
             <div style={{ position: "absolute", top: -20, left: 20, width: 30, height: 10, backgroundColor: "#374151" }} />
          </div>
       </div>
       <div style={{ flex: 1 }} />
    </AbsoluteFill>
  );
};

const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const showCheck = frame > 60;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
       <div style={{ flex: 1 }} />
       <div style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ backgroundColor: COLORS.BG_VOID, padding: 30, borderRadius: 15, fontFamily: FONTS.MONO, color: COLORS.TEXT_MUTED, fontSize: 14 }}>
             {"// AI Suggestion:"} <br/>
             {"return array.filter(x => x > 0);"}
          </div>
          {showCheck && <div style={{ fontSize: 100, color: COLORS.SECONDARY, marginTop: 40, textAlign: "center" }}>✅</div>}
       </div>
    </AbsoluteFill>
  );
};

const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const roll = (frame * 5) % 200;
  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
       <div style={{ flex: 1 }} />
       <div style={{ flex: 1, backgroundColor: "#F9FAFB", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: 400, height: 100, border: "4px solid #D1D5DB", borderRadius: 50, position: "relative", overflow: "hidden" }}>
             {[0, 1, 2, 3].map(i => (
               <div key={i} style={{ position: "absolute", left: `${i * 100 + roll - 100}px`, width: 60, height: 60, backgroundColor: COLORS.PRIMARY_DIM, borderRadius: 10, top: 20 }} />
             ))}
          </div>
       </div>
    </AbsoluteFill>
  );
};

const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const bugScale = interpolate(frame, [0, 30], [1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#ECFDF5", justifyContent: "center", alignItems: "center" }}>
       <div style={{ display: "flex", gap: 40 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ fontSize: 80, transform: `scale(${bugScale})`, opacity: bugScale }}>🪲</div>
          ))}
       </div>
    </AbsoluteFill>
  );
};

const Scene22: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = (frame * 8) % 600;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 100 }}>
       <div style={{ backgroundColor: "white", width: "100%", height: "100%", borderRadius: 20, boxShadow: EFFECTS.SHADOW_SM, position: "relative", padding: 40, fontFamily: FONTS.MONO, color: COLORS.TEXT_MUTED }}>
          {[...Array(10)].map((_, i) => (
             <div key={i} style={{ width: `${60 + random(`scan-line-${i}`) * 30}%`, height: 20, backgroundColor: COLORS.BG_VOID, marginBottom: 20 }} />
          ))}
          <div style={{ position: "absolute", left: 0, top: scanY, width: "100%", height: 4, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
       </div>
    </AbsoluteFill>
  );
};

const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ position: "relative" }}>
          <div style={{ fontSize: 150 }}>🛡️</div>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${1 - s})`, fontSize: 100 }}>❗</div>
       </div>
       <div style={{ marginTop: 40, fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.PRIMARY }}>90%</div>
    </AbsoluteFill>
  );
};

const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lockS = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, transform: `scale(${lockS})` }}>🔒</div>
       <div style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, fontSize: 40, color: COLORS.PRIMARY }}>STABILITY</div>
    </AbsoluteFill>
  );
};

const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, 177], [100, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#EFF6FF", overflow: "hidden" }}>
       <div style={{ display: "flex", alignItems: "flex-end", height: "100%", gap: 20, padding: "0 100px" }}>
          {[0.4, 0.7, 0.5, 0.9, 0.6, 1.0].map((h, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: COLORS.PRIMARY, height: `${h * 70}%`, transform: `translateY(${rise}%)`, opacity: 0.8 + i * 0.04 }} />
          ))}
       </div>
       <div style={{ position: "absolute", top: 100, left: 100, fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.PRIMARY }}>GROWTH</div>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={187}><Scene1 /></Series.Sequence>
      <Series.Sequence durationInFrames={128}><Scene2 /></Series.Sequence>
      <Series.Sequence durationInFrames={118}><Scene3 /></Series.Sequence>
      <Series.Sequence durationInFrames={152}><Scene4 /></Series.Sequence>
      <Series.Sequence durationInFrames={189}><Scene5 /></Series.Sequence>
      <Series.Sequence durationInFrames={149}><Scene6 /></Series.Sequence>
      <Series.Sequence durationInFrames={208}><Scene7 /></Series.Sequence>
      <Series.Sequence durationInFrames={161}><Scene8 /></Series.Sequence>
      <Series.Sequence durationInFrames={136}><Scene9 /></Series.Sequence>
      <Series.Sequence durationInFrames={92}><Scene10 /></Series.Sequence>
      <Series.Sequence durationInFrames={205}><Scene11 /></Series.Sequence>
      <Series.Sequence durationInFrames={131}><Scene12 /></Series.Sequence>
      <Series.Sequence durationInFrames={97}><Scene13 /></Series.Sequence>
      <Series.Sequence durationInFrames={158}><Scene14 /></Series.Sequence>
      <Series.Sequence durationInFrames={185}><Scene15 /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Scene16 /></Series.Sequence>
      <Series.Sequence durationInFrames={118}><Scene17 /></Series.Sequence>
      <Series.Sequence durationInFrames={182}><Scene18 /></Series.Sequence>
      <Series.Sequence durationInFrames={175}><Scene19 /></Series.Sequence>
      <Series.Sequence durationInFrames={185}><Scene20 /></Series.Sequence>
      <Series.Sequence durationInFrames={228}><Scene21 /></Series.Sequence>
      <Series.Sequence durationInFrames={227}><Scene22 /></Series.Sequence>
      <Series.Sequence durationInFrames={130}><Scene23 /></Series.Sequence>
      <Series.Sequence durationInFrames={127}><Scene24 /></Series.Sequence>
      <Series.Sequence durationInFrames={177}><Scene25 /></Series.Sequence>
    </Series>
  );
};
