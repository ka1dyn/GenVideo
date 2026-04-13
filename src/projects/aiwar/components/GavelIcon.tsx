import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../constants/theme";

interface Props {
  progress: number;
}

/**
 * @gallery: <GavelIcon progress={1} />
 */
export const GavelIcon: React.FC<Props> = ({ progress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({ frame, fps, config: { damping: 10 } });
  
  // Gavel hitting animation
  const rotation = interpolate(spr, [0, 0.4, 0.6, 0.8, 1], [0, -35, 15, -5, 0]);
  const bounceY = interpolate(spr, [0, 0.4, 0.6, 0.8, 1], [0, -15, 5, -2, 0]);

  return (
    <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        opacity: interpolate(progress, [0, 0.2], [0, 1])
    }}>
      <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
        {/* Sound waves on impact */}
        {spr > 0.5 && (
            <g opacity={interpolate(spr, [0.5, 0.9], [1, 0])}>
                <path d="M25 65 Q 15 50 5 65" stroke={COLORS.STATE_ERROR_FG} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M75 65 Q 85 50 95 65" stroke={COLORS.STATE_ERROR_FG} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 60 Q 20 45 10 60" stroke={COLORS.STATE_ERROR_FG} strokeWidth="1" strokeLinecap="round" />
                <path d="M70 60 Q 80 45 90 60" stroke={COLORS.STATE_ERROR_FG} strokeWidth="1" strokeLinecap="round" />
            </g>
        )}

        {/* Base Block (Round perspective) */}
        <ellipse cx="50" cy="80" rx="25" ry="8" fill={COLORS.BG_MUTED} stroke={COLORS.STROKE_INK} strokeWidth="2" />
        <path d="M25 80 L25 85 Q 50 92 75 85 L75 80" fill={COLORS.BG_MUTED} stroke={COLORS.STROKE_INK} strokeWidth="2" />

        {/* Gavel Head & Handle Group */}
        <g style={{ transform: `rotate(${rotation}deg) translateY(${bounceY}px)`, transformOrigin: '75px 75px' }}>
            {/* Handle with detail */}
            <path 
                d="M50 45 L85 80" 
                stroke={COLORS.STROKE_INK} 
                strokeWidth="5" 
                strokeLinecap="round" 
            />
            <path 
                d="M55 50 L80 75" 
                stroke={COLORS.PRIMARY_MID} 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.5"
            />
            
            {/* Main Hammer Head (Cylindrical perspective) */}
            <g transform="rotate(-45 35 35)">
                {/* Body */}
                <rect x="15" y="25" width="40" height="20" rx="2" fill={COLORS.PRIMARY_BOLD} stroke={COLORS.STROKE_INK} strokeWidth="2" />
                {/* Decorative gold bands */}
                <rect x="22" y="25" width="4" height="20" fill={COLORS.SECONDARY} stroke={COLORS.STROKE_INK} strokeWidth="1" />
                <rect x="44" y="25" width="4" height="20" fill={COLORS.SECONDARY} stroke={COLORS.STROKE_INK} strokeWidth="1" />
                {/* End caps */}
                <ellipse cx="15" cy="35" rx="4" ry="10" fill={COLORS.PRIMARY_MID} stroke={COLORS.STROKE_INK} strokeWidth="2" />
                <ellipse cx="55" cy="35" rx="4" ry="10" fill={COLORS.PRIMARY_MID} stroke={COLORS.STROKE_INK} strokeWidth="2" />
            </g>
        </g>
      </svg>
    </div>
  );
};
