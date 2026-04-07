import React from "react";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 때는 2017년이에요.
 * 단어 등장 타이밍: "때는": 0f, "2017년이에요.": 18f
 * 비주얼 컨셉: BG_VOID 배경에서 BG_BASE로 fade-in. 중앙에 "2017" 숫자가 SIZE_4XL WEIGHT_EXTRABOLD TEXT_MAIN으로 하단→중앙 spring 진입. 그 위에 TEXT_MUTED SIZE_SM "ORIGIN POINT" 레이블이 TRACKING_WIDER 자간으로 위에서 등장. 직선 수평 분리선(PRIMARY 색 1px)이 숫자 아래에 그어짐.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 미국 국방부가 심각한 고민에 빠졌습니다.
 * 단어 등장 타이밍: "미국": 117f, "국방부가": 121f, "심각한": 151f, "고민에": 178f, "빠졌습니다.": 202f
 * 비주얼 컨셉: 화면 상단에 "U.S. DEPARTMENT OF DEFENSE" 레이블이 TRACKING_WIDE TEXT_MUTED로 slide-in. 중앙에 경고 삼각형 대신, 가로로 긴 BORDER 테두리의 패널이 등장하며 내부에 "PROBLEM IDENTIFIED" 텍스트가 타이핑. "고민에" 단어 등장 시 패널 테두리가 WARNING 색으로 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: "드론이 찍어오는 영상이 너무 많아.
 * 단어 등장 타이밍: "\"드론이": 259f, "찍어오는": 289f, "영상이": 326f, "너무": 354f, "많아.": 373f
 * 비주얼 컨셉: 화면 좌측 GLASS_BG 패널에 따옴표 UI 스타일의 인용문 컴포넌트 등장. 상단에 PRIMARY 3px 수직 바, 내부에 인용 텍스트가 단어별로 순차 등장. 배경 우측에 여러 개의 소형 직사각형(영상 썸네일 추상)이 grid 형태로 순차 fade-in하며 "과부하" 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 사람이 다 볼 수가 없어."
 * 단어 등장 타이밍: "사람이": 401f, "다": 441f, "볼": 442f, "수가": 451f, "없어.\"": 470f
 * 비주얼 컨셉: 기존 인용문 패널에 두번째 문장이 이어서 타이핑. "없어." 단어 등장 시 배경 직사각형들의 opacity가 낮아지며(overload 표현) NEGATIVE_DIM 오버레이가 순간적으로 깔림. 인용문 패널 우측 하단에 "— DOD Official" SOURCE 레이블 fade-in.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 생각해보세요.
 * 단어 등장 타이밍: "생각해보세요.": 496f
 * 비주얼 컨셉: 화면이 클리어되며 중앙에 "생각해보세요." 텍스트만 SIZE_XL TEXT_BODY 색으로 fade-in. 배경은 BG_BASE 단색 단순화. 시청자 몰입 유도를 위한 intentional 여백.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 전 세계에 깔린 군사 드론이 하루 24시간 영상을 찍어서 쏟아붓는 거예요.
 * 단어 등장 타이밍: "전": 574f, "세계에": 580f, "깔린": 613f, "군사": 632f, "드론이": 681f, "하루": 701f, "24시간": 740f, "영상을": 770f, "찍어서": 800f, "쏟아붓는": 838f, "거예요.": 886f
 * 비주얼 컨셉: 화면 상단에 "GLOBAL DRONE NETWORK" 레이블. 그 아래 가로 막대 타임라인이 왼→오른으로 차오르며 "24H" 숫자가 증가. "쏟아붓는" 단어 등장 시 막대의 끝에서 화살표가 여러개로 분기하며 쏟아지는 이미지를 직선 애니메이션으로 표현. 데이터 흐름 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 그걸 사람이 한 명 한 명 앉아서 들여다보고 있으면 어느 세월에 다 보겠어요.
 * 단어 등장 타이밍: "그걸": 886f, "사람이": 928f, "한": 932f, "명": 937f, "한": 952f, "명": 954f, "앉아서": 962f, "들여다보고": 988f, "있으면": 1031f, "어느": 1057f, "세월에": 1074f, "다": 1099f, "보겠어요.": 1108f
 * 비주얼 컨셉: 화면이 좌우 분할. 좌측 라벨: "HUMAN ANALYST" / 우측 라벨: "VIDEO QUEUE". 좌측에는 프로그레스 바가 극히 느리게(1% 진행)진행, 우측에는 영상 수가 counter로 빠르게 증가. 비율 불균형 시각화. "어느 세월에" 단어 등장 시 좌측 프로그레스 바에 빨간 X 표시(NEGATIVE 색 가로선).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: "이거 군사 차량이야, 민간 차량이야?"
 * 단어 등장 타이밍: "\"이거": 1157f, "군사": 1175f, "차량이야,": 1195f, "민간": 1243f, "차량이야?\"": 1262f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 재등장. 내부에 "VEHICLE TYPE?" 라벨과 두 개의 옵션 태그가 나란히: [MILITARY] (NEGATIVE 색) vs [CIVILIAN] (SECONDARY 색). 두 태그 사이에 "?" 표시가 pulse 애니메이션.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 이러다가 전쟁이 먼저 끝나는 거죠.
 * 단어 등장 타이밍: "이러다가": 1309f, "전쟁이": 1357f, "먼저": 1376f, "끝나는": 1396f, "거죠.": 1427f
 * 비주얼 컨셉: 화면 중앙에 타임라인 바가 등장. 좌측은 "분석 완료" 색(SECONDARY), 우측의 더 짧은 부분은 "전쟁 종료" 색(NEGATIVE)로 표시. 두 개의 레이블이 각각 단어 등장 시 stagger로 붙음. 아이러니한 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 그래서 만든 게 프로젝트 메이븐이에요.
 * 단어 등장 타이밍: "그래서": 1474f, "만든": 1514f, "게": 1515f, "프로젝트": 1523f, "메이븐이에요.": 1558f
 * 비주얼 컨셉: 화면 중앙에 "PROJECT MAVEN" 텍스트가 GLOW_MD 속성으로 발광하며 등장. "프로젝트" 단어 등장 프레임과 동기화. 텍스트 아래 얇은 PRIMARY 2px 수평선이 좌→우로 그려짐. 배경은 BG_VOID로 전환하며 미래지향적 분위기.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 비유하자면요
 * 단어 등장 타이밍: "비유하자면요,": 1619f
 * 비주얼 컨셉: "PROJECT MAVEN" 텍스트가 상단으로 작아지며(SIZE_SM) 이동. 중앙에 "비유하자면" SIZE_LG TEXT_MUTED색으로 italics 스타일 fade-in. 극적 전환을 위한 브리지 씬.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: "전쟁터의 유튜브 알고리즘" 이에요.
 * 단어 등장 타이밍: "\"전쟁터의": 1687f, "유튜브": 1748f, "알고리즘\"": 1756f, "이에요.": 1843f
 * 비주얼 컨셉: 화면 중앙에 두 개의 레이블 태그가 "+" 기호로 연결: [전쟁터] (NEGATIVE_DIM 배경) + [유튜브 알고리즘] (PRIMARY_DIM 배경). 두 태그가 각 단어 등장 시 stagger로 나타나며 결합. 하단에 ACCENT 색 "= PROJECT MAVEN" 수식 텍스트 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 유튜브가 영상 수백만 개 중에서 내 취향에 맞는 걸 골라주잖아요.
 * 단어 등장 타이밍: "유튜브가": 1843f, "영상": 1889f, "수백만": 1901f, "개": 1920f, "중에서": 1928f, "내": 1954f, "취향에": 1963f, "맞는": 1988f, "걸": 2007f, "골라주잖아요.": 2014f
 * 비주얼 컨셉: 좌측 영역에 여러 직사각형 항목들이 나열(수백만 영상 추상). 우측에 필터 아이콘 대신 수직 수평선 교차 필터 패턴이 등장하며 왼→오른으로 scan. 필터 통과 후 오른쪽에 1개의 highlighted 항목만 남음. "골라주잖아요." 단어와 동기화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 메이븐은 드론 영상 수천 시간 중에서 "위험한 것"만 걸러내는 거예요.
 * 단어 등장 타이밍: "메이븐은": 2082f, "드론": 2126f, "영상": 2138f, "수천": 2158f, "시간": 2177f, "중에서": 2199f, "\"위험한": 2225f, "것\"만": 2253f, "걸러내는": 2275f, "거예요.": 2311f
 * 비주얼 컨셉: Scene 13의 필터 UI 재활용. 이번에는 레이블이 "DRONE FEED: 수천 시간"으로 변경. 필터 후 남은 항목이 NEGATIVE 색 [THREAT DETECTED] 태그로 마킹. "위험한" 단어 등장 시 해당 항목이 pulse 강조 효과.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 근데 이게 처음부터 잘 된 건 아니에요.
 * 단어 등장 타이밍: "근데": 2358f, "이게": 2375f, "처음부터": 2403f, "잘": 2430f, "된": 2439f, "건": 2448f, "아니에요.": 2457f
 * 비주얼 컨셉: 화면 전환 후 TIMELINE 형태의 수직 라인이 등장. 상단 "2017" 노드는 PRIMARY 색, 그 아래로 내려가는 라인이 "..." 점선으로 표시되며 "아직 진행 중"임을 암시. "처음부터" 단어에 "INITIAL PHASE" 레이블 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 처음엔 구글이 기술을 제공했어요.
 * 단어 등장 타이밍: "처음엔": 2503f, "구글이": 2530f, "기술을": 2560f, "제공했어요.": 2589f
 * 비주얼 컨셉: 수직 타임라인에 "2017" 노드 오른쪽으로 "Google" 텍스트 레이블이 연결 선과 함께 등장. BG_SURFACE 배경의 파트너사 카드 형태로 "TECHNOLOGY PROVIDER: Google" 표시. SECONDARY 색 테두리.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 근데 구글 직원들이 들고 일어났거든요.
 * 단어 등장 타이밍: "근데": 2651f, "구글": 2680f, "직원들이": 2690f, "들고": 2729f, "일어났거든요.": 2749f
 * 비주얼 컨셉: Google 파트너 카드 위에 WARNING 색 오버레이 flash. 카드 우측 상단에 "PROTEST" 상태 태그가 등장. 카드 테두리가 SECONDARY → WARNING 색으로 transition. 직원 반발을 프로세스 상태 변경으로 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: "우리 AI를 전쟁에 쓴다고?
 * 단어 등장 타이밍: "\"우리": 2822f, "AI를": 2837f, "전쟁에": 2853f, "쓴다고?": 2882f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장. 상단 PRIMARY 수직 바, 텍스트는 TEXT_MAIN, 따옴표 장식은 ACCENT 색. 인용문 배경에 WARNING_DIM 오버레이로 긴장감.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 우리는 그거 동의 못 해."
 * 단어 등장 타이밍: "우리는": 2920f, "그거": 2958f, "동의": 2970f, "못": 2992f, "해.\"": 3018f
 * 비주얼 컨셉: 인용문 2행 추가 타이핑. "못" 단어 등장 시 하단에 강조 밑줄(NEGATIVE 색) 등장. 패널 하단에 "— Google Employees, 2018" 출처 레이블.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: 결국 구글은 2019년에 손을 떼고 나왔어요.
 * 단어 등장 타이밍: "결국": 3018f, "구글은": 3037f, "2019년에": 3067f, "손을": 3128f, "떼고": 3148f, "나왔어요.": 3164f
 * 비주얼 컨셉: 타임라인 수직 라인에 "2019" 노드 추가. "Google" 카드가 NEGATIVE_DIM 오버레이와 함께 fade-out 슬라이드 퇴장. "CONTRACT ENDED" 상태 태그가 카드 위에 남았다가 사라짐. 타임라인 노드에 빈 원형 표시(비참여 상태).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 그래도 프로젝트 메이븐은 멈추지 않았습니다.
 * 단어 등장 타이밍: "그래도": 3274f, "프로젝트": 3296f, "메이븐은": 3328f, "멈추지": 3359f, "않았습니다.": 3382f
 * 비주얼 컨셉: 타임라인 라인이 계속 아래로 연장되는 애니메이션. "PROJECT MAVEN" 텍스트가 우측에 유지되며 PRIMARY GLOW_SM 발광. "ACTIVE" 그린(SECONDARY) 상태 dot이 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: 지금은 팔란티어라는 데이터 분석 회사가 핵심을 맡고 있어요.
 * 단어 등장 타이밍: "지금은": 3437f, "팔란티어라는": 3457f, "데이터": 3497f, "분석": 3518f, "회사가": 3530f, "핵심을": 3550f, "맡고": 3569f, "있어요.": 3583f
 * 비주얼 컨셉: 구글 카드가 사라진 자리에 "Palantir" 카드가 PRIMARY 테두리(BORDER_PRIMARY)로 등장. 카드 내부: "CORE PROVIDER", "DATA ANALYTICS" 레이블. 카드 우측에 "ACTIVE" 상태 배지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: AWS, 마이크로소프트 포함해서 10개 회사가 같이 붙어 있고요.
 * 단어 등장 타이밍: "AWS,": 3620f, "마이크로소프트": 3635f, "포함해서": 3706f, "10개": 3741f, "회사가": 3770f, "같이": 3799f, "붙어": 3818f, "있고요.": 3880f
 * 비주얼 컨셉: Palantir 카드 주변으로 "AWS", "Microsoft" 레이블 소형 카드가 STAGGER_MD 간격으로 순차 등장. "10개" 단어 등장 시 카운터 ["1", "2", ... "10"] 회사가 grid 배열로 표시. 나머지는 점 placeholder로 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 규모가 어느 정도냐면요
 * 단어 등장 타이밍: "규모가": 3880f, "어느": 3928f, "정도냐면요,": 3931f
 * 비주얼 컨셉: 화면 전환 + "SCALE" 레이블 TEXT_MUTED SIZE_SM으로 왼→오른 slide-in. 배경에 수직 스케일 눈금선이 서서히 등장하며 다음 씬(계약 규모 공개)의 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: 팔란티어 혼자 미 국방부와 맺은 계약 규모가 최대 100억 달러
 * 단어 등장 타이밍: "팔란티어": 3997f, "혼자": 4029f, "미": 4045f, "국방부와": 4053f, "맺은": 4088f, "계약": 4100f, "규모가": 4115f, "최대": 4139f, "100억": 4156f, "달러,": 4191f
 * 비주얼 컨셉: 중앙에 "$10B" 숫자가 SIZE_4XL WEIGHT_EXTRABOLD GLOW_LG 효과로 counter up 애니메이션으로 등장. "100억" 단어 등장 시 최종값 정지. 배경에 PRIMARY_DIM 방사형 glow. 아래에 "MAX CONTRACT VALUE — Palantir × DOD" 소형 레이블.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 우리 돈으로 약 13조 원 수준이에요.
 * 단어 등장 타이밍: "우리": 4220f, "돈으로": 4246f, "약": 4264f, "13조": 4272f, "원": 4302f, "수준이에요.": 4306f
 * 비주얼 컨셉: "$10B" 숫자 아래에 "≈ ₩13조" 환산값이 TEXT_MUTED SIZE_LG로 slide-in. 좌측에 환율 변환 방향 화살표(→) 라인. 단순하고 임팩트 있는 숫자 대비 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 이게 장난이 아닌 거죠.
 * 단어 등장 타이밍: "이게": 4358f, "장난이": 4390f, "아닌": 4402f, "거죠.": 4418f
 * 비주얼 컨셉: 숫자들이 유지되며 배경 전체에 PRIMARY_DIM 오버레이가 서서히 밝아짐. "이게 장난이 아닌 거죠." 텍스트가 화면 하단 1/3 영역에 SIZE_XL WEIGHT_BOLD TEXT_MAIN으로 fade-in. 마지막 단어에서 화면 우측 하단에 PRIMARY 색 점(dot)이 3회 pulse 후 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene28: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={117}>
        <Scene1 />
      </Sequence>
      <Sequence from={117} durationInFrames={142}>
        <Scene2 />
      </Sequence>
      <Sequence from={259} durationInFrames={142}>
        <Scene3 />
      </Sequence>
      <Sequence from={401} durationInFrames={95}>
        <Scene4 />
      </Sequence>
      <Sequence from={496} durationInFrames={78}>
        <Scene5 />
      </Sequence>
      <Sequence from={574} durationInFrames={312}>
        <Scene6 />
      </Sequence>
      <Sequence from={886} durationInFrames={271}>
        <Scene7 />
      </Sequence>
      <Sequence from={1157} durationInFrames={152}>
        <Scene8 />
      </Sequence>
      <Sequence from={1309} durationInFrames={165}>
        <Scene9 />
      </Sequence>
      <Sequence from={1474} durationInFrames={145}>
        <Scene10 />
      </Sequence>
      <Sequence from={1619} durationInFrames={68}>
        <Scene11 />
      </Sequence>
      <Sequence from={1687} durationInFrames={156}>
        <Scene12 />
      </Sequence>
      <Sequence from={1843} durationInFrames={239}>
        <Scene13 />
      </Sequence>
      <Sequence from={2082} durationInFrames={276}>
        <Scene14 />
      </Sequence>
      <Sequence from={2358} durationInFrames={145}>
        <Scene16 />
      </Sequence>
      <Sequence from={2503} durationInFrames={148}>
        <Scene17 />
      </Sequence>
      <Sequence from={2651} durationInFrames={171}>
        <Scene18 />
      </Sequence>
      <Sequence from={2822} durationInFrames={98}>
        <Scene19 />
      </Sequence>
      <Sequence from={2920} durationInFrames={98}>
        <Scene20 />
      </Sequence>
      <Sequence from={3018} durationInFrames={256}>
        <Scene21 />
      </Sequence>
      <Sequence from={3274} durationInFrames={163}>
        <Scene22 />
      </Sequence>
      <Sequence from={3437} durationInFrames={183}>
        <Scene23 />
      </Sequence>
      <Sequence from={3620} durationInFrames={260}>
        <Scene24 />
      </Sequence>
      <Sequence from={3880} durationInFrames={117}>
        <Scene25 />
      </Sequence>
      <Sequence from={3997} durationInFrames={223}>
        <Scene26 />
      </Sequence>
      <Sequence from={4220} durationInFrames={138}>
        <Scene27 />
      </Sequence>
      <Sequence from={4358} durationInFrames={118}>
        <Scene28 />
      </Sequence>
    </AbsoluteFill>
  );
};
