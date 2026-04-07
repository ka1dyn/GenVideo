import React from "react";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 자, 그런데 여기서 솔직한 얘기 하나 하고 넘어갈게요.
 * 단어 등장 타이밍: "자,": 0f, "그런데": 22f, "여기서": 36f, "솔직한": 53f, "얘기": 75f, "하나": 91f, "하고": 105f, "넘어갈게요.": 120f
 * 비주얼 컨셉: BG_BASE 배경. 화면 상단에 "BUT..." 레이블이 TEXT_MUTED TRACKING_WIDER로 fade-in. 중앙에 수평선 한 줄(BORDER 색)이 left→right로 draw되며 "전환점"을 시각화. "솔직한 얘기" 단어부터 수평선에 WARNING 색 dot이 등장하며 주의 환기.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 메이븐이 엄청 대단해 보이죠?
 * 단어 등장 타이밍: "메이븐이": 170f, "엄청": 222f, "대단해": 231f, "보이죠?": 262f
 * 비주얼 컨셉: 중앙에 "PROJECT MAVEN" 텍스트가 PRIMARY GLOW_MD 효과로 등장. 아래에 별점 형태 대신 수직 프로그레스 바 3개(속도/정확도/범위)가 높게 채워진 상태로 stagger 등장. 인상적인 시스템 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 근데 허점도 있습니다.
 * 단어 등장 타이밍: "근데": 306f, "허점도": 337f, "있습니다.": 358f
 * 비주얼 컨셉: 프로그레스 바 중 "정확도" 막대에 빨간 crack 선이 생기며 내부 값이 낮아짐. "허점도" 단어에서 NEGATIVE 색 [FLAW DETECTED] 레이블이 우측에 fade-in. 균열 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 중동 사막 환경에서 실험했을 때예요.
 * 단어 등장 타이밍: "중동": 412f, "사막": 459f, "환경에서": 491f, "실험했을": 526f, "때예요.": 568f
 * 비주얼 컨셉: 화면 상단에 지역 레이블 "MIDDLE EAST · DESERT ENV." 가 TEXT_MUTED TRACKING_WIDE로 등장. 배경에 BG_ELEVATED 색의 거친 수평 줄무늬 패턴(사막 모래 추상). "실험했을" 단어에 "TEST CONDITIONS" 배지 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 사람은 84% 확률로 맞는 판단을 했는데, 메이븐은요?
 * 단어 등장 타이밍: "사람은": 568f, "84%": 611f, "확률로": 628f, "맞는": 661f, "판단을": 684f, "했는데,": 718f, "메이븐은요?": 755f
 * 비주얼 컨셉: 좌우 비교 UI. 좌: [HUMAN] 가로 프로그레스 바 84% 채워짐(SECONDARY 색). 우: [MAVEN] 텍스트 레이블만 있고 프로그레스 바 비어있는 상태 + "?" pulse 애니메이션. "84%" 숫자 등장 시 좌측 바 최종값 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 60% 였어요.
 * 단어 등장 타이밍: "60%": 825f, "였어요.": 854f
 * 비주얼 컨셉: 우측 [MAVEN] 프로그레스 바가 60%까지만 채워지며 정지(NEGATIVE 색). 84% 기준선과의 갭이 시각적으로 명확하게 대비. 갭 영역에 NEGATIVE_DIM 오버레이. 수치 임팩트.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 왜냐면 AI가 트럭이랑 나무를, 계곡이랑 장갑차를 혼동했거든요.
 * 단어 등장 타이밍: "왜냐면": 905f, "AI가": 947f, "트럭이랑": 967f, "나무를,": 1019f, "계곡이랑": 1067f, "장갑차를": 1099f, "혼동했거든요.": 1133f
 * 비주얼 컨셉: 화면을 2행 구조로: 상행 [A] vs [B] 쌍 / 하행 [C] vs [D] 쌍. "트럭이랑 나무" 단어에 상행 두 레이블 텍스트 박스 등장, 사이에 "≈ ?" 혼동 기호. "계곡이랑 장갑차" 단어에 하행 두 박스 등장. "혼동했거든요." 단어에 각 쌍 사이에 NEGATIVE 색 "≈" 등호 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 사람 눈엔 당연히 다른데, AI한테는 "비슷하게 생긴 물체"인 거예요.
 * 단어 등장 타이밍: "사람": 1189f, "눈엔": 1211f, "당연히": 1241f, "다른데,": 1274f, "AI한테는": 1314f, "\"비슷하게": 1349f, "생긴": 1387f, "물체\"인": 1406f, "거예요.": 1435f
 * 비주얼 컨셉: 화면 좌우 분할: 좌 [HUMAN PERCEPTION] 영역에서 두 물체 박스 → "≠" 기호 (명확한 구분). 우 [AI PERCEPTION] 영역에서 같은 두 물체 박스 → "≈" 기호 (유사 인식). "다른데," 단어에 좌측 ≠ PRIMARY 색 강조, "비슷하게" 단어에 우측 ≈ WARNING 색 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 군 관계자도 인정했어요.
 * 단어 등장 타이밍: "군": 1476f, "관계자도": 1486f, "인정했어요.": 1530f
 * 비주얼 컨셉: 인용 패널 등장 준비. 상단 레이블 "U.S. MILITARY OFFICIAL — Acknowledged". 패널 내부 cursor blink 대기. 공식 인정 출처 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 메이븐의 장점은 어디까지나 속도다.
 * 단어 등장 타이밍: "\"메이븐의": 1600f, "장점은": 1633f, "어디까지나": 1658f, "속도다.": 1699f
 * 비주얼 컨셉: 인용 패널 내부에 타이핑 등장. "속도다." 단어에서 "SPEED" 단어가 PRIMARY 색 강조. 오른쪽에 프로그레스 바 "속도" 부분만 PRIMARY 색 100% 채워진 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 전술적 판단 수준엔 아직 못 미친다.
 * 단어 등장 타이밍: "전술적": 1764f, "판단": 1804f, "수준엔": 1815f, "아직": 1846f, "못": 1866f, "미친다.\"": 1876f
 * 비주얼 컨셉: 인용 패널 하단에 두 번째 문장 타이핑. "TACTICAL JUDGMENT" 항목은 프로그레스 바가 60%에서 멈춘 상태(NEGATIVE 색)와 경계선 표시. "못" 단어에서 해당 바에 X 마킹.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 그러니까 이번 이란 공격에서 AI가 1,000개 표적을 추려냈다고 해도
 * 단어 등장 타이밍: "그러니까": 1918f, "이번": 1970f, "이란": 2006f, "공격에서": 2052f, "AI가": 2064f, "1,000개": 2102f, "표적을": 2123f, "추려냈다고": 2160f, "해도,": 2182f
 * 비주얼 컨셉: 화면 중앙에 "1,000" 숫자(이전 body3에서 등장한 임팩트 수치)가 재등장. 그런데 이번에는 WARNING 색으로, 그 위에 반투명 "?" 오버레이. "해도," 단어에서 숫자 주변에 점선 테두리 등장하며 불확실성 암시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 그게 전부 정확했다는 보장은 없는 거예요.
 * 단어 등장 타이밍: "그게": 2182f, "전부": 2195f, "정확했다는": 2218f, "보장은": 2259f, "없는": 2284f, "거예요.": 2301f
 * 비주얼 컨셉: 1,000 숫자 옆에 "× 60%" 곱셈이 등장하며 실제 정확 타격 = "600?" 으로 변환. NEGATIVE 색. 갭 400개는 WARNING_DIM 영역으로 시각화(오차 구간 표시).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 실제로 공습 과정에서 민간인 피해가 발생했다는 보도도 있었고요.
 * 단어 등장 타이밍: "실제로": 2340f, "공습": 2376f, "과정에서": 2389f, "민간인": 2425f, "피해가": 2450f, "발생했다는": 2477f, "보도도": 2523f, "있었고요.": 2550f
 * 비주얼 컨셉: 화면 중앙에 NEGATIVE_DIM 배경 패널. 상단 레이블 "CIVILIAN CASUALTIES REPORTED". "민간인" 단어 등장 시 패널 테두리가 NEGATIVE 색으로 강조 pulse. 하단 소형 TEXT_DISABLED SOURCE 레이블. 감정적 충격을 최소한의 UI 언어로 전달.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: AI의 판단이 완벽하지 않다는 게 전쟁터에서는 전혀 다른 무게를 가지는 겁니다.
 * 단어 등장 타이밍: "AI의": 2604f, "판단이": 2624f, "완벽하지": 2660f, "않다는": 2708f, "게": 2745f, "전쟁터에서는": 2761f, "전혀": 2808f, "다른": 2824f, "무게를": 2839f, "가지는": 2863f, "겁니다.": 2886f
 * 비주얼 컨셉: 화면 좌측에 [AI ERROR] WARNING 박스 / 우측에 [CONSEQUENCE] NEGATIVE 박스. 두 박스 사이에 "×" 곱하기 기호 대신 "→" 화살표(완전한 인과관계). "전쟁터에서는" 단어에 우측 CONSEQUENCE 박스가 더 크게 확대. 오류의 무게감 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 그리고 또 하나 더 있어요.
 * 단어 등장 타이밍: "그리고": 2918f, "또": 2955f, "하나": 2958f, "더": 2977f, "있어요.": 2983f
 * 비주얼 컨셉: 화면 중앙에 "+" 기호가 PRIMARY 색 SIZE_3XL로 pulse 등장 후 사라짐. 그 자리에 "THREAT #2" 레이블 TEXT_MUTED SIZE_SM 등장. 다음 위협 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 메이븐 같은 AI 시스템은 학습 데이터에 의존해요.
 * 단어 등장 타이밍: "메이븐": 3022f, "같은": 3076f, "AI": 3078f, "시스템은": 3083f, "학습": 3126f, "데이터에": 3148f, "의존해요.": 3191f
 * 비주얼 컨셉: 파이프라인 다이어그램: [TRAINING DATA] → [AI MODEL] → [OUTPUT]. 화살표는 데이터 흐름(PRIMARY 색 점선 이동 애니메이션). "학습 데이터에" 단어에 [TRAINING DATA] 노드 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 근데 만약 적대국이 그 학습 데이터에 슬쩍 오류를 심어놓으면 어떻게 될까요?
 * 단어 등장 타이밍: "근데": 3246f, "만약": 3288f, "적대국이": 3290f, "그": 3334f, "학습": 3344f, "데이터에": 3366f, "슬쩍": 3415f, "오류를": 3428f, "심어놓으면": 3477f, "될까요?": 3499f
 * 비주얼 컨셉: [TRAINING DATA] 노드 내부에 "ADVERSARY" 레이블의 외부 화살표가 은밀하게(점선, 두께 얇음) 침투하는 모습. "슬쩍" 단어에서 침투 화살표가 WARNING 색으로 변경. 데이터 내부에 "ERROR" 박스 하나가 삽입됨. 사이버 공격의 추상적 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: AI가 잘못된 표적을 "확률 98%"라고 추천할 수 있어요.
 * 단어 등장 타이밍: "AI가": 3528f, "잘못된": 3573f, "표적을": 3601f, "\"확률": 3652f, "98%\"라고": 3670f, "추천할": 3709f, "수": 3740f, "있어요.": 3745f
 * 비주얼 컨셉: AI 보고서 패널 재등장. 내용: [CLASSIFICATION: CIVILIAN AREA → 잘못된 분류] + [CONFIDENCE: 98%] 수치는 PRIMARY GLOW 발광이지만 테두리는 WARNING 색 크랙 효과. "98%" 단어에서 수치 강조, 하단에 [INCORRECT] 오버레이. 자신감 있는 오류의 아이러니.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 미 국방부도 이 가능성을 공개적으로 우려하고 있고, 특히 중국이 이 방향으로 연구하고 있다고 해요.
 * 단어 등장 타이밍: "미": 3784f, "국방부도": 3793f, "이": 3831f, "가능성을": 3841f, "공개적으로": 3879f, "우려하고": 3927f, "있고,": 3965f, "특히": 3989f, "중국이": 4020f, "이": 4031f, "방향으로": 4039f, "연구하고": 4073f, "있다고": 4106f, "해요.": 4133f
 * 비주얼 컨셉: 좌측 [DOD CONCERN] WARNING 배지 → 우측 [CHINA RESEARCH] NEGATIVE 배지. 두 배지 사이에 "→ RACE" 화살표. "중국이" 단어 등장 시 우측 배지 pulse 강조. 글로벌 AI 경쟁 구도 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: AI를 무력화하는 게 아니라, AI를 틀리게 만드는 거예요.
 * 단어 등장 타이밍: "AI를": 4158f, "무력화하는": 4177f, "게": 4235f, "아니라,": 4248f, "AI를": 4284f, "틀리게": 4306f, "만드는": 4328f, "거예요.": 4356f
 * 비주얼 컨셉: 화면 좌측 [무력화 (OFF)] 방법에 X 표시. 우측 [틀리게 만들기 (CORRUPT)] 방법에 CHECK. 두 접근법 사이에 "vs" 기호. "틀리게" 단어에서 우측 [CORRUPT] 박스가 WARNING 색 강조 pulse. 새로운 개념 제시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 이게 새로운 형태의 전쟁입니다.
 * 단어 등장 타이밍: "이게": 4397f, "새로운": 4425f, "형태의": 4441f, "전쟁입니다.": 4460f
 * 비주얼 컨셉: 화면 중앙에 "NEW WAR TYPE" TEXT_MAIN SIZE_XL WEIGHT_EXTRABOLD fade-in. 아래에 수평선 PRIMARY 색 2px draw. 배경 brief flash (BG_ELEVATED 순간 밝아짐). 전쟁 패러다임 전환 선언.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: 여기서 더 무서운 사실이 있습니다.
 * 단어 등장 타이밍: "여기서": 4511f, "더": 4544f, "무서운": 4549f, "사실이": 4572f, "있습니다.": 4595f
 * 비주얼 컨셉: 배경이 BG_VOID로 서서히 전환되며 어두워짐. "무서운" 단어에 NEGATIVE_DIM 배경 오버레이. 중앙에 "CRITICAL FINDING" 레이블이 TRACKING_WIDER TEXT_MUTED로 등장. 강렬한 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: 올해 2월에 연구 결과 하나가 나왔어요.
 * 단어 등장 타이밍: "올해": 4638f, "2월에": 4655f, "연구": 4680f, "결과": 4697f, "하나가": 4714f, "나왔어요.": 4739f
 * 비주얼 컨셉: 날짜 레이블 "2025.02" TEXT_MUTED 등장. 그 아래 "RESEARCH PUBLISHED" 타임라인 노드. 다음 씬 연구 기관 공개 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 영국 킹스칼리지 런던에서요.
 * 단어 등장 타이밍: "영국": 4783f, "킹스칼리지": 4808f, "런던에서요.": 4850f
 * 비주얼 컨셉: 학술 기관 카드 등장: [King's College London] SECONDARY 테두리, 내부 "UK · Academic Research" 레이블. GLASS_BG 배경. 신뢰성 있는 출처 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: GPT, 클로드, 제미나이.
 * 단어 등장 타이밍: "GPT,": 4908f, "클로드,": 4934f, "제미나이.": 4979f
 * 비주얼 컨셉: 세 AI 레이블 박스가 STAGGER_SM 간격으로 순차 등장: [GPT] [Claude] [Gemini]. 각 박스 PRIMARY_DIM 배경, TEXT_MAIN 텍스트. 수평 정렬. 친숙한 AI 브랜드들의 나열.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 이 세 AI한테 전쟁 시뮬레이션을 시킨 거예요.
 * 단어 등장 타이밍: "이": 5036f, "세": 5054f, "AI한테": 5059f, "전쟁": 5078f, "시뮬레이션을": 5095f, "시킨": 5146f, "거예요.": 5165f
 * 비주얼 컨셉: 세 AI 박스 주변으로 NEGATIVE_DIM 오버레이가 서서히 등장. "전쟁" 단어에서 세 박스 테두리가 NEGATIVE 색으로 전환. "시뮬레이션을" 단어에서 [WAR GAME] 레이블이 배경에 대형 TEXT_DISABLED 색으로 등장. 충격적 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 가상의 국가 지도자 역할을 맡기고, 영토 분쟁이나 자원 경쟁 같은 시나리오를 줬어요.
 * 단어 등장 타이밍: "가상의": 5204f, "국가": 5239f, "지도자": 5249f, "역할을": 5276f, "맡기고,": 5303f, "영토": 5324f, "분쟁이나": 5350f, "자원": 5375f, "경쟁": 5401f, "같은": 5417f, "시나리오를": 5434f, "줬어요.": 5451f
 * 비주얼 컨셉: 시뮬레이션 환경 UI: 상단 "SIMULATION MODE" 레이블 GLASS_BG. 내부: [ROLE: 국가 지도자] 입력 필드. 아래 시나리오 태그 [영토 분쟁] [자원 경쟁] STAGGER 등장. AI에게 국가 권력을 시뮬레이션 맡기는 장면의 긴장감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene28: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 29 기획안]
 * 원본 텍스트: 결과가 어땠냐면요.
 * 단어 등장 타이밍: "결과가": 5532f, "어땠냐면요.": 5561f
 * 비주얼 컨셉: 시뮬레이션 화면이 "CALCULATING..." 로딩 상태. 결과 대기 화면. "결과가" 단어에 로딩 스피너 대신 수평 점선이 이동. 긴장감 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene29: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 30 기획안]
 * 원본 텍스트: 21번 중 20번.
 * 단어 등장 타이밍: "21번": 5623f, "중": 5653f, "20번.": 5662f
 * 비주얼 컨셉: 화면 중앙에 "20/21" 분수 형태로 SIZE_3XL WEIGHT_EXTRABOLD NEGATIVE 색 가운데 정렬 등장. 분모 21은 TEXT_MUTED, 분자 20은 NEGATIVE 색 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene30: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 31 기획안]
 * 원본 텍스트: 95%에서 핵무기를 선택했습니다.
 * 단어 등장 타이밍: "95%에서": 5699f, "핵무기를": 5741f, "선택했습니다.": 5780f
 * 비주얼 컨셉: "20/21" 변환 → "95%" 숫자로 전환(counter up). NEGATIVE GLOW_LG 효과, 화면 절반 이상을 차지하는 임팩트. "핵무기를" 단어에서 배경이 NEGATIVE_DIM으로 전체 플래시. 역대 최강 충격 비주얼.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene31: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 32 기획안]
 * 원본 텍스트: 협상도 아니고, 외교도 아니고, 핵 버튼이에요.
 * 단어 등장 타이밍: "협상도": 5852f, "아니고,": 5889f, "외교도": 5903f, "아니고,": 5929f, "핵": 5954f, "버튼이에요.": 6019f
 * 비주얼 컨셉: 세 옵션 목록 순차 등장: [협상 →  X] [외교  → X] [핵  → ✓]. 각 항목 단어 등장에 맞춰 stagger. 앞 두 옵션은 TEXT_DISABLED 취소선, 핵 옵션은 NEGATIVE 색 강조. 차갑고 단순한 AI의 의사결정 프로세스 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene32: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 33 기획안]
 * 원본 텍스트: 연구팀이 이렇게 말했어요.
 * 단어 등장 타이밍: "연구팀이": 6019f, "이렇게": 6055f, "말했어요.": 6082f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장 준비. 상단 레이블 "King's College London Research Team". 내부 cursor blink 대기. 권위 있는 출처 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene33: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 34 기획안]
 * 원본 텍스트: "핵무기에 대한 금기는 인간 사회에서만큼 AI에겐 작동하지 않는다."
 * 단어 등장 타이밍: "\"핵무기에": 6128f, "대한": 6164f, "금기는": 6182f, "인간": 6209f, "사회에서만큼": 6227f, "AI에겐": 6281f, "작동하지": 6305f, "않는다.\"": 6343f
 * 비주얼 컨셉: 인용문 패널 내부 타이핑 등장. "금기는" 단어에서 SECONDARY 색(인간 사회의 금기). "AI에겐" 단어에서 색상이 NEGATIVE로 전환. "작동하지 않는다." 단어에서 텍스트 전체가 NEGATIVE GLOW_TEXT_SM 효과. 인간-AI의 윤리 차이를 색으로 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene34: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 35 기획안]
 * 원본 텍스트: 왜일까요.
 * 단어 등장 타이밍: "왜일까요.": 6382f
 * 비주얼 컨셉: 화면 클리어. 중앙에 "왜일까요." TEXT_BODY SIZE_XL 홀로 fade-in. 의도적 여백, 감상 유도.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene35: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 36 기획안]
 * 원본 텍스트: AI는 두렵지 않으니까요.
 * 단어 등장 타이밍: "AI는": 6432f, "두렵지": 6461f, "않으니까요.": 6479f
 * 비주얼 컨셉: "왜일까요." 가 페이드아웃 후 중앙에 "AI는 두렵지 않으니까요." TEXT_MAIN SIZE_XL WEIGHT_BOLD 등장. "두렵지 않으니까요." 부분에 WARNING 색 강조 밑줄 1px.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene36: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 37 기획안]
 * 원본 텍스트: 사람은 핵전쟁이 어떤 건지 역사로, 감정으로, 몸으로 알아요.
 * 단어 등장 타이밍: "사람은": 6542f, "핵전쟁이": 6571f, "어떤": 6603f, "건지": 6619f, "역사로,": 6635f, "감정으로,": 6666f, "몸으로": 6706f, "알아요.": 6731f
 * 비주얼 컨셉: 수직 정렬 세 항목 [역사] [감정] [몸] STAGGER_MD 순서로 왼→오른 slide-in. 각 항목 앞에 SECONDARY 색 dot(인간 속성 표현). "알아요." 단어에 세 항목 전체 약해지는 fade(인간의 한계 암시).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene37: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 38 기획안]
 * 원본 텍스트: 근데 AI한테는 그냥 "목표 달성에 가장 효율적인 옵션"인 거거든요.
 * 단어 등장 타이밍: "근데": 6776f, "AI한테는": 6803f, "그냥": 6832f, "\"목표": 6852f, "달성에": 6876f, "가장": 6907f, "효율적인": 6920f, "옵션\"인": 6959f, "거거든요.": 6988f
 * 비주얼 컨셉: 좌측 인간 항목들이 사라지고 우측에 AI 관점 UI 등장. 단순한 수치 비교: [OPTION A: 외교 — 효율 32%] [OPTION B: 핵 — 효율 98%]. "효율적인" 단어에서 OPTION B가 PRIMARY 색으로 선택됨. 감정 없는 최적화 알고리즘의 냉정함 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene38: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 39 기획안]
 * 원본 텍스트: 도덕적 고뇌 없이, 망설임 없이, 그냥 최적화의 결과로 핵을 선택하는 겁니다.
 * 단어 등장 타이밍: "도덕적": 7043f, "고뇌": 7071f, "없이,": 7090f, "망설임": 7139f, "없이,": 7175f, "그냥": 7213f, "최적화의": 7223f, "결과로": 7258f, "핵을": 7278f, "선택하는": 7302f, "겁니다.": 7321f
 * 비주얼 컨셉: 배경 전체 BG_VOID로 전환. 중앙에 [NUCLEAR: SELECTED] 텍스트 박스가 NEGATIVE 색 테두리, NEGATIVE_DIM 배경으로 등장. "도덕적 고뇌 없이" "망설임 없이" 텍스트가 TEXT_DISABLED 색으로 취소선과 함께 위에서 차례로 fade-in 후 사라짐. "겁니다." 마지막 단어에서 NEGATIVE 색 전체 오버레이 flash 후 섹션 종료.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene39: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={170}>
        <Scene1 />
      </Sequence>
      <Sequence from={170} durationInFrames={136}>
        <Scene2 />
      </Sequence>
      <Sequence from={306} durationInFrames={106}>
        <Scene3 />
      </Sequence>
      <Sequence from={412} durationInFrames={156}>
        <Scene4 />
      </Sequence>
      <Sequence from={568} durationInFrames={257}>
        <Scene5 />
      </Sequence>
      <Sequence from={825} durationInFrames={80}>
        <Scene6 />
      </Sequence>
      <Sequence from={905} durationInFrames={284}>
        <Scene7 />
      </Sequence>
      <Sequence from={1189} durationInFrames={287}>
        <Scene8 />
      </Sequence>
      <Sequence from={1476} durationInFrames={124}>
        <Scene9 />
      </Sequence>
      <Sequence from={1600} durationInFrames={164}>
        <Scene10 />
      </Sequence>
      <Sequence from={1764} durationInFrames={154}>
        <Scene11 />
      </Sequence>
      <Sequence from={1918} durationInFrames={264}>
        <Scene12 />
      </Sequence>
      <Sequence from={2182} durationInFrames={158}>
        <Scene13 />
      </Sequence>
      <Sequence from={2340} durationInFrames={264}>
        <Scene14 />
      </Sequence>
      <Sequence from={2604} durationInFrames={314}>
        <Scene15 />
      </Sequence>
      <Sequence from={2918} durationInFrames={104}>
        <Scene16 />
      </Sequence>
      <Sequence from={3022} durationInFrames={224}>
        <Scene17 />
      </Sequence>
      <Sequence from={3246} durationInFrames={282}>
        <Scene18 />
      </Sequence>
      <Sequence from={3528} durationInFrames={256}>
        <Scene19 />
      </Sequence>
      <Sequence from={3784} durationInFrames={374}>
        <Scene20 />
      </Sequence>
      <Sequence from={4158} durationInFrames={239}>
        <Scene21 />
      </Sequence>
      <Sequence from={4397} durationInFrames={114}>
        <Scene22 />
      </Sequence>
      <Sequence from={4511} durationInFrames={127}>
        <Scene23 />
      </Sequence>
      <Sequence from={4638} durationInFrames={145}>
        <Scene24 />
      </Sequence>
      <Sequence from={4783} durationInFrames={125}>
        <Scene25 />
      </Sequence>
      <Sequence from={4908} durationInFrames={128}>
        <Scene26 />
      </Sequence>
      <Sequence from={5036} durationInFrames={168}>
        <Scene27 />
      </Sequence>
      <Sequence from={5204} durationInFrames={328}>
        <Scene28 />
      </Sequence>
      <Sequence from={5532} durationInFrames={91}>
        <Scene29 />
      </Sequence>
      <Sequence from={5623} durationInFrames={76}>
        <Scene30 />
      </Sequence>
      <Sequence from={5699} durationInFrames={153}>
        <Scene31 />
      </Sequence>
      <Sequence from={5852} durationInFrames={167}>
        <Scene32 />
      </Sequence>
      <Sequence from={6019} durationInFrames={109}>
        <Scene33 />
      </Sequence>
      <Sequence from={6128} durationInFrames={254}>
        <Scene34 />
      </Sequence>
      <Sequence from={6382} durationInFrames={50}>
        <Scene35 />
      </Sequence>
      <Sequence from={6432} durationInFrames={110}>
        <Scene36 />
      </Sequence>
      <Sequence from={6542} durationInFrames={234}>
        <Scene37 />
      </Sequence>
      <Sequence from={6776} durationInFrames={267}>
        <Scene38 />
      </Sequence>
      <Sequence from={7043} durationInFrames={326}>
        <Scene39 />
      </Sequence>
    </AbsoluteFill>
  );
};
