---
name: structure
description: 프로젝트 구조
metadata:
  tags: project, structure, folder
---

# 핵심 구조

| 단위        | 역할                  | 길이    | 오디오             |
| ----------- | --------------------- | ------- | ------------------ |
| **Scene**   | 챕터 (소제목 단위)    | ~2분    | Segment WAV의 합산 |
| **Segment** | 오디오 싱크 최소 단위 | 10-20초 | 개별 WAV           |

## 영상 흐름 구조

```
Scene1 (소제목1)                       Scene2 (소제목2)
┌────────────────────────────────┐    ┌────────────────────────────────┐
│ Seg1 → Seg2 → Seg3 → ...       │ ── │ Seg1 → Seg2 → ...              │ ── ...
│   ↑ sectionTitle 표시           │    │   ↑ sectionTitle 표시           │
└────────────────────────────────┘    └────────────────────────────────┘
    내부: fade inout transition             내부: fade inout transition
                    Scene 간: cross fade transition
```

각 Scene은 `sectionTitle`을 가지며, 첫 번째 Segment에서만 SectionLabel을 표시합니다.

## Duration 계산 방식

`src/projects/{project-id}/index.tsx`의 `calculateMetadata`가 렌더 전에 실행되어:

1. 각 Segment의 WAV에서 `getAudioDuration()`으로 초 단위 길이를 가져옴
2. Scene별 total = sum(Segment durations)
3. 전체 total = sum(Scene durations) - Scene 간 트랜지션 겹침
4. `segmentDurations: number[][]`를 props으로 Composition에 전달
5. 각 Scene 컴포넌트가 `segmentDurations[i]`를 받아 내부 `Series`로 시퀀싱

# 프로젝트 구조

```
src/projects/{project-id}/
├── config.ts          ← 프로젝트 메타 (id, title, fps, 해상도)
├── script.ts          ← 대본 데이터 (Scene → Segment별 텍스트 + 오디오 경로)
├── index.tsx          ← Composition (calculateMetadata + TransitionSeries)
└── scenes/
    ├── scene1/
    │   └── Scene1.tsx  ← 내부에 Segment 렌더러 + Series (순차 실행)
    │   └── Seg1.tsx    ← Segment 1 구조 + 애니메이션 정보
    │   └── Seg2.tsx
    └── scene2/
        └── Scene2.tsx

public/projects/{project-id}/
├── audio/
│   ├── scene1/        ← Scene별 디렉토리
│   │   ├── seg1.wav   ← Segment 단위 오디오
│   │   ├── seg2.wav
│   │   └── seg3.wav
│   └── scene2/
│       ├── seg1.wav
│       └── seg2.wav
└── images/            ← Scene에서 사용할 이미지
```
