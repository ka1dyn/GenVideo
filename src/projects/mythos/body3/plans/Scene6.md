# Scene 6

## 데이터 (수정 금지)
- 대본: 이런 AI를 세상에 공개한다면 전세계의 시스템이 공격받게 될 가능성이 있는거죠. (총 184f)
- 타이밍: "이런" 0f | "AI를" 10f | "세상에" 20f | "공개한다면" 33f | "전세계의" 57f | "시스템이" 77f | "공격받게" 97f | "될" 116f | "가능성이" 121f | "있는거죠." 141f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 이번 섹션의 결론을 내리며 AI 공개가 초래할 수 있는 전 지구적인 위험을 경고합니다. 진행바를 통해 위험 수치가 최고조에 달함을 시각화합니다.
레이아웃: A
이미지 활용: 없음
배경:
    색상-[COLORS.BG_DARKEST] / 패턴-[없음] / 변화-[없음]

요소:
1. 키워드 / "AI 공개의 위험성" / SIZE_XL / TEXT_ON_DARK / 등장.①페이드인 delay=10f
2. 키워드 / "전세계 시스템 공격" / SIZE_3XL / STATE_ERROR_FG / 등장.①페이드인 delay=77f
3. 데이터.③진행바 / 위험도 1.0 / - / STATE_ERROR_FG / 데이터.③진행바 startFrame=97f duration=45f

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_DARKEST, STATE_ERROR_FG, FONTS.SIZE_XL/3XL/MD, SPACING.PX_80/40/24/16 등 모든 값에 토큰을 사용함
- [x] 요소가 자막 영역(하단 150px) 침범 → paddingBottom: 150을 설정하여 하단 안전 영역을 확보함
- [x] 애니메이션 최대 3개 → Appear(fade/scale), ProgressBar 총 2종의 애니메이션을 효과적으로 사용함
