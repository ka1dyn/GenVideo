export const BRAND = {
  PROJECT_ID: "design-test2",
  MOOD: "Clean, Professional, Future-focused, Energetic, Trustworthy",
  CONCEPT: "AI가 재정의하는 웹 개발의 새로운 패러다임과 생산성 혁신",
  FORBIDDEN: "Dark/Moody, Gritty, Neon-heavy, Cluttered",
};

export const COLORS = {
  // Background Layer (Bright Mode)
  BG_VOID: "#F1F5F9",     // 최하단 배경 (Slate 100)
  BG_DEEP: "#F8FAFC",     // 기본 배경 (Slate 50)
  BG_SURFACE: "#FFFFFF",  // 카드/패널 (Pure White)
  BG_ELEVATED: "#FFFFFF", // 떠있는 요소

  // Brand Core
  PRIMARY: "#4F46E5",      // Indigo 600 - 메인 브랜드 컬러
  PRIMARY_DIM: "rgba(79, 70, 229, 0.1)",
  PRIMARY_GLOW: "rgba(79, 70, 229, 0.3)",
  SECONDARY: "#10B981",    // Emerald 500 - 혁신/성장 강조
  SECONDARY_DIM: "rgba(16, 185, 129, 0.15)",
  ACCENT: "#8B5CF6",       // Violet 500 - 창의성/AI 신비감
  ACCENT_DIM: "rgba(139, 92, 246, 0.15)",

  // Text
  TEXT_MAIN: "#1E293B",    // Slate 800 - 본문/헤드라인
  TEXT_MUTED: "#64748B",   // Slate 500 - 보조 텍스트
  TEXT_INVERSE: "#FFFFFF", // 밝은 강조색 위 텍스트

  // Status
  POSITIVE: "#059669",     // Emerald 600 - 상승/성공 데이터
  NEGATIVE: "#DC2626",     // Red 600 - 문제/경고
  HIGHLIGHT: "rgba(245, 158, 11, 0.2)", // Amber 500 기반 하이라이터

  // Border
  BORDER: "rgba(148, 163, 184, 0.2)",    // Slate 400 기반 연한 경계선
  BORDER_STRONG: "rgba(79, 70, 229, 0.3)", // Primary 기반 강조 경계선
};

export const BRAND_EXTRAS = {
  CHART_AI: "#6366F1",     // AI 관련 데이터 컬러
  CHART_HUMAN: "#94A3B8",  // 기존 방식 관련 데이터 컬러
  GLASS_SURFACE: "rgba(255, 255, 255, 0.7)", // 글래스모피즘 효과용
};

export const EFFECTS = {
  SHADOW_SM: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
  SHADOW_LG: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`,
  GLOW_SM: `0 0 16px ${COLORS.PRIMARY_GLOW}`,
  GLOW_MD: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
  GLOW_TEXT: `0 0 24px rgba(79, 70, 229, 0.2)`,
};

export const FONTS = {
  DISPLAY: "'Pretendard', 'Inter', sans-serif", // 밝은 톤에 어울리는 현대적 고딕
  PRIMARY: "'Pretendard', 'Pretendard Variable', sans-serif",
  MONO: "'JetBrains Mono', 'Fira Code', monospace",
};

export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50,
};
