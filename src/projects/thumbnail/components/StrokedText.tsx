import React from "react";
import { COLORS, FONTS } from "../../../constants/theme";

export type StrokedTextProps = {
  /** 표시할 텍스트 */
  text: string;
  /** 폰트 크기 (px) */
  fontSize?: number;
  /** 글자 채우기 색 */
  fillColor?: string;
  /** 외곽선 색 */
  strokeColor?: string;
  /** 외곽선 두께 (px) */
  strokeWidth?: number;
  /** 강조할 단어 목록 */
  highlightWords?: string[];
  /** 강조 단어 색상 */
  highlightColor?: string;
  /** 폰트 패밀리 */
  fontFamily?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
};

/**
 * 유튜브 썸네일용 두꺼운 외곽선 텍스트 컴포넌트.
 * paint-order: stroke fill + 다중 text-shadow로 선명한 외곽선을 구현합니다.
 *
 * highlightWords에 포함된 단어는 highlightColor로 표시됩니다.
 */
export const StrokedText: React.FC<StrokedTextProps> = ({
  text,
  fontSize = 80,
  fillColor = "#FFFFFF",
  strokeColor = COLORS.BG_DARKEST,
  strokeWidth = 4,
  highlightWords = [],
  highlightColor = COLORS.PRIMARY_BOLD,
  fontFamily = "'BMJUA', 'Pretendard Variable', sans-serif",
  style,
}) => {
  const shadowOffset = Math.max(3, Math.round(strokeWidth * 0.8));

  const baseStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    fontWeight: FONTS.WEIGHT_EXTRABOLD,
    lineHeight: FONTS.LEADING_TIGHT,
    color: fillColor,
    WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
    paintOrder: "stroke fill",
    textShadow: [
      `${shadowOffset}px ${shadowOffset}px 0 ${strokeColor}`,
      `${-shadowOffset}px ${-shadowOffset}px 0 ${strokeColor}`,
      `${shadowOffset}px ${-shadowOffset}px 0 ${strokeColor}`,
      `${-shadowOffset}px ${shadowOffset}px 0 ${strokeColor}`,
      `0px ${shadowOffset}px 0 ${strokeColor}`,
      `0px ${-shadowOffset}px 0 ${strokeColor}`,
      `${shadowOffset}px 0px 0 ${strokeColor}`,
      `${-shadowOffset}px 0px 0 ${strokeColor}`,
    ].join(", "),
    letterSpacing: FONTS.TRACKING_TIGHT * fontSize,
    whiteSpace: "pre-wrap",
    ...style,
  };

  // 강조 단어가 없으면 텍스트 그대로 렌더링
  if (highlightWords.length === 0) {
    return <div style={baseStyle}>{text}</div>;
  }

  // 강조 단어를 기준으로 텍스트를 분할
  const escapedWords = highlightWords.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escapedWords.join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <div style={baseStyle}>
      {parts.map((part, i) => {
        const isHighlight = highlightWords.includes(part);
        if (isHighlight) {
          return (
            <span
              key={i}
              style={{
                color: highlightColor,
                WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
};
