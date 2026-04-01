# nvidia — Design System

---

## 1. Brand Identity & Mood

[역할]
너는 독자들의 시선을 사로잡는 영상을 만드는 200만 유튜버야.

[카테고리]
AI·빅테크 신기술 및 최신 이슈를 다루는 유튜브 채널. NVIDIA 관련 영상.

[디자인컨셉]

- 사람들이 지루할 틈 없이 몰입감 있고 빠른 연출 — 2~3초마다 시각적 변화 필수
- 애니메이션은 화려하고 빠르되, 깔끔하고 촌스럽지 않게
- 둥근 느낌 금지. 샤프하고 날렵한 직각·사선 중심 레이아웃
- 어두운 배경 위 네온 엣지 글로우로 "하이엔드 테크" 분위기 극대화

```ts
export const BRAND = {
  PROJECT_ID: "nvidia",
  MOOD: "다크 테크, 네온 엣지, 시네마틱, 압도적, 샤프",
  CONCEPT: "NVIDIA 기술의 압도적 성능과 미래감을 극적이고 날카롭게 전달",
  FORBIDDEN:
    "귀엽고 캐주얼한 느낌, 파스텔, 둥근 모서리, 느린 페이드, 밝은 배경, 촌스러운 그라디언트",
};
```

---

## 2. Color Palette

```ts
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
```

---

## 3. Brand-Specific Extras

```ts
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
```

---

## [FIXED] 4. Effects

```ts
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

// 노이즈 레이어: opacity 0.035, mixBlendMode 'overlay'
// 비네팅: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)
// 스캔라인(선택): repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)
```

---

## [FIXED] 5. Typography

```ts
export const FONTS = {
  DISPLAY: "'Bebas Neue', 'Pretendard Variable', sans-serif", // 임팩트 헤드라인 전용
  PRIMARY: "'Pretendard Variable', 'Pretendard', sans-serif", // 한글+영문 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 숫자/데이터 수치 전용
};
```

---

## [FIXED] 6. Animation & Motion System ★

> **Remotion 철칙**: CSS 애니메이션(`@keyframes`, `transition`) 사용 불가.
> 모든 모션은 반드시 `useCurrentFrame()` + `interpolate()` + `spring()`으로 구현하고 React 인라인 스타일로 주입한다.

## [FIXED] 7. Z-Index Layers

```ts
export const Z = {
  BG: 0,
  CONTENT: 10,
  OVERLAY: 20,
  UI: 30,
  CAPTION: 40,
  TOP: 50, // 로고, 워터마크
};
```

---

## [FIXED] 8. AI Directing Rules

구현 AI는 아래 규칙을 코드 생성 전에 반드시 숙지한다.

1. **색상 통합 관리** — Phase 3단계에서 구현 전, 이 문서의 모든 색상(Constants) 블록들을 모아 `src/projects/nvidia/colors.ts` 파일로 생성하여 통합 저장하고, 각 컴포넌트에서는 이를 `import`하여 사용한다.
2. **CSS 금지** — `@keyframes`, `transition`, `animation` 속성 일절 사용 불가.
3. **샤프니스 원칙** — `border-radius`는 최대 `2px`. 둥근 모서리 금지.
