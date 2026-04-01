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
                backgroundSize: "60px 60px", transform: `perspective(1000px) rotateX(60deg) translateY(${move}px)`, opacity: 0.15
            }} />
        </AbsoluteFill>
    );
};

const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const glitch = frame % 10 < 2 ? interpolate(frame % 10, [0, 1, 2], [0, 5, 0]) : 0;
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
            <div style={{ border: `2px solid ${COLORS.PRIMARY}`, padding: '40px 80px', transform: `translateX(${glitch}px)`, boxShadow: EFFECTS.GLOW_SM }}>
                <h1 style={{ color: COLORS.TEXT_MAIN, fontFamily: FONTS.DISPLAY, fontSize: 80, margin: 0 }}>AI ADOPTION GUIDE</h1>
            </div>
        </AbsoluteFill>
    );
};

const Scene2: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 40 }}>
            {[1, 2, 3].map(i => (
                <div key={i} style={{
                    width: 100, height: 100, borderRadius: 50, border: `4px solid ${COLORS.PRIMARY}`,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: 60, color: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM,
                    opacity: spring({ frame, fps: 60, delay: i * 15 })
                }}>{i}</div>
            ))}
        </AbsoluteFill>
    );
};

const Scene3: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 1200, height: 4, backgroundColor: COLORS.BORDER, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, width: interpolate(frame, [0, 100], [0, 100]) + '%', height: '100%', backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
                {[0, 50, 100].map(p => (
                   <div key={p} style={{ position: 'absolute', left: p + '%', top: -10, width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.PRIMARY, transform: 'translateX(-50%)' }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const Scene4: React.FC = () => {
    const frame = useCurrentFrame();
    const op = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ position: 'absolute', top: 100, color: COLORS.PRIMARY, fontSize: 40, fontFamily: FONTS.DISPLAY }}>01 ARCHITECTURE</h2>
             <svg width="600" height="400" viewBox="0 0 600 400" style={{ opacity: op }}>
                <rect x="50" y="150" width="100" height="100" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
                <rect x="450" y="150" width="100" height="100" fill="none" stroke={COLORS.PRIMARY} strokeWidth="2" />
                <path d="M 150 200 L 450 200" stroke={COLORS.PRIMARY} strokeWidth="2" strokeDasharray="10 10" />
            </svg>
        </AbsoluteFill>
    );
};

const Scene5: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <h2 style={{ position: 'absolute', top: 100, color: COLORS.PRIMARY, fontSize: 40, fontFamily: FONTS.DISPLAY }}>02 AI DRAFT</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: 20 }}>
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} style={{ height: 100, backgroundColor: COLORS.PRIMARY, opacity: spring({ frame, fps: 60, delay: i * 5 }), boxShadow: EFFECTS.GLOW_SM }} />
                ))}
             </div>
        </AbsoluteFill>
    );
};

const Scene6: React.FC = () => {
    const frame = useCurrentFrame();
    const straighten = interpolate(frame, [0, 100], [20, 0], { extrapolateRight: 'clamp' });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <h2 style={{ position: 'absolute', top: 100, color: COLORS.PRIMARY, fontSize: 40, fontFamily: FONTS.DISPLAY }}>03 OPTIMIZATION</h2>
             <div style={{ width: 600, height: 300, border: `2px solid ${COLORS.PRIMARY}`, borderRadius: straighten, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <div style={{ width: '80%', height: 10, backgroundColor: COLORS.PRIMARY, boxShadow: EFFECTS.GLOW_SM }} />
             </div>
        </AbsoluteFill>
    );
};

const Scene7: React.FC = () => {
    const frame = useCurrentFrame();
    const cycle = frame % 30 < 15;
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: 120, fontFamily: FONTS.DISPLAY, color: cycle ? COLORS.TEXT_MAIN : COLORS.ACCENT, textShadow: cycle ? 'none' : EFFECTS.GLOW_ACCENT_MD }}>
                {cycle ? 'MARKUP' : 'COMPLEX LOGIC'}
            </div>
        </AbsoluteFill>
    );
};

const Scene8: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ padding: 60, display: 'flex', flexDirection: 'row', gap: 40 }}>
            <div style={{ flex: 1, border: `1px solid ${COLORS.BORDER}`, padding: 20, backgroundColor: COLORS.BG_SURFACE }}>
                <div style={{ color: COLORS.PRIMARY, marginBottom: 10 }}>PROMPT:</div>
                <div style={{ color: COLORS.TEXT_MAIN, fontSize: 24, fontFamily: FONTS.MONO }}>
                    "Create a Next.js component for user dashboard with real-time API integration..."
                </div>
            </div>
            <div style={{ flex: 1, border: `1px solid ${COLORS.PRIMARY}`, padding: 20, backgroundColor: COLORS.BG_VOID, boxShadow: EFFECTS.GLOW_SM }}>
                <div style={{ color: COLORS.TEXT_MUTED, fontSize: 16, fontFamily: FONTS.MONO }}>
                    {`import { useEffect, useState } from 'react';\n\nexport const Dashboard = () => {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch('/api/user').then(res => res.json()).then(setData);\n  }, []);\n  return <div>{data?.name}</div>;\n};`.slice(0, frame * 2)}
                </div>
            </div>
        </AbsoluteFill>
    );
};

const Scene10: React.FC = () => {
    const frame = useCurrentFrame();
    const move = interpolate(frame, [0, 314], [-100, 100]);
    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.PRIMARY, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <h1 style={{ color: COLORS.TEXT_INVERSE, fontSize: 150, fontFamily: FONTS.DISPLAY, transform: `translateX(${move}%)`, whiteSpace: 'nowrap' }}>
                PROMPT ENGINEERING PROMPT ENGINEERING PROMPT ENGINEERING
            </h1>
        </AbsoluteFill>
    );
};

const Scene11: React.FC = () => {
    const frame = useCurrentFrame();
    const merge = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: interpolate(merge, [0, 1], [0, 450]), fontSize: 80, color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY }}>CONTEXT</div>
            <div style={{ position: 'absolute', bottom: interpolate(merge, [0, 1], [0, 450]), fontSize: 80, color: COLORS.PRIMARY, fontFamily: FONTS.DISPLAY }}>CONSTRAINTS</div>
            {merge > 0.8 && <div style={{ border: `4px solid ${COLORS.ACCENT}`, width: 300, height: 300, borderRadius: 150, boxShadow: EFFECTS.GLOW_ACCENT_MD }} />}
        </AbsoluteFill>
    );
};

const Scene12: React.FC = () => {
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 800, height: 200, border: `4px solid ${COLORS.PRIMARY}`, display: 'flex', alignItems: 'center', padding: '0 40px', gap: 40, boxShadow: EFFECTS.GLOW_SM }}>
                <div style={{ fontSize: 100, color: COLORS.PRIMARY }}>✓</div>
                <div style={{ fontSize: 60, color: COLORS.TEXT_MAIN, fontFamily: FONTS.DISPLAY }}>TEST CASE PASSED</div>
            </div>
        </AbsoluteFill>
    );
};

const Scene13: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)' }}>
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} style={{ border: `0.5px solid ${COLORS.BORDER}`, backgroundColor: i < frame ? COLORS.PRIMARY : 'transparent', opacity: i < frame ? 0.8 : 0.2 }} />
            ))}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px 40px', backgroundColor: COLORS.BG_VOID, border: `2px solid ${COLORS.PRIMARY}`, color: COLORS.PRIMARY, fontSize: 40, fontFamily: FONTS.DISPLAY }}>
                AUTOGEN TEST SUITE
            </div>
        </AbsoluteFill>
    );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={279} name="Guide">
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={279} name="Steps">
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={330} name="Timeline">
        <Scene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={196} name="Arch">
        <Scene4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240} name="Draft">
        <Scene5 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={241} name="Opt">
        <Scene6 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={233} name="Markup">
        <Scene7 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={479} name="Nextjs">
        <Scene8 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={314} name="Engineering">
        <Scene10 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={505} name="Context">
        <Scene11 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={283} name="TestPass">
        <Scene12 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={577} name="TestMatrix">
        <Scene13 />
      </Series.Sequence>
    </Series>
  );
};
