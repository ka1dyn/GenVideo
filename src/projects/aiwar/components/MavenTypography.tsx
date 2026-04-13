import React from 'react';

interface Props {
  progress: number;
  color?: string;
  size?: number; // width
}

// @gallery: <MavenTypography progress={1} color="#2A363B" size={300} />
export const MavenTypography: React.FC<Props> = ({ 
  progress, 
  color = '#2A363B', 
  size = 300 
}) => {
  const p = Math.max(0, Math.min(1, progress));
  
  // Dramatic pop and track-in effect
  const letterSpacing = 20 - p * 15;
  const scale = 1.5 - p * 0.5;

  return (
    <div style={{
      width: size,
      height: size * 0.3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <h1 style={{
        fontFamily: "'Inter', monospace", // bold geometric
        fontSize: size * 0.25,
        fontWeight: 900,
        color: color,
        letterSpacing: `${letterSpacing}px`,
        transform: `scale(${scale})`,
        opacity: p,
        margin: 0,
        padding: 0
      }}>
        MAVEN
      </h1>
    </div>
  );
};
