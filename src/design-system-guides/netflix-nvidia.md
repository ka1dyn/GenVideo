# nvidia-tech-channel — Design System

---

## 1. Brand Identity & Mood

```ts
export const BRAND = {
  PROJECT_ID: "nvidia-tech-channel",
  MOOD: "다크 테크, 네온 엣지, 시네마틱 충격, 압도적 성능, 냉혹한 지배",
  CONCEPT:
    "NVIDIA의 압도적 GPU 아키텍처를 넷플릭스급 극적 연출로 — 숫자 하나하나가 관객을 강타한다",
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
```

> **헤드라인** → 반드시 `FONTS.DISPLAY` / **숫자 데이터** → 반드시 `FONTS.MONO` / **HERO** → Section당 1회이하, 오프닝·클라이맥스 외 사용 금지

---

## 6. Spacing & Safe Zone

```ts
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
```

---

## 7. Animation & Motion System ★

> **Remotion 철칙**: CSS 애니메이션(`@keyframes`, `transition`) 사용 불가.
> 모든 모션은 반드시 `useCurrentFrame()` + `interpolate()` + `spring()`으로 구현하고 React 인라인 스타일로 주입한다.

```ts
import { Easing, spring } from "remotion";

// Duration (초 단위 → 컴포넌트에서 fps 곱해 프레임으로 변환)
export const DURATIONS = {
  INSTANT: 0.08, // 깜빡임, Glitch Flash (현재 fps 기준으로 프레임 계산)
  SNAP: 0.25, // 기본 전환 단위 (현재 fps 기준으로 프레임 계산)
  FAST: 0.4, // 일반 객체 등장 (현재 fps 기준으로 프레임 계산)
  NORMAL: 0.6, // 컨텐츠 전환 (현재 fps 기준으로 프레임 계산)
  SLOW: 1.2, // 배경/무드 전환 (현재 fps 기준으로 프레임 계산)
  DRAMATIC: 2.0, // 오프닝, 클라이맥스 (현재 fps 기준으로 프레임 계산)
};

// Easing — 이 4개 외의 커브 사용 금지
export const EASINGS = {
  SNAP: Easing.bezier(0.25, 0, 0, 1), // 탁! 멈춤 — 기본값
  SPRING: Easing.bezier(0.34, 1.56, 0.64, 1), // 오버슈트 바운스 — 활기찬 등장
  DRAMATIC: Easing.bezier(0.76, 0, 0.24, 1), // 느리게 시작 → 팍! 꽂힘
  CINEMATIC: Easing.bezier(0.4, 0, 0.2, 1), // 서서히 — 배경/무드 전환 전용
};

// Spring Configs
export const SPRINGS = {
  SMOOTH: { damping: 200 }, // 바운스 없는 부드러운 전환
  SNAPPY: { damping: 20, stiffness: 200 }, // 빠릿한 UI 요소 등장
  PUNCH: { damping: 12, stiffness: 150 }, // 타격감 (Scale Punch 최적)
};

// Stagger (프레임 단위 — 연속 요소 딜레이)
export const STAGGER = {
  TIGHT: 2, // 따다닥 빠른 연속
  NORMAL: 4, // 일반 그룹 등장
  LOOSE: 8, // 강조하고 싶은 연속 등장
};
```

### 3-1-3 Rhythm Rule (필수 준수)

```
애니메이션 체류 시간:        최대 4.0초 (현재 fps 기준으로 프레임 계산)
전환 자체 시간:              최대 1.0초 (현재 fps 기준으로 프레임 계산)
전환 사이 블랙/플래시:        0 ~ 0.5초 (현재 fps 기준으로 프레임 계산)
```

### Signature Impact Patterns (매 씬 최소 1개 적용 / 동일 패턴 3씬 연속 금지)

| 패턴               | 구현 방법                                        | 권장 토큰                          |
| ------------------ | ------------------------------------------------ | ---------------------------------- |
| **Smash Cut**      | `frame >= targetFrame` 조건으로 즉각 전환        | `DURATIONS.INSTANT`                |
| **Slam In**        | 화면 밖 → 중앙으로 날아와 묵직하게 멈춤          | `interpolate` + `EASINGS.DRAMATIC` |
| **Glitch Flash**   | 1~3프레임 PRIMARY 또는 흰색 플래시               | `DURATIONS.INSTANT`                |
| **Scale Punch**    | `scale(1.08) → scale(1.0)` 타격감                | `spring` + `SPRINGS.PUNCH`         |
| **Text Stagger**   | 단어 단위 분리 후 `index * STAGGER.TIGHT` 딜레이 | `EASINGS.SNAP` + `STAGGER.TIGHT`   |
| **Counter Punch**  | 숫자 카운트업 후 최종값에서 Scale Punch          | `FONTS.MONO` + `SPRINGS.PUNCH`     |
| **Cinematic Fade** | 배경만 `CINEMATIC`, 텍스트는 `SNAP`              | `DURATIONS.SLOW`                   |

---

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

## 9. AI Directing Rules

구현 AI는 아래 규칙을 코드 생성 전에 반드시 숙지한다.

1. **하드코딩 금지 및 통합 관리** — px, ms, HEX를 컴포넌트 코드에 직접 쓰지 않는다. 구현 전, 이 문서의 모든 상수(Constants) 블록들을 모아 `src/projects/nvidia-tech-channel/theme.ts` 파일로 생성하여 통합 저장하고, 각 컴포넌트에서는 이를 `import`하여 사용한다.
2. **CSS 금지** — `@keyframes`, `transition`, `animation` 속성 일절 사용 불가.
3. **애니메이션 체류 4초 룰** — 내용이 많으면 세부 sequence를 분할한다.
4. **HERO 룰** — `TEXT_SIZE.HERO`는 Section당 1회, 단어 1~2개 한정.
5. **ACCENT 룰** — 같은 Seq에서 2번 이상 등장하면 임팩트가 사라진다.
6. **레이아웃·트랜지션 자유** — 위 토큰 안에서 구도, 배치, 시퀀스는 창의적으로 결정한다.

---

## 10. NVIDIA-Specific Directing Notes

> 이 채널 고유의 연출 지침 — NVIDIA 콘텐츠 영상 제작 시 필수 참고

- **오프닝 씬**: `BG_VOID` 위에 HERO 사이즈 숫자(성능 수치) 또는 제품명을 `Glitch Flash` + `Slam In` 조합으로 등장시킨다. 첫 3초 안에 관객을 쥔다.
- **성능 비교 차트**: Y축 상승 애니메이션은 반드시 `Counter Punch`로 마무리. 경쟁사 바(AMD/Intel)는 `COMPETITOR_*` 컬러로 명확히 구분하되 항상 NVIDIA보다 낮게 배치.
- **제품 등장 씬**: `PRIMARY_GLOW`를 GPU 실루엣 아래에 깔아 부유감을 연출. `GLOW_LG`로 씬 전체를 NVIDIA 그린으로 물들인다.
- **수치 강조**: 핵심 수치(예: "2×", "192GB", "4,000W")는 반드시 `FONTS.MONO` + `TEXT_SIZE.XXL` + `COLORS.PRIMARY`. 그 다음 프레임에 `Scale Punch`.
- **클라이맥스 전환**: `ACCENT(#FF4400)` Glitch Flash 1~2프레임 → 즉각 Smash Cut → 임팩트 수치 등장. 영상 전체에서 이 패턴은 최대 2회.
- **엔딩 카드**: `BG_DEEP` 위 채널 로고 + 다음 영상 썸네일을 `BORDER_STRONG` 카드 안에 배치. `GLOW_SM`으로 마무리.
