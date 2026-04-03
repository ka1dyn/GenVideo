import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 웹 개발의 패러다임이 완전히 바뀌고 있습니다.
 * 단어 등장 타이밍: "웹": 1f, "개발의": 13f, "패러다임이": 25f, "완전히": 57f, "바뀌고": 77f, "있습니다.": 97f
 * 비주얼 컨셉: 어두운 터미널 배경 위로 네온 블루 컬러의 그리드가 빠르게 흐르며 하이테크 분위기를 조성합니다. 중앙에 타이포그래피가 순차적으로 등장하며, 배경의 그리드 간격이 조절되면서 '패러다임의 변화'를 기하학적으로 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* TODO: Implement Grid Animation */}
      {/* TODO: Implement Typography Sequence */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만,
 * 단어 등장 타이밍: "과거에는": 136f, "모든": 190f, "컴포넌트를": 204f, "바닥부터": 259f, "직접": 310f, "작성해야": 328f, "했지만,": 364f
 * 비주얼 컨셉: 수많은 코드 라인들이 복잡하게 얽혀 있는 추상적인 레이아웃을 보여줍니다. '바닥부터' 텍스트 등장 시 빈 캔버스에 아주 작은 사각형들이 격자 형태로 배치되는 연출을 통해 고전적인 개발 방식을 표현합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Complex Code Line Layout */}
      {/* TODO: Implement Grid Square Layout Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다.
 * 단어 등장 타이밍: "이제는": 392f, "AI가": 420f, "우리의": 437f, "가장": 463f, "든든한": 481f, "페어": 508f, "프로그래머가": 526f, "되었습니다.": 585f
 * 비주얼 컨셉: 두 개의 사각형 레이아웃이 서로 연결되며 '페어' 계약을 맺는 듯한 로직 라인을 시각화합니다. 한쪽 사각형(AI)에서 반대쪽(개발자)으로 데이터 펄스가 끊임없이 흐르며 협업의 역동성을 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Connected Layouts */}
      {/* TODO: Implement Data Pulse Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다.
 * 단어 등장 타이밍: "디자인에서": 647f, "개발로": 714f, "넘어가는": 757f, "과정의": 808f, "병목현상도": 847f, "눈에": 926f, "띄게": 934f, "사라졌습니다.": 949f
 * 비주얼 컨셉: 좁은 통로를 통과하던 데이터 구슬들이 넓은 공간으로 쏟아져 나오는 애니메이션을 통해 '병목현상 해소'를 은유합니다. 피그마 레이어 같은 UI 노드들이 순식간에 코드 블록으로 변환되는 찰나를 기하학적으로 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Bottleneck Resolution Animation */}
      {/* TODO: Implement UI Node to Code Transformation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 이제는 스케치 한 장이나 간단한 프롬프트만으로도
 * 단어 등장 타이밍: "이제는": 1003f, "스케치": 1043f, "한": 1091f, "장이나": 1096f, "간단한": 1137f, "프롬프트만으로도": 1175f
 * 비주얼 컨셉: 거친 스케치 라인이 투명한 블록으로 변하며 정교한 UI 컴포넌트의 뼈대를 형성합니다. 프롬프트 타이핑 효과가 나타나며 명령어 라인이 빛의 줄기로 변해 블록들을 채웁니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Sketch to Block Animation */}
      {/* TODO: Implement Prompt Typing and Light Beam Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: 곧바로 작동하는 프로토타입이 생성되는 마법 같은 일이 일어납니다.
 * 단어 등장 타이밍: "곧바로": 1282f, "작동하는": 1303f, "프로토타입이": 1332f, "생성되는": 1375f, "마법": 1404f, "같은": 1418f, "일이": 1433f, "일어나갑니다.": 1447f
 * 비주얼 컨셉: 정적인 UI 블록에 'Run' 상태를 뜻하는 상태바가 로딩되자마자, 요소들이 실시간으로 상호작용(Hover, Click)하는 듯한 마이크로 애니메이션 피드백을 보여줍니다. 빛나는 파티클이 전체 레이아웃을 휩쓸며 완성되는 과정을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Run Status Bar and Interaction Feedback */}
      {/* TODO: Implement Particle Sweep Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다.
 * 단어 등장 타이밍: "단순히": 1573f, "코드를": 1606f, "짜주는": 1635f, "것을": 1666f, "넘어,": 1687f, "시스템": 1718f, "아키텍처를": 1735f, "설계하고": 1774f, "최적화": 1811f, "포인트까지": 1834f, "제안합니다.": 1878f
 * 비주얼 컨셉: 평면적인 코드 리스트 위로 입체적(3D feel)인 아키텍처 다이어그램이 떠오릅니다. 데이터 흐름의 비효율적인 구간을 강조(Highlight)하고, AI가 이를 최적화된 경로로 재배치하는 로직 시퀀스를 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement 3D Architecture Diagram */}
      {/* TODO: Implement Route Optimization Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠.
 * 단어 등장 타이밍: "마치": 1921f, "수십": 1946f, "년": 1980f, "경력의": 1984f, "시니어": 2022f, "개발자가": 2065f, "항상": 2112f, "내": 2131f, "옆에": 2149f, "앉아": 2161f, "코드를": 2185f, "리뷰해": 2213f, "주는": 2240f, "것과": 2258f, "같죠.": 2279f
 * 비주얼 컨셉: 코드 에디터 옆에 정교한 '리뷰 위젯' 패널이 슬라이드되어 나타납니다. 시니어의 통찰력을 상징하는 화이트 컬러의 가이드 라인들이 코드의 핵심 로직을 연결하며 신뢰감을 주는 모션을 연출합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Review Widget Panel */}
      {/* TODO: Implement Insight Guide Lines Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어,
 * 단어 등장 타이밍: "이러한": 2314f, "변화는": 2350f, "단순히": 2378f, "개인의": 2411f, "코딩": 2443f, "속도를": 2465f, "높이는": 2497f, "것을": 2530f, "넘어,": 2551f
 * 비주얼 컨셉: 단일 스레드였던 작업 라인이 여러 갈래로 확장되며 전광판의 숫자(속도 데이터)가 급격히 상승하는 UI를 보여줍니다. 스피드감 있는 배경 모션이 적용됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Thread Expansion Animation */}
      {/* TODO: Implement Speed Counter Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다.
 * 단어 등장 타이밍: "팀": 2579f, "전체의": 2587f, "애자일한": 2612f, "협업": 2636f, "방식을": 2651f, "근본적으로": 2673f, "재정의하고": 2710f, "있습니다.": 2746f
 * 비주얼 컨셉: 흩어져 있던 노드들이 '애자일' 루프(Loop)를 형성하며 중앙으로 집결합니다. 팀 전체가 하나의 유기체처럼 움직이는 흐름을 기하학적인 원형 모션으로 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Agile Loop Animation */}
      {/* TODO: Implement Node Collection Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다.
 * 단어 등장 타이밍: "우리는": 2792f, "더": 2830f, "빠르게": 2853f, "실패하고,": 2885f, "더": 2938f, "빨리": 2962f, "혁신할": 2965f, "수": 2985f, "있게": 2993f, "되었습니다.": 3009f
 * 비주얼 컨셉: 오류 발생(Red Pulse) 직후 순식간에 보정(Green Pulse)되는 과정을 시각화하여 '빠른 실패와 혁신'의 사이클을 표현합니다. 사이클이 반복될수록 중앙의 코어 오브젝트가 더욱 정교해집니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Error to Correction Pulse Cycle */}
      {/* TODO: Implement Evolving Core Object Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 유명한 개발자는 이렇게 말했습니다.
 * 단어 등장 타이밍: "유명한": 3062f, "개발자는": 3092f, "이렇게": 3134f, "말했습니다.": 3167f
 * 비주얼 컨셉: 무대 조명이 켜지는 듯한 연출과 함께 화면 상단에 인용구(Quote) 마크가 로드됩니다. 집중도를 높이기 위해 배경 그리드 노이즈를 잠시 정지시킵니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Spotlight and Quote Mark Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: "미래의 코딩은 타이핑이 아니라 대화가 될 것이다."
 * 단어 등장 타이밍: "미래의": 3228f, "코딩은": 3253f, "타이핑이": 3284f, "아니라": 3384f, "대화가": 3401f, "될": 3418f, "것이다.": 3422f
 * 비주얼 컨셉: 키보드 입력 애니메이션이 소리 파동(Voice Waveform)의 형태로 변이되는 모핑 기법을 사용합니다. 기계적인 타이핑 사운드 비주얼이 부드러운 유기적 파동으로 바뀌며 '대화'의 의미를 강조합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Keyboard to Waveform Morphing Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 결국 우리에게 가장 필요한 역량은 타건 속도가 아니라,
 * 단어 등장 타이밍: "결국": 3448f, "우리에게": 3491f, "가장": 3519f, "필요한": 3548f, "역량은": 3578f, "타건": 3621f, "속도가": 3630f, "아니라,": 3652f
 * 비주얼 컨셉: 모니터를 가득 채웠던 데이터 텍스트들이 사라지고, 사용자(개발자)를 상징하는 단일 노드가 화려하게 빛나기 시작합니다. '속도'보다는 '방향'을 상징하는 벡터 화살표가 등장합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Data Text Fading and Primary Node Highlight */}
      {/* TODO: Implement Directional Vector Arrow Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 문제를 정의하고 AI를 지휘하는 기획력이 될 것입니다.
 * 단어 등장 타이밍: "문제를": 3676f, "정의하고": 3715f, "AI를": 3744f, "지휘하는": 3799f, "기획력이": 3838f, "될": 3838f, "것입니다.": 3848f
 * 비주얼 컨셉: 지휘자의 지휘봉이 지나가는 궤적을 따라 AI 노드들이 일제히 정렬하며 거대한 시스템 지도를 완성합니다. '기획력' 텍스트가 대미를 장식하며 강렬한 빛을 내뿜으며 씬이 마무리됩니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Conductor Path and Node Alignment Animation */}
      {/* TODO: Implement Emphasized Text Animation */}
    </AbsoluteFill>
  );
};

export const IntroSequences: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={136}>
        <Scene1 />
      </Sequence>
      <Sequence from={136} durationInFrames={256}>
        <Scene2 />
      </Sequence>
      <Sequence from={392} durationInFrames={255}>
        <Scene3 />
      </Sequence>
      <Sequence from={647} durationInFrames={356}>
        <Scene4 />
      </Sequence>
      <Sequence from={1003} durationInFrames={279}>
        <Scene5 />
      </Sequence>
      <Sequence from={1282} durationInFrames={291}>
        <Scene6 />
      </Sequence>
      <Sequence from={1573} durationInFrames={348}>
        <Scene7 />
      </Sequence>
      <Sequence from={1921} durationInFrames={393}>
        <Scene8 />
      </Sequence>
      <Sequence from={2314} durationInFrames={265}>
        <Scene9 />
      </Sequence>
      <Sequence from={2579} durationInFrames={213}>
        <Scene10 />
      </Sequence>
      <Sequence from={2792} durationInFrames={270}>
        <Scene11 />
      </Sequence>
      <Sequence from={3062} durationInFrames={166}>
        <Scene12 />
      </Sequence>
      <Sequence from={3228} durationInFrames={220}>
        <Scene13 />
      </Sequence>
      <Sequence from={3448} durationInFrames={228}>
        <Scene14 />
      </Sequence>
      <Sequence from={3676} durationInFrames={304}>
        <Scene15 />
      </Sequence>
    </>
  );
};
