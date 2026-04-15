import React from 'react';
import { COLORS } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const body4_ParentChildSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 200,
  color = COLORS.TEXT_BODY,
  strokeWidth = 2,
}) => {
  return (
    <Wobble>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Adult Silhouette (Refined proportions & clothing volume) */}
        {/* Head */}
        <circle cx="32" cy="22" r="7" />
        
        {/* Torso / Coat body */}
        <path d="M 28 29 Q 18 50 25 70 L 42 68 Q 48 45 36 29" />
        <path d="M 33 29 V 69" strokeWidth={1} opacity={0.6} /> {/* Coat opening / fold */}

        {/* Back Leg (striding left) */}
        <path d="M 30 70 L 25 88 L 29 88" />
        
        {/* Front Leg (striding right) */}
        <path d="M 36 69 L 45 92 L 50 92" />
        
        {/* Back Arm */}
        <path d="M 30 32 Q 22 45 18 58" />
        
        {/* Front Arm (Handholding) */}
        <path d="M 35 33 Q 48 45 56 50" />

        {/* Child Silhouette (More accurate proportions) */}
        {/* Head */}
        <circle cx="70" cy="45" r="5" />
        
        {/* Torso */}
        <path d="M 68 50 Q 64 65 66 76 L 76 75 Q 77 62 72 50" />
        
        {/* Backpack */}
        <path d="M 66 53 L 57 55 L 55 68 L 64 66 Z" />
        <path d="M 66 53 Q 62 50 57 55" /> {/* Strap */}
        
        {/* Back Leg */}
        <path d="M 68 76 L 64 88 L 68 88" />
        
        {/* Front Leg */}
        <path d="M 73 76 L 78 92 L 82 92" />
        
        {/* Back Arm (Handholding) */}
        <path d="M 69 52 Q 62 53 56 50" />
        
        {/* Front Arm */}
        <path d="M 72 52 Q 78 60 76 70" />
        
        {/* Clasped Hands detail */}
        <circle cx="56" cy="50" r="1.5" fill={color} stroke="none" />
        
        {/* Sketchy Ground Lines */}
        <path d="M 15 95 Q 50 97 90 94 M 20 98 Q 60 99 85 96" strokeWidth={1} opacity={0.4} />
      </svg>
    </Wobble>
  );
};
