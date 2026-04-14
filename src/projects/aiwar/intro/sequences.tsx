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
 * - 비주얼 컨셉: {FILL_S1_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S1_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2]
 * - 원본 텍스트: 작전 시작 첫 24시간 안에 1,000개가 넘는 표적이 타격됐는데, 사실 말이 안 되는 규모의 작전이죠.
 * - 단어 등장 프레임: { "작전": 61f, "시작": 79f, "첫": 87f, "24시간": 93f, "안에": 119f, "1,000개가": 142f, "넘는": 146f, "표적이": 155f, "타격됐는데,": 168f, "사실": 194f, "말이": 207f, "안": 211f, "되는": 215f, "규모의": 224f, "작전이죠.": 236f }
 * - 타임라인: 61f 부터 시작 (총 198f 지속)
 * - 비주얼 컨셉: {FILL_S2_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S2_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3]
 * - 원본 텍스트: 역시나 이 작전의 중심에는 AI가 있었습니다. 그리고 그 AI 시스템 안에, 여러분이 매일 쓰는 클로드가 있었어요.
 * - 단어 등장 프레임: { "역시나": 259f, "이": 274f, "작전의": 279f, "중심에는": 294f, "AI가": 317f, "있었습니다.": 330f, "그리고": 360f, "그": 382f, "AI": 388f, "시스템": 393f, "안에,": 413f, "여러분이": 429f, "매일": 444f, "쓰는": 451f, "클로드가": 459f, "있었어요.": 473f }
 * - 타임라인: 259f 부터 시작 (총 235f 지속)
 * - 비주얼 컨셉: {FILL_S3_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S3_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4]
 * - 원본 텍스트: 오늘은 AI가 실제 전쟁에서 어떻게 사용되고 있는지, 어떤 위험성을 가지고 있는지 실제 사건을 통해 보여드릴게요.
 * - 단어 등장 프레임: { "오늘은": 494f, "AI가": 512f, "실제": 520f, "전쟁에서": 531f, "어떻게": 553f, "사용되고": 570f, "있는지,": 592f, "어떤": 611f, "위험성을": 626f, "가지고": 642f, "있는지": 658f, "실제": 674f, "사건을": 688f, "통해": 695f, "보여드릴게요.": 703f }
 * - 타임라인: 494f 부터 시작 (총 239f 지속)
 * - 비주얼 컨셉: {FILL_S4_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S4_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5]
 * - 원본 텍스트: 그리고 마지막엔, GPT, GEMINI, 클로드에게 각각 전쟁 시뮬레이션을 시켰을 때 나온 충격적인 결과도 기다리고 있으니 끝까지 시청해주세요.
 * - 단어 등장 프레임: { "그리고": 733f, "마지막엔,": 755f, "GPT,": 783f, "GEMINI,": 796f, "클로드에게": 827f, "각각": 851f, "전쟁": 859f, "시뮬레이션을": 870f, "시켰을": 893f, "때": 905f, "나온": 911f, "충격적인": 922f, "결과도": 942f, "기다리고": 957f, "있으니": 979f, "끝까지": 996f, "시청해주세요.": 1006f }
 * - 타임라인: 733f 부터 시작 (총 318f 지속)
 * - 비주얼 컨셉: {FILL_S5_VISUAL: 이 씬의 레이아웃,핵심 요소,연출 등을 간략하게 묘사한다. 정보량이 너무 많지 않도록 유의한다. }
 * - SVG 컴포넌트: {FILL_S5_SVG: 이 씬에서 포인트로 사용할 펜 드로잉 그림을 1개 이하로 작성한다. 필요하지 않다면 "없음"으로 작성}
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  {/* TODO: 구현 */}
  return (
    <AbsoluteFill>
      <PaperTexture />
      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}
      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}
      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}
      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}
    </AbsoluteFill>
  );
};

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={61}>
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
