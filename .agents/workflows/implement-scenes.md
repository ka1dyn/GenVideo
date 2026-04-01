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

- 작성했던 모든 시퀀스를 `Series` 객체로 합성합니다.
- **Audio 컴포넌트는 섹션 루트에서 한 번만** 배치합니다.
- 단일 `Series.Sequence`의 `durationInFrames` 수치를 기획서에 명시된 기간으로 맞춰 설정합니다.
- **매우 중요**: 만약 Seq간에 묵음으로 인해 endFrame이 다음 시퀀스의 startFrame과 일치하지 않는다면, 앞 시퀀스의 durationInFrames를 늘려서 묵음 구간을 포함하도록 합니다.

##### 자막 처리 가이드

- **원본 대본 100% 준수**: Whisper 타임스탬프에서 추출된 텍스트(환각 오류 방지)는 무시하고, 필수적으로 기획서(`{section}_plan.md`)의 원본 대본을 요약/생략 없이 그대로 사용하세요.
- **렌더링 및 스타일**: `src/projects/{project_id}/components/CaptionOverlay.tsx` 공용 컴포넌트에 배열을 주입하여 렌더링하며, 강제 줄바꿈(`\n`)이 잘 반영되도록 `whiteSpace: 'pre-line'`을 적용합니다.

### 3. 필수 준수 규칙 (프로젝트 고유 제약사항)

> 💡 Remotion 기초 문법(`interpolate`, `spring`, `staticFile`, `extrapolate: 'clamp'` 등)은 반복 명시하지 않으며 `remotion-best-practices` 스킬을 따릅니다. 워크플로우 실행 시 다음의 프로젝트 핵심 원칙을 우선 준수합니다.

- **오디오 스코프 격리 (중요):** 절대 개별 시퀀스 파일(`seq{N}.tsx`) 내부에 `<Audio>` 컴포넌트를 배치하거나 렌더링하지 마세요. 오디오는 오직 최상위 `{section}.tsx` 컴포넌트에서만 단일 재생되며, 개별 시퀀스는 화면 요소만 시점에 맞게 렌더링해 오디오 드리프트를 방지합니다.
- **다채로운 레이아웃과 CSS 기법 (의무):** 뻔한 중앙 정렬(Center align)과 단순 페이드 인을 남발하는 것을 금지합니다. 매 씬마다 기획서를 바탕으로 **단순하지 않은 창의적인 구도**를 구현해야 합니다.
  - 다양한 화면 분할(Flexbox, Grid), 비대칭 배치, 대각선 구도를 적극 활용하세요.
  - 3D 효과(`perspective`), 클리핑 마스크(`clipPath`), SVG 패스 애니메이션, 엇박자 타이밍 등 **고급 CSS/Remotion 기법**을 최소 하나 이상 적용하여 역동성을 부여하세요.
- **디자인 시스템 및 색상 활용:** `design-system.md`에 명시된 기본 색상을 우선적으로 준수하되, 영상의 **전체적인 톤앤매너(무드)**를 해치지 않는 범위 내에서는 텍스트 강조, 타이포그래피 모션, 그라데이션 등을 위해 팔레트 외의 다채로운 색상을 자유롭게 활용하세요. 단조로운 색상 배합보다는 시각적 풍부함을 우선시합니다.
- **언어 및 텍스트 (현지화):**
  - 화면에 노출되는 UI 텍스트는 고유명사나 영어 약어를 제외하고 대본과 동일한 언어(예: 한국어)로 작성하세요.
  - 하단 자막(Subtitle)은 원본 대본과 100% 일치해야 합니다. 30자 이상으로 길 경우 가독성을 고려해 의미 단위로 `\n`과 `whiteSpace: 'pre-line'`을 적용해 **반드시 두 줄로 분할** 처리하세요.

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
