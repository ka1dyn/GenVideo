/**
 * [Section Global Context]
 * 주제: AI가 중심이 된 현대 전쟁의 실상과 위험성
 * 내용 요약: 미국이 이란을 공격할 때 사용된 AI 시스템 배후에 '클로드'가 있었음을 밝히며, 전쟁에서 AI의 실제 활용 사례와 위험성을 탐구합니다. 특히 GPT, GEMINI, 클로드의 전쟁 시뮬레이션 결과가 가져온 충격적인 내용을 예고하며 시청자의 흥미를 유발합니다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 35023ms |
 * | 총 프레임 | 1051f |
 * | Scene 수  | 5 |
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
 * - 원본 텍스트: 올해 초, 미국이 이란을 공격했습니다.
 * - 단어 등장 프레임: { "올해": 0f, "초,": 7f, "미국이": 11f, "이란을": 23f, "공격했습니다.": 33f }
 * - 타임라인: 0f 부터 시작 (총 61f 지속)
 * - 비주얼 컨셉: 가장 어두운 `BG_DARKEST` 배경에서 시작합니다. 화면 중앙에 '올해 초'라는 텍스트가 강렬한 광폭 비출 효과와 함께 나타나며, '미국'과 '이란' 지명 사이로 캔버스를 활용한 수백 개의 붉은색(`STATE_ERROR_FG`) 공격 탄도 선들이 리드미컬하고 빠르게 그려집니다. 지도를 디지털 노이즈가 섞인 3D 그리드로 시각화하여 현대 전자전의 긴박함을 즉각적으로 전달합니다.
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
 * - 원본 텍스트: 작전 시작 첫 24시간 안에 1,000개가 넘는 표적이 타격됐는데, 사실 말이 안 되는 규모의 작전이죠.
 * - 단어 등장 프레임: { "작전": 61f, "시작": 79f, "첫": 87f, "24시간": 93f, "안에": 119f, "1,000개가": 142f, "넘는": 146f, "표적이": 155f, "타격됐는데,": 168f, "사실": 194f, "말이": 207f, "안": 211f, "되는": 215f, "규모의": 224f, "작전이죠.": 236f }
 * - 타임라인: 61f 부터 시작 (총 198f 지속)
 * - 비주얼 컨셉: 화면 정중앙에 '24:00:00' 타이머가 `PRIMARY_BOLD` 색상으로 거대하게 카운트다운 되며, 그 파동에 맞춰 1,000개가 넘는 표적 마커들이 캔버스 화면을 가득 채울 정도로 폭발적으로 확산됩니다(Swarm Effect). '1,000+ TARGETS'라는 텍스트가 화면을 가로지르며 나타나고, `STATE_ERROR_FG` 색상의 파티클들이 지지직거리는 글리치 효과와 함께 타격의 규모감을 압도적으로 표현합니다.
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
 * - 원본 텍스트: 역시나 이 작전의 중심에는 AI가 있었습니다. 그리고 그 AI 시스템 안에, 여러분이 매일 쓰는 클로드가 있었어요.
 * - 단어 등장 프레임: { "역시나": 259f, "이": 274f, "작전의": 279f, "중심에는": 294f, "AI가": 317f, "있었습니다.": 330f, "그리고": 360f, "그": 382f, "AI": 388f, "시스템": 393f, "안에,": 413f, "여러분이": 429f, "매일": 444f, "쓰는": 451f, "클로드가": 459f, "있었어요.": 473f }
 * - 타임라인: 259f 부터 시작 (총 235f 지속)
 * - 비주얼 컨셉: `BG_DARKEST` 배경 속으로 카메라가 빨려 들어가는 듯한 3D 매트릭스 터널 효과를 캔버스로 구현합니다. 무수한 연산 노드들이 스쳐 지나가고, 터널의 끝에서 'Claude' 로고가 `PRIMARY` 빛을 발하며 극적으로 등장합니다. AI의 거대한 지능 시스템 내부에 숨겨진 핵심 엔진을 발견하는 듯한 미스테리하고 강력한reveal 영상을 연출합니다.
 * - 필요한 그림(svg) 컴포넌트: ClaudeLogo (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <BrandLogo type="Claude" progress={p} />
 * - 변경 이유: BrandLogo 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
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
 * - 원본 텍스트: 오늘은 AI가 실제 전쟁에서 어떻게 사용되고 있는지, 어떤 위험성을 가지고 있는지 실제 사건을 통해 보여드릴게요.
 * - 단어 등장 프레임: { "오늘은": 494f, "AI가": 512f, "실제": 520f, "전쟁에서": 531f, "어떻게": 553f, "사용되고": 570f, "있는지,": 592f, "어떤": 611f, "위험성을": 626f, "가지고": 642f, "있는지": 658f, "실제": 674f, "사건을": 688f, "통해": 695f, "보여드릴게요.": 703f }
 * - 타임라인: 494f 부터 시작 (총 239f 지속)
 * - 비주얼 컨셉: 화면이 고속으로 좌우 분할되며, 왼쪽에는 'Clean AI UI'가, 오른쪽에는 'Messy War Data'가 대비됩니다. 두 세계 사이를 가로지르는 붉은색(`STATE_ERROR_FG`) 데이터 스트림이 강하게 요동치며, 시스템 뒤에 숨겨진 잔혹한 진실을 파헤치는 다큐멘터리풍의 세련된 몽타쥬를 구성합니다. 텍스트는 긴장감 있게 떨리는 효과를 줍니다.
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
 * - 원본 텍스트: 그리고 마지막엔, GPT, GEMINI, 클로드에게 각각 전쟁 시뮬레이션을 시켰을 때 나온 충격적인 결과도 기다리고 있으니 끝까지 시청해주세요.
 * - 단어 등장 프레임: { "그리고": 733f, "마지막엔,": 755f, "GPT,": 783f, "GEMINI,": 796f, "클로드에게": 827f, "각각": 851f, "전쟁": 859f, "시뮬레이션을": 870f, "시켰을": 893f, "때": 905f, "나온": 911f, "충격적인": 922f, "결과도": 942f, "기다리고": 957f, "있으니": 979f, "끝까지": 996f, "시청해주세요.": 1006f }
 * - 타임라인: 733f 부터 시작 (총 318f 지속)
 * - 비주얼 컨셉: GPT, GEMINI, Claude 로고가 긴박한 심장 박동 소리에 맞춰 화면에서 크게 펌핑(Pumping)됩니다. 화면 전체에 적색 경보(`STATE_ERROR_BG`)가 점멸하며, 'NUCLEAR SIMULATION 95%'라는 경고 문구가 거대한 진동과 함께 화면을 덮습니다. 마지막 순간에 모든 그래픽이 암전(Blackout)되며 시청자의 몰입을 최고조로 끌어올립니다.
 * - 필요한 그림(svg) 컴포넌트: AIModelGrid (SVG)
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <DataNetwork type="grid" progress={p} />
 * - 변경 이유: DataNetwork 공통 컴포넌트로 통합
 * ─────────────────────────────────────────────
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

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={61}>
        <Scene1 />
      </Sequence>
      <Sequence from={61} durationInFrames={198}>
        <Scene2 />
      </Sequence>
      <Sequence from={259} durationInFrames={235}>
        <Scene3 />
      </Sequence>
      <Sequence from={494} durationInFrames={239}>
        <Scene4 />
      </Sequence>
      <Sequence from={733} durationInFrames={318}>
        <Scene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
