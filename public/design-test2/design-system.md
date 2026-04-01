# nvidia-tech-channel — Design System

---

## 1. Brand Identity & Mood

[역할]
너는 독자들의 시선을 사로잡는 영상을 만드는 200만 유튜버야.

[카테고리]
AI, 빅테크 관련 신기술이나 새로운 뉴스를 다루는 유튜브 채널

[디자인컨셉]

- 사람들이 지루할 틈 없이 개쩌는 몰입감 있고 빠른 연출
- 사람들을 끝까지 보도록 유도하기 위해 2~3초마다 시각적인 변화를 줘야해.
- 애니메이션이 화려하고 빠르되, 깔끔하고 촌스럽지 않아야해.
- 둥근 느낌보다는 샤프하고 날렵한 느낌을 내

```ts
export const BRAND = {
  PROJECT_ID: "big-tech-channel",
  MOOD: "다크 테크, 네온 엣지, 시네마틱 충격, 압도적 성능, 냉혹한 지배",
  CONCEPT:
    "관객을 압도하는 역동적인 애니메이션, 미친듯한 몰입감, 리듬감, 속도감",
  FORBIDDEN:
    "파스텔, 귀엽고 캐주얼한 느낌, 느린 페이드, 밝은 배경, 미지근한 전환",
};
```

---

## 2. Color Palette

```ts
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
```

---

## 3. Brand-Specific Extras

> NVIDIA 영상에서 자주 쓰이는 경쟁사 비교·성능 등급·GPU 제품라인 전용 컬러

```ts
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
```

---

## 4. Effects

```ts
export const EFFECTS = {
  SHADOW_SM: `0 4px 12px rgba(0,0,0,0.5)`,
  SHADOW_LG: `0 20px 40px rgba(0,0,0,0.8)`,
  GLOW_SM: `0 0 16px ${COLORS.PRIMARY_GLOW}`,
  GLOW_MD: `0 0 48px ${COLORS.PRIMARY_GLOW}`,
  GLOW_LG: `0 0 96px ${COLORS.PRIMARY_GLOW}`,
  GLOW_TEXT: `0 0 32px ${COLORS.PRIMARY_GLOW}`,
};

// 노이즈 레이어: opacity 0.035, mixBlendMode 'overlay'
// 비네팅: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)
```

---

## 5. Typography

```ts
export const FONTS = {
  DISPLAY: "'Bebas Neue', 'Pretendard Variable', sans-serif", // 임팩트 헤드라인 전용
  PRIMARY: "'Pretendard Variable', 'Pretendard', sans-serif", // 한글+영문 본문
  MONO: "'JetBrains Mono', 'Fira Code', monospace", // 숫자/데이터 수치 전용
};
```

## 8. Z-Index Layers

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

## 6. AI Directing Rules

구현 AI는 아래 규칙을 코드 생성 전에 반드시 숙지한다.

1. **색상 통합 관리** — Phase 3단계에서 구현 전, 이 문서의 모든 색상(Constants) 블록들을 모아 `src/projects/{project_id}/colors.ts` 파일로 생성하여 통합 저장하고, 각 컴포넌트에서는 이를 `import`하여 사용한다.
2. **CSS 금지** — `@keyframes`, `transition`, `animation` 속성 일절 사용 불가.
