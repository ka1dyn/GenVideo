import React from "react";
import { COLORS, FONTS, SPACING, EFFECTS } from "../../../constants/theme";

export type BadgeTagProps = {
  /** 뱃지 텍스트 */
  label: string;
  /** 아이콘 (이모지 또는 문자) */
  icon?: string;
  /** 배경 색상 */
  bgColor?: string;
  /** 텍스트 색상 */
  textColor?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
};

/**
 * 썸네일 상단에 표시하는 맥락/카테고리 뱃지.
 * 호기심 유발 문구, 카테고리, 시리즈 표시 등에 사용합니다.
 */
export const BadgeTag: React.FC<BadgeTagProps> = ({
  label,
  icon,
  bgColor = "rgba(0, 0, 0, 0.7)",
  textColor = COLORS.TEXT_ON_DARK,
  style,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: SPACING.PX_8,
        padding: `${SPACING.PX_8}px ${SPACING.PX_16}px`,
        backgroundColor: bgColor,
        borderRadius: SPACING.RADIUS_MD,
        boxShadow: EFFECTS.SHADOW_MD,
        backdropFilter: "blur(8px)",
        ...style,
      }}
    >
      {icon && (
        <span
          style={{
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
      )}
      <span
        style={{
          fontFamily: FONTS.PRIMARY,
          fontSize: 20,
          fontWeight: FONTS.WEIGHT_BOLD,
          color: textColor,
          lineHeight: FONTS.LEADING_TIGHT,
          letterSpacing: FONTS.TRACKING_NORMAL,
        }}
      >
        {label}
      </span>
    </div>
  );
};
