export const BRAND = {
  PROJECT_ID: "nvidia-tech-channel",
  MOOD: "다크 테크, 네온 엣지, 시네마틱 충격, 압도적 성능, 냉혹한 지배",
  CONCEPT:
    "NVIDIA의 압도적 GPU 아키텍처를 넷플릭스급 극적 연출로 — 숫자 하나하나가 관객을 강타한다",
  FORBIDDEN:
    "파스텔, 귀엽고 캐주얼한 느낌, 느린 페이드, 밝은 배경, 미지근한 전환",
};

export const COLORS = {
  // Background Layer
  BG_VOID: "#020302", // 극도로 어두운 배경 — 오프닝/클라이맥스 전용
  BG_DEEP: "#080c08", // 기본 배경
  BG_SURFACE: "#0f150f", // 카드·패널 배경
  BG_ELEVATED: "#192119", // 떠있는 UI 요소 배경

  // Brand Core — NVIDIA 시그니처 그린 계열
  PRIMARY: "#76B900", // NVIDIA 공식 그린
  PRIMARY_DIM: "rgba(118,185,0,0.18)", // PRIMARY 15~20% 투명도 — 배경 강조
  PRIMARY_GLOW: "rgba(118,185,0,0.45)", // 글로우 확산용 45% 투명도
  SECONDARY: "#A8E000", // 밝은 라임그린 — 서브 강조
  ACCENT: "#FF4400", // 냉혹한 오렌지레드 — 씬당 1회, 충격 포인트

  // Text
  TEXT_MAIN: "#EEEEE8", // 본문·헤드라인 — 순백보다 살짝 따뜻하게
  TEXT_MUTED: "#8A9A82", // 캡션·보조 텍스트
  TEXT_INVERSE: "#080c08", // 밝은 요소(PRIMARY 버튼 등) 위 대비용

  // Status — 성능 데이터·차트 전용
  POSITIVE: "#76B900", // 상승·우위 데이터
  NEGATIVE: "#FF4400", // 하락·경쟁사 열세 데이터
  HIGHLIGHT: "rgba(118,185,0,0.28)", // 형광펜 강조 — 수치 언더라인

  // Border
  BORDER: "rgba(118,185,0,0.14)", // 일반 구분선
  BORDER_STRONG: "rgba(118,185,0,0.52)", // 강조 구분선 — 카드 테두리·밑줄
};

export const BRAND_EXTRAS = {
  // 경쟁사 비교 차트
  COMPETITOR_AMD: "#ED1C24", // AMD 레드
  COMPETITOR_INTEL: "#0068B5", // Intel 블루
  COMPETITOR_QUALCOMM: "#3253DC", // Qualcomm 인디고

  // 성능 등급 배지 (티어별 희귀도 표현)
  TIER_S: "#FFD700", // S티어 — 골드 (최상위 발표)
  TIER_A: "#76B900", // A티어 — NVIDIA 그린
  TIER_B: "#4A7A00", // B티어 — 다크 그린
  TIER_C: "#8A9A82", // C티어 — 뮤트

  // GPU 제품 라인 구분
  PRODUCT_BLACKWELL: "#76B900", // Blackwell 세대 — 메인 그린
  PRODUCT_HOPPER: "#5A8C00", // Hopper 세대 — 딥 그린
  PRODUCT_GEFORCE: "#A8E000", // GeForce 소비자 라인 — 라임
  PRODUCT_DATACENTER: "#3EB489", // Data Center / Tesla — 민트

  // 데이터 시각화 보조 컬러 (차트 3번째 색 이후)
  DATA_3: "rgba(168,224,0,0.7)",
  DATA_4: "rgba(118,185,0,0.5)",
  DATA_5: "rgba(62,180,137,0.6)",
};

export const EFFECTS = {
  SHADOW_SM: `0 4px 12px rgba(0,0,0,0.5)`,
  SHADOW_LG: `0 20px 40px rgba(0,0,0,0.8)`,
  GLOW_SM: `0 0 16px ${COLORS.PRIMARY_GLOW}`,
  GLOW_MD: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
  GLOW_TEXT: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
};

export const FONTS = {
  DISPLAY: "'Bebas Neue', 'Pretendard Variable', sans-serif", // 임팩트 헤드라인 전용
  PRIMARY: "'Pretendard Variable', 'Pretendard', sans-serif", // 한글+영문 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 숫자/데이터 수치 전용
};

export const TEXT_SIZE = {
  XS: 24, // 캡션, 출처
  SM: 32, // 보조 텍스트
  BASE: 42, // 본문
  MD: 56, // 서브 헤드라인
  LG: 72, // 헤드라인
  XL: 96, // 섹션 타이틀
  XXL: 140, // 임팩트 디스플레이
  HERO: 200, // 오프닝 전용 — 씬당 1회, 단어 1~2개 한정
};

export const FONT_WEIGHT = {
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  BLACK: 900, // 헤드라인 기본값
};

export const LETTER_SPACING = {
  TIGHT: -0.04, // XXL, HERO 전용
  NORMAL: -0.02, // LG, XL
  WIDE: 0.02, // XS, 캡션
};

export const SPACING = {
  S1: 8,
  S2: 16,
  S3: 24,
  S4: 32,
  S5: 48,
  S6: 64,
  S7: 96,
  S8: 128,
  S9: 192,
  S10: 256,
};

export const SAFE_ZONE = {
  X: 96, // 좌우 — 텍스트/UI가 이 경계를 넘으면 안 됨
  Y: 72, // 상하
};

import { Easing } from "remotion";

export const DURATIONS = {
  INSTANT: 0.08, // 깜빡임, Glitch Flash (현재 fps 기준으로 프레임 계산)
  SNAP: 0.25, // 기본 전환 단위 (현재 fps 기준으로 프레임 계산)
  FAST: 0.4, // 일반 객체 등장 (현재 fps 기준으로 프레임 계산)
  NORMAL: 0.6, // 컨텐츠 전환 (현재 fps 기준으로 프레임 계산)
  SLOW: 1.2, // 배경/무드 전환 (현재 fps 기준으로 프레임 계산)
  DRAMATIC: 2.0, // 오프닝, 클라이맥스 (현재 fps 기준으로 프레임 계산)
};

export const EASINGS = {
  SNAP: Easing.bezier(0.25, 0, 0, 1), // 탁! 멈춤 — 기본값
  SPRING: Easing.bezier(0.34, 1.56, 0.64, 1), // 오버슈트 바운스 — 활기찬 등장
  DRAMATIC: Easing.bezier(0.76, 0, 0.24, 1), // 느리게 시작 → 팍! 꽂힘
  CINEMATIC: Easing.bezier(0.4, 0, 0.2, 1), // 서서히 — 배경/무드 전환 전용
};

export const SPRINGS = {
  SMOOTH: { damping: 200 }, // 바운스 없는 부드러운 전환
  SNAPPY: { damping: 20, stiffness: 200 }, // 빠릿한 UI 요소 등장
  PUNCH: { damping: 12, stiffness: 150 }, // 타격감 (Scale Punch 최적)
  DRAMATIC: { damping: 25, stiffness: 400 }, // 강렬한 등장을 위한 고강성 스프링
};

export const STAGGER = {
  TIGHT: 2, // 따다닥 빠른 연속
  NORMAL: 4, // 일반 그룹 등장
  LOOSE: 8, // 강조하고 싶은 연속 등장
};

export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50, // 로고, 워터마크
};
