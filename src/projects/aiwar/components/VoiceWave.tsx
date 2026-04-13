import React from 'react';

interface Props {
  progress: number;
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

// @gallery: <VoiceWave progress={1} color="#E8A87C" width={200} height={100} strokeWidth={3} />
export const VoiceWave: React.FC<Props> = ({ 
  progress, 
  color = '#E8A87C', 
  width = 200, 
  height = 100, 
  strokeWidth = 3 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Create an animated sound wave
  const numBars = 15;
  const bars = [];
  const cy = height / 2;
  const spacing = width / (numBars + 1);

  for (let i = 0; i < numBars; i++) {
    // Generate some pseudo-random but deterministic heights
    const maxH = (Math.sin(i * 1.5) * 0.5 + 0.6) * height * 0.4;
    // Animate them
    let h = maxH * Math.sin(p * 20 + i) * p;
    h = Math.abs(h) + 2; // min height
    
    const x = spacing * (i + 1);
    bars.push(<line key={i} x1={x} y1={cy - h} x2={x} y2={cy + h} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />);
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {bars}
    </svg>
  );
};
