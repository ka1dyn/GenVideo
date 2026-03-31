---
description: 섹션별 애니메이션 기획서를 생성하는 워크플로우
---

# /plan-animations {project_id}

scaffold가 완료된 프로젝트의 각 섹션(intro, body1, body2, ..., outro)에 대해
타임스탬프와 대본을 기반으로 애니메이션 기획서를 작성합니다.

## 사전 조건

- `public/{project_id}/` 폴더의 각 섹션의 `.txt`, `.wav`, `_timestamp.json`, `_context.md` 파일 존재

## 워크플로우 단계

### 1. remotion-best-practices 스킬 읽기

```
view_file: .agents/skills/remotion-best-practices/SKILL.md
```

Remotion 관련 규칙과 패턴을 먼저 숙지합니다.

### 2. 프로젝트 구조 확인

`public/{project_id}/` 하위 디렉토리를 탐색하여 섹션 목록을 파악합니다.

```
list_dir: public/{project_id}/
```

### 3. 이미 존재하는 디자인 시스템 확인

프로젝트에 적용할 디자인 시스템(색상, 폰트, 레이아웃 등)이 있다면 확인합니다.
디자인 시스템 파일이 `public/{project_id}/design-system.md`에 있을 수 있습니다.

### 4. 각 섹션별 기획서 작성

각 섹션에 대해 순서대로 다음을 수행합니다:

#### 4-1. 컨텍스트 파일 읽기

```
view_file: public/{project_id}/{section}/{section}_context.md
```

이 파일에는 원본 대본, 타임스탬프 비교 테이블, 매핑 가이드가 포함되어 있습니다.

#### 4-2. 대본-타임스탬프 매핑

> ⚠️ **중요**: 타임스탬프의 텍스트는 Whisper AI가 생성한 것이므로 원본 대본과 다를 수 있습니다.
>
> - **원본 대본**을 기준으로 시퀀스를 나눕니다
> - 타임스탬프의 **startMs/endMs 값**만 타이밍 참조로 사용합니다
> - Whisper가 추가한 환각 텍스트(원본에 없는 "감사합니다", "MBC 뉴스..." 등)는 무시합니다
> - 여러 타임스탬프 구간이 하나의 대본 문장에 대응될 수 있습니다 → 범위를 묶으세요

#### 4-3. 시퀀스 분할

대본 문장들을 논리적 단위로 그룹핑하여 시퀀스(seq)를 나눕니다:

- 1~3개의 관련 문장을 하나의 시퀀스로 묶을 수 있음
- 묶을 수는 있지만, 영상이 지루하지 않도록 짧고 다양한 애니메이션 호흡을 사용.
- 정신없지 않은 선에서 최대한 많은 시퀀스를 생성하는 것이 좋음
- 각 시퀀스는 하나의 `seq{N}.tsx` 파일에 대응
- 시퀀스별 durationInFrames = Math.ceil((endMs - startMs) / 1000 \* 30)

#### 4-4. 기획서 작성

아래 템플릿에 따라 `public/{project_id}/{section}/{section}_plan.md`를 생성합니다:

```markdown
# {Section} 애니메이션 기획서

## 섹션 개요

- 총 길이: {duration}ms ({frames} frames @30fps)
- 원본 대본 문장 수: N
- 시퀀스 수: M

## 시퀀스 구성

### Seq 1: seq1.tsx ({startMs}ms ~ {endMs}ms, {frames} frames)

- **원본 대본**: "실제 대본 문장 (txt 파일 기준)"
- **타이밍 근거**: 타임스탬프 #1~#2 구간 (startMs ~ endMs)
- **시각 요소**: (구체적인 시각 레이아웃 설명)
  - 배경: (색상/그라데이션/패턴)
  - 메인 요소: (텍스트, 이미지, 도형 등)
  - 보조 요소: (아이콘, 장식 등)
- **애니메이션**:
  - 등장: (fade-in, slide, scale 등 + 파라미터)
  - 진행: (타이핑 효과, 순차 등장 등)
  - 퇴장: (fade-out, slide-out 등)
- **캡션**: 자막 표시 여부 및 스타일

### Seq 2: seq2.tsx ({startMs}ms ~ {endMs}ms, {frames} frames)

...

## 전환 효과

- Seq 1 → Seq 2: (fade / wipe / slide 등)
- ...

## 필요 에셋

- 이미지: (필요 시 generate_image로 생성할 목록)
- 아이콘: (필요 시)
```

### 5. 사용자 검토

모든 섹션의 기획서 작성이 완료되면, 사용자에게 검토를 요청합니다.
기획서에 대한 수정 피드백을 반영한 후 `/implement-scenes`로 넘어갑니다.
