const fs = require('fs');

const totalFrames = 3655;
const totalDuration = 60916;
const section = 'body3';
const whisperWords = JSON.parse(fs.readFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_timestamp.json`, 'utf8'));

const groupings = [
  { sentence: '올해 2월, 미국이 이란을 공격했어요.', bounds: [0, 4] },
  { sentence: '외신 보도에 따르면 첫 24시간 안에 이란의 1,000개가 넘는 표적을 타격했다고 합니다.', bounds: [5, 17] },
  { sentence: '1,000개를 하루 만에요.', bounds: [18, 21] },
  { sentence: '예전이라면요?', bounds: [22, 22] },
  { sentence: '표적 하나 분석하는 데만 며칠이 걸렸을 거예요.', bounds: [23, 29] },
  { sentence: '사람이 데이터 보고, 회의하고, 결재 받고.', bounds: [30, 34] },
  { sentence: '근데 이번엔 달랐다는 거예요.', bounds: [35, 38] },
  { sentence: '외신 보도에 따르면,', bounds: [39, 41] },
  { sentence: '정보 수집부터 표적 선정까지 전 과정에 AI가 주도적으로 개입했다고 해요.', bounds: [42, 51] },
  { sentence: '팔란티어 AI가 드론 데이터를 분석해서 표적 우선순위를 뽑고,', bounds: [52, 60] },
  { sentence: '클로드라는 생성형 AI가 수만 가지 공격 시나리오를 시뮬레이션해서 지휘부에 보고했다는 거거든요.', bounds: [61, 70] },
  { sentence: '잠깐, 클로드요?', bounds: [71, 72] },
  { sentence: '네.', bounds: [73, 73] },
  { sentence: '여러분이 유튜브에서 자주 접하는 그 AI 맞아요.', bounds: [74, 80] },
  { sentence: '저도 이거 알고 한동안 멍하니 있었거든요.', bounds: [81, 86] },
  { sentence: '우리가 일상에서 쓰는 AI가, 전쟁 시나리오를 짜고 있었던 겁니다.', bounds: [87, 95] },
  { sentence: '물론 이 내용은 기밀 작전 특성상 공식 확인이 된 건 아니에요.', bounds: [96, 105] },
  { sentence: '"외신 보도에 따르면" 수준이라는 거 말씀드려요.', bounds: [106, 110] },
  { sentence: '그래서 있는 그대로 전달드리는 거예요.', bounds: [111, 115] }
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

// Since sentence 9 might be long, check duration.
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
