/**
 * 색상 팔레트 — Vercel Geist Dark Theme 기반
 *
 * 기본은 흑백 + 그레이로 깔끔하게.
 * 강조할 때만 Blue 계열로 확 눈에 띄게.
 */
export const COLORS = {
  // ── Backgrounds ──
  BG_PRIMARY: "#000000",
  BG_SECONDARY: "#0a0a0a",
  BG_TERTIARY: "#111111",
  BG_ELEVATED: "#171717",

  // ── Text ──
  TEXT_PRIMARY: "#ededed",
  TEXT_SECONDARY: "#a1a1a1",
  TEXT_TERTIARY: "#737373",
  TEXT_MUTED: "#525252",

  // ── Accent — Vercel Blue ──
  ACCENT: "#0070f3",
  ACCENT_LIGHT: "#3291ff",
  ACCENT_GLOW: "rgba(0,112,243,0.25)",
  ACCENT_SUBTLE: "rgba(0,112,243,0.08)",

  // ── Semantic ──
  SUCCESS: "#0070f3",
  WARNING: "#f5a623",
  ERROR: "#ee0000",

  // ── Borders & Surfaces ──
  BORDER: "rgba(255,255,255,0.08)",
  BORDER_HOVER: "rgba(255,255,255,0.14)",
  BORDER_ACCENT: "rgba(0,112,243,0.4)",
  GLASS: "rgba(255,255,255,0.03)",
  GLASS_BORDER: "rgba(255,255,255,0.06)",

  // ── Gradient (강조 순간 전용) ──
  GRADIENT_BLUE:
    "linear-gradient(135deg, #0070f3 0%, #00a6ed 100%)",
  GRADIENT_SUBTLE:
    "linear-gradient(180deg, #111111 0%, #000000 100%)",
  GRADIENT_SPOTLIGHT:
    "radial-gradient(ellipse at 50% 0%, rgba(0,112,243,0.15) 0%, transparent 60%)",
} as const;

/**
 * 폰트 패밀리 — Geist (Vercel 공식)
 */
export const FONTS = {
  SANS: "'Geist Sans', 'Geist', Inter, -apple-system, sans-serif",
  MONO: "'Geist Mono', 'JetBrains Mono', monospace",
} as const;

/**
 * 폰트 사이즈 — 1920×1080 영상 기준
 *
 * 영상은 멀리서도 보이므로, 웹보다 전반적으로 크게 설정.
 * "한 화면에 텍스트를 적게, 대신 크고 시원하게."
 */
export const FONT_SIZES = {
  XS: 18,
  SM: 22,
  MD: 32,
  LG: 44,
  XL: 64,
  XXL: 80,
} as const;

/**
 * 타이포그래피 프리셋
 *
 * Vercel의 타이트한 자간을 기반으로 하되,
 * 영상에서는 약간 더 여유를 줘서 가독성을 높입니다.
 */
export const TYPOGRAPHY = {
  /** 히어로/메인 제목 — 크고 강렬하게 */
  HERO: {
    fontFamily: "'Geist Sans', Inter, sans-serif",
    fontWeight: 700 as const,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
  },
  /** 서브 헤딩 — 깔끔하게 */
  HEADING: {
    fontFamily: "'Geist Sans', Inter, sans-serif",
    fontWeight: 600 as const,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
  },
  /** 본문 — 편안하게 읽히도록 */
  BODY: {
    fontFamily: "'Geist Sans', Inter, sans-serif",
    fontWeight: 400 as const,
    letterSpacing: "-0.01em",
    lineHeight: 1.5,
  },
  /** SectionLabel — 소제목 라벨 (자연스러운 문장체) */
  LABEL: {
    fontFamily: "'Geist Sans', Inter, sans-serif",
    fontWeight: 500 as const,
    letterSpacing: "0em",
    lineHeight: 1.0,
  },
  /** 코드, 수치 — 격 있는 모노 */
  MONO: {
    fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    fontWeight: 400 as const,
    letterSpacing: "0em",
    lineHeight: 1.4,
  },
} as const;

/**
 * 간격 — 넉넉하게, 숨 쉴 수 있게
 */
export const SPACING = {
  XS: 8,
  SM: 16,
  MD: 32,
  LG: 48,
  XL: 64,
  XXL: 96,
  HERO: 128,
} as const;

/** 보더 라운드 */
export const BORDER_RADIUS = {
  SM: 6,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999,
} as const;
