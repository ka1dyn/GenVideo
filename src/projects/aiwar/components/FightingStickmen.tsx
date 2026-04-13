import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <FightingStickmen progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const FightingStickmen: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Wiggle animation
  const wiggle = Math.sin(p * 30) * 5;

  // Person 1 (Judge/Lawyer)
  const head1 = `M 60 ${60 + wiggle} A 15 15 0 1 0 60 ${60 + wiggle - 0.1}`; 
  const body1 = `M 60 ${75 + wiggle} L 80 120 M 80 120 L 70 180 M 80 120 L 100 170`; // Legs
  const arms1 = `M 60 ${80 + wiggle} L 100 ${100 - wiggle}`; // Reaching to grab
  const wig = `M 40 ${60 + wiggle} C 40 40, 80 40, 80 ${60 + wiggle}`; // Judge wig

  // Person 2 (Suit)
  const head2 = `M 140 ${60 - wiggle} A 15 15 0 1 0 140 ${60 - wiggle - 0.1}`;
  const body2 = `M 140 ${75 - wiggle} L 120 120 M 120 120 L 110 180 M 120 120 L 140 170`; // Legs
  const arms2 = `M 140 ${80 - wiggle} L 100 ${100 + wiggle}`; // Grab collar
  const tie = `M 140 ${75 - wiggle} L 135 ${100 - wiggle} L 140 ${105 - wiggle} L 145 ${100 - wiggle} Z`;

  // Papers flying
  const paper1 = `M 30 ${40 + p*20} l 10 -5 l 5 10 l -10 5 z`;
  const paper2 = `M 160 ${50 - p*15} l -10 -5 l 5 -10 l 10 5 z`;
  const paper3 = `M 100 ${20 + p*10} l 15 5 l -5 15 l -15 -5 z`;

  const len = 500;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g opacity={p}>
        <path d={`${head1} ${body1} ${arms1} ${wig}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d={`${head2} ${body2} ${arms2} ${tie}`} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d={`${paper1} ${paper2} ${paper3}`} fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} opacity={Math.floor(p * 15) % 2 === 0 ? 1 : 0.5} />
        {/* cloud of dust/fight */}
        <path d={`M 80 100 C 60 80, 140 80, 120 100 C 140 120, 60 120, 80 100`} fill="none" stroke={color} strokeWidth={strokeWidth * 0.5} strokeDasharray="10 10" opacity={0.5} />
      </g>
      {/* Intro draw animation cover */}
      <path d={`M 0 0 L 0 ${size} L ${size} ${size} L ${size} 0 Z`} fill="none" strokeOpacity={0} strokeWidth={strokeWidth} strokeDasharray={len} strokeDashoffset={len * p} />
    </svg>
  );
};
