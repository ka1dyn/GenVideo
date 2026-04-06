const fs = require('fs');

const totalFrames = 2216;
const totalDuration = 36925;
const section = 'outro';
const whisperWords = JSON.parse(fs.readFileSync(`/Users/kdm/Projects/GenVideo/public/project-maven/${section}/${section}_timestamp.json`, 'utf8'));

const groupings = [
  { sentence: '망설임 없이 핵 버튼을 누르는 AI.', bounds: [0, 4] },
  { sentence: '진짜 영화가 아니라 현실입니다.', bounds: [5, 8] },
  { sentence: '무섭고 섬뜩하죠?', bounds: [9, 10] },
  { sentence: '하지만 피한다고 피할 수 있는 게 아니에요.', bounds: [11, 17] },
  { sentence: '이게 우리가 AI를 무작정 두려워하기보다, 똑바로 알고 공부해야 하는 이유입니다.', bounds: [18, 27] },
  { sentence: '나만 모르면 진짜 영화 속 엑스트라처럼 휩쓸려 갈 수도 있으니까요.', bounds: [28, 36] },
  { sentence: "오늘 제 얘기가 '아, 세상이 진짜 이렇게 돌아가고 있구나' 하고 조금이라도 와닿으셨다면", bounds: [37, 48] },
  { sentence: '구독 한번 꾹 눌러주세요.', bounds: [49, 52] },
  { sentence: '아, 그리고 영상 끄기 전에 이거 하나만 댓글로 남겨주세요.', bounds: [53, 61] },
  { sentence: "'내 목숨이 걸린 전쟁터, 사람 사령관을 믿을 것인가, 냉철한 AI를 믿을 것인가?'", bounds: [62, 73] }
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
