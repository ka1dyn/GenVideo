---
description: TTS와 whisper를 통해 얻은 타임스탬프 데이터를 기반으로 section별 최종 영상 타임라인 파일을 작성합니다.
---

# /set-timeline {project_id}

영상 제작에 앞서, 원본 대본과 AI Whisper로 생성된 타임스탬프 값을 비교하여, 최종적인 영상 타임라인을 구성하는 워크플로우입니다.

## 1단계: 스크립트 실행

`scripts/generate_timeline.py` 스크립트를 실행하여 초안 타임라인을 자동 생성합니다.

```bash
python3 scripts/generate_timeline.py {project_id}
```

이 스크립트는:
- `public/{project_id}/` 하위의 모든 섹션을 자동 탐색
- 각 `{section}_context.md`의 원본 대본과 Whisper 타임스탬프를 순차 위치 기반으로 매핑
- `{section}_final_timeline.json` 파일을 생성
- `public/{project_id}/timeline_report.md` 검증 리포트를 생성

## 2단계: 검증 리포트 확인

`public/{project_id}/timeline_report.md` 리포트를 확인합니다. 리포트에는 다음 항목이 포함됩니다:

### 기본 검증 (자동 통과 필수)
- 문장 수 일치 여부
- 첫 문장 startFrame == 0
- 마지막 문장 endFrame == totalFrames
- 문장 연속성 (prev.endFrame == next.startFrame)
- 0-duration 단어 존재 여부

### ⚠️ 주의 항목 (사용자 확인 필요)

| 항목 | 설명 | 조치 |
|------|------|------|
| 보간된 단어 | Whisper 환각으로 매칭 실패, 인접 단어 기준 글자 수 비율로 시간 분배 | 리포트의 프레임 범위가 자연스러운지 확인 |
| 1:N 분할 매핑 | Whisper 1단어를 원본 여러 단어로 분배 | 분배 비율이 적절한지 확인 |
| Whisper 환각 건너뜀 | 원본에 없는 Whisper 텍스트를 무시 | 실제 환각인지 확인 |

## 3단계: 문제 있으면 수동 수정

리포트에서 ❌ 에러가 있거나, ⚠️ 항목의 프레임 범위가 부자연스러운 경우:

1. 해당 `{section}_final_timeline.json` 파일을 직접 열어 수정
2. 수정 시 아래 규칙을 반드시 준수

### 반드시 지켜야 할 규칙

> ⚠️ 타임스탬프 객체의 텍스트는 Whisper AI 음성인식 엔진이 추출하여 원문과 오차가 나거나, 심지어 환각이 존재할 확률이 높습니다!
>
> - **문장 분할의 기준은 100% "원본 대본"을 따라야 합니다.**
> - 타임스탬프에서 얻어야 할 것은 글자 정보가 아니라 오직 타이밍(startFrame / endFrame) 값 뿐입니다.
> - 모든 단어의 duration은 **최소 1프레임** 이상이어야 합니다 (0-duration 절대 금지)

- 매핑 성공 단어의 startFrame과 endFrame은 Whisper 타임스탬프 값을 100% 반영하며, 임의로 변경이 불가합니다.
- [프레임 가드] 각 문장 이후 오디오의 공백 때문에, 문장의 마지막 단어의 endFrame이 다음 문장의 시작과 다를 수 있습니다. 이 경우
  문장의 endFrame을 다음 문장의 startFrame과 동일하게 설정합니다.(이 때에도 단어의 타임스탬프는 절대 변경하지 않습니다)
- 마지막 문장의 endFrame은 섹션의 전체 '총 프레임(totalFrames)'과 일치시켜 영상 끝부분의 묵음 여백(Tail)까지 포함시켜 나타냅니다.
- 첫 sentence는 반드시 startFrame: 0으로 시작해야 합니다.

### 최종 JSON 형식

```json
{
  "totalDuration": 66320, // context 파일에 명시 (하위 호환용으로 유지)
  "totalFrames": 3980, // context 파일에 명시
  "sentences": [
    {
      "sentence": "단어를 조합한 원본과 일치하는 문장",
      "startFrame": 0, // 첫 번째 단어의 startFrame과 동일해야함. [매우매우 중요]첫 sentence는 반드시 0으로 시작해야함
      "endFrame": 174, // 다음 sentence의 startFrame과 동일해야함. (마지막 단어의 endFrame이 아닙니다)
      "durationInFrames": 174, // endFrame - startFrame
      "words": [
        {
          "text": "단어1", // 원본 대본의 단어와 100% 일치해야합니다.
          "startFrame": 0,
          "endFrame": 6
        },
        {
          "text": "단어2",
          "startFrame": 6,
          "endFrame": 12
        },
        ...
        {
          "text": "마지막 단어",
          "startFrame": 144,
          "endFrame": 166 // 다음 문장의 startFrame과 다를 수 있습니다. 임의로 변경하지 않습니다.
        }
      ]
    },
    {
      "sentence": "단어를 조합한 원본과 일치하는 문장",
      "startFrame": 174, // 이전 문장의 endFrame과 동일해야함.
      "endFrame": 352,
      "durationInFrames": 178,
      "words": [
        {
          "text": "단어1",
          "startFrame": 174,
          "endFrame": 186
        },
        ... (이하 생략)
      ]
    },
    ... (이하 생략)
  ]
}
```

## 4단계: 최종 검토

각 `public/{project_id}/{section}/{section}_final_timeline.json` 파일이 생성/수정되었다면:

1. `public/{project_id}/{section}/{section}_context.md`의 원본 대본과 비교하여 누락된 문장이나 단어가 없는지 확인
2. 전체 검증 통과 여부 재확인

**[매우중요]** 원본 대본에서 누락된 문장이나 단어가 없어야합니다. 가장 중요한 파일이기 때문에 신중하게 작업하고 원본 대본과 다시 한번 비교해서 검토하세요.
