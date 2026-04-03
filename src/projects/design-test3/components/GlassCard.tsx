import React from 'react';
import { EFFECTS, COLORS, SPACING } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  padding?: number;
  borderRadius?: number;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<Props> = ({
  children,
  style,
  padding = SPACING.PX_24,
  borderRadius = SPACING.RADIUS_MD,
  hoverEffect = false,
}) => {
  return (
    <div
      style={{
        backgroundColor: EFFECTS.GLASS_BG,
        backdropFilter: EFFECTS.GLASS_BLUR,
        border: `${SPACING.BORDER_THIN}px solid ${EFFECTS.GLASS_BORDER}`,
        borderRadius,
        padding,
        boxShadow: EFFECTS.SHADOW_MD,
        transition: 'all 0.3s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
