import React from "react";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 자, 그럼 이게 실제로 뭘 하는 건지 볼게요.
 * 단어 등장 타이밍: "자,": 0f, "그럼": 30f, "이게": 33f, "실제로": 51f, "뭘": 79f, "하는": 91f, "건지": 106f, "볼게요.": 122f
 * 비주얼 컨셉: BG_BASE 배경에 "MAVEN SMART SYSTEM" 레이블이 TEXT_MUTED TRACKING_WIDER로 상단 중앙에 등장. 그 아래 수평 분리선이 좌→우 그려짐. "볼게요." 단어와 함께 세 개의 스텝 번호 [01] [02] [03]가 오른쪽 방향으로 STAGGER_MD 간격으로 순차 등장. 섹션 전체 구조를 예고하는 인트로 UI.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 메이븐 안에 "메이븐 스마트 시스템" 이라는 AI가 있는데, 이 AI가 하는 일이 크게 세 가지예요.
 * 단어 등장 타이밍: "메이븐": 154f, "안에": 184f, "\"메이븐": 214f, "스마트": 234f, "시스템\"": 265f, "이라는": 326f, "AI가": 343f, "있는데,": 380f, "이": 389f, "AI가": 415f, "하는": 426f, "일이": 446f, "크게": 466f, "세": 479f, "가지예요.": 527f
 * 비주얼 컨셉: 화면 중앙에 BG_ELEVATED 배경의 시스템 카드가 등장. 상단에 "PROJECT MAVEN" → 내부에 화살표와 함께 "MAVEN SMART SYSTEM" 서브 레이블. "세 가지예요." 단어와 함께 하단에 세 개의 빈 항목 플레이스홀더 [——] [——] [——] stagger 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 첫째, 보는 거예요.
 * 단어 등장 타이밍: "첫째,": 527f, "보는": 575f, "거예요.": 580f
 * 비주얼 컨셉: [01] 플레이스홀더가 PRIMARY 색 채워지며 텍스트 "보기 (DETECT)" 등장. 숫자 "01" PRIMARY 색 SIZE_2XL로 좌측에 크게 배치, 우측에 기능명 텍스트. 나머지 [02][03]은 TEXT_DISABLED 유지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 드론에서 오는 영상, 위성 사진, 레이더 데이터를 전부 받아서 분석해요.
 * 단어 등장 타이밍: "드론에서": 628f, "오는": 665f, "영상,": 702f, "위성": 710f, "사진,": 754f, "레이더": 784f, "데이터를": 820f, "전부": 839f, "받아서": 868f, "분석해요.": 926f
 * 비주얼 컨셉: 세 개의 INPUT 소스가 수직 열로 등장: [DRONE FEED] → [SATELLITE IMG] → [RADAR DATA]. 각각 단어 등장 시 STAGGER 순서로 나타남. 세 소스에서 중앙 AI 노드(원형, PRIMARY 테두리)로 수평 화살표 선이 집중되는 데이터 흐름 다이어그램.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: "저기 움직이는 거 차량이야, 사람이야?
 * 단어 등장 타이밍: "\"저기": 926f, "움직이는": 944f, "거": 977f, "차량이야,": 985f, "사람이야?": 1027f
 * 비주얼 컨셉: GLASS_BG 인용문 패널 등장. AI 분석 쿼리 형태의 UI: 패널 좌측에 "QUERY 1:" 레이블(TEXT_MUTED), 질문 텍스트가 타이핑 이펙트로 등장. 하단에 옵션 태그 [VEHICLE] vs [HUMAN]이 점멸 대기 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: ", "저 건물에서 열 감지가 되는데 뭐가 있는 거지?
 * 단어 등장 타이밍: "\",": 1069f, "\"저": 1077f, "건물에서": 1110f, "열": 1144f, "감지가": 1169f, "되는데": 1186f, "뭐가": 1202f, "있는": 1232f, "거지?": 1232f
 * 비주얼 컨셉: 인용문 패널에 "QUERY 2:" 레이블과 함께 두 번째 질문 타이핑. "열" 단어 등장 시 패널 우측에 열감지 표시 (적색 → 오렌지 그라데이션의 수직 바, 추상적 ACCENT 색 표현). GLOW_ACCENT 효과로 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 이런 걸 끊임없이 판단하는 겁니다.
 * 단어 등장 타이밍: "\"": 1232f, "이런": 1248f, "걸": 1258f, "끊임없이": 1292f, "판단하는": 1328f, "겁니다.": 1367f
 * 비주얼 컨셉: 인용문 패널 사라짐. 중앙에 타이머 스타일 UI: "처리 속도" 카운터가 빠르게 증가. "끊임없이" 단어 등장 시 카운터 무한 루프 스크롤 애니메이션으로 전환. TEXT_MUTED SIZE_SM "CONTINUOUS PROCESSING" 레이블 아래에 표시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 둘째, 연결하는 거예요.
 * 단어 등장 타이밍: "둘째,": 1393f, "연결하는": 1420f, "거예요.": 1450f
 * 비주얼 컨셉: [02] 플레이스홀더가 PRIMARY 색 채워지며 텍스트 "연결 (CORRELATE)" 등장. "01" 은 SECONDARY 완료 상태로, "03"은 TEXT_DISABLED 유지. 기능 인덱스 전환 애니메이션.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 영상만 보는 게 아니에요.
 * 단어 등장 타이밍: "영상만": 1484f, "보는": 1526f, "게": 1528f, "아니에요.": 1537f
 * 비주얼 컨셉: 화면 좌측에 "VIDEO ONLY" 레이블과 함께 단일 소스 박스. "아니에요." 단어 등장 시 박스 위에 NEGATIVE 색 사선(X)이 그어짐. 브릿지 씬으로 다음 다중소스 연결 씬 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: IP 주소, 소셜미디어 위치 태그, GPS 정보까지 전부 긁어와서 교차 분석해요.
 * 단어 등장 타이밍: "IP": 1588f, "주소,": 1594f, "소셜미디어": 1622f, "위치": 1675f, "태그,": 1693f, "GPS": 1721f, "정보까지": 1730f, "전부": 1771f, "긁어와서": 1792f, "교차": 1832f, "분석해요.": 1852f
 * 비주얼 컨셉: 다중 소스 노드 다이어그램: [IP ADDRESS] [SNS TAG] [GPS DATA] 세 노드가 각 단어 stagger로 등장하여 중앙 AI 노드에 연결선이 그려짐. 연결선들이 만나는 중앙 노드에서 교차 분석 pulse 애니메이션 발생.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: "이 차량이 어제 이 SNS 계정 근처에 있었는데?
 * 단어 등장 타이밍: "\"이": 1920f, "차량이": 1929f, "어제": 1956f, "이": 1975f, "SNS": 1984f, "계정": 1993f, "근처에": 2011f, "있었는데?": 2037f
 * 비주얼 컨셉: GLASS_BG 패널에 상관관계 결과 UI: 상단 [VEHICLE ID: XX-7731] / 하단 [SNS ACCOUNT: @xxx]. 두 항목 사이에 "CORRELATION DETECTED" 레이블과 PRIMARY 색 연결선. "있었는데?" 단어에 GLOW_MD 강조.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 이런 식으로 흩어진 점들을 연결하는 거거든요.
 * 단어 등장 타이밍: "\"": 2076f, "이런": 2093f, "식으로": 2121f, "흩어진": 2148f, "점들을": 2176f, "연결하는": 2212f, "거거든요.": 2266f
 * 비주얼 컨셉: 추상적인 노드-엣지 그래프 시각화. 여러 점(TEXT_DISABLED 색 원형)들이 흩어져 있다가 "연결하는" 단어에서 선들이 PRIMARY 색으로 빠르게 연결됨. "거거든요." 단어에 그래프 전체가 PRIMARY_DIM 배경으로 유지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 셋째, 보고하는 거예요.
 * 단어 등장 타이밍: "셋째,": 2266f, "보고하는": 2309f, "거예요.": 2335f
 * 비주얼 컨셉: [03] 플레이스홀더 PRIMARY 채워짐, "보고 (REPORT)" 텍스트 등장. 세 번호 [01] [02] [03] 모두 완료 상태로 순차 SECONDARY 색 전환하며 체크 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: "이건 군사 시설일 확률 98%입니다, 사령관님 결정하세요.
 * 단어 등장 타이밍: "\"이건": 2377f, "군사": 2408f, "시설일": 2418f, "확률": 2451f, "98%입니다,": 2468f, "사령관님": 2542f, "결정하세요.": 2585f
 * 비주얼 컨셉: AI 보고서 UI 패널. 상단 "AI REPORT" 레이블, 내부: [CLASSIFICATION: MILITARY FACILITY] + [CONFIDENCE: 98%] 수치가 counter up으로 등장. "98%" 단어에 PRIMARY GLOW_LG 강조. 하단 "— DECISION REQUIRED" 레이블 ACCENT 색 blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 이렇게 우선순위 리스트를 뽑아서 사람한테 넘기는 거예요.
 * 단어 등장 타이밍: "\"": 2652f, "이렇게": 2681f, "우선순위": 2703f, "리스트를": 2732f, "뽑아서": 2756f, "사람한테": 2785f, "넘기는": 2807f, "거예요.": 2842f
 * 비주얼 컨셉: 리스트 UI: [#1 TARGET — 98% / #2 TARGET — 94% / #3 TARGET — 87%] 항목이 STAGGER_SM으로 등장. 리스트가 완성되면 우측으로 slide-out하며 "→ HUMAN COMMANDER" 화살표와 함께 수신자 레이블로 전달.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 16 기획안]
 * 원본 텍스트: 근데 이게 얼마나 빠른지 아세요?
 * 단어 등장 타이밍: "근데": 2842f, "이게": 2860f, "얼마나": 2893f, "빠른지": 2909f, "아세요?": 2939f
 * 비주얼 컨셉: 화면 중앙에 시계 타이머 UI가 등장. "00:00:00" 형식에서 초가 빠르게 카운트되기 시작. "빠른지" 단어에 타이머 속도가 2배로 증가. 하단에 "SPEED: ?" 레이블 대기 상태.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene16: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 17 기획안]
 * 원본 텍스트: 미 육군 장교가 직접 밝힌 얘기예요.
 * 단어 등장 타이밍: "미": 2975f, "육군": 2985f, "장교가": 3007f, "직접": 3032f, "밝힌": 3052f, "얘기예요.": 3070f
 * 비주얼 컨셉: 인용문 패널 등장. 상단에 출처 레이블 "U.S. ARMY OFFICER — Official Statement". GLASS_BG 배경, BORDER_STRONG 테두리. 내부 텍스트 영역 대기 상태(cursor blink).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene17: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 18 기획안]
 * 원본 텍스트: 메이븐 AI 덕분에 1시간에 최대 80개의 표적을 포착할 수 있게 됐다고 합니다.
 * 단어 등장 타이밍: "메이븐": 3155f, "AI": 3179f, "덕분에": 3184f, "1시간에": 3211f, "최대": 3250f, "80개의": 3262f, "표적을": 3293f, "포착할": 3321f, "수": 3343f, "있게": 3352f, "됐다고": 3373f, "합니다.": 3394f
 * 비주얼 컨셉: 중앙에 대형 숫자 "80" SIZE_4XL WEIGHT_EXTRABOLD PRIMARY GLOW_LG 발광으로 counter up 등장. 아래에 "표적 / 1시간" TEXT_MUTED SIZE_SM 레이블. 배경에 PRIMARY_DIM 방사형 glow. "80개의" 단어에서 최종값 정지.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene18: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 19 기획안]
 * 원본 텍스트: 사람이 하루 종일 영상 붙잡고 하나씩 확인할 걸, AI는 한 시간에 80개를 처리하는 거예요.
 * 단어 등장 타이밍: "사람이": 3430f, "하루": 3476f, "종일": 3482f, "영상": 3494f, "붙잡고": 3514f, "하나씩": 3540f, "확인할": 3568f, "걸,": 3598f, "AI는": 3604f, "한": 3619f, "시간에": 3656f, "80개를": 3694f, "처리하는": 3730f, "거예요.": 3780f
 * 비주얼 컨셉: 좌우 분할 비교 UI. 좌: [HUMAN] 느린 프로그레스 바 + "~days" 레이블 / 우: [AI] 빠른 프로그레스 바 + "80/hr" 레이블. "AI는" 단어 등장 시 우측 바가 PRIMARY 색으로 급속 채워짐. 명확한 속도 대비.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene19: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 20 기획안]
 * 원본 텍스트: 속도가 전쟁의 성격 자체를 바꿔버린 겁니다.
 * 단어 등장 타이밍: "속도가": 3780f, "전쟁의": 3811f, "성격": 3827f, "자체를": 3842f, "바꿔버린": 3867f, "겁니다.": 3900f
 * 비주얼 컨셉: 배경 전체에 대각선 방향(우상향) 화살표 그래픽이 PRIMARY 색으로 그려지며 상승 모멘텀 시각화. 중앙 텍스트 "속도 = 전쟁의 주도권" SIZE_LG WEIGHT_BOLD로 fade-in. "바꿔버린" 단어에 배경 brief flash.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene20: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 21 기획안]
 * 원본 텍스트: 자, 여기까지 들으면 "AI가 다 하는 거잖아, 무섭다" 이런 생각 드실 수 있어요.
 * 단어 등장 타이밍: "자,": 3937f, "여기까지": 3975f, "들으면": 3986f, "\"AI가": 4012f, "다": 4025f, "하는": 4034f, "거잖아,": 4051f, "무섭다\"": 4085f, "이런": 4125f, "생각": 4142f, "드실": 4153f, "수": 4170f, "있어요.": 4180f
 * 비주얼 컨셉: 화면 중앙에 "AI가 다 하는 거잖아, 무섭다" 텍스트가 GLASS_BG 배경의 말풍선 UI로 등장. 배경에 WARNING_DIM 오버레이. "무섭다" 단어 등장 시 텍스트에 NEGATIVE 색 강조 밑줄 등장.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene21: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 22 기획안]
 * 원본 텍스트: 근데 중요한 포인트가 있어요.
 * 단어 등장 타이밍: "근데": 4222f, "중요한": 4258f, "포인트가": 4264f, "있어요.": 4297f
 * 비주얼 컨셉: 화면이 클리어. 중앙에 대형 강조점(•) PRIMARY 색 pulse 등장. 그 옆에 "중요한 포인트" TEXT_MAIN SIZE_XL fade-in. 다음 씬(핵심 원칙)으로의 전환 빌드업.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene22: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 23 기획안]
 * 원본 텍스트: AI는 추천하고, 결정은 사람이 합니다.
 * 단어 등장 타이밍: "AI는": 4332f, "추천하고,": 4366f, "결정은": 4386f, "사람이": 4415f, "합니다.": 4444f
 * 비주얼 컨셉: 화면이 두 영역으로 명확 분리: 좌 [AI RECOMMENDS] PRIMARY 배경 / 우 [HUMAN DECIDES] SECONDARY 배경. 각 영역이 단어 등장에 맞춰 등장. 분리선 중앙에 "≠" 또는 "+" 기호. 단순 명료한 원칙 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene23: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 24 기획안]
 * 원본 텍스트: "이게 표적 후보입니다" 하고 리스트를 올리면, 사령관이 검토하고 최종 공격 결정은 사람이 내리는 구조예요.
 * 단어 등장 타이밍: "\"이게": 4486f, "표적": 4500f, "후보입니다\"": 4519f, "하고": 4565f, "리스트를": 4581f, "올리면,": 4614f, "사령관이": 4638f, "검토하고": 4670f, "최종": 4706f, "공격": 4718f, "결정은": 4733f, "사람이": 4756f, "내리는": 4781f, "구조예요.": 4805f
 * 비주얼 컨셉: 수평 플로우 다이어그램: [AI] → (리스트) → [COMMANDER] → (검토) → [DECISION]. 각 단어 등장 타이밍에 맞춰 각 노드와 화살표가 순차적으로 그려짐. "결정은 사람이" 단계에서 COMMANDER 노드가 PRIMARY 색으로 pulse 강조. 절차적 흐름 시각화.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene24: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 25 기획안]
 * 원본 텍스트: 2023년에 미 국방부가 공식 명령으로도 못 박았어요.
 * 비주얼 컨셉: durationInFrames가 0이므로 렌더링 없음. 다음 씬으로 전환.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene25: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 26 기획안]
 * 원본 텍스트: "AI 시스템의 판단에 대해 인간이 반드시 감독하고 개입한다."
 * 비주얼 컨셉: 공식 문서 스타일의 인용 패널. 상단 "DOD DIRECTIVE 2023" 레이블, BORDER_STRONG 2px 테두리. 내용 텍스트 타이핑 이펙트 등장. "반드시" 단어에서 텍스트 아래에 PRIMARY 색 밑줄 강조. 하단에 공식 인감 도장 원형 그래픽(추상).
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene26: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 27 기획안]
 * 원본 텍스트: 지금은요.
 * 단어 등장 타이밍: "지금은요.": 5297f
 * 비주얼 컨셉: 화면 클리어. 중앙에 "지금은요." TEXT_BODY SIZE_XL 홀로 fade-in. 의도적 여백과 침묵. 긴장감 조성.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene27: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 28 기획안]
 * 원본 텍스트: 아직은요.
 * 단어 등장 타이밍: "아직은요.": 5364f
 * 비주얼 컨셉: "지금은요." 텍스트 아래에 "아직은요." 가 TEXT_MUTED SIZE_LG으로 fade-in. 두 문장이 세로로 정렬하며 공존. 화면 우측에 WARNING 색 작은 점(·)이 pulse하며 불안한 여운으로 섹션 종료.
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
      <Sequence from={0} durationInFrames={154}>
        <Scene1 />
      </Sequence>
      <Sequence from={154} durationInFrames={373}>
        <Scene2 />
      </Sequence>
      <Sequence from={527} durationInFrames={101}>
        <Scene3 />
      </Sequence>
      <Sequence from={628} durationInFrames={298}>
        <Scene4 />
      </Sequence>
      <Sequence from={926} durationInFrames={143}>
        <Scene5 />
      </Sequence>
      <Sequence from={1069} durationInFrames={163}>
        <Scene6 />
      </Sequence>
      <Sequence from={1232} durationInFrames={161}>
        <Scene7 />
      </Sequence>
      <Sequence from={1393} durationInFrames={91}>
        <Scene8 />
      </Sequence>
      <Sequence from={1484} durationInFrames={104}>
        <Scene9 />
      </Sequence>
      <Sequence from={1588} durationInFrames={332}>
        <Scene10 />
      </Sequence>
      <Sequence from={1920} durationInFrames={156}>
        <Scene11 />
      </Sequence>
      <Sequence from={2076} durationInFrames={190}>
        <Scene12 />
      </Sequence>
      <Sequence from={2266} durationInFrames={111}>
        <Scene13 />
      </Sequence>
      <Sequence from={2377} durationInFrames={275}>
        <Scene14 />
      </Sequence>
      <Sequence from={2652} durationInFrames={190}>
        <Scene15 />
      </Sequence>
      <Sequence from={2842} durationInFrames={133}>
        <Scene16 />
      </Sequence>
      <Sequence from={2975} durationInFrames={180}>
        <Scene17 />
      </Sequence>
      <Sequence from={3155} durationInFrames={275}>
        <Scene18 />
      </Sequence>
      <Sequence from={3430} durationInFrames={350}>
        <Scene19 />
      </Sequence>
      <Sequence from={3780} durationInFrames={157}>
        <Scene20 />
      </Sequence>
      <Sequence from={3937} durationInFrames={285}>
        <Scene21 />
      </Sequence>
      <Sequence from={4222} durationInFrames={110}>
        <Scene22 />
      </Sequence>
      <Sequence from={4332} durationInFrames={154}>
        <Scene23 />
      </Sequence>
      <Sequence from={4486} durationInFrames={370}>
        <Scene24 />
      </Sequence>
      <Sequence from={4856} durationInFrames={252}>
        <Scene25 />
      </Sequence>
      <Sequence from={4916} durationInFrames={381}>
        <Scene26 />
      </Sequence>
      <Sequence from={5297} durationInFrames={67}>
        <Scene27 />
      </Sequence>
      <Sequence from={5364} durationInFrames={66}>
        <Scene28 />
      </Sequence>
    </AbsoluteFill>
  );
};
