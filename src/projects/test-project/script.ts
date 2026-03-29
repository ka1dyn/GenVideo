import { SceneScript } from "../../shared/types/project";

export const script: SceneScript[] = [
  {
    sceneId: "scene1",
    audioFile: "projects/test-project/audio/scene1.wav",
    text: "안녕하세요 여러분! 최근 AI 씬의 발전 속도, 정말 무섭지 않나요? 불과 얼마 전까지만 해도 우리는 '프롬프트 엔지니어링'에 열광했습니다. AI한테 어떻게 질문을 잘 던질까, 어떤 마법의 주문을 외워야 원하는 코드를 짜줄까 고민하던 시기였죠. 그런데 말입니다. 이제 그 시대는 서서히 저물어가고 있습니다. 단일 프롬프트를 깎는 장인의 시대가 가고, 이제 우리는 완전히 새로운 단계로 진입했습니다. 바로 '하네스 엔지니어링(Harness Engineering)'의 시대입니다.",
  },
  {
    sceneId: "scene2",
    audioFile: "projects/test-project/audio/scene2.wav",
    text: "하네스, 원래 말의 고삐나 안장을 뜻하는 단어죠. 야생마처럼 엄청난 잠재력을 가진 AI가 폭주하지 않고 우리가 원하는 목적지까지 정확히 달려가도록, 튼튼한 고삐를 쥐여주고 통제 환경을 설계하는 것. 이것이 바로 하네스 엔지니어링입니다.",
  },
  {
    sceneId: "scene3",
    audioFile: "projects/test-project/audio/scene3.wav",
    text: "이제 우리는 코드를 한 줄 한 줄 짜는 코더가 아니라, AI 에이전트들의 작업 환경을 설계하고 조율하는 '시스템 아키텍트'가 되어야 합니다. 그리고 흥미롭게도, 클로드(Claude)를 만든 AI의 선두 주자 '엔트로픽(Anthropic)'이 최근 몇 달 동안 이 '하네스'라는 개념에 그야말로 집착하고 있습니다. 도대체 왜 그들은 모델 자체보다 환경에 집중하고 있는 걸까요? 오늘 영상에서 그 해답을 낱낱이 파헤쳐 보겠습니다.",
  },
  {
    sceneId: "scene4",
    audioFile: "projects/test-project/audio/scene4.wav",
    text: "여러분도 복잡한 웹 서비스나 앱을 만들 때, AI한테 통째로 코드를 던져주고 \"이거 다 짜줘!\" 해본 적 있으시죠? 처음엔 꽤 그럴싸하게 짜주는 것 같습니다. 그런데 프로젝트 호흡이 길어지고 요구사항이 복잡해질수록 어떨까요?",
  },
  {
    sceneId: "scene5",
    audioFile: "projects/test-project/audio/scene5.wav",
    text: "AI가 갑자기 엉뚱한 소리를 하거나, 방금 전에 말해준 규칙도 새카맣게 까먹는 이른바 '기억 상실'에 걸리는 걸 보셨을 겁니다. 컨텍스트 윈도우, 즉 AI의 기억 공간에 데이터가 너무 많이 쌓이면 '컨텍스트 불안증'이 오면서 환각 현상이 심해지기 때문입니다. 아무리 똑똑한 클로드 모델이라도 단일 프롬프트의 한계는 명확했던 거죠.",
  },
  {
    sceneId: "scene6",
    audioFile: "projects/test-project/audio/scene6.wav",
    text: "그래서 엔트로픽은 발상을 바꿉니다. \"AI에게 모든 과정을 다 기억하게 하지 말자!\" 대신 에이전트의 환경을 철저히 분리했습니다. 작업을 처음 세팅하는 '초기화(Initializer)' 단계와 실제 코드를 짜는 '실행' 단계를 나눈 겁니다. 매 세션이 끝날 때마다 에이전트의 불필요한 대화 기록은 싹 날려버립니다. 머리를 비워주는 거죠. 그리고 이전 작업에서 만들어진 핵심 결과물, 즉 '아티팩트(Artifact)'만 다음 에이전트에게 바통 터치하듯 넘겨줍니다. 이렇게 하니까 긴 호흡의 개발 프로젝트에서도 AI가 길을 잃지 않고 끝까지 임무를 완수할 수 있게 된 겁니다.",
  },
];
