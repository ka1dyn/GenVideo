import React from 'react';
import { Wobble } from '../../../shared-components/Wobble';
import { COLORS, FONTS } from '../../../constants/theme';
import { interpolate, spring, useVideoConfig } from 'remotion';

interface Props {
  type: 'growth' | 'efficiency' | 'accuracy';
  progress: number;
}

/**
 * @gallery: <StatChart type="growth" progress={1} />
 * @gallery: <StatChart type="efficiency" progress={1} />
 * @gallery: <StatChart type="accuracy" progress={1} />
 */
export const StatChart: React.FC<Props> = ({ type, progress }) => {
  const { fps } = useVideoConfig();

  const renderGrowth = () => {
    const points = [
      { x: 10, y: 80 },
      { x: 30, y: 70 },
      { x: 50, y: 50 },
      { x: 70, y: 40 },
      { x: 90, y: 15 }
    ];
    
    const pathD = `M ${points[0].x},${points[0].y} ${points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ')}`;
    const lineLength = 200; // rough estimate

    return (
      <svg viewBox="0 0 100 100" style={{ width: '80%', height: '80%', overflow: 'visible' }}>
        {/* Grid lines */}
        {[20, 40, 60, 80].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={COLORS.STROKE_SUBTLE} strokeWidth="0.5" />
        ))}
        {/* Main Line */}
        <path
          d={pathD}
          fill="none"
          stroke={COLORS.PRIMARY}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={lineLength}
          strokeDashoffset={lineLength * (1 - progress)}
        />
        {/* Nodes */}
        {points.map((p, i) => {
          const nodeProgress = Math.max(0, Math.min(1, (progress * 1.5) - (i * 0.2)));
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill={COLORS.PRIMARY_BOLD}
              opacity={nodeProgress}
              transform={`scale(${nodeProgress})`}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          );
        })}
        <text x="5" y="95" fontFamily={FONTS.DISPLAY} fontSize="4" fill={COLORS.TEXT_SUB}>2017</text>
        <text x="85" y="95" fontFamily={FONTS.DISPLAY} fontSize="4" fill={COLORS.TEXT_SUB}>2025</text>
      </svg>
    );
  };

  const renderEfficiency = () => {
    const dots = Array.from({ length: 48 }).map((_, i) => ({
      x: (i % 8) * 12 + 8,
      y: Math.floor(i / 8) * 12 + 15
    }));

    return (
      <div style={{ position: 'relative', width: '80%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          {dots.map((d, i) => {
            const moveProgress = spring({ frame: progress * 60 - i * 0.5, fps, config: { damping: 14 } });
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: '8px',
                  height: '8px',
                  backgroundColor: COLORS.SECONDARY,
                  borderRadius: '50%',
                  transform: `translate(${(1 - moveProgress) * (50 - d.x) * 5}px, ${(1 - moveProgress) * (50 - d.y) * 5}px) scale(${moveProgress})`,
                  opacity: i < (1 - progress) * dots.length ? 1 : 0.2
                }}
              />
            );
          })}
        </div>
        <div style={{ 
          fontSize: '80px', 
          fontFamily: FONTS.DISPLAY, 
          fontWeight: 'bold', 
          color: COLORS.SECONDARY_BOLD,
          opacity: progress > 0.8 ? (progress - 0.8) * 5 : 0,
          transform: `scale(${interpolate(progress, [0.8, 1], [0.5, 1], { extrapolateRight: 'clamp' })})`
        }}>
          100x
        </div>
      </div>
    );
  };

  const renderAccuracy = () => {
    return (
      <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {[
          { label: 'AI', value: 60, color: COLORS.STATE_WARN_FG },
          { label: '사람', value: 84, color: COLORS.SECONDARY_DARK }
        ].map((item, i) => (
          <div key={i} style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontFamily: FONTS.DISPLAY, fontSize: '24px', fontWeight: 'bold' }}>{item.label}</span>
              <span style={{ fontFamily: FONTS.DISPLAY, fontSize: '32px', fontWeight: 'bold', color: item.color }}>{item.value}%</span>
            </div>
            <div style={{ height: '30px', backgroundColor: COLORS.BG_MUTED, borderRadius: '15px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                width: `${progress * item.value}%`, 
                backgroundColor: item.color,
                transition: 'width 0.5s ease-out'
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Wobble intensity={1.5} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        width: '80%', 
        height: '80%', 
        backgroundColor: COLORS.BG_SURFACE, 
        border: `2px solid ${COLORS.STROKE_DEFAULT}`,
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {type === 'growth' && renderGrowth()}
        {type === 'efficiency' && renderEfficiency()}
        {type === 'accuracy' && renderAccuracy()}
      </div>
    </Wobble>
  );
};
