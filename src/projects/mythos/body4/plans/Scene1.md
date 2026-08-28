# Scene 1

## 데이터 (수정 금지)
- 대본: 원래 클로드의 다음 모델로 mythos가 출시될 것이라 많은 사람들이 생각했지만, (총 126f)
- 타이밍: "원래" 0f | "클로드의" 8f | "다음" 23f | "모델로" 31f | "mythos가" 42f | "출시될" 59f | "것이라" 69f | "많은" 85f | "사람들이" 92f | "생각했지만," 107f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 클로드의 차기작으로 Mythos를 기대하던 대중의 인식을 시각화합니다. 중앙에 핵심 텍스트를 배치하여 구조적이고 깔끔한 느낌을 줍니다.
레이아웃: A
이미지 활용: 없음
배경: 색상-COLORS.BG_BASE / 패턴-미세한 그리드 패턴 / 변화-없음

요소:
1. [텍스트] / [Claude] / [SIZE_LG] / [TEXT_SUB] / [등장.①페이드인 delay=8f]
2. [텍스트] / [NEXT MODEL] / [SIZE_MD] / [PRIMARY] / [등장.①페이드인 delay=23f]
3. [텍스트] / [Mythos] / [SIZE_3XL] / [TEXT_MAIN] / [등장.②스케일인 delay=42f]
4. [텍스트 강조] / [Mythos 강조] / [-] / [-] / [강조.②밑줄 delay=59f]

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_BASE, TEXT_SUB, PRIMARY, TEXT_MAIN 및 FONTS.SIZE_LG, MD, 3XL 사용 확인
- [x] 요소가 자막 영역(하단 150px) 침범 → 중앙 집중 레이아웃으로 하단 여백 충분히 확보됨 (justifyContent: 'center')
- [x] 애니메이션 최대 3개 → fadeUp(2회), scale(1회), UnderLine(1회) 사용 (컴포넌트 종류 기준 3종류)
- [x] 이전 Scene과 레이아웃 차별화 여부 → 첫 Scene이므로 해당 없음
