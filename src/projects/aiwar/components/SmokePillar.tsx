import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
}

// @gallery: <SmokePillar progress={1} color="#2A363B" size={200} strokeWidth={3} />
export const SmokePillar: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Plumes of smoke bubbling up
  const plumes = [];
  for(let i=0; i<10; i++) {
    const delay = i * 0.1;
    const pp = Math.max(0, Math.min(1, (p - delay) * 2));
    if (pp > 0) {
      const cx = size/2 + Math.sin(i * 123) * 40;
      const cy = size - (pp * size * 0.8) - i*10;
      const r = 20 + Math.abs(Math.cos(i)) * 30 * pp;
      plumes.push(<circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 === 0 ? "#4C5B5C" : color} opacity={0.6 * pp} />);
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {plumes}
      {/* Fire base */}
      <path d={`M 50 ${size} Q 100 ${size - 50*p} 150 ${size}`} fill="#E84A5F" opacity={p} />
    </svg>
  );
};
