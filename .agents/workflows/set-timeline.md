---
description: TTS와 whisper를 통해 얻은 타임스탬프 데이터를 기반으로 section별 최종 영상 타임라인 파일을 작성합니다.
---

# /set-timeline {project_id}

영상 제작에 앞서, 원본 대본과 AI Whisper로 생성된 타임스탬프 값을 비교하여, 최종적인 영상 타임라인을 구성하는 워크플로우입니다.

## 프로젝트 구조 (분석 대상) 동적 파악

디렉토리 확인 도구(`list_dir` 등)를 이용해 `public/{project_id}/` 디렉토리 하위에 실제로 존재하는 모든 하위 폴더(section) 리스트를 수집합니다. 기본적으로 intro, body, outro로 구성되어 있습니다.
(섹션 이름이 반드시 intro, body로 되어있지 않을 수 있으니 실제 탐색된 폴더들을 기반으로 처리해주세요.)

## 컨텍스트 수집

`public/{project_id}/{section}/{section}_context.md` 파일을 파싱합니다.
여기에 적힌 원본 대본 텍스트와 하단의 타임스탬프 매핑 정보를 대조하며 매우 상세하게 분석하세요.

원본 대본을 중심으로 타임스탬프 값을 대응시키는 방식으로 진행할 것입니다.

## **[가장 압도적으로 중요]** 데이터 병합 보정, 최종 타임라인 생성

최종적인 문장과 단어의 타임스탬프 데이터를 담은 `public/{project_id}/{section}/{section}_final_timeline.json` 파일을 생성합니다. 이 파일은 추후 자막과 영상을 만드는 기준이 되므로 매우 정확해야합니다.

> ⚠️ [주의] 타임스탬프 객체의 텍스트는 Whisper AI 음성인식 엔진이 추출하여 원문과 오차가 나거나, 심지어 환각(없는 말 지어내기)이 존재할 확률이 높습니다!
>
> - **문장 분할의 기준은 100% "원본 대본"을 따라야 합니다.**
> - 타임스탬프에서 얻어야 할 것은 글자 정보가 아니라 오직 타이밍(startMs / endMs) 값 뿐입니다.
> - Whisper가 마음대로 삽입한 잡음("감사합니다", "뉴스입니다", 오타 등) 구간은 시퀀스 기획에서 과감히 제외하거나 무시하세요.

**중요**

### 진행 단계

- 우선 마침표, 느낌표, 물음표를 기준으로 sentence를 나눕니다.
- 각 sentence의 길이를 분석합니다. `마지막 단어의 endMs - 첫번째 단어의 startMs`로 계산 가능합니다.
- 만약 sentence의 길이가 7초를 넘어간다면, 해당 sentence를 분할하는 것을 강력히 권장합니다. 하지만 자연스러운 호흡을 해치지 않는 선에서 분할해야합니다. 자막의 단위이므로, 읽을 때 어색하지 않도록 분할합니다.
- 분할까지 완료된 최종 sentence는 마침표, 느낌표, 물음표로 끝나지 않아도 됩니다. 기본적으로는 원본 문장 단위가 맞지만, 문장이 길면 분할할 뿐입니다.

### 반드시 지켜야 할 사항

- 단어의 startMs와 endMs는 타임스탬프 데이터 값을 100% 반영해야하며, 임의로 변경이 불가합니다.
- [프레임 가드] 각 문장 이후 오디오의 공백 때문에, 문장의 마지막 단어의 endMs가 다음 문장의 시작과 다를 수 있습니다. 이 경우
  문장의 endMs를 다음 문장의 startMs와 동일하게 설정합니다.(이 때에도 단어의 타임스탬프는 절대 변경하지 않습니다)
- 마지막 문장의 endMs는 섹션의 전체 '총 길이(totalDuration)'와 일치시켜 영상 끝부분의 묵음 여백(Tail)까지 포함시켜 나타냅니다. 즉 마지막 문장의 endMs는 totalDuration과 같아야합니다.
- 문장 분할 및 공백 메우기가 완료되었다면, 프레임을 계산해서 추가합니다. 프레임은 `startFrame`과 `durationInFrames`로 구성됩니다

⚠️ [매우 중요: FPS 동적 확인]
프레임 계산 전, 반드시 파일 읽기 도구를 사용해 src/constants/video-config.ts 파일을 읽고 VIDEO_FPS 값을 정확히 파악하세요. 임의로 FPS를 추측하지 마십시오.
프레임 계산 시 1프레임 밀림(Drift) 현상과 오차 누적을 방지하기 위해 반드시 아래의 절대 좌표 변환 공식을 따르세요:

---

startFrame = Math.round((startMs / 1000) \* VIDEO_FPS)

임시 endFrame = Math.round((endMs / 1000) \* VIDEO_FPS)

durationInFrames = 임시 endFrame - startFrame

---

최종 타임스탬프 파일은 다음 형태로 구성됩니다.

```json
{
  "totalDuration": 66320, // context 파일에 명시
  "totalFrames": 3980, // context 파일에 명시
  "sentences": [
    {
      "sentence": "단어를 조합한 원본과 일치하는 문장",
      "startMs": 0, // 첫 번째 단어의 startMs와 동일해야함.
      "endMs": 2900, // 다음 sentence의 startMs와 동일해야함. (마지막 단어의 endMs가 아닙니다)
      "startFrame": 0, // Math.round((startMs / 1000) * VIDEO_FPS)
      "durationInFrames": 174, // endFrame - startFrame
      "words": [
        {
          "text": "단어1", // 원본 대본의 단어와 100% 일치해야합니다.
          "startMs": 0, // 각 단어의 시간은 타임스탬프 데이터 값이랑 100% 일치해야하며, 임의로 변경할 수 없습니다.
          "endMs": 100
        },
        {
          "text": "단어2",
          "startMs": 100,
          "endMs": 200
        },
        ...
        {
          "text": "마지막 단어", // 원본 대본의 단어와 100% 일치해야합니다.
          "startMs": 2400,
          "endMs": 2780 // 다음 문장의 startMs와 다를 수 있습니다. 임의로 변경하지 않습니다.
        },
      ]
    },
    {
      "sentence": "단어를 조합한 원본과 일치하는 문장",
      "startMs": 2900, // 첫 번째 단어의 startMs와 동일해야함.
      "endMs": 5860,
      "startFrame": 174,
      "durationInFrames": 178,
      "words": [
        {
          "text": "단어1",
          "startMs": 2900,
          "endMs": 3100
        },
        ... (이하 생략)
      ]
    },
    ... (이하 생략)
  ]
}
```

**[매우중요]** 이 때, 원본 대본에서 누락된 문장이나 단어가 없어야합니다. 가장 중요한 파일이기 때문에 신중하게 작업하고 원본 대본과
다시 한번 비교해서 검토하세요

## 최종 검토

각 `public/{project_id}/{section}/{section}_final_timeline.json` 파일이 생성되었다면, `public/{project_id}/{section}/{section}_context.md` 파일과 비교하여 누락된 문장이나 단어가 없는지, 시간 정보가 올바른지 다시 한번 검토하세요.
