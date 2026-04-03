import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { COLORS } from '../theme';

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 이렇게 강력한 AI 툴을 우리 팀에 성공적으로 도입하려면 어떻게 해야 할까요?
 * 단어 등장 타이밍: "이렇게": 1f, "강력한": 41f, "AI": 84f, "툴을": 89f, "우리": 122f, "팀에": 139f, "성공적으로": 148f, "도입하려면": 186f, "어떻게": 223f, "해야": 245f, "할까요?": 254f
 * 비주얼 컨셉: 화면 아래에서 위로 여러 개의 육각형(Hexagon)들이 쌓여 안정적인 구조를 형성합니다. 그 중앙에 강력한 메인 노드가 빛나기 시작하며 '도입'을 상징하는 커넥션 라인들이 뻗어 나옵니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* TODO: Implement Rising Hexagon Stack Animation */}
      {/* TODO: Implement Main Node Connection Lines Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 체계적이고 효율적인 3단계 실전 워크플로우를 제안합니다.
 * 단어 등장 타이밍: "체계적이고": 280f, "효율적인": 331f, "3단계": 373f, "실전": 403f, "워크플로우를": 425f, "제안합니다.": 484f
 * 비주얼 컨셉: 수평 선상에 3개의 주요 마일스톤 노드가 순차적으로 배치됩니다. '체계적' 텍스트 등장 시 노드들 사이에 자(Ruler) 형태의 정밀한 선들이 나타나 간격을 조정하는 모션을 시도합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Milestone Node Layout Animation */}
      {/* TODO: Implement Ruler Line Adjustment Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: AI와 함께하는 개발 워크플로우는 보통 다음 세 단계로 진행됩니다.
 * 단어 등장 타이밍: "AI와": 558f, "함께하는": 577f, "개발": 624f, "워크플로우는": 647f, "보통": 716f, "다음": 740f, "3단계로": 775f, "진행됩니다.": 809f
 * 비주얼 컨셉: 배경에 무한 루프(Loop)를 그리며 흐르는 입자(Particle)들이 흐름도(Flowchart)의 형태를 갖추기 시작합니다. '3단계' 등장에 맞춰 화면이 3분할되는 레이아웃 변화를 줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Flowchart Particle Loop Animation */}
      {/* TODO: Implement 3-way Layout Split Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 첫째, 전체적인 아키텍처 설계.
 * 단어 등장 타이밍: "첫째,": 888f, "전체적인": 940f, "아키텍처": 993f, "설계.": 1052f
 * 비주얼 컨셉: 1번 영역이 확대되며 시스템 설계 다이어그램의 기본 뼈대가 3D 공간 상에서 조립되는 듯한 'Wireframe' 연출을 보여줍니다. 정밀한 설계 선들이 빠르게 그려집니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement 3D Wireframe Architecture Assembly Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 둘째, AI를 활용한 빠른 초안 작성.
 * 단어 등장 타이밍: "둘째,": 1084f, "AI를": 1140f, "활용한": 1160f, "빠른": 1213f, "초안": 1248f, "작성.": 1285f
 * 비주얼 컨셉: 2번 영역으로 시점이 이동하며, 빈 공간에 수백 개의 코드 노드들이 쏟아져 들어와 순식간에 형상을 갖춥니다. '빠른' 느낌을 주기 위해 사이버네틱한 숏 컷(Short-cut) 라이트들이 화면을 가로지릅니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Code Node Influx and Rapid Assembly Animation */}
      {/* TODO: Implement Cybernetic Shortcut Lights Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 셋째, 개발자의 디테일한 리팩토링 및 최적화입니다.
 * 단어 등장 타이밍: "셋째,": 1324f, "개발자의": 1355f, "디테일한": 1391f, "리팩토링": 1432f, "및": 1471f, "최적화입니다.": 1485f
 * 비주얼 컨셉: 3번 영역에서 투박했던 코드 덩어리들이 세밀한 장인의 손길(빛의 스캔)을 거쳐 정교하고 슬림한 블록으로 깎여 나가는 다듬기(Polishing) 애니메이션을 수행합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Light Scan Polishing Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순한 마크업을 넘어 복잡한 로직도 문제없습니다.
 * 단어 등장 타이밍: "단순한": 1565f, "마크업을": 1605f, "넘어": 1643f, "복잡한": 1657f, "로직도": 1697f, "문제없습니다.": 1719f
 * 비주얼 컨셉: 단순한 HTML 태그 위로 논리(Logic)를 표현하는 복잡한 회선들이 신경망처럼 얽히며 에너지를 전달합니다. '문제없음'을 뜻하는 안정적인 스테이터스 UI가 노출됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Logic Circuitry and Status UI Display */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 프롬프트 몇 줄만 입력하면, API 연동부터 상태 관리까지 갖춘
 * 단어 등장 타이밍: "프롬프트": 1852f, "몇": 1854f, "줄만": 1857f, "입력하면,": 1880f, "API": 1936f, "연동부터": 1961f, "상태": 1990f, "관리까지": 2011f, "갖춘": 2054f
 * 비주얼 컨셉: 텍스트 입력창 UI에서 타이핑이 이루어지자마자, 입력창 하단에서 'API Connect' 등의 배지(Badge) 인터페이스 요소들이 수평으로 슬라이드되어 장착됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Badge Sliding Interface Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 완벽한 Next. js 컴포넌트 코드가 순식간에 작성됩니다.
 * 단어 등장 타이밍: "완벽한": 2076f, "Next.": 2108f, "js": 2133f, "컴포넌트": 2141f, "코드가": 2184f, "순식간에": 2216f, "작성됩니다.": 2264f
 * 비주얼 컨셉: Next.js 로고(추상적 심볼)가 조립되며 주위에 완벽하게 정렬된 리액트 컴포넌트 코드 트리가 투명한 부동(Floating) 레이어로 떠오릅니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Next.js Logo Assembly and Floating Code Tree Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 이때 가장 중요한 핵심 기술은 바로 '프롬프트 엔지니어링'입니다.
 * 단어 등장 타이밍: "이때": 2330f, "가장": 2353f, "중요한": 2378f, "핵심": 2410f, "기술은": 2433f, "바로": 2467f, "'프롬프트": 2489f, "엔지니어링'입니다.": 2542f
 * 비주얼 컨셉: 기계식 시계의 정교한 톱니바퀴들이 맞물려 돌아가는 듯한 세밀한 기하학 오브젝트가 화면 중앙에 등장합니다. '엔지니어링' 강조 시 톱니바퀴 사이로 눈부신 푸른 빛이 새어 나옵니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Mechanical Gear Interaction Animation */}
      {/* TODO: Implement Engineering Glow Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 명확한 컨텍스트와 엄격한 제약 조건을 제공할수록,
 * 단어 등장 타이밍: "명확한": 2645f, "컨텍스트와": 2690f, "엄격한": 2735f, "제약": 2770f, "조건을": 2792f, "제공할수록,": 2827f
 * 비주얼 컨셉: 화면 상단에서 강한 레이저 선들이 내려와 작업 영역의 '가이드라인'을 선명하게 그립니다. 룰러(Ruler)의 눈금들이 '엄격한' 타이밍에 맞춰 정렬되는 쾌감을 줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Laser Guideline and Ruler Alignment Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: AI는 우리가 정확히 원하는 형태의 코드를 오차 없이 생성해 냅니다.
 * 단어 등장 타이밍: "AI는": 2888f, "우리가": 2917f, "정확히": 2932f, "원하는": 2959f, "형태의": 2992f, "코드를": 3014f, "오차": 3043f, "없이": 3060f, "생성해": 3079f, "냅니다.": 3110f
 * 비주얼 컨셉: '오차 없음'을 뜻하는 0.00%의 수치가 소수점 아래까지 정확히 일치하며 정지하는 UI를 배경에 깔아둡니다. 완벽하게 핏(Fit)되는 퍼즐 조각이 맞춰지는 연출을 통해 마무리합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Zero-Error Counter Display and Puzzle Fit Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 까다로웠던 테스트 코드 작성도 더 이상 고통스러운 작업이 아닙니다.
 * 단어 등장 타이밍: "까다로웠던": 3150f, "테스트": 3196f, "코드": 3225f, "작성도": 3246f, "더": 3274f, "이상": 3283f, "고통스러운": 3305f, "작업이": 3352f, "아닙니다.": 3378f
 * 비주얼 컨셉: 가시 돋친 덩굴처럼 보이던 복잡한 로직의 실타래가 AI의 힘에 의해 부드럽게 풀리며 직선 형태로 가지런히 놓이는 시각적 정화(Purify)를 표현합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Logic Untangling and Purification Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 핵심 비즈니스 로직만 주어지면 엣지 케이스까지 꼼꼼하게 고려한
 * 단어 등장 타이밍: "핵심": 3433f, "비즈니스": 3456f, "로직만": 3505f, "주어지면": 3542f, "엣지": 3590f, "케이스까지": 3610f, "꼼꼼하게": 3659f, "고려한": 3694f
 * 비주얼 컨셉: 레이다 스코프(Radar Scope)가 나타나며, 일반적인 경로가 아닌 테두리(Edge) 지점을 스캔하며 데이터를 수집하는 펄스를 보여줍니다. 촘촘한 그물망(Grid)이 엣지까지 커버합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Radar Scope Scan and Edge Grid Alignment Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 완벽한 테스트 스위트를 자동으로 구성해 줍니다.
 * 단어 등장 타이밍: "완벽한": 3726f, "테스트": 3754f, "스위트를": 3770f, "자동으로": 3807f, "구성해": 3829f, "줍니다.": 3858f
 * 비주얼 컨셉: 수많은 체크박스들이 일렬로 정렬되며 순차적으로 'V' 표시가 채워지는 역동적인 성공 모션을 연출합니다. 견고한 '방패' 혹은 '테리어' 느낌의 시스템 노드가 활성화되며 마무리됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Rapid Checkbox Sequence and Defense Node Activation Animation */}
    </AbsoluteFill>
  );
};

export const Body2Sequences: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={280}>
        <Scene1 />
      </Sequence>
      <Sequence from={280} durationInFrames={278}>
        <Scene2 />
      </Sequence>
      <Sequence from={558} durationInFrames={330}>
        <Scene3 />
      </Sequence>
      <Sequence from={888} durationInFrames={196}>
        <Scene4 />
      </Sequence>
      <Sequence from={1084} durationInFrames={240}>
        <Scene5 />
      </Sequence>
      <Sequence from={1324} durationInFrames={241}>
        <Scene6 />
      </Sequence>
      <Sequence from={1565} durationInFrames={287}>
        <Scene7 />
      </Sequence>
      <Sequence from={1852} durationInFrames={224}>
        <Scene8 />
      </Sequence>
      <Sequence from={2076} durationInFrames={254}>
        <Scene9 />
      </Sequence>
      <Sequence from={2330} durationInFrames={315}>
        <Scene10 />
      </Sequence>
      <Sequence from={2645} durationInFrames={243}>
        <Scene11 />
      </Sequence>
      <Sequence from={2888} durationInFrames={262}>
        <Scene12 />
      </Sequence>
      <Sequence from={3150} durationInFrames={283}>
        <Scene13 />
      </Sequence>
      <Sequence from={3433} durationInFrames={293}>
        <Scene14 />
      </Sequence>
      <Sequence from={3726} durationInFrames={230}>
        <Scene15 />
      </Sequence>
    </>
  );
};
