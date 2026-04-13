/**
 * [Section Global Context]
 * 주제: AI 전쟁 시스템 '프로젝트 메이븐'의 기원과 진화
 * 내용 요약: 2017년 쏟아지는 드론 영상 분석의 한계를 극복하기 위해 탄생한 '프로젝트 메이븐'을 소개합니다. 초기 영상 분석 도구에서 시작해 현재는 전쟁 전체를 운영하는 거대 시스템으로 성장했으며, 그 핵심에 클로드 AI가 있음을 설명합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 54451ms |
 * | 총 프레임 | 1634f |
 * | Scene 수  | 10 |
 * 
 * - 반드시 `src/constants/theme.ts`에 명시된 디자인 토큰을 확인하고 색상을 파악하세요.
 *
 * ### 🚨 페르소나 및 디자인 가이드
 * [역할] 당신은 유튜브 채널을 운영하는 트렌디한 IT 기업의 수석 UI/UX 모션그래픽 전문가이자 'React Remotion 개발자'입니다.
 * [채널명] 나만빼고 AI
 * [채널설명] AI 트렌드를 따라가고 싶은 일반인들을 위해 친근하게 스케치 느낌의 영상으로 이해하기 쉽게 설명하는 채널
 * [영상 분위기]
 * 매우중요: 이미 import된 컴포넌트(Wobble, DrawLine, PaperTexture 등)를 적극 활용해 스케치 느낌을 내지만, 주석 설명에 따라 깔끔하게 구현합니다.
 */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { Wobble } from '../../../shared-components/Wobble';
import { DrawLine } from '../../../shared-components/DrawLine';
import { PaperTexture } from '../../../shared-components/PaperTexture';

/**
 * [Scene 1]
 * - 원본 텍스트: 우선 이 작전의 중심에 있던 시스템, 프로젝트 메이븐에 대해 알아봐야합니다.
 * - 단어 등장 프레임: { "우선": 0f, "이": 10f, "작전의": 14f, "중심에": 27f, "있던": 41f, "시스템,": 50f, "프로젝트": 74f, "메이븐에": 80f, "대해": 93f, "알아봐야합니다.": 100f }
 * - 타임라인: 0f 부터 시작 (총 113f 지속)
 * - 비주얼 컨셉: `BG_BASE` 배경에 'Project Maven'이라는 타이틀이 `PRIMARY_BOLD` 색상으로 화면 중앙에 나타납니다. 타이틀 주변으로 시스템 연결망을 상징하는 가느다란 `STROKE_SUBTLE` 선들이 사방으로 뻗어 나가며 복잡한 네트워크 구조를 형성합니다. 배경에는 군사 기밀 문서를 연상시키는 격자 무늬가 은은하게 깔립니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * - 원본 텍스트: 메이븐을 이해하기 위해 2017년으로 한번 돌아가 보자구요.
 * - 단어 등장 프레임: { "메이븐을": 113f, "이해하기": 148f, "위해": 166f, "2017년으로": 176f, "한번": 208f, "돌아가": 217f, "보자구요.": 231f }
 * - 타임라인: 113f 부터 시작 (총 143f 지속)
 * - 비주얼 컨셉: 시간의 흐름을 보여주는 타임라인 UI가 하단에 나타나며, 슬라이더가 '2017' 숫자를 향해 빠르게 이동합니다. 화면 전체가 아날로그 필름 효과와 함께 약간의 노이즈가 섞인 `BG_MUTED` 톤으로 변하며 과거 회상 분위기를 연출합니다. 캔버스를 활용하여 연도 숫자가 부드럽게 카운트다운 되는 효과를 줍니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 당시 미국 국방부가 심각한 고민에 빠졌어요.
 * - 단어 등장 프레임: { "당시": 256f, "미국": 267f, "국방부가": 282f, "심각한": 298f, "고민에": 313f, "빠졌어요.": 329f }
 * - 타임라인: 256f 부터 시작 (총 100f 지속)
 * - 비주얼 컨셉: 미국 국방부 본청 건물을 연상시키는 추상적인 육각형 문양이 중앙에 배치됩니다. 주변에 '고민'을 상징하는 물음표 파티클들이 `PRIMARY` 색상의 도트 형태로 떠다닙니다. 문양 내부에서 데이터 과부하를 나타내는 붉은색(`STATE_ERROR_FG`) 경고 바가 차오르며 문제의 심각성을 표현합니다.
 * - 필요한 그림(svg) 컴포넌트: PentagonAbstract (SVG)
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * - 원본 텍스트: 전 세계에 깔린 군사 드론이 하루 24시간 영상을 찍어서 막 쏟아붓는데, 그걸 어떻게 사람이 일일히 다 보고 있겠어요.
 * - 단어 등장 프레임: { "전": 356f, "세계에": 359f, "깔린": 384f, "군사": 387f, "드론이": 416f, "하루": 420f, "24시간": 423f, "영상을": 443f, "찍어서": 459f, "막": 474f, "쏟아붓는데,": 479f, "그걸": 508f, "어떻게": 525f, "사람이": 528f, "일일히": 540f, "다": 551f, "보고": 555f, "있겠어요.": 563f }
 * - 타임라인: 356f 부터 시작 (총 229f 지속)
 * - 비주얼 컨셉: 화면이 수많은 작은 사각형 프레임들로 분할되어 드론의 실시간 피드를 시각화합니다. 각 프레임마다 추상적인 군사 기호들이 빠르게 교차하며, 이를 분석하느라 정지해 있는 인간 모양의 아이콘이 `OVERLAY_DARK`로 대비됩니다. 쏟아지는 데이터 패킷이 화면 위에서 아래로 흐르는 캔버스 애니메이션을 추가합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5]
 * - 원본 텍스트: "저게 군사 차량이야, 민간 차량이야?" 이러다가 전쟁이 먼저 끝나는 거죠.
 * - 단어 등장 프레임: { ""저게": 585f, "군사": 597f, "차량이야,": 609f, "민간": 639f, "차량이야?"": 651f, "이러다가": 685f, "전쟁이": 701f, "먼저": 716f, "끝나는": 722f, "거죠.": 735f }
 * - 타임라인: 585f 부터 시작 (총 164f 지속)
 * - 비주얼 컨셉: 드론의 타겟팅 UI가 두 가지 대상(군사 vs 민간) 사이에서 갈팡질팡하며 흔들립니다. 타겟팅 박스는 `STATE_WARN_FG` 색상으로 깜빡거리며, 두 명칭이 화면 좌우에서 빠르게 충돌하는 연출을 합니다. 결정의 불확실성을 표현하기 위해 화면 전체에 가벼운 글리치(Glitch) 효과를 줍니다.
 * - 필요한 그림(svg) 컴포넌트: DroneHUD (SVG)
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6]
 * - 원본 텍스트: 그래서 만든 게 메이븐이에요.
 * - 단어 등장 프레임: { "그래서": 749f, "만든": 766f, "게": 771f, "메이븐이에요.": 775f }
 * - 타임라인: 749f 부터 시작 (총 58f 지속)
 * - 비주얼 컨셉: 복잡했던 화면이 한순간에 정리되고 `SECONDARY_SOFT` 배경 위에 'MAVEN' 로고가 정갈하게 중앙에 배치됩니다. 로고 주변으로 깔끔한 경계선들이 사각형으로 그어지며 혼돈이 정리되는 질서 정연한 느낌을 줍니다. '해결책'으로서의 확고한 브랜딩 이미지를 강화합니다.
 * - 필요한 그림(svg) 컴포넌트: MavenLogo (SVG)
 */
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7]
 * - 원본 텍스트: Bloomberg 기자이자, 메이븐을 수년간 취재한 카트리나 맨슨은 이 시스템을 이렇게 표현했어요.
 * - 단어 등장 프레임: { "Bloomberg": 807f, "기자이자,": 848f, "메이븐을": 866f, "수년간": 883f, "취재한": 896f, "카트리나": 910f, "맨슨은": 928f, "이": 943f, "시스템을": 950f, "이렇게": 962f, "표현했어요.": 971f }
 * - 타임라인: 807f 부터 시작 (총 187f 지속)
 * - 비주얼 컨셉: 경제 전문 미디어의 뉴스 인터뷰 카드 UI가 나타납니다. 'Katrina Manson' 기자의 정보가 `TEXT_SUB`로 깔끔하게 하단에 배치되고, 배경에는 세련된 `BG_EMPHASIS` 패널이 깔립니다. 기자 소속인 Bloomberg의 로고가 `PRIMARY` 포인트 색상으로 상단 귀퉁이에 강조됩니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8]
 * - 원본 텍스트: "전쟁판 구글 어스예요. 고도, 좌표, 그 위치에 뭐가 있는지, 아군인지 적군인지. 이 모든 정보가 담긴 전쟁 지도예요."
 * - 단어 등장 프레임: { ""전쟁판": 994f, "구글": 1021f, "어스예요.": 1029f, "고도,": 1064f, "좌표,": 1077f, "그": 1091f, "위치에": 1096f, "뭐가": 1111f, "있는지,": 1121f, "아군인지": 1140f, "적군인지.": 1161f, "이": 1187f, "모든": 1201f, "정보가": 1202f, "담긴": 1216f, "전쟁": 1226f, "지도예요."": 1235f }
 * - 타임라인: 994f 부터 시작 (총 266f 지속)
 * - 비주얼 컨셉: 'War Google Earth'라는 문구가 화면을 가득 채웁니다. 캔버스 위에 고도, 좌표, 아군/적군 식별 코드 등 다양한 데이터 레이어들이 투명도 차이를 두고 층층이 쌓이는 입체적 효과를 보여줍니다. `PRIMARY`와 `SECONDARY` 컬러의 데이터 포인터들이 끊임없이 명멸하며 정보의 고도화를 시각화합니다.
 * - 필요한 그림(svg) 컴포넌트: 없음
 */
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9]
 * - 원본 텍스트: 처음에 드론 영상 분석 도구로 시작한 메이븐은, 8년이 지난 지금 전쟁 전체를 운영하는 시스템으로 커졌습니다.
 * - 단어 등장 프레임: { "처음에": 1260f, "드론": 1282f, "영상": 1287f, "분석": 1298f, "도구로": 1309f, "시작한": 1326f, "메이븐은,": 1341f, "8년이": 1364f, "지난": 1377f, "지금": 1386f, "전쟁": 1394f, "전체를": 1404f, "운영하는": 1415f, "시스템으로": 1431f, "커졌습니다.": 1454f }
 * - 타임라인: 1260f 부터 시작 (총 218f 지속)
 * - 비주얼 컨셉: 화면 왼쪽의 작은 점(2017)에서 시작하여 오른쪽의 거대한 네트워크 허브(2025)로 커지는 진화 다이어그램이 그려집니다. 단순 분석 캔버스에서 전쟁 전체를 운영하는 관제 시스템 UI로 모핑(Morphing)되며 규모의 확장을 상징합니다. 캔버스의 연결 선들이 점점 더 빽빽하고 유기적으로 바뀝니다.
 * - 필요한 그림(svg) 컴포넌트: GrowthChart (SVG)
 */
const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10]
 * - 원본 텍스트: 그리고 클로드가 이 시스템의 핵심 기능을 수행하고 있는거에요.
 * - 단어 등장 프레임: { "그리고": 1478f, "클로드가": 1490f, "이": 1511f, "시스템의": 1515f, "핵심": 1533f, "기능을": 1542f, "수행하고": 1555f, "있는거에요.": 1573f }
 * - 타임라인: 1478f 부터 시작 (총 156f 지속)
 * - 비주얼 컨셉: `BG_DARK` 배경으로 전환되며 시스템의 중심 핵(Core)으로 빨려 들어가는 듯한 줌인 효과를 줍니다. 중심에 'Claude'가 나타나고, 사방에서 메이븐의 데이터 관들이 이 중심핵을 향해 연결되는 연결 구조를 보여줍니다. '핵심 기능' 텍스트에 `PRIMARY` 빛을 발하는 글로우(Glow) 효과를 추가합니다.
 * - 필요한 그림(svg) 컴포넌트: ClaudeCore (SVG)
 */
const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // TODO: 구현 - 상단 주석에 따라 친근하게, 스케치 느낌으로 정성스럽게 구현하세요
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={113}>
        <Scene1 />
      </Sequence>
      <Sequence from={113} durationInFrames={143}>
        <Scene2 />
      </Sequence>
      <Sequence from={256} durationInFrames={100}>
        <Scene3 />
      </Sequence>
      <Sequence from={356} durationInFrames={229}>
        <Scene4 />
      </Sequence>
      <Sequence from={585} durationInFrames={164}>
        <Scene5 />
      </Sequence>
      <Sequence from={749} durationInFrames={58}>
        <Scene6 />
      </Sequence>
      <Sequence from={807} durationInFrames={187}>
        <Scene7 />
      </Sequence>
      <Sequence from={994} durationInFrames={266}>
        <Scene8 />
      </Sequence>
      <Sequence from={1260} durationInFrames={218}>
        <Scene9 />
      </Sequence>
      <Sequence from={1478} durationInFrames={156}>
        <Scene10 />
      </Sequence>
    </AbsoluteFill>
  );
};
