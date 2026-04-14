/* 
* 해당 파일은 읽기 전용이므로, 절대로 임의로 수정하지 않습니다.
*/

export const COLORS = {
 
  // ─────────────────────────────────────────
  // Background
  // 장면·레이아웃 배경
  // ─────────────────────────────────────────
 
  // 대부분의 scene 기본 배경
  BG_BASE:           "#FAFAF8",
  // 카드·패널·컨테이너 배경
  BG_SURFACE:        "#FFF8F3",
  // 섹션 구분·살짝 눌린 느낌 배경
  BG_MUTED:          "#F2EDE8",
  // 강조 블록·하이라이트 섹션 배경
  BG_EMPHASIS:       "#EDE9E0",
  // 인트로·아웃트로·다크 씬 배경
  BG_DARK:           "#3A2E28",
  // 풀스크린 다크 배경 (가장 어두운 장면)
  BG_DARKEST:        "#2A201A",
 
 
  // ─────────────────────────────────────────
  // Primary
  // 메인 포인트 컬러 (테라코타 계열)
  // 핵심 강조·CTA·뱃지·도형에 사용
  // ─────────────────────────────────────────
 
  // 연한 틴트 배경 (primary 요소의 배경 wash)
  PRIMARY_LIGHT:     "#FDF0E8",
  // 중간 연한 (보조 도형·호버 상태)
  PRIMARY_SOFT:      "#F5CEBA",
  // 메인보다 살짝 연한 (서브 강조·선)
  PRIMARY_MID:       "#EDAB8A",
  // 메인 포인트 컬러 ★
  PRIMARY:           "#E8A87C",
  // 메인보다 진한 (버튼·뱃지·강조 텍스트)
  PRIMARY_DARK:      "#C97A50",
  // 가장 진한 (CTA·Bold 강조)
  PRIMARY_BOLD:      "#A05030",
 
 
  // ─────────────────────────────────────────
  // Secondary
  // 보조 포인트 컬러 (세이지 계열)
  // 아이콘·태그·자연 느낌 요소에 사용
  // ─────────────────────────────────────────
 
  // 연한 틴트 배경 (secondary 요소의 배경 wash)
  SECONDARY_LIGHT:   "#EDF4EC",
  // 중간 연한 (카드 배경·태그 배경)
  SECONDARY_SOFT:    "#CCDEC8",
  // 메인 보조 컬러 ★
  SECONDARY:         "#B5C9B0",
  // 메인보다 진한 (아이콘·보조 도형)
  SECONDARY_MID:     "#8EAA88",
  // 진한 보조 (버튼·태그·강조)
  SECONDARY_DARK:    "#608060",
  // 가장 진한 보조 (텍스트 위 사용 가능)
  SECONDARY_BOLD:    "#3D5A3C",
 
 
  // ─────────────────────────────────────────
  // Text
  // 모든 텍스트 색상
  // ─────────────────────────────────────────
 
  // 제목·주요 텍스트 (가장 진한 잉크)
  TEXT_MAIN:         "#3A2E28",
  // 본문·서브타이틀
  TEXT_BODY:         "#6A5A50",
  // 보조 설명·캡션
  TEXT_SUB:          "#9A8A80",
  // 플레이스홀더·비활성
  TEXT_DISABLED:     "#C8B8B0",
  // 다크 배경 위 텍스트
  TEXT_ON_DARK:      "#EDE9E0",
  // primary 배경 위 텍스트
  TEXT_ON_PRIMARY:   "#FDF0E8",
  // secondary 배경 위 텍스트
  TEXT_ON_SECONDARY: "#2A4030",
 
 
  // ─────────────────────────────────────────
  // Stroke / Border
  // 선·경계·구분선
  // ─────────────────────────────────────────
 
  // 가장 연한 구분선 (카드 기본 테두리)
  STROKE_SUBTLE:     "#E0DAD4",
  // 일반 구분선·컨테이너 경계
  STROKE_DEFAULT:    "#C8B8B0",
  // 강조 구분선·선택 상태
  STROKE_STRONG:     "#9A8A80",
  // primary 포인트 테두리 (활성·선택 카드)
  STROKE_PRIMARY:    "#E8A87C",
  // 잉크 테두리 (캐릭터·버튼·강한 구분)
  STROKE_INK:        "#3A2E28",
 
 
  // ─────────────────────────────────────────
  // Overlay
  // 반투명 레이어·딤 효과
  // ─────────────────────────────────────────
 
  // 은은한 딤 (카드 호버·subtle 레이어)
  OVERLAY_LIGHT:     "rgba(58, 46, 40, 0.08)",
  // 중간 딤 (모달 뒷배경·섹션 구분)
  OVERLAY_MED:       "rgba(58, 46, 40, 0.22)",
  // 진한 딤 (영상 위 텍스트·전체 화면 딤)
  OVERLAY_DARK:      "rgba(58, 46, 40, 0.50)",
  // primary 반투명 레이어 (도형·그래픽 효과)
  OVERLAY_PRIMARY:   "rgba(232, 168, 124, 0.18)",
  // secondary 반투명 레이어 (도형·그래픽 효과)
  OVERLAY_SECONDARY: "rgba(181, 201, 176, 0.25)",
 
 
  // ─────────────────────────────────────────
  // State
  // 상태 표현 — primary/secondary와 혼동 없도록
  // 각각 독립된 색조로 분리
  // ─────────────────────────────────────────
 
  // 성공 배경 — 세이지보다 선명한 그린으로 분리
  // (secondary와 유사하지만 채도를 높여 상태임을 명확히)
  STATE_SUCCESS_BG:  "#C8E8C0",
  // 성공 텍스트·아이콘
  STATE_SUCCESS_FG:  "#2D5A28",
 
  // 경고 배경 — 황토/머스터드 계열 (primary 테라코타와 색조 차별화)
  STATE_WARN_BG:     "#F5E8B0",
  // 경고 텍스트·아이콘
  STATE_WARN_FG:     "#7A5A00",
 
  // 오류 배경 — 더스티 레드 계열 (primary보다 붉고 채도 낮게)
  STATE_ERROR_BG:    "#F0D0C8",
  // 오류 텍스트·아이콘
  STATE_ERROR_FG:    "#8A2818",
 
 
  // ─────────────────────────────────────────
  // Character
  // 캐릭터 전용 (라인아트 채색)
  // ─────────────────────────────────────────
 
  // 외곽선·눈·입 (메인 선)
  CHAR_STROKE:       "#3A2E28",
  // 몸통 내부 채우기
  CHAR_FILL:         "#FFF8F3",
  // 피부톤·볼터치
  CHAR_SKIN:         "#E8A87C",
  // 모자·의상 메인
  CHAR_COSTUME:      "#B5C9B0",
  // 들고 있는 소품·포인트 오브젝트
  CHAR_PROP:         "#C97A50",
  // 의상 디테일·섀도우
  CHAR_DETAIL:       "#3D5A3C",
 
} as const;
 
export type ColorToken = keyof typeof COLORS;
 
 
export const EFFECTS = {
 
  // ─────────────────────────────────────────
  // Tint
  // 도형·이미지·배경 위에 올리는 반투명 컬러 레이어
  // style={{ backgroundColor: EFFECTS.TINT_WARM }} 형태로 사용
  // ─────────────────────────────────────────
 
  // 따뜻한 크림 틴트 (BG_BASE 위 오브젝트 톤 통일)
  TINT_WARM:         "rgba(250, 248, 244, 0.55)",
  // primary(테라코타) 틴트 (장면 전환·강조 wash)
  TINT_PRIMARY:      "rgba(232, 168, 124, 0.22)",
  // secondary(세이지) 틴트 (자연·성공 씬 wash)
  TINT_SECONDARY:    "rgba(181, 201, 176, 0.22)",
  // 다크 틴트 (텍스트 가독성 확보용 오버레이)
  TINT_DARK:         "rgba(58, 46, 40, 0.35)",
  // 화이트 틴트 (밝은 씬 전환·페이드인 효과)
  TINT_WHITE:        "rgba(255, 255, 255, 0.60)",
 
 
  // ─────────────────────────────────────────
  // Shadow
  // boxShadow · filter: drop-shadow 에 사용
  // 스케치 팔레트 무드에 맞는 컬러 그림자
  // ─────────────────────────────────────────
 
  // 카드·컨테이너 기본 그림자 (은은한 warm shadow)
  SHADOW_SM:         "0px 2px 8px rgba(58, 46, 40, 0.10)",
  // 카드 hover·강조 그림자 (중간 depth)
  SHADOW_MD:         "0px 4px 16px rgba(58, 46, 40, 0.16)",
  // 팝업·모달·캐릭터 부각용 그림자 (큰 depth)
  SHADOW_LG:         "0px 8px 32px rgba(58, 46, 40, 0.22)",
  // primary 컬러 그림자 (테라코타 버튼·뱃지 아래)
  SHADOW_PRIMARY:    "0px 4px 16px rgba(201, 122, 80, 0.35)",
  // secondary 컬러 그림자 (세이지 아이콘·태그 아래)
  SHADOW_SECONDARY:  "0px 4px 16px rgba(96, 128, 96, 0.28)",
 
} as const;
 
export type EffectToken = keyof typeof EFFECTS;

export const FONTS = {
  DISPLAY: "'Pretendard Variable', 'Inter', sans-serif",
  PRIMARY: "'Pretendard Variable', sans-serif",
  HANDWRITING: "'Nanum Pen Script', cursive",
  MONO: "'JetBrains Mono', 'Fira Code', monospace",

  // [절대 주의] 폰트 크기(fontSize)에는 오직 아래의 SIZE_* 토큰만 사용하세요.
  // SPACING이나 다른 토큰을 폰트 크기에 섞어서 사용하지 마세요.
  SIZE_MD: 48,
  SIZE_LG: 64,
  SIZE_XL: 80,
  SIZE_2XL: 100,
  SIZE_3XL: 140,
  SIZE_4XL: 180,

  // 폰트 굵기에는 아래 5개만 사용하세요.
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

// [절대 주의] SPACING 값들은 margin, padding, gap, 폭/높이 등 공간 및 크기에만 사용하세요.
// 폰트 크기(fontSize)에는 절대로 SPACING 토큰을 사용해서는 안 됩니다! (항상 FONTS.SIZE_* 사용)
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
  // Scaling based on 30fps
  DUR_XS: 6, 
  DUR_SM: 9,
  DUR_MD: 15,
  DUR_LG: 21,
  DUR_XL: 30,
  DUR_2XL: 45,

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
