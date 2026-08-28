# Scene 4

## 데이터 (수정 금지)
- 대본: 이게 왜 소름 돋냐면요. AI가 안전한지 판단하는 근거가 전부 이런 테스트들이에요. (총 190f)
- 타이밍: "이게" 0f | "왜" 12f | "소름" 19f | "돋냐면요." 31f | "AI가" 57f | "안전한지" 66f | "판단하는" 87f | "근거가" 110f | "전부" 129f | "이런" 136f | "테스트들이에요." 147f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: AI 안전망의 취약성을 깨닫는 순간의 서늘함을 표현합니다. 어두운 배경에서 핵심 키워드들이 정중앙에서 순차적으로 교체되며 긴장감을 고조시킵니다.
레이아웃: C
이미지 활용: 없음
배경: 색상-BG_DARKEST / 패턴-없음 / 변화-없음

요소:
1. [강조.③흔들림] / [신뢰의 위기] / SIZE_2XL / STATE_ERROR_FG / 등장.⑤퇴장→등장 delay=19f exitAt=57f
2. [데이터.③진행바] / [안전성 판단 근거] / SIZE_MD / PRIMARY / 데이터.③진행바 delay=66f exitAt=129f
3. [보조.①카드] / [유일한 판단 도구: 테스트] / SIZE_XL / TEXT_ON_DARK / 등장.①페이드인 delay=147f

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → (COLORS.BG_DARKEST, FONTS.SIZE_2XL/XL/MD 등 토큰 활용 완료)
- [x] 요소가 자막 영역(하단 150px) 침범 → (paddingBottom: 150 및 flex/absolute 조합으로 침범 방지)
- [x] 애니메이션 최대 3개 → (Wobble, ProgressBar, Appear scale 총 3개 애니메이션 사용)
- [x] 이전 Scene과 레이아웃 차별화 여부 → (Scene 3: 레이아웃 B, Scene 4: 레이아웃 C로 차별화 완료)
