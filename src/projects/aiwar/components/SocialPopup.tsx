import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <SocialPopup progress={1} color="#2A363B" size={150} strokeWidth={2} />
export const SocialPopup: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 150, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const len = size * 4;

  const box = `M 20 40 L 130 40 L 130 110 L 20 110 Z`;
  const avatar = `M 35 60 A 10 10 0 1 0 35 61 Z M 25 80 C 25 70, 45 70, 45 80 Z`;
  const lines = `M 60 55 L 110 55 M 60 70 L 120 70 M 60 80 L 100 80`;
  const likeBtn = `M 110 100 A 3 3 0 1 0 120 100 A 3 3 0 1 0 110 100`; // Heart-ish

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g style={{ transformOrigin: 'center', transform: `scale(${p < 0.8 ? p * 1.25 : 1}) translateY(${10 - p * 10}px)`, opacity: p }}>
        <path d={box} fill="#F5F0EB" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <path d={`${avatar} ${lines} ${likeBtn}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
      </g>
    </svg>
  );
};
