# Scene 7

## 데이터 (수정 금지)
- 대본: 법률 문서 처리나 복잡한 분석 같은 전문직 영역에서도 최상위 수준이라고 하고요. (총 168f)
- 타이밍: "법률" 0f | "문서" 9f | "처리나" 21f | "복잡한" 34f | "분석" 48f | "같은" 58f | "전문직" 68f | "영역에서도" 84f | "최상위" 107f | "수준이라고" 121f | "하고요." 145f
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: 다양한 전문직 분야에서의 뛰어난 성능을 목록 형식으로 보여줍니다. 깔끔한 카드 레이아웃과 순차적인 리스트 등장을 통해 신뢰감을 줍니다.
레이아웃: D
이미지 활용: 없음
배경: 색상-COLORS.BG_BASE / 패턴-그리드 패턴 / 변화-없음

요소:
1. [보조.①카드] / [전문직 영역] / [SIZE_MD] / [TEXT_SUB] / [등장.①페이드인 delay=68f]
2. [데이터.①순차목록] / [법률 문서 처리, 복잡한 분석] / [SIZE_MD] / [TEXT_MAIN] / [데이터.①순차목록 startFrame=0f, stagger=34f]
3. [텍스트] / [최상위 수준] / [SIZE_XL] / [SECONDARY_BOLD] / [등장.②스케일인 delay=107f]

## QA
- [x] 토큰 위반(하드코딩 색상/사이즈) → COLORS.BG_BASE, TEXT_SUB, TEXT_MAIN, SECONDARY_BOLD, SECONDARY_LIGHT 및 FONTS.SIZE_MD, XL 사용 확인
- [x] 요소가 자막 영역(하단 150px) 침범 → 중앙 집중 레이아웃이며, padding: SPACING.PX_120으로 하단 여백 충분히 확보됨
- [x] 애니메이션 최대 3개 → fadeDown(1회), StepList(1회), scale(1회) 사용 (컴포넌트 종류 기준 3종류)
- [x] 이전 Scene과 레이아웃 차별화 여부 → Scene 6(A: 중앙) -> Scene 7(D: 그리드/카드 배치 기반 수직 나열)로 차별화됨
