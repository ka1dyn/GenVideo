# Design System ( tech-brief )

---

## 1. Brand Identity & Mood

```ts
export const BRAND = {
  PROJECT_ID: "tech-brief",

  // 영상 전체의 감성 키워드 (3~5개)
  MOOD: "신뢰감, 속보, 프리미엄, 정밀, 금융 터미널",

  // 한 줄 컨셉 — 디자이너에게 브리핑하듯 작성
  CONCEPT:
    "Bloomberg Terminal을 모바일로 옮긴 듯한 다크 금융 테크 UI — 어두운 네이비 배경 위에 전기 블루 포인트가 빛나고, 주가 티커와 속보 레이블이 신뢰감 있게 흘러간다",

  // 절대 사용 금지 — 구현 AI가 이 항목을 어기면 재작성
  FORBIDDEN:
    "유치한 아이콘(가위·전구·돋보기), 과한 그라데이션, 무지개 배색, 90년대 PPT 감성, 클립아트",
} as const;
```

---

## 2. Color Palette

> **Theme**: `Dark`
>
> - Dark: BG 계열은 Slate/Zinc/Neutral 계열 어두운 톤
> - Light: BG 계열은 Gray/Stone 계열 밝은 톤
> - POSITIVE / NEGATIVE / WARNING은 테마에 관계없이 고정값 사용

```ts
export const COLORS = {
  // ─────────────────────────────────────────
  // Background Layer
  // 깊이감을 주기 위해 4단계로 구분
  // ─────────────────────────────────────────

  // 가장 깊은 바닥 배경 (영상 최하단, void 영역)
  // → 인트로/아웃트로 배경, 화면 전환 시 페이드 대상
  BG_VOID: "#050810",

  // 일반 장면 배경 (대부분의 scene 기본 배경)
  // → 모든 씬의 기본 캔버스. 거의 검정에 가까운 딥 네이비
  BG_BASE: "#0A0E1A",

  // 카드·패널·컨테이너 배경
  // → 뉴스 카드, 주가 패널, 기업 정보 박스에 사용
  BG_SURFACE: "#141C30",

  // 플로팅 요소·모달·툴팁 배경
  // → 티커 팝업, 단기 알림 배지, 호버 툴팁
  BG_ELEVATED: "#1C2540",

  // 호버·선택 상태 오버레이 (투명도 포함)
  // → 카드 선택 시 밝아지는 얇은 오버레이
  BG_HOVER: "rgba(56, 138, 221, 0.08)",

  // ─────────────────────────────────────────
  // Brand Core
  // ─────────────────────────────────────────

  // 메인 강조색 — 가장 중요한 요소에만 사용
  // → 핵심 수치, 활성 티커 심볼, CTA 버튼, 진행 바
  PRIMARY: "#378ADD",

  // PRIMARY 15% 투명도 — glow 배경, 선택 상태 fill
  // → 선택된 카드 배경, 활성 행 하이라이트
  PRIMARY_DIM: "rgba(55, 138, 221, 0.15)",

  // PRIMARY 30% 투명도 — 중간 강도 glow
  // → 차트 선 아래 면적 fill, 호버 시 테두리 배경
  PRIMARY_MID: "rgba(55, 138, 221, 0.30)",

  // PRIMARY 50% 투명도 — 강한 glow, 테두리 빛번짐
  // → 주요 수치 주변 빛번짐, 히어로 카드 외곽 glow
  PRIMARY_GLOW: "rgba(55, 138, 221, 0.50)",

  // 보조 포인트색 — PRIMARY와 대비되는 계열
  // → 차트 보조선, 구분 레이블, 날짜·시간 텍스트 강조
  SECONDARY: "#1D9E75",

  // SECONDARY 15% 투명도
  // → 긍정 이벤트 배경(신고가 뱃지), 상승 구간 면적 fill
  SECONDARY_DIM: "rgba(29, 158, 117, 0.15)",

  // 반전 포인트색 — 특별 강조, 경고성 하이라이트
  // → 속보 레이블, 긴급 뉴스 뱃지, 이슈 경고 텍스트
  ACCENT: "#EF9F27",

  // ACCENT 15% 투명도
  // → 속보 카드 배경 틴트, 경고 섹션 오버레이
  ACCENT_DIM: "rgba(239, 159, 39, 0.15)",

  // ─────────────────────────────────────────
  // Text
  // ─────────────────────────────────────────

  // 헤드라인, 핵심 본문 — 가장 높은 대비
  // → 뉴스 제목, 기업명, 핵심 수치
  TEXT_MAIN: "#E8EEFA",

  // 일반 본문, 설명 텍스트
  // → 뉴스 요약, 부연 설명, 일반 데이터 값
  TEXT_BODY: "#A8B4CC",

  // 보조 텍스트, 캡션, 레이블
  // → 날짜, 출처, 단위 표기, 섹션 레이블
  TEXT_MUTED: "#6B7A9F",

  // 비활성·플레이스홀더 텍스트
  // → 로딩 중 스켈레톤 텍스트, 비활성 메뉴 항목
  TEXT_DISABLED: "#3A4460",

  // 배경 위에 올라오는 반전 텍스트
  // → BG_BASE 위의 밝은 텍스트 (기본값과 같음)
  TEXT_INVERSE: "#E8EEFA",

  // PRIMARY 색상 위의 텍스트
  // → PRIMARY 배경 버튼 내 텍스트, 진한 블루 뱃지 위 글자
  TEXT_ON_PRIMARY: "#FFFFFF",

  // ─────────────────────────────────────────
  // Border & Divider
  // ─────────────────────────────────────────

  // 기본 구분선 (카드 테두리, 섹션 구분)
  // → 카드 외곽선, 테이블 행 구분선
  BORDER: "rgba(255, 255, 255, 0.08)",

  // 강조 구분선 (호버, 포커스 상태)
  // → 마우스 오버 카드, 키보드 포커스 입력란
  BORDER_STRONG: "rgba(255, 255, 255, 0.18)",

  // PRIMARY 색상의 테두리 (활성 선택, 하이라이트 카드)
  // → 선택된 뉴스 카드, 활성 종목 패널 외곽선
  BORDER_PRIMARY: "rgba(55, 138, 221, 0.55)",

  // ─────────────────────────────────────────
  // Status (테마 무관 고정값)
  // ─────────────────────────────────────────

  POSITIVE: "#1D9E75", // 성공, 증가, 긍정 → 상승 주가, 호재 뉴스 레이블
  POSITIVE_DIM: "rgba(29, 158, 117, 0.15)",
  NEGATIVE: "#E24B4A", // 실패, 감소, 경고 → 하락 주가, 악재 뉴스 레이블
  NEGATIVE_DIM: "rgba(226, 75, 74, 0.15)",
  WARNING: "#EF9F27", // 주의, 대기 → 보합, 불확실 이슈 레이블
  WARNING_DIM: "rgba(239, 159, 39, 0.15)",
  INFO: "#378ADD", // 정보, 중립 → 일반 공시, 중립 뉴스 레이블
  INFO_DIM: "rgba(55, 138, 221, 0.15)",

  // ─────────────────────────────────────────
  // Data Visualization
  // 차트·그래프·비교 시각화에 사용할 색상 시퀀스
  // 배경과 충분한 대비를 확보해야 함
  // ─────────────────────────────────────────

  DATA_1: "#378ADD", // NVIDIA 등 1번 기업 / 기본 계열
  DATA_2: "#1D9E75", // 애플 등 2번 기업 / 상승 계열
  DATA_3: "#EF9F27", // 테슬라 등 3번 기업 / 주의 계열
  DATA_4: "#D4537E", // 삼성 등 4번 기업 / 보조 핑크 계열
  DATA_5: "#AFA9EC", // 기타 기업 / 퍼플 계열
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
  // → BG_VOID(#050810) 기반 네이비 그림자 — 순수 검정보다 배경과 자연스럽게 융화됨
  SHADOW_SM: "0 2px 8px rgba(5, 8, 16, 0.60)",

  // 일반 카드·패널
  SHADOW_MD: "0 4px 16px rgba(5, 8, 16, 0.75)",

  // 플로팅 요소·모달
  SHADOW_LG: "0 10px 32px rgba(5, 8, 16, 0.85)",

  // 전체 화면 딥 그림자 (인트로·아웃트로)
  SHADOW_XL: "0 20px 60px rgba(5, 8, 16, 0.95)",

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
  // → 상승 수치 강조, 긍정 이벤트 하이라이트
  // → PRIMARY_GLOW(50%)와 동일 강도 — 다크 배경에서 충분히 빛나야 함
  GLOW_SECONDARY: "0 0 24px rgba(29, 158, 117, 0.50)",

  // ACCENT 색상 glow
  // → 속보 레이블, 긴급 이슈 카드 외곽 빛번짐
  // → PRIMARY_GLOW(50%)와 동일 강도 — 다크 배경에서 충분히 빛나야 함
  GLOW_ACCENT: "0 0 24px rgba(239, 159, 39, 0.50)",

  // ─────────────────────────────────────────
  // Glassmorphism
  // backdropFilter가 지원되는 환경에서만 사용
  // ─────────────────────────────────────────

  // 유리 효과 배경 (Dark 기준)
  // → 티커 오버레이, 반투명 뉴스 카드, 플로팅 패널
  GLASS_BG: "rgba(20, 28, 48, 0.75)",

  // 유리 효과 테두리
  // → 글라스 카드 외곽선, 반투명 컨테이너 테두리
  GLASS_BORDER: "rgba(55, 138, 221, 0.20)",

  // blur 강도
  GLASS_BLUR: "blur(12px)",
  GLASS_BLUR_HEAVY: "blur(24px)",

  // 유리 카드 완성형 (shorthand — 개별 속성 적용 시 위 항목 사용)
  // backdropFilter: EFFECTS.GLASS_BLUR
  // background: EFFECTS.GLASS_BG
  // border: `1px solid ${EFFECTS.GLASS_BORDER}`

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
  // → 히어로 섹션 뒤 은은한 블루 후광, 핵심 수치 강조 배경
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

  SIZE_XS: 18, // 캡션, 소형 레이블
  SIZE_SM: 24, // 보조 텍스트
  SIZE_MD: 32, // 일반 본문
  SIZE_LG: 48, // 소형 헤드라인, 강조 본문
  SIZE_XL: 64, // 중형 헤드라인
  SIZE_2XL: 80, // 대형 헤드라인
  SIZE_3XL: 100, // 히어로 타이틀
  SIZE_4XL: 140, // 풀스크린 임팩트 숫자/텍스트

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

  // ─────────────────────────────────────────
  // Border Radius
  // ─────────────────────────────────────────

  RADIUS_SM: 6,
  RADIUS_MD: 12,
  RADIUS_LG: 20,
  RADIUS_XL: 32,
  RADIUS_PILL: 9999,

  // ─────────────────────────────────────────
  // Border Width
  // ─────────────────────────────────────────

  BORDER_THIN: 1,
  BORDER_NORMAL: 1.5,
  BORDER_THICK: 2.5,
} as const;
```

---

## 6. Animation

> 구현 단계에서 임의의 spring config나 duration을 사용하지 않는다.
> 모든 모션은 이 섹션의 값을 참조한다.

```ts
export const ANIMATION = {
  // ─────────────────────────────────────────
  // Duration (frame 단위, 60fps 기준)
  // ─────────────────────────────────────────

  DUR_XS: 12, // 0.2s — 마이크로 인터랙션
  DUR_SM: 18, // 0.3s — 빠른 전환
  DUR_MD: 30, // 0.5s — 일반 전환
  DUR_LG: 42, // 0.7s — 강조 진입
  DUR_XL: 60, // 1.0s — 히어로 애니메이션
  DUR_2XL: 90, // 1.5s — 느린 드라마틱 전환

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
