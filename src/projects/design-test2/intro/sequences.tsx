import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame, spring, useVideoConfig, Sequence, random } from "remotion";
import { COLORS, FONTS, Z, EFFECTS } from "../theme";

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const rotation = interpolate(frame, [0, 135], [0, 90]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        border: `2px solid ${COLORS.PRIMARY_DIM}`,
        borderRadius: "30%",
        transform: `rotate(${rotation}deg) scale(${scale * 1.5})`,
        opacity: 0.2,
      }} />
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        border: `2px solid ${COLORS.SECONDARY_DIM}`,
        borderRadius: "40%",
        transform: `rotate(${-rotation * 0.5}deg) scale(${scale})`,
        opacity: 0.15,
      }} />
      <h1 style={{
        fontFamily: FONTS.DISPLAY,
        fontSize: 100,
        color: COLORS.PRIMARY,
        zIndex: Z.CONTENT,
        opacity,
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 10,
        textShadow: EFFECTS.GLOW_TEXT,
      }}>
        Web Development
      </h1>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 80 }}>
      <div style={{ position: "relative", width: "50%", height: "100%" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const delay = i * 5;
          const s = spring({ frame: frame - delay, fps, config: { damping: 15 } });
          const x = interpolate(s, [0, 1], [-400, 0]);
          const seed = `scene2-rect-${i}`;
          return (
            <div key={i} style={{
              height: 40,
              width: `${70 + random(seed) * 30}%`,
              backgroundColor: "#E2E8F0",
              marginBottom: 15,
              borderRadius: 8,
              transform: `translateX(${x}px)`,
              opacity: s,
              border: "1px solid #CBD5E1",
            }} />
          );
        })}
      </div>
      <div style={{
        position: "absolute",
        right: 100,
        top: "40%",
        fontFamily: FONTS.PRIMARY,
        fontSize: 60,
        color: COLORS.TEXT_MUTED,
        fontWeight: "bold",
      }}>
        모든 컴포넌트
      </div>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 0.5) * 2;
  const cursorOpacity = Math.floor(frame / 10) % 2 === 0 ? 1 : 0;
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: COLORS.BG_DEEP, 
      justifyContent: "center", 
      alignItems: "center",
      transform: `translate(${shake}px, ${shake}px)` 
    }}>
      <div style={{ 
        fontFamily: FONTS.MONO, 
        fontSize: 48, 
        color: COLORS.TEXT_MAIN,
        padding: 40,
        backgroundColor: COLORS.BG_SURFACE,
        borderRadius: 16,
        border: `1px solid ${COLORS.BORDER}`,
        boxShadow: EFFECTS.SHADOW_SM,
      }}>
        <span style={{ color: COLORS.PRIMARY }}>write</span>(code);
        <span style={{ 
          display: "inline-block", 
          width: 4, 
          height: 48, 
          backgroundColor: COLORS.PRIMARY, 
          marginLeft: 8,
          opacity: cursorOpacity,
          verticalAlign: "middle"
        }} />
      </div>
      <div style={{ marginTop: 40, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED }}>직접 한 땀 한 땀...</div>
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glowOpacity = interpolate(frame, [0, 20], [0, 1]);
  const glowScale = spring({ frame, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9" }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 600,
        background: `radial-gradient(circle, ${COLORS.PRIMARY_GLOW} 0%, transparent 70%)`,
        opacity: glowOpacity,
        scale: glowScale * 2,
      }} />
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 300,
        backgroundColor: COLORS.BG_SURFACE,
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        boxShadow: EFFECTS.SHADOW_LG,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONTS.DISPLAY,
        fontSize: 100,
        color: COLORS.PRIMARY,
        animation: "none",
        rotate: `${frame * 0.5}deg`,
      }}>
        AI
      </div>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineProgress = interpolate(frame, [10, 40], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 200, alignItems: "center" }}>
        {/* Human Silhouette */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 150, height: 150, backgroundColor: COLORS.TEXT_MUTED, borderRadius: "50%", opacity: 0.3 }} />
          <div style={{ opacity: 0.5, marginTop: 10 }}>Human</div>
        </div>
        {/* AI Silhouette */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 150, height: 150, backgroundColor: COLORS.PRIMARY, borderRadius: "50%", opacity: 0.3, boxShadow: EFFECTS.GLOW_SM }} />
          <div style={{ opacity: 0.5, marginTop: 10 }}>AI</div>
        </div>
      </div>
      {/* Connecting Lines */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
        <line 
          x1="calc(50% - 100px)" y1="50%" x2={`calc(50% - 100px + ${lineProgress * 2}px)`} y2="50%" 
          stroke={COLORS.SECONDARY} strokeWidth="4" strokeDasharray="10,10"
        />
      </svg>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const arrowX = interpolate(frame, [0, 60], [10, 90]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1, backgroundColor: "#E5E7EB", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "4px solid white" }}>
        <div style={{ width: "70%", height: "70%", backgroundColor: "white", borderRadius: 10, boxShadow: EFFECTS.SHADOW_SM, padding: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#F87171", marginBottom: 10 }} />
          <div style={{ width: "80%", height: 20, backgroundColor: "#F3F4F6", marginBottom: 10 }} />
          <div style={{ width: "60%", height: 20, backgroundColor: "#F3F4F6" }} />
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: "#1E293B", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "70%", height: "70%", backgroundColor: "#0F172A", borderRadius: 10, boxShadow: EFFECTS.SHADOW_LG, padding: 20, fontFamily: FONTS.MONO, color: "#94A3B8", fontSize: 16 }}>
          <span style={{ color: "#818CF8" }}>const</span> component = () {"=>"} ...
        </div>
      </div>
      {/* Moving Arrow */}
      <div style={{ 
        position: "absolute", 
        left: `${arrowX}%`, 
        top: "50%", 
        width: 60, 
        height: 60, 
        backgroundColor: COLORS.SECONDARY, 
        borderRadius: "50%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        boxShadow: EFFECTS.GLOW_SM,
        transform: "translate(-50%, -50%)"
      }}>
        <span style={{ color: "white", fontSize: 30 }}>➔</span>
      </div>
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const straighten = interpolate(frame, [0, 40], [20, 0], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "80%", height: "20%" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${i * 20}%`,
            width: "100%",
            height: 4,
            backgroundColor: COLORS.PRIMARY_DIM,
            borderRadius: 2,
            transform: `translateY(${Math.sin(frame * 0.1 + i) * straighten}px)`,
          }} />
        ))}
      </div>
      <div style={{ marginTop: 60, fontFamily: FONTS.DISPLAY, fontSize: 80, color: COLORS.PRIMARY }}>CLEAR PATH</div>
    </AbsoluteFill>
  );
};

const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 60], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#FDFCF0", backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <div style={{ 
        position: "absolute", 
        left: "50%", 
        top: "50%", 
        transform: "translate(-50%, -50%)",
        width: 800,
        height: 500,
        border: `2px solid ${COLORS.TEXT_MUTED}`,
        opacity: 0.3,
        borderRadius: 20,
      }} />
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        <rect 
          x="25%" y="25%" width="50%" height="50%" 
          fill="none" stroke={COLORS.TEXT_MAIN} strokeWidth="3" 
          strokeDasharray="1000" strokeDashoffset={1000 - draw * 10}
        />
        <line x1="25%" y1="40%" x2={`${25 + draw * 0.5}%`} y2="40%" stroke={COLORS.TEXT_MUTED} strokeWidth="2" />
      </svg>
      <div style={{ position: "absolute", bottom: 100, left: 100, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED }}>PAPER MOCKUP...</div>
    </AbsoluteFill>
  );
};

const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "Build a modern dashboard...".slice(0, Math.floor(frame / 2));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: "60%",
        padding: "30px 50px",
        backgroundColor: "white",
        borderRadius: 50,
        boxShadow: EFFECTS.SHADOW_LG,
        display: "flex",
        alignItems: "center",
        border: `20px solid ${COLORS.PRIMARY_DIM}`
      }}>
        <div style={{ fontSize: 32, color: COLORS.PRIMARY, marginRight: 20 }}>✦</div>
        <div style={{ fontSize: 40, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MAIN }}>
          {text}
          <span style={{ opacity: Math.floor(frame / 10) % 2 ? 1 : 0 }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 60 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, width: "100%", height: "100%" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          const s = spring({ frame: frame - i * 5, fps, config: { damping: 12 } });
          return (
            <div key={i} style={{
              backgroundColor: "white",
              borderRadius: 16,
              boxShadow: EFFECTS.SHADOW_SM,
              transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [100, 0])}px)`,
              opacity: s,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `1px solid ${COLORS.BORDER}`,
            }}>
              <div style={{ width: "60%", height: 20, backgroundColor: COLORS.BG_VOID, borderRadius: 10 }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_SURFACE, justifyContent: "center", alignItems: "center" }}>
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 10,
          height: 10,
          backgroundColor: i % 2 ? COLORS.PRIMARY : COLORS.ACCENT,
          borderRadius: "50%",
          left: `${50 + Math.cos(i + frame * 0.05) * 40}%`,
          top: `${50 + Math.sin(i + frame * 0.05) * 40}%`,
          opacity: 0.6,
        }} />
      ))}
      <h1 style={{ 
        fontFamily: FONTS.DISPLAY, 
        fontSize: 150, 
        color: COLORS.ACCENT, 
        transform: `scale(${s})`,
        textShadow: `0 0 40px ${COLORS.ACCENT_DIM}`
      }}>MAGIC</h1>
    </AbsoluteFill>
  );
};

const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [0, 145], [0, -100]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, overflow: "hidden"}}>
      <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 40, 
          padding: 100,
          transform: `translateY(${move}px) scale(1.1)`
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ 
              width: "100%", 
              height: 300, 
              border: `2px dashed ${COLORS.PRIMARY}`, 
              borderRadius: 20,
              backgroundColor: "white",
              opacity: 0.5,
              padding: 40,
            }}>
              <div style={{ width: 200, height: 30, backgroundColor: COLORS.PRIMARY_DIM, borderRadius: 15 }} />
            </div>
          ))}
        </div>
      
      <AbsoluteFill style={{bottom: 150, height: 'auto'}}>
        <div style={{ 
          position: "absolute", 
          bottom: 100, 
          right: 100, 
          fontFamily: FONTS.PRIMARY, 
          fontSize: 80, 
          color: COLORS.PRIMARY,
          fontWeight: "bold"
        }}>ARCHITECTURE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const showLabel = frame > 60;
  const labelS = spring({ frame: frame - 60, fps });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      {/* Node Graph */}
      <svg style={{ width: 800, height: 600 }}>
        <circle cx="100" cy="300" r="40" fill={COLORS.PRIMARY_DIM} stroke={COLORS.PRIMARY} strokeWidth="3" />
        <circle cx="400" cy="150" r="40" fill={COLORS.PRIMARY_DIM} stroke={COLORS.PRIMARY} strokeWidth="3" />
        <circle cx="400" cy="450" r="40" fill={COLORS.PRIMARY_DIM} stroke={COLORS.PRIMARY} strokeWidth="3" />
        <circle cx="700" cy="300" r="40" fill={COLORS.SECONDARY_DIM} stroke={COLORS.SECONDARY} strokeWidth="3" />
        <line x1="140" y1="300" x2="360" y2="150" stroke={COLORS.BORDER} strokeWidth="2" />
        <line x1="140" y1="300" x2="360" y2="450" stroke={COLORS.BORDER} strokeWidth="2" />
        <line x1="440" y1="150" x2="660" y2="300" stroke={COLORS.BORDER} strokeWidth="2" />
        <line x1="440" y1="450" x2="660" y2="300" stroke={COLORS.BORDER} strokeWidth="2" />
      </svg>
      {showLabel && (
        <div style={{
          position: "absolute",
          top: 320,
          right: 100,
          backgroundColor: COLORS.ACCENT,
          padding: "20px 40px",
          borderRadius: 20,
          color: "white",
          fontFamily: FONTS.PRIMARY,
          transform: `scale(${labelS})`,
          boxShadow: EFFECTS.SHADOW_LG,
        }}>
          Optimization Required!
        </div>
      )}
    </AbsoluteFill>
  );
};

const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.PRIMARY, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 400,
        height: 400,
        backgroundColor: COLORS.BG_SURFACE,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${s})`,
        boxShadow: EFFECTS.GLOW_LG,
      }}>
        <div style={{ fontSize: 200 }}>💡</div>
      </div>
      <h2 style={{ position: "absolute", bottom: 100, color: "white", fontFamily: FONTS.PRIMARY, fontSize: 50 }}>시니어 개발자의 노하우</h2>
    </AbsoluteFill>
  );
};

const Scene15: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 100 }}>
       <div style={{ 
        backgroundColor: "white", 
        padding: 40, 
        borderRadius: 20, 
        marginBottom: 40, 
        border: `2px solid ${COLORS.PRIMARY_DIM}`,
        fontFamily: FONTS.MONO,
        color: COLORS.TEXT_MAIN
      }}>
        <span style={{ color: COLORS.PRIMARY }}>function</span> calculate(a, b) {"{"} ...
      </div>
      <div style={{
        alignSelf: "flex-end",
        backgroundColor: COLORS.PRIMARY,
        padding: 30,
        borderRadius: "30px 30px 0 30px",
        color: "white",
        fontFamily: FONTS.PRIMARY,
        fontSize: 28,
        maxWidth: "60%",
        boxShadow: EFFECTS.SHADOW_LG,
      }}>
        "이 로직을 더 효율적으로 바꿔볼까요?"
      </div>
    </AbsoluteFill>
  );
};

const Scene16: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 97], [1, 1.5]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ transform: `scale(${zoom})`, textAlign: "center" }}>
          <div style={{ fontFamily: FONTS.PRIMARY, fontSize: 40, color: COLORS.TEXT_MUTED }}>이러한</div>
          <div style={{ fontFamily: FONTS.DISPLAY, fontSize: 120, color: COLORS.PRIMARY }}>변화</div>
       </div>
    </AbsoluteFill>
  );
};

const Scene17: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 168], [-120, 120]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: 400, height: 400, borderRadius: "50%", border: `10px solid ${COLORS.BORDER}`, overflow: "hidden" }}>
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          width: 180, 
          height: 8, 
          backgroundColor: COLORS.SECONDARY, 
          borderRadius: 4,
          transformOrigin: "left center",
          transform: `rotate(${rotate}deg)`,
          boxShadow: EFFECTS.GLOW_SM,
        }} />
        <div style={{ position: "absolute", bottom: 80, width: "100%", textAlign: "center", fontFamily: FONTS.DISPLAY, fontSize: 60, color: COLORS.TEXT_MAIN }}>MAX</div>
      </div>
    </AbsoluteFill>
  );
};

const Scene18: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 50 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ width: 100, height: 100, borderRadius: "50%", backgroundColor: COLORS.PRIMARY_DIM, border: `3px solid ${COLORS.PRIMARY}`, display: "flex", justifyContent: "center", alignItems: "center" }}>
             👤
          </div>
        ))}
      </div>
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
         <path d="M 300 540 Q 540 300 780 540" fill="none" stroke={COLORS.PRIMARY} strokeWidth="3" strokeDasharray="5,5" />
      </svg>
    </AbsoluteFill>
  );
};

const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.PRIMARY, justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ 
        fontFamily: FONTS.DISPLAY, 
        fontSize: 200, 
        color: "white", 
        transform: `scale(${s * 1.2})`,
        letterSpacing: 20,
      }}>REDEFINE</h1>
    </AbsoluteFill>
  );
};

const Scene20: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = Math.abs(Math.sin(frame * 0.2)) * 100;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `translateY(${-bounce}px)`, fontFamily: FONTS.DISPLAY, fontSize: 130, color: COLORS.NEGATIVE, textShadow: EFFECTS.SHADOW_LG }}>
        FAIL FAST
      </div>
    </AbsoluteFill>
  );
};

const Scene21: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [0, 125], [500, -500]);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(to bottom, ${COLORS.PRIMARY}, ${COLORS.SECONDARY})`, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "50%", bottom: 0, transform: `translate(-50%, ${rise}px)`, fontSize: 200 }}>🚀</div>
      <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(255,255,255,0.1)", mixBlendMode: "overlay" }} />
    </AbsoluteFill>
  );
};

const Scene22: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 100, color: COLORS.PRIMARY_DIM }}>"</div>
      <div style={{ width: "60%", height: 10, backgroundColor: COLORS.PRIMARY_DIM, borderRadius: 5, margin: "20px 0" }} />
      <div style={{ width: "40%", height: 10, backgroundColor: COLORS.PRIMARY_DIM, borderRadius: 5 }} />
      <div style={{ fontSize: 100, color: COLORS.PRIMARY_DIM, transform: "rotate(180deg)" }}>"</div>
    </AbsoluteFill>
  );
};

const Scene23: React.FC = () => {
  const frame = useCurrentFrame();
  const showChat = frame > 40;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 80 }}>
      {showChat ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ padding: 30, backgroundColor: "white", borderRadius: "0 30px 30px 30px", boxShadow: EFFECTS.SHADOW_SM, width: "70%" }}>
             AI: 미래의 코딩은 어떨까요?
          </div>
          <div style={{ alignSelf: "flex-end", padding: 30, backgroundColor: COLORS.PRIMARY, color: "white", borderRadius: "30px 30px 0 30px", boxShadow: EFFECTS.SHADOW_SM, width: "70%" }}>
             Dev: 대화가 중심이 될 것입니다.
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONTS.MONO, fontSize: 50 }}>
          Typing...
        </div>
      )}
    </AbsoluteFill>
  );
};

const Scene24: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rotate = interpolate(frame, [0, 173], [0, 360]);
  const s = spring({ frame, fps });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       <div style={{ fontSize: 200, transform: `scale(${s}) rotate(${rotate}deg)` }}>👑</div>
       <h1 style={{ marginTop: 40, fontFamily: FONTS.DISPLAY, color: COLORS.TEXT_MAIN, fontSize: 80 }}>TOP SKILL</h1>
    </AbsoluteFill>
  );
};

const Scene25: React.FC = () => {
  const frame = useCurrentFrame();
  const showLens = frame > 40;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
      {showLens ? (
        <div style={{ fontSize: 200 }}>🔍</div>
      ) : (
        <div style={{ fontSize: 200, opacity: 0.3 }}>⌨️</div>
      )}
      <div style={{ position: "absolute", width: "100%", height: "100%", border: showLens ? `100px solid ${COLORS.PRIMARY_DIM}` : "none", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const Scene26: React.FC = () => {
  const frame = useCurrentFrame();
  const motion = Math.sin(frame * 0.1) * 50;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, justifyContent: "center", alignItems: "center" }}>
       {/* Conductor Wand */}
       <div style={{ 
          position: "absolute", 
          right: 200, 
          bottom: 200, 
          width: 8, 
          height: 300, 
          backgroundColor: COLORS.TEXT_MAIN, 
          transform: `rotate(${motion}deg)`,
          transformOrigin: "bottom center"
       }} />
       {/* Orchestrated Data */}
       {[1, 2, 3, 4, 5].map((i) => (
         <div key={i} style={{
            position: "absolute",
            width: 50,
            height: 50,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 10,
            left: `${i * 15 + 10}%`,
            top: `${50 + Math.sin(frame * 0.1 + i) * 100}px`,
            opacity: 0.6,
         }} />
       ))}
       <h2 style={{ position: "absolute", bottom: 100, fontFamily: FONTS.PRIMARY, color: COLORS.TEXT_MUTED }}>AI ORCHESTRATION</h2>
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={135}><Scene1 /></Series.Sequence>
      <Series.Sequence durationInFrames={124}><Scene2 /></Series.Sequence>
      <Series.Sequence durationInFrames={133}><Scene3 /></Series.Sequence>
      <Series.Sequence durationInFrames={116}><Scene4 /></Series.Sequence>
      <Series.Sequence durationInFrames={139}><Scene5 /></Series.Sequence>
      <Series.Sequence durationInFrames={200}><Scene6 /></Series.Sequence>
      <Series.Sequence durationInFrames={156}><Scene7 /></Series.Sequence>
      <Series.Sequence durationInFrames={134}><Scene8 /></Series.Sequence>
      <Series.Sequence durationInFrames={145}><Scene9 /></Series.Sequence>
      <Series.Sequence durationInFrames={122}><Scene10 /></Series.Sequence>
      <Series.Sequence durationInFrames={169}><Scene11 /></Series.Sequence>
      <Series.Sequence durationInFrames={145}><Scene12 /></Series.Sequence>
      <Series.Sequence durationInFrames={203}><Scene13 /></Series.Sequence>
      <Series.Sequence durationInFrames={191}><Scene14 /></Series.Sequence>
      <Series.Sequence durationInFrames={202}><Scene15 /></Series.Sequence>
      <Series.Sequence durationInFrames={97}><Scene16 /></Series.Sequence>
      <Series.Sequence durationInFrames={168}><Scene17 /></Series.Sequence>
      <Series.Sequence durationInFrames={94}><Scene18 /></Series.Sequence>
      <Series.Sequence durationInFrames={119}><Scene19 /></Series.Sequence>
      <Series.Sequence durationInFrames={145}><Scene20 /></Series.Sequence>
      <Series.Sequence durationInFrames={125}><Scene21 /></Series.Sequence>
      <Series.Sequence durationInFrames={166}><Scene22 /></Series.Sequence>
      <Series.Sequence durationInFrames={220}><Scene23 /></Series.Sequence>
      <Series.Sequence durationInFrames={173}><Scene24 /></Series.Sequence>
      <Series.Sequence durationInFrames={123}><Scene25 /></Series.Sequence>
      <Series.Sequence durationInFrames={235}><Scene26 /></Series.Sequence>
    </Series>
  );
};
