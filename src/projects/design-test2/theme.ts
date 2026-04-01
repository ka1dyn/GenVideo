/**
 * NVIDIA Design System Constants for design-test2
 * Based on public/design-test2/design-system.md
 */

export const BRAND = {
  PROJECT_ID: "nvidia",
  MOOD: "다크 테크, 네온 엣지, 시네마틱, 압도적, 샤프",
  CONCEPT: "NVIDIA 기술의 압도적 성능과 미래감을 극적이고 날카롭게 전달",
  FORBIDDEN:
    "귀엽고 캐주얼한 느낌, 파스텔, 둥근 모서리, 느린 페이드, 밝은 배경, 촌스러운 그라디언트",
};

export const COLORS = {
  // Background Layer
  BG_VOID: "#020202", // 가장 어두운 배경 — 비네팅 외곽
  BG_DEEP: "#080808", // 기본 씬 배경
  BG_SURFACE: "#0f1210", // 카드·패널 배경 (살짝 녹끼)
  BG_ELEVATED: "#171e17", // 팝업·떠있는 UI 요소 배경
  BG_INVERSE: "#76B900", // 반전 강조 배경 (헤드라인 하이라이트 블록)

  // Brand Core
  PRIMARY: "#76B900", // NVIDIA 시그니처 그린
  PRIMARY_DIM: "rgba(118,185,0,0.18)", // PRIMARY 18% — 배경 틴트·선택 영역
  PRIMARY_GLOW: "rgba(118,185,0,0.45)", // PRIMARY 45% — 글로우 확산
  SECONDARY: "#A8E000", // 라이트 그린 — 서브 강조·숫자 하이라이트
  ACCENT: "#00E5FF", // 사이언 포인트 — 씬당 1회 최대 사용
  ACCENT_DIM: "rgba(0,229,255,0.15)", // ACCENT 배경 틴트

  // Text
  TEXT_MAIN: "#EDEDED", // 본문·헤드라인
  TEXT_MUTED: "#8A9490", // 캡션·보조 텍스트
  TEXT_INVERSE: "#060606", // 밝은 배경(BG_INVERSE) 위 텍스트

  // Status / Data
  POSITIVE: "#76B900", // 상승·긍정 수치
  NEGATIVE: "#FF3B3B", // 하락·경고 수치
  NEUTRAL: "#A0A8A0", // 변동 없음
  HIGHLIGHT: "rgba(118,185,0,0.28)", // 형광펜 강조 (텍스트 bg)

  // Border
  BORDER: "rgba(118,185,0,0.12)", // 일반 구분선
  BORDER_STRONG: "rgba(118,185,0,0.50)", // 강조 구분선·액티브 프레임
  BORDER_ACCENT: "rgba(0,229,255,0.35)", // ACCENT 계열 구분선
};

export const BRAND_EXTRAS = {
  // 경쟁사 비교 차트용 컬러
  COMPETITOR_AMD: "#ED1C24", // AMD 레드
  COMPETITOR_INTEL: "#0071C5", // 인텔 블루
  COMPETITOR_QUALCOMM: "#3253DC",

  // GPU 등급 컬러 (벤치마크 바 차트 등)
  TIER_S: "#76B900", // NVIDIA 자사 — 최상위
  TIER_A: "#A8E000",
  TIER_B: "#FFD000",
  TIER_C: "#FF7A00",
  TIER_D: "#FF3B3B",

  // 아키텍처 계열 강조
  BLACKWELL_EDGE: "#00E5FF", // 블랙웰 세대 전용 사이언 엣지
  HOPPER_EDGE: "#76B900", // 이전 세대 그린 유지
};

export const EFFECTS = {
  SHADOW_SM: `0 4px 12px rgba(0,0,0,0.5)`,
  SHADOW_LG: `0 20px 40px rgba(0,0,0,0.8)`,
  GLOW_SM: `0 0 16px ${COLORS.PRIMARY_GLOW}`,
  GLOW_MD: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
  GLOW_TEXT: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
  GLOW_ACCENT_SM: `0 0 16px rgba(0,229,255,0.40)`,
  GLOW_ACCENT_MD: `0 0 48px rgba(0,229,255,0.40)`,
};

export const FONTS = {
  DISPLAY: "'Bebas Neue', 'Pretendard Variable', sans-serif", // 임팩트 헤드라인 전용
  PRIMARY: "'Pretendard Variable', 'Pretendard', sans-serif", // 한글+영문 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 숫자/데이터 수치 전용
};

export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50, // 로고, 워터마크
};
