import React from 'react';
import { COLORS, FONTS, SPACING, EFFECTS } from '../../../../constants/theme';

interface Body2ReportCardProps {
  label: string;
  value: string;
  delay?: number;
}

export const Body2ReportCard: React.FC<Body2ReportCardProps> = ({
  label,
  value,
  delay = 0,
}) => {
  return (
    <div style={{
      backgroundColor: COLORS.BG_SURFACE,
      border: `${SPACING.BORDER_NORMAL}px solid ${COLORS.STROKE_DEFAULT}`,
      borderRadius: SPACING.RADIUS_MD,
      padding: `${SPACING.PX_16}px ${SPACING.PX_24}px`,
      width: 500,
      boxShadow: EFFECTS.SHADOW_SM,
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.PX_4,
    }}>
      <span style={{
        fontFamily: FONTS.PRIMARY,
        fontSize: 24,
        fontWeight: FONTS.WEIGHT_MEDIUM,
        color: COLORS.TEXT_SUB,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: FONTS.MONO,
        fontSize: 36,
        fontWeight: FONTS.WEIGHT_BOLD,
        color: COLORS.TEXT_MAIN,
      }}>
        {value}
      </span>
    </div>
  );
};
