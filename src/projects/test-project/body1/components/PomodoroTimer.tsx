import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface PomodoroTimerProps {
  size?: number;
  color?: string;
  progress?: number;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  size = 400,
  color = COLORS.STROKE_INK,
  progress = 0,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Frame */}
      <circle
        cx="50"
        cy="50"
        r={radius + 2}
        stroke={color}
        strokeWidth="2"
      />
      {/* Gauge Background */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={COLORS.BG_MUTED}
        strokeWidth="4"
        strokeDasharray="2, 4"
      />
      {/* Active Gauge */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={COLORS.PRIMARY}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
      />
      {/* Inner Tick marks */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="15"
          x2="50"
          y2="20"
          stroke={color}
          strokeWidth="1"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </svg>
  );
};
