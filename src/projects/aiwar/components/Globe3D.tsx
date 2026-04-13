import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

// @gallery: <Globe3D progress={1} color="#2A363B" size={200} strokeWidth={2} />
export const Globe3D: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 200, 
  strokeWidth = 2 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.45;
  const len = size * 5;

  // Outer circle
  const globe = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  
  // Latitude lines
  const lat1 = `M ${cx - r * 0.866} ${cy - r * 0.5} A ${r * 0.866} ${r * 0.2} 0 0 0 ${cx + r * 0.866} ${cy - r * 0.5}`;
  const lat2 = `M ${cx - r} ${cy} A ${r} ${r * 0.25} 0 0 0 ${cx + r} ${cy}`;
  const lat3 = `M ${cx - r * 0.866} ${cy + r * 0.5} A ${r * 0.866} ${r * 0.2} 0 0 0 ${cx + r * 0.866} ${cy + r * 0.5}`;

  // Longitude lines
  const lon1 = `M ${cx} ${cy - r} A ${r * 0.5} ${r} 0 0 0 ${cx} ${cy + r}`;
  const lon2 = `M ${cx} ${cy - r} A ${r * 0.5} ${r} 0 0 1 ${cx} ${cy + r}`;
  const centerLon = `M ${cx} ${cy - r} L ${cx} ${cy + r}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <path 
        d={`${globe} ${lat1} ${lat2} ${lat3} ${lon1} ${lon2} ${centerLon}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} opacity={0.8}
      />
      {/* Some abstract landmass polygons */}
      <path 
        d={`M ${cx - 30} ${cy - 40} Q ${cx} ${cy - 50} ${cx + 20} ${cy - 20} Q ${cx - 10} ${cy} ${cx - 30} ${cy - 40} M ${cx - 60} ${cy + 10} Q ${cx - 40} ${cy + 30} ${cx - 20} ${cy - 10} Q ${cx - 70} ${cy - 10} ${cx - 60} ${cy + 10} M ${cx + 30} ${cy + 20} Q ${cx + 50} ${cy - 10} ${cx + 70} ${cy + 30} Q ${cx + 60} ${cy + 50} ${cx + 30} ${cy + 20}`} 
        fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
        strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, p - 0.2))}
      />
    </svg>
  );
};
