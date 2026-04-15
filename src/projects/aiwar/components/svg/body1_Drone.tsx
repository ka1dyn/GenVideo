import React from 'react';
import { COLORS } from '../../../../constants/theme';

export const Body1_Drone: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = COLORS.STROKE_INK,
}) => {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 바디 */}
      <path
        d="M40 40C40 34.4772 44.4772 30 50 30H150C155.523 30 160 34.4772 160 40C160 45.5228 155.523 50 150 50H50C44.4772 50 40 45.5228 40 40Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 왼쪽 팔 */}
      <path
        d="M50 40L20 20M50 40L20 60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 오른쪽 팔 */}
      <path
        d="M150 40L180 20M150 40L180 60"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 프로펠러 (간소화된 원형) */}
      <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="20" cy="60" r="10" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="180" cy="20" r="10" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="180" cy="60" r="10" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      {/* 렌즈 */}
      <circle cx="100" cy="45" r="5" fill={color} />
    </svg>
  );
};
