import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  interpolate,
  spring,
  random,
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
                backgroundSize: "60px 60px", transform: `perspective(1000px) rotateX(60deg) translateY(${move}px)`, opacity: 0.1
            }} />
        </AbsoluteFill>
    );
};

const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const speed = interpolate(frame, [0, 300], [0, 5000]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GFX_Grid />
             <div style={{ position: 'absolute', right: 100, top: 100, color: COLORS.PRIMARY, fontFamily: FONTS.MONO, fontSize: 40 }}>
                VELOCITY: {speed.toFixed(0)} km/h
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                   <div key={i} style={{ width: interpolate(frame, [0, 50], [0, 1000]), height: 2, backgroundColor: COLORS.PRIMARY, opacity: 0.3 }} />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const Scene2: React.FC = () => {
    const frame = useCurrentFrame();
    const rotate = interpolate(frame, [0, 203], [0, 360]);
    const glow = interpolate(frame % 20, [0, 10, 20], [0.5, 1, 0.5]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
                width: 300, height: 300, border: `2px solid ${COLORS.PRIMARY}`,
                transform: `rotateX(${rotate}deg) rotateY(${rotate}deg)`,
                boxShadow: `0 0 ${40 * glow}px ${COLORS.PRIMARY_GLOW}`,
                backgroundColor: COLORS.BG_SURFACE
            }} />
        </AbsoluteFill>
    );
};

const Scene3: React.FC = () => {
    const frame = useCurrentFrame();
    const scatter = interpolate(frame, [0, 183], [1, 5]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            {Array.from({ length: 40 }).map((_, i) => {
                const angle = (i / 40) * Math.PI * 2;
                return (
                    <div key={i} style={{
                        position: 'absolute', width: 20, height: 20, backgroundColor: COLORS.PRIMARY,
                        left: 960 + Math.cos(angle) * (100 * scatter),
                        top: 540 + Math.sin(angle) * (100 * scatter),
                        opacity: 1 / scatter
                    }} />
                );
            })}
        </AbsoluteFill>
    );
};

const Scene4: React.FC = () => {
    const frame = useCurrentFrame();
    const noiseX = (random(`x-${frame}`) - 0.5) * 10;
    const noiseY = (random(`y-${frame}`) - 0.5) * 10;
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#110000' }}>
            <h1 style={{ color: COLORS.NEGATIVE, fontSize: 100, fontFamily: FONTS.DISPLAY, transform: `translate(${noiseX}px, ${noiseY}px)` }}>
                JOB DISPLACEMENT?
            </h1>
        </AbsoluteFill>
    );
};

const Scene5: React.FC = () => {
    const frame = useCurrentFrame();
    const beamWidth = interpolate(frame, [0, 20], [0, 1920]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: beamWidth, height: '100%', backgroundColor: COLORS.PRIMARY, opacity: 0.8, boxShadow: EFFECTS.GLOW_LG }} />
        </AbsoluteFill>
    );
};

const Scene6: React.FC = () => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 344], [1, 4]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 400, height: 400, border: `4px solid ${COLORS.PRIMARY}`, transform: `scale(${scale})`, opacity: 2 - scale/2 }} />
            <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 80, fontFamily: FONTS.DISPLAY }}>EXPAND POTENTIAL</h1>
        </AbsoluteFill>
    );
};

const Scene7: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
                <h1 style={{ color: COLORS.TEXT_MUTED, fontSize: 120, fontFamily: FONTS.DISPLAY }}>COMPETITOR</h1>
                {frame > 60 && <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 10, backgroundColor: COLORS.NEGATIVE, transform: 'rotate(-15deg)' }} />}
            </div>
        </AbsoluteFill>
    );
};

const Scene8: React.FC = () => {
    const frame = useCurrentFrame();
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                    position: 'absolute', width: (i + 1) * 200, height: (i + 1) * 200, borderRadius: '50%',
                    border: `1px solid ${COLORS.ACCENT}`, opacity: interpolate(frame % 60, [0, 60], [1, 0])
                }} />
            ))}
             <h1 style={{ color: COLORS.ACCENT, fontSize: 60, fontFamily: FONTS.DISPLAY }}>CREATIVITY</h1>
        </AbsoluteFill>
    );
};

const Scene9: React.FC = () => {
    const frame = useCurrentFrame();
    const lift = interpolate(frame, [0, 100], [0, -30]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ width: 800, height: 10, backgroundColor: COLORS.PRIMARY, transform: `rotate(${lift}deg)`, position: 'relative' }}>
                 <div style={{ position: 'absolute', right: 0, top: -100, width: 100, height: 100, border: `2px solid ${COLORS.PRIMARY}`, backgroundColor: COLORS.BG_SURFACE }} />
             </div>
             <h1 style={{ position: 'absolute', bottom: 100, color: COLORS.PRIMARY, fontSize: 80, fontFamily: FONTS.DISPLAY }}>LEVERAGE</h1>
        </AbsoluteFill>
    );
};

const Scene10: React.FC = () => {
    const frame = useCurrentFrame();
    const sink = interpolate(frame, [0, 100], [0, 1080]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', top: sink, width: '100%', height: '100%', border: `100px solid ${COLORS.BORDER}`, boxSizing: 'border-box' }} />
             <h1 style={{ color: COLORS.PRIMARY, fontSize: 80, fontFamily: FONTS.DISPLAY }}>OPEN PATH</h1>
        </AbsoluteFill>
    );
};

const Scene11: React.FC = () => {
    const frame = useCurrentFrame();
    const op = spring({ frame, fps: 60 });
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <div style={{ textAlign: 'center', opacity: op }}>
                 <div style={{ color: COLORS.PRIMARY, fontSize: 40, marginBottom: 20 }}>THE NEW WEAPON:</div>
                 <div style={{ color: COLORS.TEXT_MAIN, fontSize: 120, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_MD }}>PRODUCT MINDSET</div>
             </div>
        </AbsoluteFill>
    );
};

const Scene12: React.FC = () => {
    const frame = useCurrentFrame();
    const roadMove = (frame * 20) % 100;
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
             <GFX_Grid />
             <div style={{ position: 'absolute', bottom: 0, width: 200, height: '100%', background: `repeating-linear-gradient(to bottom, ${COLORS.PRIMARY} 0, ${COLORS.PRIMARY} 50px, transparent 50px, transparent 100px)`, opacity: 0.5, transform: `perspective(1000px) rotateX(80deg) translateY(${roadMove}px)` }} />
             <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 60, fontFamily: FONTS.DISPLAY }}>NEW JOURNEY</h1>
        </AbsoluteFill>
    );
};

const Scene13: React.FC = () => {
    const frame = useCurrentFrame();
    const op = interpolate(frame, [0, 50, 380, 432], [0, 1, 1, 0]);
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: op }}>
             <div style={{ textAlign: 'center' }}>
                 <h1 style={{ color: COLORS.PRIMARY, fontSize: 80, fontFamily: FONTS.DISPLAY, textShadow: EFFECTS.GLOW_LG }}>IMAGINATION</h1>
                 <div style={{ fontSize: 40, color: COLORS.TEXT_MUTED, margin: '20px 0' }}>TO</div>
                 <h1 style={{ color: COLORS.TEXT_MAIN, fontSize: 100, fontFamily: FONTS.DISPLAY }}>REALITY</h1>
             </div>
        </AbsoluteFill>
    );
};

export const Sequences: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={299} name="Velocity">
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={386} name="Object">
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={183} name="Particles">
        <Scene3 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={390} name="Fear">
        <Scene4 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210} name="Beam">
        <Scene5 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={344} name="Limit">
        <Scene6 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={154} name="StrikeOut">
        <Scene7 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={264} name="Creative">
        <Scene8 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={299} name="Leverage">
        <Scene9 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={220} name="Wall">
        <Scene10 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={507} name="Mindset">
        <Scene11 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={469} name="Road">
        <Scene12 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={322} name="Final">
        <Scene13 />
      </Series.Sequence>
    </Series>
  );
};
