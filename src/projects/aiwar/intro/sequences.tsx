/**
 * [Section Global Context]
 * 주제: 현대 전쟁에 도입된 AI 시스템과 거대 언어 모델의 위험성
 * 내용 요약: 미국이 이란을 공격한 실제 사례를 통해, 단 24시간 만에 1,000개가 넘는 표적을 타격한 압도적인 군사 작전의 배후에 AI가 있음을 밝힌다. 특히 우리가 일상적으로 사용하는 '클로드(Claude)'와 같은 AI 시스템이 전쟁에 활용되었다는 충격적인 사실을 전달하여, AI가 실전에서 어떻게 쓰이고 어떤 위험을 갖는지 예고하며 시청자의 이목을 끈다.
 * 
 * ## 2. 섹션 개요
 * 
 * | 항목      | 값 |
 * | --------- | --- |
 * | 총 길이   | 35023ms |
 * | 총 프레임 | 1051f |
 * | Scene 수  | 5 |
 * 
 * - `src/constants/theme.ts`에 명시된 디자인 토큰을 엄격히 준수한다.
 * 
 * ### 🚨 페르소나
 * 
 * [타겟 시청자]
 * AI에 관심은 있지만, 전문 용어가 어렵고 복잡하게 느껴져서 시작하기 망설여지는 20~50 직장인 및 일반인
 * 
 * [영상 스타일]
 * 
 * - 톤앤매너: 친근함, 쉬운 설명, 따뜻함, 스케치, 아날로그
 * - 디자인 스타일: 펜으로 직접 그린 듯한 스케치 스타일 UI, 크림색 종이 배경 위에 마커와 펜으로 핵심 내용을 요약하며, 자유롭고 생동감 넘치는 드로잉 애니메이션으로 복잡한 AI 트렌드를 쉽게 설명한다
 * - 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다. 맥락에 맞는 시각적 디자인을 svg와 canvas 그림으로 계획하세요.
 */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';
import { WorldMap } from '../components/WorldMap';
import { CurvedArrow } from '../components/CurvedArrow';
import { AnalogTimer } from '../components/AnalogTimer';
import { TargetStamp } from '../components/TargetStamp';
import { AIBrain } from '../components/AIBrain';
import { ClaudeLogo } from '../components/ClaudeLogo';
import { TextPrompt } from '../components/TextPrompt';
import { MilitaryHelmet } from '../components/MilitaryHelmet';
import { TerminalWindow } from '../components/TerminalWindow';
import { WarningMark } from '../components/WarningMark';
import { SplitCanvas } from '../components/SplitCanvas';
import { AISymbols } from '../components/AISymbols';
import { ExplosionLines } from '../components/ExplosionLines';



/**
 * [Scene 1]
 * - 원본 텍스트: 올해 초, 미국이 이란을 공격했습니다.
 * - 단어 등장 프레임: { "올해": 0f, "초,": 7f, "미국이": 11f, "이란을": 23f, "공격했습니다.": 33f }
 * - 타임라인: 0f 부터 시작 (총 61f 지속)
 * - 비주얼 컨셉: 크림색 종이 배경 중앙에 미 대륙과 중동 지역을 나타내는 러프한 지도가 펜 드로잉으로 그려진다. '미국' 위치에서 출발한 붉은색 마커 화살표가 포물선을 그리며 '이란' 위치로 빠르고 강렬하게 꽂힌다.
 * - 필요한 그림(svg, canvas) 컴포넌트: 세계 지도 스케치, 붉은색 곡선 화살표
 * ─── COMPONENTS ───────────────────────────────
 * - <WorldMap progress={p} color={COLORS.PRIMARY} />
 * - <CurvedArrow progress={p} color={COLORS.ACCENT} />
 * ──────────────────────────────────────────────
 */
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const arrowProgress = spring({
    frame: frame - 15,
    fps,
    config: ANIMATION.SPRING_SNAPPY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 150 }}>
        <div style={{ width: 800, height: 600, position: 'relative' }}>
          <WorldMap progress={progress} color={COLORS.TEXT_MAIN} />
          <CurvedArrow 
            progress={arrowProgress} 
            color={COLORS.PRIMARY} 
            startPos={{ x: 250, y: 300 }} 
            endPos={{ x: 550, y: 320 }} 
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/**
 * [Scene 2]
 * - 원본 텍스트: 작전 시작 첫 24시간 안에 1,000개가 넘는 표적이 타격됐는데, 사실 말이 안 되는 규모의 작전이죠.
 * - 단어 등장 프레임: { "작전": 61f, "시작": 79f, "첫": 87f, "24시간": 93f, "안에": 119f, "1,000개가": 142f, "넘는": 146f, "표적이": 155f, "타격됐는데,": 168f, "사실": 194f, "말이": 207f, "안": 211f, "되는": 215f, "규모의": 224f, "작전이죠.": 236f }
 * - 타임라인: 61f 부터 시작 (총 198f 지속)
 * - 비주얼 컨셉: 화면 중앙에 스케치된 커다란 아날로그 타이머가 등장하고, 시곗바늘이 매우 빠르게 24시간을 회전한다. 타이머 주변으로 수많은 빨간색 과녁(타겟) 표식들이 스탬프가 찍히듯 화면 곳곳에 쾅쾅 겹쳐 나타나며 압도적인 공격 규모를 시각화한다.
 * - 필요한 그림(svg, canvas) 컴포넌트: 아날로그 24시간 타이머 스케치, 붉은색 타겟(과녁) 스탬프
 * ─── COMPONENTS ───────────────────────────────
 * - <AnalogTimer progress={p} color={COLORS.PRIMARY} />
 * - <TargetStamp progress={p} color={COLORS.ACCENT} />
 * ──────────────────────────────────────────────
 */
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timerProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const stampFrame = frame - 60;
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 150 }}>
        <div style={{ width: 600, height: 600, position: 'relative' }}>
          <AnalogTimer progress={timerProgress} color={COLORS.TEXT_MAIN} />
          {Array.from({ length: 12 }).map((_, i) => {
            const startFrame = i * 8;
            const progress = spring({
              frame: stampFrame - startFrame,
              fps,
              config: ANIMATION.SPRING_BOUNCY,
            });
            
            if (stampFrame < startFrame) return null;

            // Random positions around the timer
            const angle = (i / 12) * Math.PI * 2;
            const radius = 250 + Math.random() * 100;
            const x = Math.cos(angle) * radius + 300;
            const y = Math.sin(angle) * radius + 300;

            return (
              <div 
                key={i} 
                style={{ 
                  position: 'absolute', 
                  left: x, 
                  top: y, 
                  transform: `translate(-50%, -50%) scale(${progress})`,
                  opacity: progress,
                }}
              >
                <TargetStamp progress={1} color={COLORS.PRIMARY} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/**
 * [Scene 3]
 * - 원본 텍스트: 역시나 이 작전의 중심에는 AI가 있었습니다. 그리고 그 AI 시스템 안에, 여러분이 매일 쓰는 클로드가 있었어요.
 * - 단어 등장 프레임: { "역시나": 259f, "이": 274f, "작전의": 279f, "중심에는": 294f, "AI가": 317f, "있었습니다.": 330f, "그리고": 360f, "그": 382f, "AI": 388f, "시스템": 393f, "안에,": 413f, "여러분이": 429f, "매일": 444f, "쓰는": 451f, "클로드가": 459f, "있었어요.": 473f }
 * - 타임라인: 259f 부터 시작 (총 235f 지속)
 * - 비주얼 컨셉: 이전 씬의 타겟 표식들이 스르륵 지워지고, 펜 드로잉 스타일의 거대한 AI 두뇌 일러스트가 그려진다. 두뇌 중앙으로 화면이 줌인되자, 톱니바퀴 대신 우리에게 익숙한 '클로드(Claude)'의 로고와 텍스트 프롬프트 창이 내부 기계 장치처럼 그려져 반전을 준다.
 * - 필요한 그림(svg, canvas) 컴포넌트: AI 두뇌 스케치, 클로드(Claude) 로고, 텍스트 프롬프트 스케치
 * ─── COMPONENTS ───────────────────────────────
 * - <AIBrain progress={p} color={COLORS.PRIMARY} />
 * - <ClaudeLogo progress={p} color={COLORS.ACCENT} />
 * - <TextPrompt progress={p} color={COLORS.SECONDARY} />
 * ──────────────────────────────────────────────
 */
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainProgress = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const zoomProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(zoomProgress, [0, 1], [1, 2.5]);
  const opacity = interpolate(zoomProgress, [0.4, 0.8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill 
        style={{ 
          justifyContent: 'center', 
          alignItems: 'center', 
          paddingBottom: 150,
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ width: 600, height: 600, position: 'relative' }}>
          <div style={{ opacity: 1 - opacity }}>
            <AIBrain progress={brainProgress} color={COLORS.TEXT_MAIN} />
          </div>
          <div 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              opacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <ClaudeLogo progress={zoomProgress} color={COLORS.PRIMARY} size={150} />
            <TextPrompt progress={zoomProgress} color={COLORS.SECONDARY} width={300} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/**
 * [Scene 4]
 * - 원본 텍스트: 오늘은 AI가 실제 전쟁에서 어떻게 사용되고 있는지, 어떤 위험성을 가지고 있는지 실제 사건을 통해 보여드릴게요.
 * - 단어 등장 프레임: { "오늘은": 494f, "AI가": 512f, "실제": 520f, "전쟁에서": 531f, "어떻게": 553f, "사용되고": 570f, "있는지,": 592f, "어떤": 611f, "위험성을": 626f, "가지고": 642f, "있는지": 658f, "실제": 674f, "사건을": 688f, "통해": 695f, "보여드릴게요.": 703f }
 * - 타임라인: 494f 부터 시작 (총 239f 지속)
 * - 비주얼 컨셉: 화면이 좌우로 나뉘며, 왼쪽은 거친 선으로 그려진 군용 헬멧이, 오른쪽은 코드가 흘러내리는 스크린 혹은 인공지능 터미널 창이 스케치된다. 두 요소 사이로 굵고 강렬한 붉은색 느낌표나 경고등이 깜빡이는 연출이 더해져, 실전 군사 작전과 AI의 위험한 결합을 경고한다.
 * - 필요한 그림(svg, canvas) 컴포넌트: 군용 헬멧 스케치, AI 터미널 창 스케치, 붉은색 경고 마크(느낌표)
 * ─── COMPONENTS ───────────────────────────────
 * - <MilitaryHelmet progress={p} color={COLORS.PRIMARY} />
 * - <TerminalWindow progress={p} color={COLORS.SECONDARY} />
 * - <WarningMark progress={p} color={COLORS.ACCENT} />
 * ──────────────────────────────────────────────
 */
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const warningProgress = spring({
    frame: frame - 45,
    fps,
    config: ANIMATION.SPRING_BOUNCY,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ flexDirection: 'row', paddingBottom: 150 }}>
        {/* Left Side: Military Helmet */}
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateX(${(1 - entrance) * -100}px)`,
            opacity: entrance,
          }}
        >
          <MilitaryHelmet progress={entrance} color={COLORS.TEXT_MAIN} size={400} />
        </div>

        {/* Right Side: AI Terminal */}
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            transform: `translateX(${(1 - entrance) * 100}px)`,
            opacity: entrance,
          }}
        >
          <TerminalWindow progress={entrance} color={COLORS.SECONDARY_DARK} width={450} />
        </div>

        {/* Center: Warning Mark */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '40%', 
            left: '50%', 
            transform: `translate(-50%, -50%) scale(${warningProgress})`,
            opacity: warningProgress,
            zIndex: Z.UI,
          }}
        >
          <WarningMark progress={warningProgress} color={COLORS.PRIMARY_DARK} size={200} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};


/**
 * [Scene 5]
 * - 원본 텍스트: 그리고 마지막엔, GPT, GEMINI, 클로드에게 각각 전쟁 시뮬레이션을 시켰을 때 나온 충격적인 결과도 기다리고 있으니 끝까지 시청해주세요.
 * - 단어 등장 프레임: { "그리고": 733f, "마지막엔,": 755f, "GPT,": 783f, "GEMINI,": 796f, "클로드에게": 827f, "각각": 851f, "전쟁": 859f, "시뮬레이션을": 870f, "시켰을": 893f, "때": 905f, "나온": 911f, "충격적인": 922f, "결과도": 942f, "기다리고": 957f, "있으니": 979f, "끝까지": 996f, "시청해주세요.": 1006f }
 * - 타임라인: 733f 부터 시작 (총 318f 지속)
 * - 비주얼 컨셉: 칠판 느낌의 마분지 배경 위로 GPT, 제미나이(GEMINI), 클로드(Claude)의 세 가지 상징적인 형태 캔버스가 분할되어 빠르게 그려진다. 이내 이 세 화면 밑에서 크고 검은 폭발 버섯구름이 번지듯 스케치되며, AI 시뮬레이션의 파괴적이고 충격적인 결과를 암시한다.
 * - 필요한 그림(svg, canvas) 컴포넌트: 3분할 캔버스, GPT/제미나이/클로드 심볼, 버섯구름 폭발 스케치
 * ─── SIMPLIFIED ──────────────────────────────
 * - 사용 컴포넌트: <ExplosionLines progress={p} color={COLORS.ACCENT} />
 * - 단순화 이유: 버섯구름 폭발은 <line> 여러 개 방사형 분산 및 원형 확장 애니메이션으로 대체
 * ─────────────────────────────────────────────
 * ─── COMPONENTS ───────────────────────────────
 * - <SplitCanvas progress={p} color={COLORS.SECONDARY} />
 * - <AISymbols progress={p} color={COLORS.PRIMARY} type="GPT" />
 * - <ExplosionLines progress={p} color={COLORS.ACCENT} />
 * ──────────────────────────────────────────────
 */
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: ANIMATION.SPRING_GENTLE,
  });

  const explosionStartFrame = 120;
  const explosionProgress = spring({
    frame: frame - explosionStartFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_BASE }}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 150 }}>
        {/* Split Canvas Background */}
        <div style={{ width: '90%', height: '70%', position: 'relative' }}>
          <SplitCanvas progress={entrance} color={COLORS.STROKE_DEFAULT} />
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }}>
            {/* GPT Segment */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: entrance }}>
              <AISymbols progress={entrance} color={COLORS.TEXT_MAIN} type="GPT" size={120} />
            </div>
            {/* Gemini Segment */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: entrance }}>
              <AISymbols progress={entrance} color={COLORS.TEXT_MAIN} type="GEMINI" size={120} />
            </div>
            {/* Claude Segment */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: entrance }}>
              <AISymbols progress={entrance} color={COLORS.TEXT_MAIN} type="CLAUDE" size={120} />
            </div>
          </div>

          {/* Explosion Lines */}
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '10%', 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: '100%', 
              height: '100%',
              pointerEvents: 'none',
              zIndex: Z.TOP,
            }}
          >
            <ExplosionLines progress={explosionProgress} color={COLORS.PRIMARY_DARK} />
          </div>
        </div>
      </AbsoluteFill>
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
