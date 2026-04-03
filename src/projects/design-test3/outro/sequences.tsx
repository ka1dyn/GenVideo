import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { COLORS } from '../theme';

/**
 * [Scene 1 기획안]
 * 원본 텍스트: 기술의 발전 속도는 우리의 예상을 뛰어넘을 정도로 점점 더 빨라지고 있습니다.
 * 단어 등장 타이밍: "기술의": 0f, "발전": 29f, "속도는": 47f, "우리의": 77f, "예상을": 106f, "뛰어넘을": 135f, "정도로": 172f, "점점": 202f, "더": 218f, "빨라지고": 226f, "있습니다.": 256f
 * 비주얼 컨셉: 배경의 디지털 눈금들이 초고속으로 흐르기 시작하며, 'Velocity'를 상징하는 선 모양의 파티클들이 카메라 방향으로 쏟아집니다. 점점 밝아지는 네온 라인들이 발전 속도를 시각화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.BG_VOID }}>
      {/* TODO: Implement High-speed Scale and Particle Influx Animation */}
      {/* TODO: Implement Neon Velocity Lines Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 2 기획안]
 * 원본 텍스트: 당장 내년에는 또 어떤 혁신적인 도구가 등장하여 우리의 일하는 방식을 바꿀까요?
 * 단어 등장 타이밍: "당장": 299f, "내년에는": 324f, "또": 375f, "어떤": 388f, "혁신적인": 413f, "도구가": 464f, "등장하여": 502f, "우리의": 559f, "일하는": 589f, "방식을": 612f, "바꿀까요?": 638f
 * 비주얼 컨셉: 미지의 문이 열리듯 화면 중앙의 수평선이 상하로 벌어지며 새로운 차원의 공간이 나타납니다. 불확실하지만 거대한 가능성을 품은 큐브(Cube)들이 부유하는 신비스러운 연출을 시도합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene2: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Horizontal Split Space Opening Animation */}
      {/* TODO: Implement Floating Cube Potential Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 3 기획안]
 * 원본 텍스트: 일각에서는 AI가 개발자의 일자리를 대체할 것이라는 막연한 우려도 있습니다.
 * 단어 등장 타이밍: "일각에서는": 685f, "AI가": 743f, "개발자의": 763f, "일자리를": 808f, "대체할": 856f, "것이라는": 892f, "막연한": 937f, "우려도": 971f, "있습니다.": 1006f
 * 비주얼 컨셉: 화면 전체가 정적인 짙은 남색으로 가라앉으며, 텍스트가 노이즈 섞인 UI 뒤로 희미하게 흔들리는 '글리치(Glitch)' 효과가 간헐적으로 발생합니다. 무겁고 긴장감 있는 분위기를 조성합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene3: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Deep Navy Atmosphere and Glitch Effect Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 4 기획안]
 * 원본 텍스트: 하지만 역사가 증명하듯, 강력한 새로운 도구는 항상
 * 단어 등장 타이밍: "하지만": 1075f, "역사가": 1121f, "증명하듯,": 1172f, "강력한": 1227f, "새로운": 1285f, "도구는": 1318f, "항상": 1367f
 * 비주얼 컨셉: 어두웠던 화면을 가르는 찬란한 수직 광선이 등장합니다. 역사가 쌓여온 지층 레이어들이 굳건히 밑바탕에 깔리며 새로운 도구의 등장을 장엄하게 표현합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene4: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Vertical Ray and Historical Stratum Layer Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 5 기획안]
 * 원본 텍스트: 인간의 잠재력과 한계를 더욱 확장시켜 왔습니다.
 * 단어 등장 타이밍: "인간의": 1401f, "잠재력과": 1424f, "한계를": 1473f, "더욱": 1502f, "확장시켜": 1523f, "왔습니다.": 1571f
 * 비주얼 컨셉: 중앙의 작은 다이아몬드 노드가 상하좌우로 무한히 증식하며 거대한 그물망 구조로 팽창합니다. '확장' 시점에 배경 카메라가 줌아웃(Zoom-out) 되며 스케일감을 극대화합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene5: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Diamond Node Grid Expansion and Zoom-out Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 6 기획안]
 * 원본 텍스트: AI는 우리를 밀어내는 경쟁자가 아닙니다.
 * 단어 등장 타이밍: "AI는": 1702f, "우리를": 1715f, "밀어내는": 1741f, "경쟁자가": 1775f, "아닙니다.": 1808f
 * 비주얼 컨셉: 서로 대립하려던 두 개의 노드가 충돌하지 않고 서로의 주위를 부드럽게 공전하기 시작하며 '경쟁'이 아닌 '균형'의 이미지를 전달합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene6: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Orbital Balance Animation between Two Nodes */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 7 기획안]
 * 원본 텍스트: 오히려 우리가 단순 작업에서 벗어나 더 가치 있고
 * 단어 등장 타이밍: "오히려": 1855f, "우리가": 1888f, "단순": 1932f, "작업에서": 1943f, "벗어나": 1988f, "더": 2021f, "가치": 2032f, "있고": 2054f
 * 비주얼 컨셉: 무겁고 딱딱한 사각형들이 바닥으로 가라앉고, 가볍고 빛나는 구체(Sphere)들이 화면 상단으로 비상합니다. 해방감을 주는 부양 모션을 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene7: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Sinking Squares and Rising Spheres Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 8 기획안]
 * 원본 텍스트: 창의적인 문제 해결에 집중할 수 있도록 돕는 가장 강력한 지렛대입니다.
 * 단어 등장 타이밍: "창의적인": 2078f, "문제": 2119f, "해결에": 2142f, "집중할": 2174f, "수": 2207f, "있도록": 2218f, "돕는": 2253f, "가장": 2273f, "강력한": 2306f, "지렛대입니다.": 2329f
 * 비주얼 컨셉: 지렛대(Lever)를 형상화한 기하학적인 대각선이 나타나, 거대한 바위 같은 문제를 가볍게 들어 올립니다. '강력한' 수식어 등장 시 지뢰의 축 노드가 강하게 발광합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene8: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Geometric Lever Lifting Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 9 기획안]
 * 원본 텍스트: 개발의 기술적 진입 장벽이 낮아짐에 따라, 앞으로는
 * 단어 등장 타이밍: "개발의": 2418f, "기술적": 2456f, "진입": 2503f, "장벽이": 2519f, "낮아짐에": 2556f, "따라,": 2607f, "앞으로는": 2638f
 * 비주얼 컨셉: 높게 솟아 있던 장벽 레이어들이 지하로 수납되듯 사라집니다. 그 뒤로 탁 트인 광활한 수평선 UI가 펼치지며 새로운 시대의 도래를 예고합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene9: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Retracting Barrier Layers and Horizon UI Reveal Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 10 기획안]
 * 원본 텍스트: 기술의 숙련도보다 '무엇을, 왜 만들 것인가'를 치열하게 고민하는
 * 단어 등장 타이밍: "기술의": 2684f, "숙련도보다": 2718f, "'무엇을,": 2776f, "왜": 2804f, "만들": 2816f, "것인가'를": 2831f, "치열하게": 2867f, "고민하는": 2939f
 * 비주얼 컨셉: 기술 스택 아이콘(추상적 심볼)들이 점차 바래지고, 'WHY?'를 상징하는 거대한 물음표가 화면 중앙에 아우라를 내품으며 등장합니다. 철학적이고 차분한 모션을 부여합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene10: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Icon Fading and Aura-emitting WHY Question Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 11 기획안]
 * 원본 텍스트: 프로덕트 마인드가 가장 중요한 무기가 될 것입니다.
 * 단어 등장 타이밍: "프로덕트": 2939f, "마인드가": 2975f, "가장": 3010f, "중요한": 3042f, "무기가": 3056f, "될": 3083f, "것입니다.": 3092f
 * 비주얼 컨셉: 방패와 칼 대신, 'Product Context'를 상징하는 큐브 오브젝트가 날카롭게 정렬되며 사용자의 핵심 무기로 장착되는 듯한 'Equip' 연출을 기하학적으로 풀어냅니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene11: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Cube Object Equip Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 12 기획안]
 * 원본 텍스트: 망설일 필요가 없습니다.
 * 단어 등장 타이밍: "망설일": 3145f, "필요가": 3187f, "없습니다.": 3223f
 * 비주얼 컨셉: 모든 노이즈와 복잡한 배경이 단번에 소거(Clear)되며 암전된 배경에 오직 텍스트만이 강렬한 화이트로 노출됩니다. 결단력 있는 분위기를 조성합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene12: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Screen Clearing and Bold White Text Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 13 기획안]
 * 원본 텍스트: 지금 바로 AI와 함께 완전히 새로운 개발 여정을 시작해 보세요.
 * 단어 등장 타이밍: "지금": 3290f, "바로": 3316f, "AI와": 3343f, "함께": 3391f, "완전히": 3395f, "새로운": 3517f, "개발": 3536f, "여정을": 3548f, "시작해": 3567f, "보세요.": 3590f
 * 비주얼 컨셉: 바닥에서부터 끝없는 빛의 고속도로가 생성되며 화면 깊숙한 곳으로 뻗어 나갑니다. 카메라가 속도감 있게 전방으로 질주(In-flight)하며 '여정'의 이미지를 완성합니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene13: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Infinite Light Highway and Forward Flight Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 14 기획안]
 * 원본 텍스트: 한계 없는 여러분의 상상력을
 * 단어 등장 타이밍: "한계": 3614f, "없는": 3629f, "여러분의": 3665f, "상상력을": 3730f
 * 비주얼 컨셉: 기하학적인 만다라 혹은 은하수 같은 파티클들이 폭발적으로 전개되며 '상상력'의 무한함을 컬러풀한 톤으로(물론 다크블루 톤 내에서) 보여줍니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene14: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Particle Burst and Mandala-like Expansion Animation */}
    </AbsoluteFill>
  );
};

/**
 * [Scene 15 기획안]
 * 원본 텍스트: 완벽한 코드로 현실화할 시간입니다.
 * 단어 등장 타이밍: "완벽한": 3767f, "코드로": 3806f, "현실화할": 3853f, "시간입니다.": 3895f
 * 비주얼 컨셉: 흩어졌던 모든 상상력의 파편들이 하나의 거칠게 흐르던 코드 매트릭스로 응집되며 로고와 함께 페이드 아웃됩니다. 마지막 텍스트가 서서히 사라지며 여운을 남깁니다.
 * 하단 150px은 자막 영역이므로, 텍스트와 핵심 그래픽은 이 영역을 침범하지 않도록 주의하세요.
 * 화면에 노출되는 UI 텍스트는 프로그래밍 용어/회사명 등을 제외하고 모두 한국어 단어로 작성합니다.
 * In-Scene Animation 구성: 각 씬의 프레임 내에서 여러 단계로 애니메이션을 분할하여 구현합니다.
 */
const Scene15: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* TODO: Implement Matrix Consolidation and Fade-out Animation */}
    </AbsoluteFill>
  );
};

export const OutroSequences: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={299}>
        <Scene1 />
      </Sequence>
      <Sequence from={299} durationInFrames={386}>
        <Scene2 />
      </Sequence>
      <Sequence from={685} durationInFrames={390}>
        <Scene3 />
      </Sequence>
      <Sequence from={1075} durationInFrames={326}>
        <Scene4 />
      </Sequence>
      <Sequence from={1401} durationInFrames={301}>
        <Scene5 />
      </Sequence>
      <Sequence from={1702} durationInFrames={153}>
        <Scene6 />
      </Sequence>
      <Sequence from={1855} durationInFrames={223}>
        <Scene7 />
      </Sequence>
      <Sequence from={2078} durationInFrames={340}>
        <Scene8 />
      </Sequence>
      <Sequence from={2418} durationInFrames={266}>
        <Scene9 />
      </Sequence>
      <Sequence from={2684} durationInFrames={255}>
        <Scene10 />
      </Sequence>
      <Sequence from={2939} durationInFrames={206}>
        <Scene11 />
      </Sequence>
      <Sequence from={3145} durationInFrames={145}>
        <Scene12 />
      </Sequence>
      <Sequence from={3290} durationInFrames={324}>
        <Scene13 />
      </Sequence>
      <Sequence from={3614} durationInFrames={153}>
        <Scene14 />
      </Sequence>
      <Sequence from={3767} durationInFrames={280}>
        <Scene15 />
      </Sequence>
    </>
  );
};
