# Design System ( design-test3 )

---

## 1. Brand Identity & Mood

```ts
export const BRAND = {
  PROJECT_ID: "design-test3",

  // 영상 전체의 감성 키워드 (3~5개)
  MOOD: "dark, futuristic, intelligent, precision, high-tech",

  // 한 줄 컨셉 — 디자이너에게 브리핑하듯 작성
  CONCEPT: "데이터와 코드가 빛으로 흐르는 프리미엄 AI 개발 워크스테이션 감성",

  // 절대 사용 금지 — 구현 AI가 이 항목을 어기면 재작성
  FORBIDDEN:
    "유치한 아이콘(가위·전구·돋보기), 과한 그라데이션, 무지개 배색, 90년대 PPT 감성, 클립아트",
} as const;
```

---

## 2. Color Palette

> **Theme**: Dark
>
> - Dark: BG 계열은 Slate/Zinc/Neutral 계열 어두운 톤
> - POSITIVE / NEGATIVE / WARNING은 테마에 관계없이 고정값 사용

```ts
export const COLORS = {
  // ─────────────────────────────────────────
  // Background Layer
  // ─────────────────────────────────────────

  BG_VOID: "#050508",
  BG_BASE: "#0D0D14",
  BG_SURFACE: "#15151F",
  BG_ELEVATED: "#1E1E2C",
  BG_HOVER: "rgba(255,255,255,0.05)",

  // ─────────────────────────────────────────
  // Brand Core
  // ─────────────────────────────────────────

  PRIMARY: "#00FFCC",
  PRIMARY_DIM: "rgba(0,255,204,0.15)",
  PRIMARY_MID: "rgba(0,255,204,0.30)",
  PRIMARY_GLOW: "rgba(0,255,204,0.50)",

  SECONDARY: "#7B61FF",
  SECONDARY_DIM: "rgba(123,97,255,0.15)",

  ACCENT: "#FF4D6D",
  ACCENT_DIM: "rgba(255,77,109,0.15)",

  // ─────────────────────────────────────────
  // Text
  // ─────────────────────────────────────────

  TEXT_MAIN: "#FFFFFF",
  TEXT_BODY: "rgba(255,255,255,0.80)",
  TEXT_MUTED: "rgba(255,255,255,0.50)",
  TEXT_DISABLED: "rgba(255,255,255,0.25)",
  TEXT_INVERSE: "#0A0A0A",
  TEXT_ON_PRIMARY: "#0A0A0A",

  // ─────────────────────────────────────────
  // Border & Divider
  // ─────────────────────────────────────────

  BORDER: "rgba(255,255,255,0.08)",
  BORDER_STRONG: "rgba(255,255,255,0.18)",
  BORDER_PRIMARY: "#00FFCC",

  // ─────────────────────────────────────────
  // Status (테마 무관 고정값)
  // ─────────────────────────────────────────

  POSITIVE: "#10B981",
  POSITIVE_DIM: "rgba(16,185,129,0.15)",
  NEGATIVE: "#EF4444",
  NEGATIVE_DIM: "rgba(239,68,68,0.15)",
  WARNING: "#F59E0B",
  WARNING_DIM: "rgba(245,158,11,0.15)",
  INFO: "#3B82F6",
  INFO_DIM: "rgba(59,130,246,0.15)",

  // ─────────────────────────────────────────
  // Data Visualization
  // ─────────────────────────────────────────

  DATA_1: "#00FFCC",
  DATA_2: "#7B61FF",
  DATA_3: "#FF4D6D",
  DATA_4: "#F59E0B",
  DATA_5: "#3B82F6",
} as const;
```

---

## 3. Effects & Glassmorphism

```ts
export const EFFECTS = {
  SHADOW_SM: "0 2px 8px rgba(0,0,0,0.12)",
  SHADOW_MD: "0 4px 16px rgba(0,0,0,0.18)",
  SHADOW_LG: "0 10px 32px rgba(0,0,0,0.28)",
  SHADOW_XL: "0 20px 60px rgba(0,0,0,0.45)",

  GLOW_SM: `0 0 12px ${COLORS.PRIMARY_MID}`,
  GLOW_MD: `0 0 24px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 48px ${COLORS.PRIMARY_GLOW}, 0 0 80px ${COLORS.PRIMARY_DIM}`,
  GLOW_TEXT_SM: `0 0 16px ${COLORS.PRIMARY_MID}`,
  GLOW_TEXT_LG: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
  GLOW_SECONDARY: `0 0 24px ${COLORS.SECONDARY_DIM}`,
  GLOW_ACCENT: `0 0 24px ${COLORS.ACCENT_DIM}`,

  GLASS_BG: "rgba(255,255,255,0.04)",
  GLASS_BORDER: "rgba(255,255,255,0.10)",
  GLASS_BLUR: "blur(12px)",
  GLASS_BLUR_HEAVY: "blur(24px)",

  FADE_UP: `linear-gradient(to top, ${COLORS.BG_BASE}, transparent)`,
  FADE_DOWN: `linear-gradient(to bottom, ${COLORS.BG_BASE}, transparent)`,
  FADE_RIGHT: `linear-gradient(to right, ${COLORS.BG_BASE}, transparent)`,
  RADIAL_PRIMARY: `radial-gradient(ellipse at center, ${COLORS.PRIMARY_DIM} 0%, transparent 70%)`,
} as const;
```

---

## 4. Typography

```ts
export const FONTS = {
  DISPLAY: "'Pretendard Variable', 'Inter', sans-serif",
  PRIMARY: "'Pretendard Variable', sans-serif",
  MONO: "'JetBrains Mono', 'Fira Code', monospace",

  SIZE_XS: 12,
  SIZE_SM: 16,
  SIZE_MD: 22,
  SIZE_LG: 32,
  SIZE_XL: 48,
  SIZE_2XL: 64,
  SIZE_3XL: 88,
  SIZE_4XL: 120,

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
```

---

## 5. Spacing & Layout

```ts
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
```

---

## 6. Animation

```ts
export const ANIMATION = {
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

  STAGGER_SM: 3,
  STAGGER_MD: 5,
  STAGGER_LG: 8,

  SCALE_ENTER: 0.92,
  SCALE_EMPHASIS: 1.04,
  SCALE_EXIT: 0.96,
} as const;
```

---

## 7. Z-Index

```ts
export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50,
} as const;
```

---

## 8. 사용 원칙 (AI 구현 지시문)

1. **토큰 외 값 사용 금지** — `theme.ts`에 없는 hex, rgba, px 수치를 임의로 작성하지 않는다. 필요한 값이 없으면 가장 가까운 토큰을 사용하거나, `design-system.md` 수정을 요청한다.
2. **아이콘 사용 금지** — `BRAND.FORBIDDEN`에 명시된 요소는 어떠한 경우에도 사용하지 않는다. 단어의 의미를 일차원적으로 도식화하는 아이콘(가위=자르기, 전구=아이디어 등)은 금지.
3. **색상 의미 준수** — `POSITIVE`는 긍정 맥락에만, `NEGATIVE`는 부정 맥락에만, `ACCENT`는 최고 강조 1곳에만 사용한다. 색상을 장식 목적으로 남발하지 않는다.
4. **모션 토큰 준수** — spring config와 duration은 `ANIMATION` 섹션의 값만 사용한다. 임의의 숫자를 쓰지 않는다.
5. **Z-Index 준수** — 레이어 순서는 반드시 `Z` 객체를 참조한다. 임의의 z-index 숫자를 사용하지 않는다.
6. **자막 레이어 간섭 금지** — `Z.CAPTION(40)` 영역은 공통 자막 컴포넌트 전용이다. 기획된 비주얼 요소가 이 레이어를 침범하지 않도록 `Z.CONTENT(10)` 이하를 사용한다.
