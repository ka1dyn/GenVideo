import { VIDEO_FPS } from "../../constants/video-config";

export const BRAND = {
  PROJECT_ID: "tech-brief",
  MOOD: "신뢰감, 속보, 프리미엄, 정밀, 금융 터미널",
  CONCEPT:
    "Bloomberg Terminal을 모바일로 옮긴 듯한 다크 금융 테크 UI — 어두운 네이비 배경 위에 전기 블루 포인트가 빛나고, 주가 티커와 속보 레이블이 신뢰감 있게 흘러간다",
  FORBIDDEN:
    "유치한 아이콘(가위·전구·돋보기), 과한 그라데이션, 무지개 배색, 90년대 PPT 감성, 클립아트",
} as const;

export const COLORS = {
  // ── Backgrounds ──────────────────────────────────────
  // 스케치북 종이 질감 느낌의 크림 베이지
  BG_VOID:     "#EDE9E0",
  BG_BASE:     "#FAF8F3",
  BG_SURFACE:  "#F4F1E9",
  BG_ELEVATED: "#EDEAE1",
  BG_CARD:     "#FFFFFF",
  BG_HOVER:    "rgba(90, 120, 80, 0.07)",

  // ── Primary — Sage Ink ────────────────────────────────
  // 수채화 녹색, 너무 선명하지 않게 그레이 섞음
  PRIMARY:      "#5A7850",
  PRIMARY_DIM:  "rgba(90, 120, 80, 0.12)",
  PRIMARY_MID:  "rgba(90, 120, 80, 0.25)",
  PRIMARY_GLOW: "rgba(90, 120, 80, 0.38)",

  // ── Secondary — Warm Sand ─────────────────────────────
  // 전구 앰버에서 바랜 모래빛으로
  SECONDARY:     "#C4923A",
  SECONDARY_DIM: "rgba(196, 146, 58, 0.14)",

  // ── Accent — Dusty Coral ─────────────────────────────
  // 튀지 않는 코랄, 연필 스케치 위 수채화 느낌
  ACCENT:     "#C4715A",
  ACCENT_DIM: "rgba(196, 113, 90, 0.13)",

  // ── Text ─────────────────────────────────────────────
  // 완전한 검정 대신 잉크가 바랜 느낌의 다크 브라운
  TEXT_MAIN:       "#2A2720",
  TEXT_BODY:       "#58534A",
  TEXT_MUTED:      "#8C8478",
  TEXT_DISABLED:   "#BEB8AF",
  TEXT_INVERSE:    "#FAF8F3",
  TEXT_ON_PRIMARY: "#FFFFFF",

  // ── Border ───────────────────────────────────────────
  BORDER:         "#DED9CF",
  BORDER_STRONG:  "#CAC4B8",
  BORDER_PRIMARY: "#B8C8B0",

  // ── Semantic — 채도 낮춘 수채화 톤 ────────────────────
  // 형광 없이, 스케치북에 수성펜으로 칠한 느낌
  POSITIVE:      "#4F8C68",   // 바랜 민트그린
  POSITIVE_DIM:  "rgba(79, 140, 104, 0.13)",
  NEGATIVE:      "#B85555",   // 바랜 레드, 형광 없음
  NEGATIVE_DIM:  "rgba(184, 85, 85, 0.13)",
  WARNING:       "#C4923A",   // 세컨더리와 통일감
  WARNING_DIM:   "rgba(196, 146, 58, 0.14)",
  INFO:          "#5A7850",   // 프라이머리와 통일감
  INFO_DIM:      "rgba(90, 120, 80, 0.12)",

  // ── Data palette — 스케치 수채화 5색 ─────────────────
  // 모두 같은 채도/명도 레벨로 맞춰서 통일감 유지
  DATA_1: "#5A7850",   // sage green  (primary)
  DATA_2: "#C4923A",   // warm amber  (secondary)
  DATA_3: "#5A7A9E",   // dusty blue  — 하늘빛 수채
  DATA_4: "#C4715A",   // dusty coral (accent)
  DATA_5: "#8A7AAE",   // muted lavender — 연필 그림자색
} as const;

export const EFFECTS = {
  // ── Shadows — 잉크 얼룩처럼 퍼지는 소프트 쉐도우 ──────
  SHADOW_SM: "0 1px 3px rgba(42, 39, 32, 0.07)",
  SHADOW_MD: "0 3px 10px rgba(42, 39, 32, 0.09)",
  SHADOW_LG: "0 8px 24px rgba(42, 39, 32, 0.11)",
  SHADOW_XL: "0 16px 48px rgba(42, 39, 32, 0.14)",

  // ── Tint (glow 대체) — 수채화 번짐 느낌 ──────────────
  TINT_SM:        "0 0 0 3px rgba(90, 120, 80, 0.13)",
  TINT_MD:        "0 0 0 4px rgba(90, 120, 80, 0.20)",
  TINT_LG:        "0 0 0 6px rgba(90, 120, 80, 0.22), 0 2px 12px rgba(90, 120, 80, 0.09)",
  TINT_TEXT_SM:   "0 2px 0 rgba(90, 120, 80, 0.28)",
  TINT_TEXT_LG:   "0 2px 0 rgba(90, 120, 80, 0.50)",
  TINT_SECONDARY: "0 0 0 4px rgba(196, 146, 58, 0.20)",
  TINT_ACCENT:    "0 0 0 4px rgba(196, 113, 90, 0.18)",

  // ── Glass — 스케치북 종이 위 트레싱지 느낌 ────────────
  GLASS_BG:         "rgba(250, 248, 243, 0.88)",
  GLASS_BORDER:     "rgba(90, 120, 80, 0.16)",
  GLASS_BLUR:       "blur(12px)",
  GLASS_BLUR_HEAVY: "blur(24px)",

  // ── Fades — BG_BASE 기준 ──────────────────────────────
  FADE_UP:        "linear-gradient(to top, #FAF8F3, transparent)",
  FADE_DOWN:      "linear-gradient(to bottom, #FAF8F3, transparent)",
  FADE_RIGHT:     "linear-gradient(to right, #FAF8F3, transparent)",
  RADIAL_PRIMARY: "radial-gradient(ellipse at center, rgba(90, 120, 80, 0.11) 0%, transparent 70%)",
} as const;

export const FONTS = {
  DISPLAY: "'Pretendard Variable', 'Inter', sans-serif",
  PRIMARY: "'Pretendard Variable', sans-serif",
  MONO: "'JetBrains Mono', 'Fira Code', monospace",

  SIZE_XS: 18,
  SIZE_SM: 24,
  SIZE_MD: 32,
  SIZE_LG: 48,
  SIZE_XL: 64,
  SIZE_2XL: 80,
  SIZE_3XL: 100,
  SIZE_4XL: 140,

  WEIGHT_REGULAR: 400,
  WEIGHT_MEDIUM: 500,
  WEIGHT_SEMIBOLD: 600,
  WEIGHT_BOLD: 700,
  WEIGHT_EXTRABOLD: 800,

  LEADING_TIGHT: 1.1,
  LEADING_SNUG: 1.3,
  LEADING_NORMAL: 1.6,
  LEADING_LOOSE: 1.9,

  TRACKING_TIGHT: -0.03,
  TRACKING_NORMAL: 0,
  TRACKING_WIDE: 0.05,
  TRACKING_WIDER: 0.12,
} as const;

export const SPACING = {
  PX_2: 2,
  PX_4: 4,
  PX_8: 8,
  PX_12: 12,
  PX_16: 16,
  PX_24: 24,
  PX_32: 32,
  PX_40: 40,
  PX_48: 48,
  PX_64: 64,
  PX_80: 80,
  PX_96: 96,
  PX_120: 120,

  RADIUS_SM: 6,
  RADIUS_MD: 12,
  RADIUS_LG: 20,
  RADIUS_XL: 32,
  RADIUS_PILL: 9999,

  BORDER_THIN: 1,
  BORDER_NORMAL: 1.5,
  BORDER_THICK: 2.5,
} as const;

export const ANIMATION = {
  // Scaling based on 60fps (original design system was 30fps)
  DUR_XS: 12, 
  DUR_SM: 18,
  DUR_MD: 30,
  DUR_LG: 42,
  DUR_XL: 60,
  DUR_2XL: 90,

  SPRING_GENTLE: { damping: 14, stiffness: 120, mass: 1 },
  SPRING_BOUNCY: { damping: 10, stiffness: 160, mass: 0.9 },
  SPRING_SNAPPY: { damping: 22, stiffness: 250, mass: 0.8 },
  SPRING_HEAVY: { damping: 18, stiffness: 80, mass: 1.2 },

  EASE_OUT: [0.0, 0.0, 0.2, 1.0] as const,
  EASE_IN: [0.4, 0.0, 1.0, 1.0] as const,
  EASE_IN_OUT: [0.4, 0.0, 0.2, 1.0] as const,
  EASE_ELASTIC: [0.0, 0.8, 0.2, 1.2] as const,

  ENTER_Y_SM: -12,
  ENTER_Y_MD: -24,
  ENTER_Y_LG: -48,
  ENTER_X_SM: -16,
  ENTER_X_MD: -32,

  STAGGER_SM: 6,
  STAGGER_MD: 10,
  STAGGER_LG: 16,

  SCALE_ENTER: 0.92,
  SCALE_EMPHASIS: 1.04,
  SCALE_EXIT: 0.96,
} as const;

export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50,
} as const;
