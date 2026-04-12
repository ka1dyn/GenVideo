import { COLORS } from "../../constants/theme";

/**
 * 썸네일 스타일 프리셋.
 * Thumbnail 컴포넌트의 preset prop에 따라 자동으로 색상/오버레이가 적용됩니다.
 */
export const PRESETS = {
  /**
   * 드라마 프리셋 — 레퍼런스 이미지와 동일한 스타일
   * 어두운 배경 + 붉은 키워드 강조 + 강한 비네팅
   */
  drama: {
    overlayColor: COLORS.BG_DARKEST,
    overlayOpacity: 0.6,
    titleFillColor: "#FFFFFF",
    titleStrokeColor: COLORS.BG_DARKEST,
    titleStrokeWidth: 5,
    highlightColor: "#FF3B30",
    subtitleBgColor: COLORS.PRIMARY_BOLD,
    subtitleTextColor: "#FFFFFF",
    badgeBgColor: "rgba(0, 0, 0, 0.75)",
    badgeTextColor: COLORS.TEXT_ON_DARK,
    enableVignette: true,
  },

  /**
   * 인포 프리셋 — 교육/정보 콘텐츠용
   * 중간 톤 배경 + 옐로우 강조 + 세이지 서브타이틀
   */
  info: {
    overlayColor: COLORS.BG_DARKEST,
    overlayOpacity: 0.5,
    titleFillColor: "#FFFFFF",
    titleStrokeColor: COLORS.BG_DARKEST,
    titleStrokeWidth: 4,
    highlightColor: "#FFD60A",
    subtitleBgColor: COLORS.SECONDARY_DARK,
    subtitleTextColor: "#FFFFFF",
    badgeBgColor: COLORS.OVERLAY_DARK,
    badgeTextColor: COLORS.TEXT_ON_DARK,
    enableVignette: false,
  },

  /**
   * 미니멀 프리셋 — 깔끔하고 밝은 스타일
   * 밝은 오버레이 + 테라코타 강조 + 부드러운 톤
   */
  minimal: {
    overlayColor: COLORS.BG_DARK,
    overlayOpacity: 0.5,
    titleFillColor: COLORS.TEXT_MAIN,
    titleStrokeColor: "#FFFFFF",
    titleStrokeWidth: 3,
    highlightColor: COLORS.PRIMARY_DARK,
    subtitleBgColor: COLORS.PRIMARY,
    subtitleTextColor: COLORS.TEXT_MAIN,
    badgeBgColor: COLORS.SECONDARY_LIGHT,
    badgeTextColor: COLORS.SECONDARY_BOLD,
    enableVignette: false,
  },
} as const;

export type PresetName = keyof typeof PRESETS;
