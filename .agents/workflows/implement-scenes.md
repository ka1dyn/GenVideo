---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

각 섹션의 기획서(`{section}_plan.md`)를 바탕으로 실제 Remotion 컴포넌트를 순차 구현합니다.

## 사전 조건

- scaffold 완료 상태여야 합니다.
- 각 섹션의 기획서 작성 완료 (`public/{project_id}/{section}/{section}_plan.md`)

## 워크플로우 단계

### 1. Remotion Best Practices 지식 습득

파일 열기 도구(`view_file`)를 사용해 `.agents/skills/remotion-best-practices/SKILL.md` 파일을 읽습니다.
(과거 대화 맥락에서 이미 규칙을 숙지했다면 다시 읽지 않아도 됩니다. 기억이 안날 때만 재참조하세요.)

특히 구현 전에 다음 문서 내용이 필요한 경우 적절히 읽어보세요:

- `rules/animations.md` — 애니메이션 패턴
- `rules/sequencing.md` — 시퀀스 패턴
- `rules/timing.md` — 보간 및 이징
- `rules/text-animations.md` — 텍스트 애니메이션
- `rules/transitions.md` — 전환 효과
- `rules/audio.md` — 오디오 처리
- `rules/assets.md` — 에셋 임포트

### 2. 섹션 순차 구현

디렉토리 탐색(list_dir 등)의 파일 목록을 바탕으로, 순차적으로 구현을 진행합니다.
모든 섹션을 **하나씩** 완료한 후 다음 섹션으로 이동합니다 (예: intro → body1 → outro).

각각의 독립된 `{section}`별로 다음을 수행합니다:

#### 2-1. 기획서 및 컨텍스트 확인

- 먼저 `public/{project_id}/{section}/{section}_plan.md`를 읽으세요.
- 이후 `public/{project_id}/{section}/{section}_context.md` 를 읽어 원본 대본과 타임스탬프 타이밍을 더블체크합니다.
- `public/{project_id}/design-system.md`가 존재하면 읽고, 구현 시 브랜드 규약(색상 톤, 폰트, 하단 자막 규격, 캐릭터 등)을 반영합니다.

#### 2-2. 시퀀스 파일 생성

기획서의 각 시퀀스(Seq)에 대응하는 `seq{N}.tsx` 파일을 생성합니다.
(배치 경로: `src/projects/{project_id}/{section}/seq{N}.tsx`)

**각 시퀀스 파일 구현 예시:**

```typescript
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 애니메이션 로직 (기획서에 따라 동적 구성)
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ /* design-system 등 스타일 적용 */ }}>
      {/* 기획서에 명시된 시각 요소 */}
    </AbsoluteFill>
  );
};
```

#### 2-3. 섹션 루트 컴포넌트 업데이트

최상위 섹션 루트 파일인 `src/projects/{project_id}/{section}/{section}.tsx`를 수정합니다.

- **Audio 컴포넌트는 섹션 루트에서 한 번만** 배치합니다.

##### ⚠️ 절대 좌표 배치 (Series 사용 금지)

> **`Series`를 사용하면 안 됩니다.** `Series`는 시퀀스를 빈틈없이 연이어 붙이기 때문에, 타임스탬프 사이에 묵음(Silent Gap)이 존재할 경우 뒤로 갈수록 영상이 음성보다 점점 빨라지는 **누적 싱크 드리프트**가 발생합니다.

대신, `Sequence` 컴포넌트의 `from` 속성에 **타임스탬프 기반 절대 프레임 값**을 직접 지정하여 오디오와 정밀하게 동기화하세요.

**프레임 계산 공식:**

```
fromFrame = Math.round(startMs / 1000 * fps)
durationInFrames = Math.round((endMs - startMs) / 1000 * fps)
```

**구현 예시:**

```tsx
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile("{project_id}/{section}/{section}.wav")} />

      {/* ✅ 각 시퀀스에 절대 from 값을 지정 — 타임스탬프 startMs 기반 */}
      <Sequence from={0} durationInFrames={68} name="Seq1">
        <Seq1 />
      </Sequence>
      <Sequence from={68} durationInFrames={256} name="Seq2">
        <Seq2 />
      </Sequence>
      {/* ... 이하 동일 패턴 */}

      <CaptionOverlay subtitles={subtitles} />
    </AbsoluteFill>
  );
};
```

##### 타이밍 산출 절차

1. `{section}_context.md`의 타임스탬프 테이블에서 각 시퀀스에 매핑되는 `startMs`와 `endMs`를 확인합니다.
2. 하나의 시퀀스가 여러 타임스탬프를 포함하는 경우, **첫 번째 타임스탬프의 startMs**와 **마지막 타임스탬프의 endMs**를 사용합니다.
3. 타임스탬프 사이에 묵음 Gap이 있으면(예: #6 endMs=24980, #7 startMs=26220 → 1240ms 공백), 해당 Gap 구간은 **이전 시퀀스의 durationInFrames에 포함시켜 화면이 유지**되도록 합니다. 즉, 이전 시퀀스의 실제 duration은 `다음 시퀀스의 startMs - 현재 시퀀스의 startMs`로 계산합니다.
4. **마지막 시퀀스의 durationInFrames**는 `섹션 총 프레임 수 - 마지막 시퀀스의 from`으로 계산하여 섹션 끝까지 빈틈없이 채웁니다. 이를 누락하면 섹션 전환 시 검은 화면(공백)이 발생합니다.

##### 자막 싱크

- 자막(`{section}_subtitles.ts`)의 `startFrame`/`endFrame` 값도 위와 동일하게 **타임스탬프 기반 절대 프레임 값**으로 산출합니다.
- 자막의 `startFrame`과 해당 시퀀스의 `from` 값이 반드시 일치해야 합니다.

##### 자막 처리 방식

- **[중요]** Whisper가 생성한 Timestamp JSON의 텍스트는 환각이 섞여 있어 신뢰할 수 없으므로, 기획서(`{section}_plan.md`)의 원본 대본을 기준으로 작업합니다.
  - **데이터 분리**: 개발자가 자막 시점과 텍스트를 고치기 편하도록, 각 섹션 폴더에 `{section}_subtitles.ts` 파일을 만들어 자막 배열(Subtitle[])을 하드코딩하세요. 이때 **대본을 절대로 요약하지 말고 기획서의 원본 대본을 100% 그대로** 옮겨야 합니다.
  - **공용 컴포넌트**: `src/projects/{project_id}/components/CaptionOverlay.tsx`에 자막 렌더링 로직을 분리하고, 각 섹션 루트에서는 이 컴포넌트에 배열만 주입하여 사용합니다.
  - **스타일**: 기획서의 강제 줄바꿈(`\n`)이 반영되도록 `whiteSpace: 'pre-line'`을 적용하세요.

### 3. 필수 준수 규칙 (중요)

- **에셋 참조:** 오디오/이미지 등은 반드시 `staticFile()` 함수로 래핑하여 사용하세요. (예: `staticFile('{project_id}/{section}/{section}.wav')`)
- **다채로운 레이아웃과 CSS 기법 (중요):** 뻔한 중앙 정렬(Center align)과 단순 페이드 인을 남발하지 마세요. 매 씬마다 기획서를 바탕으로 **단순하지 않은 창의적인 구도**를 구현해야 합니다.
  - 다양한 화면 분할(Flexbox, Grid), 비대칭 배치, 대각선 구도를 적극 활용하세요.
  - 3D 효과(`perspective`, `rotateX`, `rotateY`), 클리핑 마스크(`clipPath`), SVG 패스 애니메이션, 엇박자 타이밍(Staggered timing) 등 **고급 CSS/Remotion 기법**을 최소 하나 이상 적용하여 역동성을 부여하세요.
- **타이밍:** durationInFrames 계산이 필요할 경우 `Math.ceil((endMs - startMs) / 1000 * 프로젝트FPS)` 규칙을 따릅니다.
- **애니메이션:** 시간 기반 계산은 `useCurrentFrame()`과 `interpolate()`를 이용하며 튀어오르는 효과는 `spring({ frame, fps, config: { damping: 200 } })` 를 사용합니다.
- **보간(Interpolate) 안전 장치:** `interpolate()` 함수 사용 시, 예상치 못한 음수값이나 시작 전 움직임을 방지하기 위해 반드시 `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }` 옵션을 모두 부여하세요.
- **오디오 스코프:** 절대 개별 시퀀스 파일(`seq{N}.tsx`)에 `Audio`를 임포트 하지 않습니다. 오디오는 `{section}.tsx`가 단독으로 재생하며 시퀀스는 화면만 전환되게 해 자동 싱크가 맞게 합니다.
- **언어 및 텍스트 (현지화):**
  - 화면에 노출되는 UI 텍스트는 고유명사나 특정 약어를 제외하고는 대본과 같은 언어(예: 한국어)로 작성하세요.
  - 렌더링되는 자막(Subtitle)은 기획서의 원본 대본과 오차 없이 100% 일치해야 합니다. 마음대로 요약하거나 생략하지 마세요.
  - 자막이 길 경우(약 30자 이상), 가독성을 위해 의미가 자연스럽게 나뉘는 곳에서 `\n`과 `whiteSpace: 'pre-line'` 속성을 이용해 **반드시 두 줄로 분할**하세요.

### 4. 린트 (결함 점검)

// turbo

```bash
npm run lint
```

### 5. 프리뷰 시연

모든 구현 과정이 끝나고 린트가 통과되면 프리뷰를 제공합니다.

// turbo

```bash
npm run dev
```
