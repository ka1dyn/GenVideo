const fs = require('fs');

const totalFrames = 5430;
const totalDuration = 90485;
const section = 'body2';
const whisperWords = JSON.parse(fs.readFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_timestamp.json`, 'utf8'));

const groupings = [
  { sentence: '자, 그럼 이게 실제로 뭘 하는 건지 볼게요.', bounds: [0, 7] },
  { sentence: '메이븐 안에 "메이븐 스마트 시스템" 이라는 AI가 있는데, 이 AI가 하는 일이 크게 세 가지예요.', bounds: [8, 21] },
  { sentence: '첫째, 보는 거예요.', bounds: [22, 24] },
  { sentence: '드론에서 오는 영상, 위성 사진, 레이더 데이터를 전부 받아서 분석해요.', bounds: [25, 33] },
  { sentence: '"저기 움직이는 거 차량이야, 사람이야?', bounds: [34, 38] },
  { sentence: '", "저 건물에서 열 감지가 되는데 뭐가 있는 거지?', bounds: [39, 45] },
  { sentence: '" 이런 걸 끊임없이 판단하는 겁니다.', bounds: [46, 50] },
  { sentence: '둘째, 연결하는 거예요.', bounds: [51, 53] },
  { sentence: '영상만 보는 게 아니에요.', bounds: [54, 57] },
  { sentence: 'IP 주소, 소셜미디어 위치 태그, GPS 정보까지 전부 긁어와서 교차 분석해요.', bounds: [58, 68] },
  { sentence: '"이 차량이 어제 이 SNS 계정 근처에 있었는데?', bounds: [69, 76] },
  { sentence: '" 이런 식으로 흩어진 점들을 연결하는 거거든요.', bounds: [77, 82] },
  { sentence: '셋째, 보고하는 거예요.', bounds: [83, 85] },
  { sentence: '"이건 군사 시설일 확률 98%입니다, 사령관님 결정하세요.', bounds: [86, 92] },
  { sentence: '" 이렇게 우선순위 리스트를 뽑아서 사람한테 넘기는 거예요.', bounds: [93, 99] },
  { sentence: '근데 이게 얼마나 빠른지 아세요?', bounds: [100, 104] },
  { sentence: '미 육군 장교가 직접 밝힌 얘기예요.', bounds: [105, 110] },
  { sentence: '메이븐 AI 덕분에 1시간에 최대 80개의 표적을 포착할 수 있게 됐다고 합니다.', bounds: [111, 122] },
  { sentence: '사람이 하루 종일 영상 붙잡고 하나씩 확인할 걸, AI는 한 시간에 80개를 처리하는 거예요.', bounds: [123, 135] },
  { sentence: '속도가 전쟁의 성격 자체를 바꿔버린 겁니다.', bounds: [136, 141] },
  { sentence: '자, 여기까지 들으면 "AI가 다 하는 거잖아, 무섭다" 이런 생각 드실 수 있어요.', bounds: [142, 154] },
  { sentence: '근데 중요한 포인트가 있어요.', bounds: [155, 158] },
  { sentence: 'AI는 추천하고, 결정은 사람이 합니다.', bounds: [159, 163] },
  { sentence: '"이게 표적 후보입니다" 하고 리스트를 올리면, 사령관이 검토하고 최종 공격 결정은 사람이 내리는 구조예요.', bounds: [164, 177] },
  { sentence: '2023년에 미 국방부가 공식 명령으로도 못 박았어요.', bounds: [-1, -1], forceTiming: 4916 },
  { sentence: '"AI 시스템의 판단에 대해 인간이 반드시 감독하고 개입한다."', bounds: [178, 189] },
  { sentence: '지금은요.', bounds: [190, 190] },
  { sentence: '아직은요.', bounds: [191, 191] }
];

const sentences = groupings.map((g, i) => {
    let words = [];
    if (g.bounds[0] !== -1) {
        for (let j = g.bounds[0]; j <= g.bounds[1]; j++) {
            words.push({ ...whisperWords[j] });
        }
    } else {
        const textParts = g.sentence.split(/\s+/);
        let currentFrame = g.forceTiming;
        textParts.forEach(tp => {
            words.push({ text: tp, startFrame: currentFrame, endFrame: currentFrame + 5 });
            currentFrame += 5;
        });
    }

    if (i === 0 && words[0].startFrame > 0) {
        words[0].startFrame = 0;
    }

    const origWords = g.sentence.split(' ');
    if (origWords.length === words.length) {
        for (let j = 0; j < origWords.length; j++) {
            words[j].text = origWords[j];
        }
    } else {
        let outWords = [];
        let timeIdx = 0;
        for (let k = 0; k < origWords.length; k++) {
            if (timeIdx < words.length) {
                outWords.push({
                    text: origWords[k],
                    startFrame: words[timeIdx].startFrame,
                    endFrame: words[timeIdx].endFrame
                });
                timeIdx++;
            } else {
                outWords.push({
                    text: origWords[k],
                    startFrame: words[words.length-1].endFrame,
                    endFrame: words[words.length-1].endFrame
                });
            }
        }
        words = outWords;
    }

    return {
        sentence: g.sentence,
        words: words
    };
});

let prevEndFrame = 0;
sentences.forEach((s, idx) => {
    s.startFrame = idx === 0 ? 0 : prevEndFrame;
    if (idx === sentences.length - 1) {
        s.endFrame = totalFrames;
    } else {
        const nextWords = sentences[idx + 1].words;
        s.endFrame = nextWords[0].startFrame;
    }
    if (s.endFrame < s.startFrame) s.endFrame = s.startFrame;
    s.durationInFrames = s.endFrame - s.startFrame;
    
    // Bounds check
    let firstWordStarted = false;
    s.words.forEach(w => {
        if (!firstWordStarted) {
            w.startFrame = s.startFrame;
            firstWordStarted = true;
        } else {
            if (w.startFrame < s.startFrame) w.startFrame = s.startFrame;
        }
        if (w.endFrame < w.startFrame) w.endFrame = w.startFrame + 1;
    });

    prevEndFrame = s.endFrame;
});

fs.writeFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_final_timeline.json`, JSON.stringify({
    totalDuration,
    totalFrames,
    sentences
}, null, 2));

console.log(`${section} Done!`, sentences.length);
