---
description: 기획서를 바탕으로 Remotion 씬을 순차적으로 구현하는 워크플로우
---

# /implement-scenes {project_id}

각 섹션의 기획서(`{section}_plan.md`)를 바탕으로 실제 Remotion 컴포넌트를 순차 구현합니다.

## 사전 조건

- scaffold 완료
- 각 섹션의 기획서 작성 완료
- 기획서 경로: `public/{project_id}/{section}/{section}_plan.md`

## 워크플로우 단계

### 1. remotion-best-practices 스킬 읽기

이미 이전 단계에서 확인했다면 파일을 전부 읽지 않고 생략합니다. 기억이 안날 때만 재참조합니다.

```
view_file: .agents/skills/remotion-best-practices/SKILL.md
```

구현에 필요한 Remotion 관련 규칙들을 먼저 숙지합니다.
필요한 세부 규칙 파일도 읽습니다:

- `rules/animations.md` — 애니메이션 패턴
- `rules/sequencing.md` — 시퀀스 패턴
- `rules/timing.md` — 보간 및 이징
- `rules/text-animations.md` — 텍스트 애니메이션
- `rules/transitions.md` — 전환 효과
- `rules/audio.md` — 오디오 처리
- `rules/assets.md` — 에셋 임포트

### 2. 섹션 순차 구현

아래 순서로 모든 섹션을 **하나씩** 구현합니다:

```
intro → body1 → body2 → ... → outro
```

각 섹션에 대해:

#### 2-1. 기획서 읽기

```
view_file: public/{project_id}/{section}/{section}_plan.md
```

#### 2-2. 컨텍스트 확인

```
view_file: public/{project_id}/{section}/{section}_context.md
```

원본 대본과 타임스탬프 타이밍을 다시 확인합니다.

#### 2-3. 시퀀스 파일 생성

기획서의 각 시퀀스(Seq)에 대응하는 `seq{N}.tsx` 파일을 생성합니다:

```
src/projects/{project_id}/{section}/seq1.tsx
src/projects/{project_id}/{section}/seq2.tsx
...
```

**각 시퀀스 파일 구현 규칙:**

```typescript
// seq1.tsx 예시 구조
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const Seq1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 애니메이션 로직 (기획서에 따라)
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ /* design-system 스타일 적용 */ }}>
      {/* 기획서에 따른 시각 요소 */}
    </AbsoluteFill>
  );
};
```

#### 3-4. 섹션 루트 컴포넌트 업데이트

`src/projects/{project_id}/{section}/{section}.tsx`를 수정하여:

- 모든 시퀀스를 `Series`로 합성
- `Audio` 컴포넌트는 **섹션 루트에서 한 번만** 배치
- 각 `Series.Sequence`의 `durationInFrames`를 기획서 기준으로 설정

```typescript
import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { Seq1 } from './seq1';
import { Seq2 } from './seq2';
// ...

export const Intro: React.FC = () => {
  return (
    <AbsoluteFill>
      <Audio src={staticFile('{project_id}/{section}/{section}.wav')} />
      <Series>
        <Series.Sequence durationInFrames={79}>
          <Seq1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={144}>
          <Seq2 />
        </Series.Sequence>
        {/* ... */}
      </Series>
    </AbsoluteFill>
  );
};
```

### 3. 구현 시 필수 규칙

#### 에셋 참조

- 반드시 `staticFile()`으로 참조: `staticFile('{project_id}/{section}/{section}.wav')`
- 이미지 에셋도 public 폴더에 저장 후 `staticFile()` 사용

#### 타이밍

- durationInFrames 계산: `Math.ceil((endMs - startMs) / 1000 * 30)`
- `useCurrentFrame()`과 `interpolate()`로 시간 기반 애니메이션
- spring 애니메이션: `spring({ frame, fps, config: { damping: 200 } })`

#### 캡션/자막

- 타임스탬프 JSON의 **타이밍 값(startMs/endMs)**으로 표시 시점 결정
- 실제 표시 텍스트는 **원본 대본(txt 파일)** 기준
- 자막 스타일은 디자인 시스템에 따름

#### Audio

- `Audio` 컴포넌트는 **섹션 루트(section.tsx)**에서만 사용
- 개별 시퀀스(seq.tsx)에서는 Audio를 사용하지 않음
- 시퀀스는 Series로 순차 배치되므로 오디오와 자동 싱크

### 4. 린트 확인

// turbo

```bash
npm run lint
```

### 5. 프리뷰 확인

// turbo
모든 섹션 구현이 완료되면:

```bash
npm run dev
```

Remotion Studio에서 각 섹션이 올바르게 렌더링되는지 확인합니다.
