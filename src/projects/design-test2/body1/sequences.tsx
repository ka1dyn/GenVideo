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
    const move = interpolate(frame, [0, 300], [0, -100], { extrapolateRight: "clamp" });
    return (
        <AbsoluteFill style={{ zIndex: Z.BG, background: COLORS.BG_VOID }}>
            <div style={{
                position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%",
                backgroundImage: `linear-gradient(to right, ${COLORS.BORDER} 1px, transparent 1px), linear-gradient(to bottom, ${COLORS.BORDER} 1px, transparent 1px)`,
                backgroundSize: "60px 60px", transform: `perspective(1000px) rotateX(60deg) translateY(${move}px)`, opacity: 0.2
            }} />
        </AbsoluteFill>
    );
};

const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const slide = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: 4, width: interpolate(slide, [0, 1], [0, 1200]), backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            <h1 style={{ position: 'absolute', fontFamily: FONTS.DISPLAY, fontSize: 100, color: COLORS.TEXT_MAIN, opacity: slide, letterSpacing: 10 }}>REAL-WORLD IMPACT</h1>
        </AbsoluteFill>
    );
};

const Scene2: React.FC = () => {
    const frame = useCurrentFrame();
    const particles = Array.from({ length: 50 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
            {particles.map((_, i) => (
                <div key={i} style={{
                    position: 'absolute', width: 2, height: 20, backgroundColor: COLORS.PRIMARY,
                    left: `${(i * 7.7) % 100}%`, top: `${(frame * 10 + i * 20) % 120 - 10}%`, opacity: 0.4
                }} />
            ))}
            <h1 style={{ color: COLORS.PRIMARY, fontSize: 120, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_MD }}>DATA-DRIVEN</h1>
        </AbsoluteFill>
    );
};

const Scene3: React.FC = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 200], [1.5, 1]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `scale(${scale})` }}>
            <div style={{ width: 1400, height: 800, border: `1px solid ${COLORS.BORDER_STRONG}`, padding: 40, position: 'relative' }}>
                <div style={{ color: COLORS.PRIMARY, fontFamily: FONTS.MONO }}>[ SECURE DATA ACCESS ]</div>
                <div style={{ position: 'absolute', right: 40, top: 40, width: 200, height: 10, backgroundColor: COLORS.BORDER }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginTop: 100 }}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={{ height: 150, border: `1px solid ${COLORS.BORDER}`, backgroundColor: COLORS.BG_SURFACE }} />
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene4: React.FC = () => {
    const frame = useCurrentFrame();
    const scroll = interpolate(frame, [0, 189], [0, -400]);
    return (
        <AbsoluteFill style={{ padding: 100 }}>
            <div style={{ fontSize: 40, color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY, marginBottom: 40 }}>RESEARCH REPORT</div>
            <div style={{ transform: `translateY(${scroll}px)`, color: COLORS.TEXT_MUTED, fontSize: 24, lineHeight: 2 }}>
                RESEARCH PAPER ID: NV-2024-AI<br/>
                SUBJECT: AI PRODUCTIVITY METRICS<br/>
                METHODOLOGY: CONTROLLED TEAM ANALYSIS<br/>
                SAMPLE SIZE: 500 ENTERPRISE TEAMS<br/>
                DURATION: 12 MONTHS<br/>
                SUMMARY: SIGNIFICANT UPTICK IN OUTPUT<br/>
                STABILITY: 99.9% CONFIDENCE<br/>
                ...
            </div>
        </AbsoluteFill>
    );
};

const Scene5: React.FC = () => {
    const frame = useCurrentFrame();
    const count = Math.floor(interpolate(frame, [0, 100], [0, 55], { extrapolateRight: 'clamp' }));
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 280, fontFamily: FONTS.MONO, color: COLORS.PRIMARY, textShadow: EFFECTS.GLOW_LG }}>{count}%</div>
                <div style={{ fontSize: 60, color: COLORS.TEXT_MAIN, fontFamily: FONTS.DISPLAY }}>PRODUCTIVITY UP</div>
            </div>
        </AbsoluteFill>
    );
};

const Scene6: React.FC = () => {
    const frame = useCurrentFrame();
    const scanPos = interpolate(frame, [0, 200], [-100, 1100]);
    return (
        <AbsoluteFill style={{ padding: 100 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} style={{
                        width: 150, height: 60, border: `1px solid ${COLORS.BORDER}`,
                        opacity: scanPos > (i * 20) ? 0.1 : 0.6, backgroundColor: COLORS.BG_SURFACE
                    }} />
                ))}
            </div>
            <div style={{ position: 'absolute', top: 0, left: `${scanPos}px`, width: 100, height: '100%',
                background: `linear-gradient(to right, transparent, ${COLORS.PRIMARY_GLOW}, transparent)` }} />
            <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                fontSize: 100, color: COLORS.TEXT_MAIN, fontFamily: FONTS.DISPLAY }}>TIME SAVED</h1>
        </AbsoluteFill>
    );
};

const Scene7: React.FC = () => {
    const frame = useCurrentFrame();
    const pie = interpolate(frame, [0, 100], [0, 270]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 400, height: 400, borderRadius: 200, border: `10px solid ${COLORS.BORDER}`,
                background: `conic-gradient(${COLORS.PRIMARY} 0deg, ${COLORS.PRIMARY} ${pie}deg, transparent ${pie}deg)` }} />
            <div style={{ position: 'absolute', padding: 20, backgroundColor: COLORS.BG_VOID, border: `1px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY }}>
                WORK DISTRIBUTION SHIFT
            </div>
        </AbsoluteFill>
    );
};

const Scene8: React.FC = () => {
    const frame = useCurrentFrame();
    const count = Math.floor(interpolate(frame, [0, 100], [0, 80], { extrapolateRight: 'clamp' }));
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 60, color: COLORS.TEXT_MAIN }}>REPETITIVE TASKS</div>
                <div style={{ fontSize: 200, color: COLORS.NEGATIVE, fontFamily: FONTS.MONO }}>-{count}%</div>
            </div>
        </AbsoluteFill>
    );
};

const Scene9: React.FC = () => {
    const frame = useCurrentFrame();
    const h1 = spring({ frame, fps: 60, delay: 0 });
    const h2 = spring({ frame, fps: 60, delay: 20 });
    const h3 = spring({ frame, fps: 60, delay: 40 });
    return (
        <AbsoluteFill style={{ padding: 100, justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50, height: '60%' }}>
                <div style={{ width: 100, height: `${h1 * 30}%`, backgroundColor: COLORS.PRIMARY }} />
                <div style={{ width: 100, height: `${h2 * 60}%`, backgroundColor: COLORS.PRIMARY }} />
                <div style={{ width: 100, height: `${h3 * 100}%`, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
            </div>
            <div style={{ position: 'absolute', top: 100, color: COLORS.PRIMARY, fontSize: 80, fontFamily: FONTS.DISPLAY }}>CREATIVE PLANNING 3X</div>
        </AbsoluteFill>
    );
};

const Scene10: React.FC = () => {
    const frame = useCurrentFrame();
    const split = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill>
            <div style={{ position: 'absolute', left: 0, width: `${50 * split}%`, height: '100%', backgroundColor: COLORS.BG_VOID, borderRight: `2px solid ${COLORS.BORDER}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: COLORS.TEXT_MUTED, fontSize: 60, fontFamily: FONTS.DISPLAY }}>BEFORE</h1>
            </div>
             <div style={{ position: 'absolute', right: 0, width: `${50 * split}%`, height: '100%', backgroundColor: COLORS.BG_VOID, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: COLORS.PRIMARY, fontSize: 60, fontFamily: FONTS.DISPLAY }}>AFTER</h1>
            </div>
        </AbsoluteFill>
    );
};

const Scene11: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: '#100000', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: 32, fontFamily: FONTS.MONO, color: '#aa3333' }}>
                SEARCHING DOCUMENTATION...<br/>
                TYPING... TYPING...<br/>
                ERROR: SEMICOLON MISSING<br/>
                RE-TYPING...<br/>
                DEBUGGING... (3 HOURS LATER)
            </div>
            <div style={{ position: 'absolute', top: 40, left: 40, color: '#ff3b3b', fontSize: 30 }}>BEFORE: MANUAL & SLOW</div>
        </AbsoluteFill>
    );
};

const Scene12: React.FC = () => {
    const frame = useCurrentFrame();
    const glow = interpolate(frame % 30, [0, 15, 30], [1, 1.5, 1]);
    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID, justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: 60, border: `4px solid ${COLORS.PRIMARY}`, boxShadow: `0 0 30px ${COLORS.PRIMARY_GLOW}`, textAlign: 'center' }}>
                <div style={{ color: COLORS.PRIMARY, fontSize: 40, marginBottom: 20 }}>AI SUGGESTION</div>
                <div style={{ color: COLORS.TEXT_MAIN, fontSize: 24, fontFamily: FONTS.MONO, marginBottom: 40 }}>
                    "Optimized data fetch logic with React Query"
                </div>
                <div style={{ padding: '20px 40px', backgroundColor: COLORS.PRIMARY, color: COLORS.TEXT_INVERSE, fontSize: 32, fontFamily: FONTS.DISPLAY, transform: `scale(${glow})` }}>
                    APPROVE
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene13: React.FC = () => {
    const frame = useCurrentFrame();
    const bugs = Math.floor(interpolate(frame, [0, 100], [100, 0], { extrapolateRight: 'clamp' }));
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: 40, color: COLORS.TEXT_MUTED }}>BUGS DETECTED</div>
                 <div style={{ fontSize: 260, color: bugs > 0 ? COLORS.NEGATIVE : COLORS.PRIMARY, fontFamily: FONTS.MONO }}>{bugs}</div>
            </div>
            {bugs === 0 && <div style={{ fontSize: 80, color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY }}>STABLE SYSTEM</div>}
        </AbsoluteFill>
    );
};

const Scene14: React.FC = () => {
    const frame = useCurrentFrame();
    const shield = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
            <div style={{ position: 'relative', width: 600, height: 600, border: `${10 * shield}px solid ${COLORS.PRIMARY}`, borderRadius: 300, boxShadow: EFFECTS.GLOW_LG, perspective: 1000 }}>
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 100, color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY }}>SHIELD</div>
            </div>
            <div style={{ position: 'absolute', bottom: 100, fontSize: 50, color: COLORS.TEXT_MAIN, fontFamily: FONTS.DISPLAY }}>90% ERRORS PREVENTED</div>
        </AbsoluteFill>
    );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={188} name="Impact">
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={197} name="Data">
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={202} name="Dashboard">
        <Scene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={189} name="Report">
        <Scene4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={357} name="Productivity">
        <Scene5 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={297} name="TimeSaved">
        <Scene6 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={297} name="Distribution">
        <Scene7 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={228} name="Reduction">
        <Scene8 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={343} name="Growth">
        <Scene9 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={180} name="Comparison">
        <Scene10 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={301} name="Before">
        <Scene11 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={359} name="After">
        <Scene12 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={228} name="Bugs">
        <Scene13 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={662} name="Shield">
        <Scene14 />
      </Series.Sequence>
    </Series>
  );
};
