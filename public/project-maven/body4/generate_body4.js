const fs = require('fs');

const totalFrames = 7369;
const totalDuration = 122803;
const section = 'body4';
const whisperWords = JSON.parse(fs.readFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_timestamp.json`, 'utf8'));

const groupings = [
  { sentence: '자, 그런데 여기서 솔직한 얘기 하나 하고 넘어갈게요.', bounds: [0, 7] },
  { sentence: '메이븐이 엄청 대단해 보이죠?', bounds: [8, 11] },
  { sentence: '근데 허점도 있습니다.', bounds: [12, 14] },
  { sentence: '중동 사막 환경에서 실험했을 때예요.', bounds: [15, 18] },
  { sentence: '사람은 84% 확률로 맞는 판단을 했는데, 메이븐은요?', bounds: [19, 25] },
  { sentence: '60% 였어요.', bounds: [26, 27] },
  { sentence: '왜냐면 AI가 트럭이랑 나무를, 계곡이랑 장갑차를 혼동했거든요.', bounds: [28, 34] },
  { sentence: '사람 눈엔 당연히 다른데, AI한테는 "비슷하게 생긴 물체"인 거예요.', bounds: [35, 43] },
  { sentence: '군 관계자도 인정했어요.', bounds: [44, 46] },
  { sentence: '"메이븐의 장점은 어디까지나 속도다.', bounds: [47, 50] },
  { sentence: '전술적 판단 수준엔 아직 못 미친다."', bounds: [51, 56] },
  { sentence: '그러니까 이번 이란 공격에서 AI가 1,000개 표적을 추려냈다고 해도,', bounds: [57, 64] },
  { sentence: '그게 전부 정확했다는 보장은 없는 거예요.', bounds: [65, 70] },
  { sentence: '실제로 공습 과정에서 민간인 피해가 발생했다는 보도도 있었고요.', bounds: [71, 78] },
  { sentence: 'AI의 판단이 완벽하지 않다는 게 전쟁터에서는 전혀 다른 무게를 가지는 겁니다.', bounds: [79, 89] },
  { sentence: '그리고 또 하나 더 있어요.', bounds: [90, 94] },
  { sentence: '메이븐 같은 AI 시스템은 학습 데이터에 의존해요.', bounds: [95, 101] },
  { sentence: '근데 만약 적대국이 그 학습 데이터에 슬쩍 오류를 심어놓으면 어떻게 될까요?', bounds: [102, 112] },
  { sentence: 'AI가 잘못된 표적을 "확률 98%"라고 추천할 수 있어요.', bounds: [113, 120] },
  { sentence: '미 국방부도 이 가능성을 공개적으로 우려하고 있고, 특히 중국이 이 방향으로 연구하고 있다고 해요.', bounds: [121, 134] },
  { sentence: 'AI를 무력화하는 게 아니라, AI를 틀리게 만드는 거예요.', bounds: [135, 142] },
  { sentence: '이게 새로운 형태의 전쟁입니다.', bounds: [143, 146] },
  { sentence: '여기서 더 무서운 사실이 있습니다.', bounds: [147, 151] },
  { sentence: '올해 2월에 연구 결과 하나가 나왔어요.', bounds: [152, 157] },
  { sentence: '영국 킹스칼리지 런던에서요.', bounds: [158, 160] },
  { sentence: 'GPT, 클로드, 제미나이.', bounds: [161, 163] },
  { sentence: '이 세 AI한테 전쟁 시뮬레이션을 시킨 거예요.', bounds: [164, 170] },
  { sentence: '가상의 국가 지도자 역할을 맡기고, 영토 분쟁이나 자원 경쟁 같은 시나리오를 줬어요.', bounds: [171, 183] },
  { sentence: '결과가 어땠냐면요.', bounds: [184, 185] },
  { sentence: '21번 중 20번.', bounds: [186, 188] },
  { sentence: '95%에서 핵무기를 선택했습니다.', bounds: [189, 191] },
  { sentence: '협상도 아니고, 외교도 아니고, 핵 버튼이에요.', bounds: [192, 196] },
  { sentence: '연구팀이 이렇게 말했어요.', bounds: [197, 199] },
  { sentence: '"핵무기에 대한 금기는 인간 사회에서만큼 AI에겐 작동하지 않는다."', bounds: [200, 207] },
  { sentence: '왜일까요.', bounds: [208, 208] },
  { sentence: 'AI는 두렵지 않으니까요.', bounds: [209, 211] },
  { sentence: '사람은 핵전쟁이 어떤 건지 역사로, 감정으로, 몸으로 알아요.', bounds: [212, 219] },
  { sentence: '근데 AI한테는 그냥 "목표 달성에 가장 효율적인 옵션"인 거거든요.', bounds: [220, 228] },
  { sentence: '도덕적 고뇌 없이, 망설임 없이, 그냥 최적화의 결과로 핵을 선택하는 겁니다.', bounds: [229, 240], excludeIndices: [232] } // exclude the stutter!
];

const sentences = groupings.map((g, i) => {
    let words = [];
    if (g.bounds[0] !== -1) {
        for (let j = g.bounds[0]; j <= g.bounds[1]; j++) {
            if (g.excludeIndices && g.excludeIndices.includes(j)) continue;
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

sentences.forEach(s => {
    if (s.durationInFrames > 420) {
        console.warn(`WARNING: LONG SENTENCE DETECTED (${s.durationInFrames} frames): ${s.sentence}`);
    }
});

fs.writeFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_final_timeline.json`, JSON.stringify({
    totalDuration,
    totalFrames,
    sentences
}, null, 2));

console.log(`${section} Done!`, sentences.length);
