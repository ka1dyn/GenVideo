import React from 'react';

export const body4_EyeSketch: React.FC<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}> = ({
  size = 100,
  color = '#2C3E50',
  strokeWidth = 2,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Upper Eyelid */}
      <path
        d="M 10 50 C 30 20, 70 20, 90 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Lower Eyelid */}
      <path
        d="M 10 50 C 30 75, 70 75, 90 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Iris */}
      <circle
        cx="50"
        cy="50"
        r="14"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* Pupil */}
      <circle
        cx="50"
        cy="50"
        r="4"
        fill={color}
      />
      
      {/* Eyebrow */}
      <path
        d="M 15 25 Q 40 10 85 25"
        stroke={color}
        strokeWidth={strokeWidth * 1.5}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
