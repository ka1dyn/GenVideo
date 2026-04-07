import React from "react";
import {
  AbsoluteFill,
  Sequence,
} from "remotion";
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from "../theme";

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 드론이 하늘에서 날아다닙니다.
 * 단어 등장 타이밍: "드론이": 0f, "하늘에서": 20f, "날아다닙니다.": 46f
 * 비주얼 컨셉: BG_BASE 배경 위, 화면 중앙에 모노스페이스 폰트로 [DRONE FEED ACTIVE] 레이블이 타이핑 이펙트로 등장. 우측 상단에 00:00:00 형식의 실시간 타임코드 카운터가 깜빡이며 동작. 하단 스캔라인 패턴(얇은 수평선 반복)이 약한 opacity로 깔리며 군사 드론 영상 UI 느낌을 만듦.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}></AbsoluteFill>;
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 지금 이 순간에도요.
 * 단어 등장 타이밍: "지금": 96f, "이": 122f, "순간에도요.": 140f
 * 비주얼 컨셉: Scene 1 UI 위에 PRIMARY(#378ADD) 수평 Scan Line이 화면을 위→아래로 빠르게 훑는 애니메이션. "지금 이 순간에도요" 텍스트가 중앙에 TEXT_MAIN 색으로 크게(SIZE_2XL) fade-in. 배경은 미세한 파티클 흐름이 감지 시스템 느낌 연출.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 그리고 그 드론이 찍은 영상을 AI가 실시간으로 봅니다.
 * 단어 등장 타이밍: "그리고": 203f, "그": 233f, "드론이": 244f, "찍은": 274f, "영상을": 295f, "AI가": 328f, "실시간으로": 341f, "봅니다.": 381f
 * 비주얼 컨셉: 화면이 2분할(좌: DRONE INPUT / 우: AI PROCESSING). 좌측에 격자 오버레이가 있는 사각형 영역, 우측에 [ANALYZING...] + 진행 중인 바 형태의 분석 UI. AI가 등장하는 단어 순간에 우측 패널이 PRIMARY_DIM 색으로 활성화되며 blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 그리고 이렇게 말하는 거예요.
 * 단어 등장 타이밍: "그리고": 416f, "이렇게": 448f, "말하는": 464f, "거예요.": 487f
 * 비주얼 컨셉: 화면 중앙에 AI OUTPUT 터미널 박스가 렌더링되기 시작. BORDER_PRIMARY 테두리의 패널이 위→아래 slide-down으로 등장. 내부는 빈 상태로 대기. ACCENT(#EF9F27) 색 cursor blink.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 저 차량, 군사 차량입니다.
 * 단어 등장 타이밍: "저": 521f, "차량,": 554f, "군사": 576f, "차량입니다.": 601f
 * 비주얼 컨셉: Scene 4의 AI OUTPUT 박스 안에 텍스트가 타이핑 이펙트로 등장: `VEHICLE_TYPE: MILITARY`. 단어 "군사" 등장 시 텍스트 옆에 NEGATIVE 색 태그 [THREAT] 가 flash-in. 격자 오버레이가 깜빡이며 타깃 포착 느낌.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 저 건물, 무기 시설로 추정됩니다.
 * 단어 등장 타이밍: "저": 689f, "건물,": 701f, "무기": 740f, "시설로": 776f, "추정됩니다.": 805f
 * 비주얼 컨셉: AI OUTPUT 박스에 두 번째 항목 추가 타이핑: `STRUCTURE: WEAPONS FACILITY (est.)`. 텍스트 컬러는 WARNING(#EF9F27). 우측에 신뢰도 게이지 바가 왼→오른 채워지며 "CONFIDENCE: 91%" 표시.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 근데요.
 * 단어 등장 타이밍: "근데요,": 889f
 * 비주얼 컨셉: 화면 전체가 짧게 darkening flash(BG_VOID로 순간 fade). "근데요." 텍스트만 중앙에 SIZE_LG, TEXT_MUTED 컬러로 홀로 등장. 여백과 침묵을 강조하는 미니멀 composition.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 이게 영화 얘기가 아니에요.
 * 단어 등장 타이밍: "이게": 926f, "영화": 947f, "얘기가": 952f, "아니에요.": 998f
 * 비주얼 컨셉: 배경 좌측에 반투명(opacity 0.15) 필름 프레임 직사각형이 등장했다가 사라짐(crossed out 효과). 중앙 텍스트 "이게 영화 얘기가 아니에요." 가 TEXT_MAIN SIZE_XL로 강하게 등장. "아니에요." 단어 등장 순간 아래 빨간 밑줄(NEGATIVE 색) 1px 수평선이 슥 그어짐.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 올해 실제로 일어난 일입니다.
 * 단어 등장 타이밍: "올해": 1050f, "실제로": 1098f, "일어난": 1101f, "일입니다.": 1127f
 * 비주얼 컨셉: 상단에 ACCENT 배경의 [BREAKING] 속보 레이블이 좌→우 slide-in. 그 아래에 "2025 · REAL EVENT" 텍스트가 TRACKING_WIDER 자간으로 등장. 미세한 horizontal ticker line(TEXT_DISABLED 컬러)이 화면 하단을 흐름.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 미국이 이란을 공격했을 때, 그 작전에 핵심의 AI가 있었어요.
 * 단어 등장 타이밍: "미국이": 1177f, "이란을": 1216f, "공격했을": 1243f, "때": 1286f, "그": 1300f, "작전에": 1309f, "핵심의": 1341f, "AI가": 1371f, "있었어요.": 1388f
 * 비주얼 컨셉: 지도 격자(추상적인 좌표선 그리드, 실제 지도가 아닌 군사 HUD 스타일)가 배경에 등장. 좌측에 "US" 레이블 노드, 우측에 "IR" 레이블 노드, 두 점 사이를 잇는 선이 왼→오른으로 그려짐. "AI가" 단어 등장 시 선 중앙에 PRIMARY 색 원형 마커 pulse.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 프로젝트 메이븐.
 * 단어 등장 타이밍: "프로젝트": 1444f, "메이븐.": 1494f
 * 비주얼 컨셉: 화면 암전 후 중앙에 "PROJECT MAVEN" 텍스트가 SIZE_3XL, WEIGHT_EXTRABOLD, TEXT_MAIN 색으로 강렬하게 등장. 텍스트 아래에 PRIMARY 색 얇은 수평선(2px)이 좌→우로 drawing. letterSpacing wide 적용으로 기술적 위엄감 표현.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 오늘은 이게 뭔지, 어떻게 작동하는지,
 * 단어 등장 타이밍: "오늘은": 1546f, "이게": 1573f, "뭔지,": 1592f, "어떻게": 1616f, "작동하는지,": 1643f
 * 비주얼 컨셉: "PROJECT MAVEN" 텍스트는 유지된 채 좌측으로 이동. 우측에 투명 패널 배경(GLASS_BG)이 등장하며 3개의 항목 텍스트가 순차적으로 위→아래 stagger 등장: [01. 정의], [02. 작동 방식], [03. 논쟁]. "오늘은" 단어에 동기화하여 시작.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 그리고 솔직히 좀 무섭기도 한 얘기까지 전부 털어놓을게요.
 * 단어 등장 타이밍: "그리고": 1721f, "솔직히": 1740f, "좀": 1760f, "무섭기도": 1767f, "한": 1793f, "얘기까지": 1800f, "전부": 1831f, "털어놓을게요.": 1844f
 * 비주얼 컨셉: "무섭기도" 단어 등장 시 배경 전체에 NEGATIVE_DIM(rgba(226,75,74,0.15)) 오버레이가 짧게 flash. 중앙에 TEXT_BODY 색 SIZE_MD 텍스트가 부드럽게 fade-in. "털어놓을게요." 마지막 단어에서 화면 우측 하단에 ">> PLAY" 화살표 아이콘 대신 "→ START" 마커가 등장하며 섹션 종료 예고.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return <AbsoluteFill></AbsoluteFill>;
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={96}>
        <Scene1 />
      </Sequence>
      <Sequence from={96} durationInFrames={107}>
        <Scene2 />
      </Sequence>
      <Sequence from={203} durationInFrames={213}>
        <Scene3 />
      </Sequence>
      <Sequence from={416} durationInFrames={105}>
        <Scene4 />
      </Sequence>
      <Sequence from={521} durationInFrames={168}>
        <Scene5 />
      </Sequence>
      <Sequence from={689} durationInFrames={200}>
        <Scene6 />
      </Sequence>
      <Sequence from={889} durationInFrames={37}>
        <Scene7 />
      </Sequence>
      <Sequence from={926} durationInFrames={124}>
        <Scene8 />
      </Sequence>
      <Sequence from={1050} durationInFrames={127}>
        <Scene9 />
      </Sequence>
      <Sequence from={1177} durationInFrames={267}>
        <Scene10 />
      </Sequence>
      <Sequence from={1444} durationInFrames={102}>
        <Scene11 />
      </Sequence>
      <Sequence from={1546} durationInFrames={175}>
        <Scene12 />
      </Sequence>
      <Sequence from={1721} durationInFrames={200}>
        <Scene13 />
      </Sequence>
    </AbsoluteFill>
  );
};
