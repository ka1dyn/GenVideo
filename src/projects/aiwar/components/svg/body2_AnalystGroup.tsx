import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2AnalystGroupProps {
  size?: number;
  color?: string;
  count?: number;
}

export const Body2AnalystGroup: React.FC<Body2AnalystGroupProps> = ({
  size = 300,
  color = COLORS.TEXT_SUB,
  count = 1,
}) => {
  // 수많은 사람을 점(Dot)으로 표현하여 기하학적 군집 생성
  const dotsPerRow = Math.ceil(Math.sqrt(count));
  const spacing = size / dotsPerRow;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: count }).map((_, i) => {
        const x = (i % dotsPerRow) * spacing + spacing / 2;
        const y = Math.floor(i / dotsPerRow) * spacing + spacing / 2;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={spacing * 0.3}
            fill={color}
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
};
