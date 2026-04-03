# Design System ( design-test3 )

---

## 1. Brand Identity & Mood

```ts
export const BRAND = {
  PROJECT_ID: "design-test3",

  // 영상 전체의 감성 키워드 (3~5개)
  MOOD: "Professional, Minimal, Trustworthy, Innovative, Efficient",

  // 한 줄 컨셉 — 디자이너에게 브리핑하듯 작성
  CONCEPT: "AI와 함께하는 생산성 혁신 - 깔끔하고 스마트한 웹 개발 워크플로우",

  // 절대 사용 금지 — 구현 AI가 이 항목을 어기면 재작성
  FORBIDDEN:
    "유치한 아이콘(가위·전구·돋보기), 과한 그라데이션, 무지개 배색, 90년대 PPT 감성, 클립아트",
} as const;
```

---

## 2. Color Palette

> **Theme**: Light
>
> - BG 계열은 Gray/Stone 계열 밝은 톤
> - POSITIVE / NEGATIVE / WARNING은 테마에 관계없이 고정값 사용

```ts
export const COLORS = {
  // ─────────────────────────────────────────
  // Background Layer
  // 깊이감을 주기 위해 4단계로 구분
  // ─────────────────────────────────────────

  // 가장 깊은 바닥 배경 (영상 최하단, void 영역)
  BG_VOID: "#F5F5F7",

  // 일반 장면 배경 (대부분의 scene 기본 배경)
  BG_BASE: "#FFFFFF",

  // 카드·패널·컨테이너 배경
  BG_SURFACE: "#F2F2F7",

  // 플로팅 요소·모달·툴팁 배경
  BG_ELEVATED: "#E5E5EA",

  // 호버·선택 상태 오버레이 (투명도 포함)
  BG_HOVER: "rgba(0,0,0,0.04)",

  // ─────────────────────────────────────────
  // Brand Core
  // ─────────────────────────────────────────

  // 메인 강조색 — 가장 중요한 요소에만 사용
  PRIMARY: "#0066FF",

  // PRIMARY 15% 투명도 — glow 배경, 선택 상태 fill
  PRIMARY_DIM: "rgba(0, 102, 255, 0.15)",

  // PRIMARY 30% 투명도 — 중간 강도 glow
  PRIMARY_MID: "rgba(0, 102, 255, 0.30)",

  // PRIMARY 50% 투명도 — 강한 glow, 테두리 빛번짐
  PRIMARY_GLOW: "rgba(0, 102, 255, 0.50)",

  // 보조 포인트색 — PRIMARY와 대비되는 계열
  SECONDARY: "#10B981",

  // SECONDARY 15% 투명도
  SECONDARY_DIM: "rgba(16, 185, 129, 0.15)",

  // 반전 포인트색 — 특별 강조, 경고성 하이라이트
  ACCENT: "#F43F5E",

  // ACCENT 15% 투명도
  ACCENT_DIM: "rgba(244, 63, 94, 0.15)",

  // ─────────────────────────────────────────
  // Text
  // ─────────────────────────────────────────

  // 헤드라인, 핵심 본문 — 가장 높은 대비
  TEXT_MAIN: "#1D1D1F",

  // 일반 본문, 설명 텍스트
  TEXT_BODY: "rgba(0, 0, 0, 0.8)",

  // 보조 텍스트, 캡션, 레이블
  TEXT_MUTED: "rgba(0, 0, 0, 0.5)",

  // 비활성·플레이스홀더 텍스트
  TEXT_DISABLED: "rgba(0, 0, 0, 0.25)",

  // 배경 위에 올라오는 반전 텍스트 (PRIMARY 위 → 어두운 색 / BG_BASE 위 → 밝은 색)
  TEXT_INVERSE: "#FFFFFF",

  // PRIMARY 색상 위의 텍스트
  TEXT_ON_PRIMARY: "#FFFFFF",

  // ─────────────────────────────────────────
  // Border & Divider
  // ─────────────────────────────────────────

  // 기본 구분선 (카드 테두리, 섹션 구분)
  BORDER: "rgba(0,0,0,0.08)",

  // 강조 구분선 (호버, 포커스 상태)
  BORDER_STRONG: "rgba(0,0,0,0.18)",

  // PRIMARY 색상의 테두리 (활성 선택, 하이라이트 카드)
  BORDER_PRIMARY: "#0066FF",

  // ─────────────────────────────────────────
  // Status (테마 무관 고정값)
  // ─────────────────────────────────────────

  POSITIVE: "#10B981", // 성공, 증가, 긍정
  POSITIVE_DIM: "rgba(16,185,129,0.15)",
  NEGATIVE: "#EF4444", // 실패, 감소, 경고
  NEGATIVE_DIM: "rgba(239,68,68,0.15)",
  WARNING: "#F59E0B", // 주의, 대기
  WARNING_DIM: "rgba(245,158,11,0.15)",
  INFO: "#3B82F6", // 정보, 중립
  INFO_DIM: "rgba(59,130,246,0.15)",

  // ─────────────────────────────────────────
  // Data Visualization
  // 차트·그래프·비교 시각화에 사용할 색상 시퀀스 (배경과 충분한 대비 확보 필요)
  // ─────────────────────────────────────────

  DATA_1: "#0066FF",
  DATA_2: "#8B5CF6",
  DATA_3: "#F43F5E",
  DATA_4: "#D97706",
  DATA_5: "#0EA5E9",
} as const;
```

---

## 3. Effects & Glassmorphism

> EFFECTS는 반드시 COLORS 선언 이후에 위치해야 한다.
> GLOW 계열은 PRIMARY/SECONDARY/ACCENT의 투명도 변형값을 사용한다.

```ts
export const EFFECTS = {
  // ─────────────────────────────────────────
  // Shadow
  // ─────────────────────────────────────────

  // 작은 요소 (버튼, 뱃지, 소형 카드)
  SHADOW_SM: "0 2px 8px rgba(0,0,0,0.12)",

  // 일반 카드·패널
  SHADOW_MD: "0 4px 16px rgba(0,0,0,0.18)",

  // 플로팅 요소·모달
  SHADOW_LG: "0 10px 32px rgba(0,0,0,0.28)",

  // 전체 화면 딥 그림자 (인트로·아웃트로)
  SHADOW_XL: "0 20px 60px rgba(0,0,0,0.45)",

  // ─────────────────────────────────────────
  // Glow (빛번짐 효과)
  // box-shadow 또는 filter: drop-shadow()에 사용
  // ─────────────────────────────────────────

  // 작은 강조 (아이콘, 소형 레이블)
  GLOW_SM: `0 0 12px ${COLORS.PRIMARY_MID}`,

  // 일반 강조 (카드 테두리, 버튼)
  GLOW_MD: `0 0 24px ${COLORS.PRIMARY_GLOW}`,

  // 강한 강조 (핵심 수치, 히어로 텍스트)
  GLOW_LG: `0 0 48px ${COLORS.PRIMARY_GLOW}, 0 0 80px ${COLORS.PRIMARY_DIM}`,

  // 텍스트 전용 glow (text-shadow에 사용)
  GLOW_TEXT_SM: `0 0 16px ${COLORS.PRIMARY_MID}`,
  GLOW_TEXT_LG: `0 0 32px ${COLORS.PRIMARY_GLOW}`,

  // SECONDARY 색상 glow
  GLOW_SECONDARY: `0 0 24px ${COLORS.SECONDARY_DIM}`,

  // ACCENT 색상 glow
  GLOW_ACCENT: `0 0 24px ${COLORS.ACCENT_DIM}`,

  // ─────────────────────────────────────────
  // Glassmorphism
  // backdropFilter가 지원되는 환경에서만 사용
  // ─────────────────────────────────────────

  // 유리 효과 배경
  GLASS_BG: "rgba(255,255,255,0.70)",

  // 유리 효과 테두리
  GLASS_BORDER: "rgba(255,255,255,0.60)",

  // blur 강도
  GLASS_BLUR: "blur(12px)",
  GLASS_BLUR_HEAVY: "blur(24px)",

  // ─────────────────────────────────────────
  // Gradient Overlay
  // 배경 위에 얹는 방향성 그라데이션
  // ─────────────────────────────────────────

  // 아래에서 위로 페이드 (자막 영역 배경 가림 등)
  FADE_UP: `linear-gradient(to top, ${COLORS.BG_BASE}, transparent)`,

  // 위에서 아래로 페이드
  FADE_DOWN: `linear-gradient(to bottom, ${COLORS.BG_BASE}, transparent)`,

  // 좌에서 우로 — 텍스트 진입 마스킹
  FADE_RIGHT: `linear-gradient(to right, ${COLORS.BG_BASE}, transparent)`,

  // PRIMARY 계열 방사형 — 핵심 요소 배경 강조
  RADIAL_PRIMARY: `radial-gradient(ellipse at center, ${COLORS.PRIMARY_DIM} 0%, transparent 70%)`,
} as const;
```

---

## 4. Typography

```ts
export const FONTS = {
  // ─────────────────────────────────────────
  // Font Family
  // ─────────────────────────────────────────

  DISPLAY: "'Pretendard Variable', 'Inter', sans-serif", // 볼드 헤드라인
  PRIMARY: "'Pretendard Variable', sans-serif", // 일반 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 코드·데이터·수치

  // ─────────────────────────────────────────
  // Font Size (px 단위, Remotion 기준 1080p)
  // ─────────────────────────────────────────

  SIZE_XS: 12, // 캡션, 소형 레이블
  SIZE_SM: 16, // 보조 텍스트
  SIZE_MD: 22, // 일반 본문
  SIZE_LG: 32, // 소형 헤드라인, 강조 본문
  SIZE_XL: 48, // 중형 헤드라인
  SIZE_2XL: 64, // 대형 헤드라인
  SIZE_3XL: 88, // 히어로 타이틀
  SIZE_4XL: 120, // 풀스크린 임팩트 숫자/텍스트

  // ─────────────────────────────────────────
  // Font Weight
  // ─────────────────────────────────────────

  WEIGHT_REGULAR: 400,
  WEIGHT_MEDIUM: 500,
  WEIGHT_SEMIBOLD: 600,
  WEIGHT_BOLD: 700,
  WEIGHT_EXTRABOLD: 800,

  // ─────────────────────────────────────────
  // Line Height
  // ─────────────────────────────────────────

  LEADING_TIGHT: 1.1, // 대형 헤드라인
  LEADING_SNUG: 1.3, // 중형 헤드라인
  LEADING_NORMAL: 1.6, // 본문
  LEADING_LOOSE: 1.9, // 소형 캡션

  // ─────────────────────────────────────────
  // Letter Spacing (em 단위)
  // ─────────────────────────────────────────

  TRACKING_TIGHT: -0.03, // 대형 헤드라인 (자간 좁힘)
  TRACKING_NORMAL: 0,
  TRACKING_WIDE: 0.05, // 레이블, 뱃지, 캡션 (자간 넓힘)
  TRACKING_WIDER: 0.12, // 올캡스 스타일 텍스트
} as const;
```

---

## 5. Spacing & Layout

```ts
export const SPACING = {
  // ─────────────────────────────────────────
  // Base Spacing (px, 4pt grid 기반)
  // ─────────────────────────────────────────

  PX_2: 2, // 초미세 보정 (라인 높이 등)
  PX_4: 4, // 초소형 간격 (패딩, 아이콘 여백)
  PX_8: 8, // 소형 간격 (요소 내 그룹화)
  PX_12: 12, // 중소형 간격
  PX_16: 16, // 표준 간격 (카드 내부 패딩)
  PX_24: 24, // 중형 간격 (콘텐츠 블록 간)
  PX_32: 32, // 대형 간격 (섹션 내 요소 간)
  PX_40: 40, // 대형 섹션 간격
  PX_48: 48, // 특대형 간격
  PX_64: 64, // 섹션 간 상하 여백
  PX_80: 80, // 넓은 화면 분할 간격
  PX_96: 96, // 레이아웃 주요 구분 간격
  PX_120: 120, // 인트로/아웃트로 상하 여백

  // ─────────────────────────────────────────
  // Border Radius
  // ─────────────────────────────────────────

  RADIUS_SM: 6, // 미세 곡률 (뱃지, 소형 버튼)
  RADIUS_MD: 12, // 일반 곡률 (카드, 버튼, 패널)
  RADIUS_LG: 20, // 강조 곡률 (대형 카드, 컨테이너)
  RADIUS_XL: 32, // 부드러운 전면 곡률
  RADIUS_PILL: 9999, // 완전 캡슐형 (태그, 알약 형태 버튼)

  // ─────────────────────────────────────────
  // Border Width
  // ─────────────────────────────────────────

  BORDER_THIN: 1, // 기본 실선 (구분선, 일반 테두리)
  BORDER_NORMAL: 1.5, // 강조 테두리 (카드, 활성 상태)
  BORDER_THICK: 2.5, // 헤비 텍스트/도형 외곽선
} as const;
```

---

## 6. Animation

> 구현 단계에서 임의의 spring config나 duration을 사용하지 않는다.
> 모든 모션은 이 섹션의 값을 참조한다.
> **Note: 프로젝트 설정에 따라 60fps 기준으로 보정된 값입니다.**

```ts
export const ANIMATION = {
  // ─────────────────────────────────────────
  // Duration (frame 단위, 60fps 기준)
  // ─────────────────────────────────────────

  DUR_XS: 12, // 0.2s — 마이크로 인터랙션 (호버, 토글)
  DUR_SM: 18, // 0.3s — 빠른 전환 (텍스트 변경, 팝업)
  DUR_MD: 30, // 0.5s — 일반 전환 (페이지 이동, 카드 로드)
  DUR_LG: 42, // 0.7s — 강조 진입 (히어로 섹션, 차트 드로잉)
  DUR_XL: 60, // 1.0s — 드라마틱 애니메이션 (복잡한 3D, 큰 전환)
  DUR_2XL: 90, // 1.5s — 느린 환경 연출 (배경 흐름)

  // ─────────────────────────────────────────
  // Spring Config (Remotion spring() 사용 시)
  // ─────────────────────────────────────────

  // 부드럽고 자연스러운 진입 — 일반 텍스트, 카드
  SPRING_GENTLE: { damping: 14, stiffness: 120, mass: 1 },

  // 탄력 있는 진입 — UI 컴포넌트, 아이콘
  SPRING_BOUNCY: { damping: 10, stiffness: 160, mass: 0.9 },

  // 빠르고 단단한 진입 — 수치, 데이터 강조
  SPRING_SNAPPY: { damping: 22, stiffness: 250, mass: 0.8 },

  // 느리고 무거운 진입 — 배경, 대형 요소
  SPRING_HEAVY: { damping: 18, stiffness: 80, mass: 1.2 },

  // ─────────────────────────────────────────
  // Easing (interpolate extrapolateLeft/Right에 사용)
  // cubic-bezier 형식 [x1, y1, x2, y2]
  // ─────────────────────────────────────────

  EASE_OUT: [0.0, 0.0, 0.2, 1.0] as const,
  EASE_IN: [0.4, 0.0, 1.0, 1.0] as const,
  EASE_IN_OUT: [0.4, 0.0, 0.2, 1.0] as const,
  EASE_ELASTIC: [0.0, 0.8, 0.2, 1.2] as const, // 오버슈팅 있는 탄성

  // ─────────────────────────────────────────
  // Offset (진입 시 이동 거리, px)
  // ─────────────────────────────────────────

  ENTER_Y_SM: -12, // 미세 위에서 진입
  ENTER_Y_MD: -24, // 일반 위에서 진입
  ENTER_Y_LG: -48, // 강조 위에서 진입
  ENTER_X_SM: -16, // 미세 왼쪽에서 진입
  ENTER_X_MD: -32, // 일반 왼쪽에서 진입

  // ─────────────────────────────────────────
  // Stagger (여러 요소 순차 등장 간격, frame)
  // ─────────────────────────────────────────

  STAGGER_SM: 6, // 촘촘한 순차 (리스트, 태그)
  STAGGER_MD: 10, // 일반 순차 (카드 목록)
  STAGGER_LG: 16, // 여유 있는 순차 (섹션 요소)

  // ─────────────────────────────────────────
  // Scale
  // ─────────────────────────────────────────

  SCALE_ENTER: 0.92, // 진입 시작 스케일
  SCALE_EMPHASIS: 1.04, // 강조 pulse 최대 스케일
  SCALE_EXIT: 0.96, // 퇴장 종료 스케일
} as const;
```

---

## 7. Z-Index

```ts
export const Z = {
  BG: 0, // 배경 레이어 (파티클, 그라데이션 오버레이)
  CONTENT: 10, // 본문 콘텐츠 (텍스트, 카드, 차트)
  OVERLAY: 20, // 반투명 오버레이, 모달 배경
  UI: 30, // UI 컴포넌트 (버튼, 뱃지, 네비게이션)
  CAPTION: 40, // 자막 레이어 (공통 컴포넌트)
  TOP: 50, // 최상단 (전환 효과, 플래시)
} as const;
```

---

## 8. 사용 원칙 (AI 구현 지시문)

> 이 섹션은 삭제하지 않는다. 구현 단계의 AI가 반드시 읽고 따라야 한다.

1. **토큰 외 값 사용 금지** — `theme.ts`에 없는 hex, rgba, px 수치를 임의로 작성하지 않는다. 필요한 값이 없으면 가장 가까운 토큰을 사용하거나, `design-system.md` 수정을 요청한다.

2. **아이콘 사용 금지** — `BRAND.FORBIDDEN`에 명시된 요소는 어떠한 경우에도 사용하지 않는다. 단어의 의미를 일차원적으로 도식화하는 아이콘(가위=자르기, 전구=아이디어 등)은 금지.

3. **색상 의미 준수** — `POSITIVE`는 긍정 맥락에만, `NEGATIVE`는 부정 맥락에만, `ACCENT`는 최고 강조 1곳에만 사용한다. 색상을 장식 목적으로 남발하지 않는다.

4. **모션 토큰 준수** — spring config와 duration은 `ANIMATION` 섹션의 값만 사용한다. 임의의 숫자를 쓰지 않는다.

5. **Z-Index 준수** — 레이어 순서는 반드시 `Z` 객체를 참조한다. 임의의 z-index 숫자를 사용하지 않는다.

6. **자막 레이어 간섭 금지** — `Z.CAPTION(40)` 영역은 공통 자막 컴포넌트 전용이다. 기획된 비주얼 요소가 이 레이어를 침범하지 않도록 `Z.CONTENT(10)` 이하를 사용한다.
