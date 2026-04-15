import React from 'react';
import { COLORS, SPACING } from '../../../../constants/theme';
import { Wobble } from '../../../../shared-components/Wobble';

export const Body3BattlefieldSketch: React.FC<{ size?: number; color?: string }> = ({
  size = 500,
  color = COLORS.TEXT_SUB,
}) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.3 }}>
      <Wobble>
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Distant mountains/ruins sketch */}
          <path
            d="M0 800 Q150 700 300 800 T600 750 T1000 850"
            stroke={color}
            strokeWidth={SPACING.BORDER_NORMAL}
          />
          {/* Smoke/Clouds rough lines */}
          <path
            d="M200 600 Q250 550 300 600 M700 500 Q750 450 800 500"
            stroke={color}
            strokeWidth={SPACING.BORDER_THIN}
          />
          {/* Rubble/Debris pieces */}
          <path d="M100 850 L120 840 M400 900 L430 880 M800 820 L820 830" stroke={color} strokeWidth={2} />
        </svg>
      </Wobble>
    </div>
  );
};
