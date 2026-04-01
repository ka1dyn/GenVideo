# [TEMPLATE] Design System

> **⚠️ 이 파일은 템플릿입니다. `design-system.md`로 저장하기 전에 아래 지시를 반드시 따르세요.**
>
> ### AI 작성 지시문
>
> 1. 이 파일을 복사하여 `public/{project_id}/design-system.md`로 저장한다.
> 2. `{FILL: ...}` 형태의 플레이스홀더를 **모두 실제 값으로 교체**한다. 하나라도 남기면 안 된다.
> 3. `## [FIXED]` 마킹된 섹션은 **절대 수정하지 않는다.** 값 그대로 복사한다.
> 4. `## [FILL]` 마킹된 섹션만 프로젝트 무드·대본·사용자 요구사항에 맞게 채운다.
> 5. 이 안내 블록(`> ⚠️ ...`)은 최종 파일에서 **삭제**한다.
> 6. 파일 제목의 `[TEMPLATE]`을 `{project_id}`로 교체한다.

---

## [FILL] 1. Brand Identity & Mood

[역할]
너는 독자들의 시선을 사로잡는 영상을 만드는 200만 유튜버야.

[카테고리]
{FILL: project 대본에 맞는 카테고리}

[디자인컨셉]
{FILL: project 대본에 맞는 디자인컨셉}

```ts
export const BRAND = {
  PROJECT_ID: "{FILL: 프로젝트 ID (예: nvidia-blackwell-launch)}",
  MOOD: "{FILL: 전체 무드 키워드 3~5개 (예: 다크 테크, 네온 엣지, 시네마틱, 압도적)}",
  CONCEPT:
    "{FILL: 한 줄 컨셉 (예: 엔비디아 블랙웰 아키텍처의 압도적 성능을 극적으로 전달)}",
  FORBIDDEN:
    "{FILL: 절대 금지 무드 (예: 귀엽고 캐주얼한 느낌, 파스텔, 느린 페이드)}",
};
```

---

## [FILL] 2. Color Palette

> 아래 모든 `{FILL: ...}` 값을 실제 HEX 또는 rgba 코드로 교체한다.
> 배경 계열은 반드시 어두운 톤을 유지한다 (밝은 배경 금지).

```ts
export const COLORS = {
  // Background Layer
  BG_VOID: "{FILL: 가장 어두운 배경 HEX (예: #030303)}",
  BG_DEEP: "{FILL: 기본 배경 HEX (예: #0a0a0a)}",
  BG_SURFACE: "{FILL: 카드/패널 배경 HEX (예: #111411)}",
  BG_ELEVATED: "{FILL: 떠있는 UI 요소 배경 HEX (예: #1a1f1a)}",
  // 더 필요한 배경색이 있다면 추가 ex)반전, 대비용 배경색 등

  // Brand Core
  PRIMARY: "{FILL: 메인 강조 앵커 HEX (예: #76B900)}",
  PRIMARY_DIM: "{FILL: PRIMARY의 15~25% 투명도 rgba (예: rgba(118,185,0,0.2))}",
  PRIMARY_GLOW:
    "{FILL: 글로우 확산용 45% 투명도 rgba (예: rgba(118,185,0,0.45))}",
  SECONDARY: "{FILL: 보조 강조 HEX (예: #A8E000)}",
  ACCENT: "{FILL: 반전 포인트 HEX — 씬당 1회만 사용 (예: #FF4444)}",
  // 더 필요한 브랜드 색상이 있다면 추가

  // Text
  TEXT_MAIN: "{FILL: 본문/헤드라인 (예: #F0F0F0)}",
  TEXT_MUTED: "{FILL: 캡션/보조 (예: #A0A8A0)}",
  TEXT_INVERSE: "{FILL: 밝은 요소 위 대비용 (예: #0a0a0a)}",
  // 더 필요한 텍스트 색상이 있다면 추가

  // Status
  POSITIVE: "{FILL: 상승/긍정 데이터 (예: #76B900)}",
  NEGATIVE: "{FILL: 하락/경고 데이터 (예: #FF4444)}",
  HIGHLIGHT: "{FILL: 형광펜 강조 (예: rgba(118,185,0,0.3))}",
  // 더 필요한 상태 색상이 있다면 추가

  // Border
  BORDER: "{FILL: 일반 구분선 rgba (예: rgba(118,185,0,0.15))}",
  BORDER_STRONG: "{FILL: 강조 구분선 rgba (예: rgba(118,185,0,0.5))}",
};
```

---

## [FILL] 3. Brand-Specific Extras (선택)

> 프로젝트 성격에 따라 자유롭게 추가한다. 필요 없으면 빈 객체(`{}`)로 남긴다.
> 예시: 경쟁사 비교 차트용 컬러, 성능 등급 컬러, 특수 텍스처 컬러 등

```ts
export const BRAND_EXTRAS = {
  // {FILL: 프로젝트에 필요한 추가 컬러 토큰. 없으면 이 줄 삭제}
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
  // 더 필요한 이펙트가 있다면 추가
};

// 노이즈 레이어: opacity 0.035, mixBlendMode 'overlay'
// 비네팅: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)
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

## [FIXED] 6. Animation & Motion System ★

> **Remotion 철칙**: CSS 애니메이션(`@keyframes`, `transition`) 사용 불가.
> 모든 모션은 반드시 `useCurrentFrame()` + `interpolate()` + `spring()`으로 구현하고 React 인라인 스타일로 주입한다.

---

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

1. **색상 통합 관리** — Phase 3단계에서 구현 전, 이 문서의 모든 색상(Constants) 블록들을 모아 `src/projects/{project_id}/colors.ts` 파일로 생성하여 통합 저장하고, 각 컴포넌트에서는 이를 `import`하여 사용한다.
2. **CSS 금지** — `@keyframes`, `transition`, `animation` 속성 일절 사용 불가.
