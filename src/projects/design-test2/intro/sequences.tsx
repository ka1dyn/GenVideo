import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  interpolate,
  spring,
} from "remotion";
import { COLORS, EFFECTS, FONTS, Z } from "../theme";

const GFX_Grid: React.FC = () => {
  const frame = useCurrentFrame();

  const move = interpolate(frame, [0, 300], [0, -100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: Z.BG,
        background: `radial-gradient(circle at center, ${COLORS.BG_DEEP} 0%, ${COLORS.BG_VOID} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `
            linear-gradient(to right, ${COLORS.BORDER} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.BORDER} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: `perspective(1000px) rotateX(60deg) translateY(${move}px)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = spring({ frame, fps: 60, config: { damping: 200 } });
  const scale = interpolate(frame, [0, 50], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <GFX_Grid />
      <div
        style={{
          zIndex: Z.CONTENT,
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.DISPLAY,
            fontSize: 120,
            color: COLORS.TEXT_MAIN,
            textShadow: EFFECTS.GLOW_MD,
            margin: 0,
            letterSpacing: "0.1em",
          }}
        >
          WEB DEVELOPMENT
        </h1>
        <div
          style={{
            width: 400,
            height: 4,
            backgroundColor: COLORS.PRIMARY,
            margin: "20px auto",
            boxShadow: EFFECTS.GLOW_SM,
          }}
        />
        <h2
          style={{
            fontFamily: FONTS.PRIMARY,
            fontSize: 60,
            color: COLORS.PRIMARY,
            margin: 0,
          }}
        >
          PARADIGM SHIFT
        </h2>
      </div>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const typing = Math.floor(interpolate(frame, [0, 100], [0, 40], { extrapolateRight: 'clamp' }));
  const codeLines = [
    "function buildComponent() {",
    "  const div = document.createElement('div');",
    "  div.style.padding = '20px';",
    "  // ... manual labor ...",
    "}",
  ];

  const currentContent = codeLines.join('\n').slice(0, typing * 5);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 100 }}>
      <div
        style={{
          fontFamily: FONTS.MONO,
          fontSize: 32,
          color: COLORS.TEXT_MUTED,
          whiteSpace: 'pre-wrap',
          opacity: interpolate(frame, [150, 180], [1, 0.3], { extrapolateLeft: 'clamp' }),
        }}
      >
        {currentContent}
      </div>
      {frame > 120 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-5deg)',
            padding: '40px 80px',
            border: `6px solid ${COLORS.NEGATIVE}`,
            color: COLORS.NEGATIVE,
            fontFamily: FONTS.DISPLAY,
            fontSize: 140,
            zIndex: Z.UI,
            boxShadow: `0 0 40px ${COLORS.NEGATIVE}`,
          }}
        >
          MANUAL LABOR
        </div>
      )}
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const glowIntensity = interpolate(frame % 30, [0, 15, 30], [0.5, 1, 0.5]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <GFX_Grid />
      <div
        style={{
          zIndex: Z.CONTENT,
          width: 800,
          height: 300,
          border: `2px solid ${COLORS.PRIMARY}`,
          backgroundColor: COLORS.BG_SURFACE,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 0 ${40 * glowIntensity}px ${COLORS.PRIMARY_GLOW}`,
        }}
      >
        <div style={{ color: COLORS.PRIMARY, fontFamily: FONTS.MONO, fontSize: 24, marginBottom: 10 }}>
          [ SYSTEM ACTIVE ]
        </div>
        <div style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.PRIMARY, fontSize: 80, fontWeight: 'bold' }}>
          AI PAIR PROGRAMMER
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [0, 150], [-200, 200]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 100, alignItems: 'center' }}>
        <div style={{ border: `4px solid ${COLORS.TEXT_MAIN}`, padding: 40, fontSize: 50, color: COLORS.TEXT_MAIN }}>DESIGN</div>
        <div style={{ width: 100, height: 10, backgroundColor: COLORS.NEGATIVE, position: 'relative' }}>
          <div style={{ position: 'absolute', left: move, top: -20, color: COLORS.NEGATIVE, fontSize: 24 }}>WAITING...</div>
        </div>
        <div style={{ border: `4px solid ${COLORS.TEXT_MAIN}`, padding: 40, fontSize: 50, color: COLORS.TEXT_MAIN, opacity: 0.3 }}>DEV</div>
      </div>
      <h2 style={{ position: 'absolute', bottom: 100, color: COLORS.NEGATIVE, fontSize: 60, fontFamily: FONTS.DISPLAY }}>BOTTLENECK</h2>
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const expand = spring({ frame, fps: 60 });
  const width = interpolate(expand, [0, 1], [100, 800]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
       <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        <div style={{ border: `4px solid ${COLORS.PRIMARY}`, padding: 40, fontSize: 50, color: COLORS.PRIMARY }}>DESIGN</div>
        <div style={{ width: width, height: 10, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
        <div style={{ border: `4px solid ${COLORS.PRIMARY}`, padding: 40, fontSize: 50, color: COLORS.PRIMARY }}>DEV</div>
      </div>
      <h2 style={{ position: 'absolute', bottom: 100, color: COLORS.PRIMARY, fontSize: 60, fontFamily: FONTS.DISPLAY }}>ACCELERATED</h2>
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
    const frame = useCurrentFrame();
    const cursorOpacity = frame % 30 < 15 ? 1 : 0;
    const text = "A futuristic card UI with neon borders...".slice(0, Math.floor(frame / 2));

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.BG_DEEP, padding: 80 }}>
            <div style={{ border: `1px solid ${COLORS.BORDER_STRONG}`, height: '100%', padding: 40, position: 'relative' }}>
                <div style={{ color: COLORS.PRIMARY, fontSize: 24, marginBottom: 20 }}>PROMPT:</div>
                <div style={{ color: COLORS.TEXT_MAIN, fontSize: 40, fontFamily: FONTS.MONO }}>
                    {text}<span style={{ opacity: cursorOpacity }}>|</span>
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene7: React.FC = () => {
    const frame = useCurrentFrame();
    const progress = spring({ frame, fps: 60 });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
            <div style={{ transform: `scale(${0.5 + progress * 0.5})`, opacity: progress }}>
                <div style={{ width: 600, height: 400, border: `2px solid ${COLORS.ACCENT}`, boxShadow: EFFECTS.GLOW_ACCENT_MD, backgroundColor: COLORS.BG_SURFACE }}>
                    <div style={{ height: 40, backgroundColor: COLORS.ACCENT_DIM, borderBottom: `1px solid ${COLORS.ACCENT}`, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.ACCENT, marginRight: 5 }} />
                        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.ACCENT, marginRight: 5 }} />
                        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.ACCENT }} />
                    </div>
                    <div style={{ padding: 20 }}>
                        <div style={{ width: '60%', height: 20, backgroundColor: COLORS.BORDER, marginBottom: 10 }} />
                        <div style={{ width: '100%', height: 100, backgroundColor: COLORS.BORDER, marginBottom: 20 }} />
                        <div style={{ display: 'flex', gap: 10 }}>
                            <div style={{ width: 100, height: 40, backgroundColor: COLORS.ACCENT }} />
                            <div style={{ width: 100, height: 40, border: `1px solid ${COLORS.ACCENT}` }} />
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{ position: 'absolute', top: 100, color: COLORS.ACCENT, fontSize: 50, fontFamily: FONTS.DISPLAY }}>INSTANT PROTOTYPE</h2>
        </AbsoluteFill>
    );
};

const Scene8: React.FC = () => {
    const frame = useCurrentFrame();
    const progress = interpolate(frame, [0, 150], [0, 1]);

    return (
        <AbsoluteFill style={{ padding: 100 }}>
            <h1 style={{ color: COLORS.PRIMARY, fontSize: 60, fontFamily: FONTS.DISPLAY }}>SYSTEM ARCHITECTURE</h1>
            <svg width="1000" height="600" style={{ marginTop: 50 }}>
                <circle cx="100" cy="300" r="40" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
                <path d="M 140 300 L 360 300" stroke={COLORS.PRIMARY} strokeWidth="2" strokeDasharray="1000" strokeDashoffset={1000 * (1 - progress)} />
                <rect x="360" y="250" width="120" height="100" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
                <path d="M 480 300 L 700 150 M 480 300 L 700 450" stroke={COLORS.PRIMARY} strokeWidth="2" strokeDasharray="1000" strokeDashoffset={1000 * (1 - progress)} />
                <circle cx="740" cy="150" r="40" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
                <circle cx="740" cy="450" r="40" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
            </svg>
        </AbsoluteFill>
    );
};

const Scene9: React.FC = () => {
    const frame = useCurrentFrame();
    const count = Math.floor(interpolate(frame, [0, 100], [40, 99], { extrapolateRight: 'clamp' }));

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.BG_VOID }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, color: COLORS.ACCENT, marginBottom: 20 }}>OPTIMIZATION POINT SCORE:</div>
                <div style={{ fontSize: 240, fontFamily: FONTS.MONO, color: COLORS.ACCENT, WebkitTextStroke: `1px ${COLORS.ACCENT}` }}>
                    {count}%
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 100, width: '80%', height: 4, backgroundColor: COLORS.BORDER }}>
                <div style={{ width: `${count}%`, height: '100%', backgroundColor: COLORS.ACCENT, boxShadow: EFFECTS.GLOW_ACCENT_SM }} />
            </div>
        </AbsoluteFill>
    );
};

const Scene10: React.FC = () => {
    const frame = useCurrentFrame();
    const reviewOpacity = spring({ frame, fps: 60 });

    return (
        <AbsoluteFill style={{ padding: 50 }}>
            <div style={{ fontFamily: FONTS.MONO, fontSize: 24, color: COLORS.TEXT_MUTED }}>
                {`const UserProfile = ({ user }) => {\n  return (\n    <div className="profile-card">\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n};`}
            </div>
            <div style={{
                position: 'absolute',
                top: 200,
                right: 200,
                width: 400,
                padding: 30,
                backgroundColor: COLORS.BG_ELEVATED,
                border: `1px solid ${COLORS.ACCENT}`,
                boxShadow: EFFECTS.GLOW_ACCENT_SM,
                opacity: reviewOpacity,
                transform: `translateX(${(1 - reviewOpacity) * 50}px)`
            }}>
                <div style={{ color: COLORS.ACCENT, fontSize: 20, marginBottom: 10 }}>SENIOR AI REVIEW:</div>
                <div style={{ color: COLORS.TEXT_MAIN, fontSize: 18 }}>
                    "Consider memoizing this component to prevent unnecessary re-renders in heavy lists."
                </div>
                <div style={{ marginTop: 20, color: COLORS.ACCENT, fontSize: 16 }}>[ APPLY CHANGE ]</div>
            </div>
        </AbsoluteFill>
    );
};

const Scene11: React.FC = () => {
    const frame = useCurrentFrame();
    const pieces = Array.from({ length: 8 });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
            <div style={{ position: 'relative', width: 400, height: 400 }}>
                {pieces.map((_, i) => {
                    const angle = (i / pieces.length) * Math.PI * 2;
                    const radius = interpolate(frame, [0, 150], [400, 100]);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                        <div key={i} style={{
                            position: 'absolute',
                            width: 60,
                            height: 60,
                            backgroundColor: COLORS.PRIMARY,
                            left: 170 + x,
                            top: 170 + y,
                            boxShadow: EFFECTS.GLOW_SM
                        }} />
                    );
                })}
            </div>
            <h1 style={{ position: 'absolute', bottom: 150, color: COLORS.TEXT_MAIN, fontSize: 60, fontFamily: FONTS.DISPLAY }}>TEAM COLLABORATION</h1>
        </AbsoluteFill>
    );
};

const Scene12: React.FC = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 300], [1, 2]);
    const blur = interpolate(frame, [250, 436], [0, 20]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.BG_VOID }}>
            <div style={{ transform: `scale(${scale})`, filter: `blur(${blur}px)`, textAlign: 'center' }}>
                <h1 style={{ color: COLORS.PRIMARY, fontSize: 150, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_LG }}>INNOVATION</h1>
            </div>
        </AbsoluteFill>
    );
};

const Scene13: React.FC = () => {
    const frame = useCurrentFrame();
    const opacity = spring({ frame, fps: 60 });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: 100, opacity }}>
                <div style={{ fontSize: 100, color: COLORS.PRIMARY, marginBottom: 40 }}>"</div>
                <p style={{ fontSize: 60, color: COLORS.TEXT_MAIN, lineHeight: 1.5 }}>
                    미래의 코딩은 타이핑이 아니라<br/>
                    <span style={{ color: COLORS.PRIMARY, textShadow: EFFECTS.GLOW_MD }}>대화가 될 것이다.</span>
                </p>
                <div style={{ fontSize: 100, color: COLORS.PRIMARY, marginTop: 40 }}>"</div>
            </div>
        </AbsoluteFill>
    );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={136} name="Paradigm Shift">
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={511} name="Manual Labor">
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={356} name="AI Partner">
        <Scene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={570} name="Bottleneck">
        <Scene4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={348} name="Expansion">
        <Scene5 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={393} name="Prompt">
        <Scene6 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={478} name="Prototype">
        <Scene7 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={270} name="Architecture">
        <Scene8 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={166} name="Optimization">
        <Scene9 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={220} name="Senior Review">
        <Scene10 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={212} name="Collaboration">
        <Scene11 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180} name="Innovation">
        <Scene12 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={140} name="Vision">
        <Scene13 />
      </Series.Sequence>
    </Series>
  );
};
