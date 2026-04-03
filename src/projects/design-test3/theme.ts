/**
 * design-test3 프로젝트 전용 디자인 시스템 (Theme)
 * public/design-test3/design-system.md 파일을 단일 진실 공급원으로 합니다.
 */

export const BRAND = {
  PROJECT_ID: "design-test3",
  // 영상 전체의 감성 키워드
  MOOD: "Professional, Minimal, Trustworthy, Innovative, Efficient",
  // 한 줄 컨셉
  CONCEPT: "AI와 함께하는 생산성 혁신 - 깔끔하고 스마트한 웹 개발 워크플로우",
  // 절대 사용 금지
  FORBIDDEN:
    "유치한 아이콘(가위·전구·돋보기), 과한 그라데이션, 무지개 배색, 90년대 PPT 감성, 전문성 결여된 그래픽",
} as const;

export const COLORS = {
  // --- Background Layer ---
  BG_VOID: "#F5F5F7", // 가장 깊은 바닥 배경
  BG_BASE: "#FFFFFF", // 일반 장면 배경
  BG_SURFACE: "#F2F2F7", // 카드·패널·컨테이너 배경
  BG_ELEVATED: "#E5E5EA", // 플로팅 요소·모달·툴팁 배경
  BG_HOVER: "rgba(0,0,0,0.04)", // 호버·선택 상태 오버레이

  // --- Brand Core ---
  PRIMARY: "#0066FF", // 메인 강조색
  PRIMARY_DIM: "rgba(0, 102, 255, 0.15)", // 기초 glow / 선택 영역 fill
  PRIMARY_MID: "rgba(0, 102, 255, 0.30)", // 중간 강도 glow
  PRIMARY_GLOW: "rgba(0, 102, 255, 0.50)", // 강한 glow / 테두리 빛번짐

  SECONDARY: "#10B981", // 보조 포인트색 (Emerald)
  SECONDARY_DIM: "rgba(16, 185, 129, 0.15)",

  ACCENT: "#F43F5E", // 반전 포인트색 (Rose)
  ACCENT_DIM: "rgba(244, 63, 94, 0.15)",

  // --- Text ---
  TEXT_MAIN: "#1D1D1F", // 헤드라인, 핵심 본문
  TEXT_BODY: "rgba(0, 0, 0, 0.8)", // 일반 본문
  TEXT_MUTED: "rgba(0, 0, 0, 0.5)", // 보조 텍스트, 캡션
  TEXT_DISABLED: "rgba(0, 0, 0, 0.25)", // 비활성 텍스트
  TEXT_INVERSE: "#FFFFFF", // 배경 위 반전 텍스트
  TEXT_ON_PRIMARY: "#FFFFFF", // PRIMARY 색상 위 텍스트

  // --- Border & Divider ---
  BORDER: "rgba(0,0,0,0.08)", // 기본 구분선
  BORDER_STRONG: "rgba(0,0,0,0.18)", // 강조 구분선
  BORDER_PRIMARY: "#0066FF", // PRIMARY 테두리

  // --- Status ---
  POSITIVE: "#10B981",
  POSITIVE_DIM: "rgba(16,185,129,0.15)",
  NEGATIVE: "#EF4444",
  NEGATIVE_DIM: "rgba(239,68,68,0.15)",
  WARNING: "#F59E0B",
  WARNING_DIM: "rgba(245,158,11,0.15)",
  INFO: "#3B82F6",
  INFO_DIM: "rgba(59,130,246,0.15)",

  // --- Data Visualization ---
  DATA_1: "#0066FF",
  DATA_2: "#8B5CF6",
  DATA_3: "#F43F5E",
  DATA_4: "#D97706",
  DATA_5: "#0EA5E9",
} as const;

export const EFFECTS = {
  // --- Shadow ---
  SHADOW_SM: "0 2px 8px rgba(0,0,0,0.12)", // 버튼, 뱃지
  SHADOW_MD: "0 4px 16px rgba(0,0,0,0.18)", // 일반 카드
  SHADOW_LG: "0 10px 32px rgba(0,0,0,0.28)", // 모달, 플로팅
  SHADOW_XL: "0 20px 60px rgba(0,0,0,0.45)", // 인트로/아웃트로 딥 섀도우

  // --- Glow ---
  GLOW_SM: `0 0 12px ${COLORS.PRIMARY_MID}`,
  GLOW_MD: `0 0 24px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 48px ${COLORS.PRIMARY_GLOW}, 0 0 80px ${COLORS.PRIMARY_DIM}`,
  GLOW_TEXT_SM: `0 0 16px ${COLORS.PRIMARY_MID}`,
  GLOW_TEXT_LG: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
  GLOW_SECONDARY: `0 0 24px ${COLORS.SECONDARY_DIM}`,
  GLOW_ACCENT: `0 0 24px ${COLORS.ACCENT_DIM}`,

  // --- Glassmorphism ---
  GLASS_BG: "rgba(255,255,255,0.70)",
  GLASS_BORDER: "rgba(255,255,255,0.60)",
  GLASS_BLUR: "blur(12px)",
  GLASS_BLUR_HEAVY: "blur(24px)",

  // --- Gradient Overlay ---
  FADE_UP: `linear-gradient(to top, ${COLORS.BG_BASE}, transparent)`,
  FADE_DOWN: `linear-gradient(to bottom, ${COLORS.BG_BASE}, transparent)`,
  FADE_RIGHT: `linear-gradient(to right, ${COLORS.BG_BASE}, transparent)`,
  RADIAL_PRIMARY: `radial-gradient(ellipse at center, ${COLORS.PRIMARY_DIM} 0%, transparent 70%)`,
} as const;

export const FONTS = {
  DISPLAY: "'Pretendard Variable', 'Inter', sans-serif", // 볼드 헤드라인
  PRIMARY: "'Pretendard Variable', sans-serif", // 일반 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 코드/데이터

  SIZE_XS: 12, // 캡션
  SIZE_SM: 16, // 보조
  SIZE_MD: 22, // 본문
  SIZE_LG: 32, // 소형 헤드라인
  SIZE_XL: 48, // 중형 헤드라인
  SIZE_2XL: 64, // 대형 헤드라인
  SIZE_3XL: 88, // 히어로 타이틀
  SIZE_4XL: 120, // 풀스크린 임팩트

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
  // --- Base Spacing ---
  PX_2: 2, // 초미세 보정
  PX_4: 4, // 초소형 간격 (패딩, 아이콘 여백)
  PX_8: 8, // 소형 간격 (내부 그룹화)
  PX_12: 12, // 중소형 간격
  PX_16: 16, // 표준 간격 (카드 내부 패딩)
  PX_24: 24, // 중형 간격 (콘텐츠 블록 간)
  PX_32: 32, // 대형 간격 (섹션 내 요소 간)
  PX_40: 40, // 대형 섹션 간격
  PX_48: 48, // 특대형 간격
  PX_64: 64, // 섹션 간 상하 여백
  PX_80: 80, // 넓은 화면 분할 간격
  PX_96: 96, // 레이아웃 주요 구분
  PX_120: 120, // 인트로/아웃트로 상하 여백

  // --- Border Radius ---
  RADIUS_SM: 6, // 미세 곡률
  RADIUS_MD: 12, // 일반 곡률 (카드, 버튼)
  RADIUS_LG: 20, // 강조 곡률 (대형 패널)
  RADIUS_XL: 32, // 부드러운 전면 곡률
  RADIUS_PILL: 9999, // 완전 캡슐형

  // --- Border Width ---
  BORDER_THIN: 1, // 기본 실선
  BORDER_NORMAL: 1.5, // 강조 테두리
  BORDER_THICK: 2.5, // 헤비 외곽선
} as const;

export const ANIMATION = {
  // Duration (frame 단위, 60fps 기준)
  DUR_XS: 12, // 0.2s — 마이크로 인터랙션
  DUR_SM: 18, // 0.3s — 빠른 전환
  DUR_MD: 30, // 0.5s — 일반 전환
  DUR_LG: 42, // 0.7s — 강조 진입
  DUR_XL: 60, // 1.0s — 드라마틱 애니메이션
  DUR_2XL: 90, // 1.5s — 느린 배경 연출

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

  STAGGER_SM: 6, // 0.1s
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
