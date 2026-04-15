import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2DataFlowProps {
  color?: string;
  width?: number;
  height?: number;
  progress?: number;
}

export const Body2DataFlow: React.FC<Body2DataFlowProps> = ({
  color = COLORS.SECONDARY,
  width = 600,
  height = 100,
  progress = 0,
}) => {
  // progress: 0 ~ 1
  const dashArray = 20;
  const dashOffset = -progress * 100;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M 0 ${height / 2} L ${width} ${height / 2}`}
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dashArray} ${dashArray}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      {/* 펜 스케치 느낌의 보조선 */}
      <path
        d={`M 0 ${height / 2 + 10} L ${width} ${height / 2 + 10}`}
        stroke={COLORS.STROKE_SUBTLE}
        strokeWidth="1"
        strokeDasharray="5 10"
        strokeDashoffset={dashOffset * 0.5}
      />
    </svg>
  );
};
