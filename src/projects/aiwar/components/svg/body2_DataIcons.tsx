import React from 'react';
import { COLORS } from '../../../../constants/theme';

interface Body2DataIconsProps {
  type: 'satellite' | 'drone' | 'radar';
  size?: number;
  color?: string;
}

export const Body2DataIcons: React.FC<Body2DataIconsProps> = ({
  type,
  size = 64,
  color = COLORS.SECONDARY_DARK,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {type === 'satellite' && (
        <>
          <path d="M13 7a2 2 0 0 1 2 2" />
          <path d="M13 3a6 6 0 0 1 6 6" />
          <path d="M13 11a10 10 0 0 1 10 10" />
          <path d="M8 12L3 17" />
          <rect x="7" y="7" width="6" height="6" rx="1" />
        </>
      )}
      {type === 'drone' && (
        <>
          <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M12 8l0 -4" />
          <path d="M12 16l0 4" />
          <path d="M8 12l-4 0" />
          <path d="M16 12l4 0" />
          <path d="M4 4l3 3" />
          <path d="M17 17l3 3" />
          <path d="M4 20l3 -3" />
          <path d="M17 7l3 -3" />
        </>
      )}
      {type === 'radar' && (
        <>
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 12l5 5" />
        </>
      )}
    </svg>
  );
};
