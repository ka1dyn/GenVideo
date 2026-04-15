import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  interpolate, 
  useVideoConfig 
} from 'remotion';
import { COLORS, FONTS, Z } from '../../../../constants/theme';

// --- Rotating Globe (Wireframe) ---

const Globe: React.FC<{ size: number }> = ({ size }) => {
  const frame = useCurrentFrame();
  const r = size / 2;
  const cx = r;
  const cy = r;
  
  // Slow rotation offset
  const rotationOffset = frame * 0.8;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={r - 2} stroke={COLORS.STROKE_INK} strokeWidth={2} opacity={0.6} />
      
      {/* Horizontal latitude lines */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((lat, i) => {
        const y = cy + lat * (r - 10);
        const halfWidth = Math.sqrt(Math.max(0, (r - 10) ** 2 - (lat * (r - 10)) ** 2));
        return (
          <ellipse
            key={`lat-${i}`}
            cx={cx}
            cy={y}
            rx={halfWidth}
            ry={halfWidth * 0.15}
            stroke={COLORS.STROKE_INK}
            strokeWidth={1}
            strokeDasharray="4 6"
            opacity={0.25}
          />
        );
      })}

      {/* Vertical meridian lines (rotating) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = ((i * 30) + rotationOffset) % 180;
        const rad = (angle * Math.PI) / 180;
        const xRadius = Math.abs(Math.sin(rad)) * (r - 10);
        
        return (
          <ellipse
            key={`mer-${i}`}
            cx={cx}
            cy={cy}
            rx={xRadius}
            ry={r - 10}
            stroke={COLORS.STROKE_INK}
            strokeWidth={1.2}
            strokeDasharray="6 4"
            opacity={0.35}
          />
        );
      })}

      {/* Equator (slightly bolder) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={r - 10}
        ry={(r - 10) * 0.15}
        stroke={COLORS.PRIMARY}
        strokeWidth={1.5}
        opacity={0.4}
      />

      {/* Prime meridian highlight */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={Math.abs(Math.sin(((rotationOffset * 1.2) % 180) * Math.PI / 180)) * (r - 10)}
        ry={r - 10}
        stroke={COLORS.PRIMARY}
        strokeWidth={1.5}
        opacity={0.3}
      />

      {/* Subtle "land mass" blobs */}
      {[
        { cxOff: -0.2, cyOff: -0.15, rx: 0.18, ry: 0.12 },
        { cxOff: 0.15, cyOff: 0.1, rx: 0.22, ry: 0.08 },
        { cxOff: -0.05, cyOff: 0.3, rx: 0.1, ry: 0.06 },
      ].map((blob, i) => {
        const blobAngle = ((rotationOffset + i * 40) % 360) * Math.PI / 180;
        const visibleX = Math.cos(blobAngle);
        if (visibleX < 0) return null;
        return (
          <ellipse
            key={`land-${i}`}
            cx={cx + blob.cxOff * visibleX * (r - 20)}
            cy={cy + blob.cyOff * (r - 20)}
            rx={blob.rx * visibleX * (r - 20)}
            ry={blob.ry * (r - 20)}
            fill={COLORS.STROKE_INK}
            opacity={0.06 * visibleX}
          />
        );
      })}
    </svg>
  );
};

// --- Main Component ---

export const Body1_TacticalMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  const mapOpacity = interpolate(frame, [0, 30], [0, 1]);
  const globeScale = interpolate(frame, [0, 40], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE, overflow: 'hidden' }}>
      {/* Background Grid */}
      <div style={{
        position: 'absolute',
        inset: -width,
        backgroundImage: `
          linear-gradient(to right, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px),
          linear-gradient(to bottom, ${COLORS.STROKE_SUBTLE} 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px',
        opacity: 0.1
      }} />

      {/* Center Spinning Globe */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${globeScale})`,
        opacity: mapOpacity,
        zIndex: Z.CONTENT
      }}>
        <Globe size={550} />
      </div>

      {/* HUD (Simplified) */}
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: mapOpacity }}>
        <div style={{
          position: 'absolute',
          bottom: 220,
          left: 80,
          fontFamily: FONTS.MONO,
          fontSize: 18,
          color: COLORS.TEXT_SUB,
          opacity: 0.5,
          letterSpacing: 2
        }}>
          LOC: { (34.0522 + frame * 0.0001).toFixed(4) }N / { (118.2437 - frame * 0.0001).toFixed(4) }W
        </div>

        <div style={{
          position: 'absolute',
          top: 80,
          right: 80,
          textAlign: 'right',
          fontFamily: FONTS.MONO,
          fontSize: 14,
          color: COLORS.PRIMARY_BOLD,
          opacity: 0.6
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
            <div style={{ width: 8, height: 8, backgroundColor: COLORS.PRIMARY_BOLD, borderRadius: '50%' }} />
            SATELLITE_FEED: ACTIVE
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
