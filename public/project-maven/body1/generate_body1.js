const fs = require('fs');

const totalFrames = 4476;
const totalDuration = 74586;
const whisperWords = JSON.parse(fs.readFileSync('/Users/kdm/Projects/GenVideo/public/project-maven/body1/body1_timestamp.json', 'utf8'));

// groupings with precise text and whisper mappings
const groupings = [
  { sentence: '때는 2017년이에요.', bounds: [0, 1] },
  { sentence: '미국 국방부가 심각한 고민에 빠졌습니다.', bounds: [2, 6] },
  { sentence: '"드론이 찍어오는 영상이 너무 많아.', bounds: [7, 11] },
  { sentence: '사람이 다 볼 수가 없어."', bounds: [12, 16] },
  { sentence: '생각해보세요.', bounds: [17, 17] },
  { sentence: '전 세계에 깔린 군사 드론이 하루 24시간 영상을 찍어서 쏟아붓는 거예요.', bounds: [18, 27] },
  { sentence: '그걸 사람이 한 명 한 명 앉아서 들여다보고 있으면 어느 세월에 다 보겠어요.', bounds: [28, 40] },
  { sentence: '"이거 군사 차량이야, 민간 차량이야?"', bounds: [41, 45] },
  { sentence: '이러다가 전쟁이 먼저 끝나는 거죠.', bounds: [46, 50] },
  { sentence: '그래서 만든 게 프로젝트 메이븐이에요.', bounds: [51, 55] },
  { sentence: '비유하자면요,', bounds: [56, 56] },
  { sentence: '"전쟁터의 유튜브 알고리즘" 이에요.', bounds: [57, 59] },
  { sentence: '유튜브가 영상 수백만 개 중에서 내 취향에 맞는 걸 골라주잖아요.', bounds: [60, 69] },
  { sentence: '메이븐은 드론 영상 수천 시간 중에서 "위험한 것"만 걸러내는 거예요.', bounds: [70, 79] },
  { sentence: '방식은 다르지만 원리는 비슷합니다.', bounds: [-1, -1], forceTiming: 2358 },
  { sentence: '근데 이게 처음부터 잘 된 건 아니에요.', bounds: [80, 86] },
  { sentence: '처음엔 구글이 기술을 제공했어요.', bounds: [87, 90] },
  { sentence: '근데 구글 직원들이 들고 일어났거든요.', bounds: [91, 95] },
  { sentence: '"우리 AI를 전쟁에 쓴다고?', bounds: [96, 99] },
  { sentence: '우리는 그거 동의 못 해."', bounds: [100, 103] },
  { sentence: '결국 구글은 2019년에 손을 떼고 나왔어요.', bounds: [104, 109] },
  { sentence: '그래도 프로젝트 메이븐은 멈추지 않았습니다.', bounds: [110, 114] },
  { sentence: '지금은 팔란티어라는 데이터 분석 회사가 핵심을 맡고 있어요.', bounds: [115, 122] },
  { sentence: 'AWS, 마이크로소프트 포함해서 10개 회사가 같이 붙어 있고요.', bounds: [123, 129] },
  { sentence: '규모가 어느 정도냐면요,', bounds: [130, 132] },
  { sentence: '팔란티어 혼자 미 국방부와 맺은 계약 규모가 최대 100억 달러,', bounds: [133, 142] },
  { sentence: '우리 돈으로 약 13조 원 수준이에요.', bounds: [143, 148] },
  { sentence: '이게 장난이 아닌 거죠.', bounds: [149, 152] }
];

const sentences = groupings.map((g, i) => {
    let words = [];
    if (g.bounds[0] !== -1) {
        for (let j = g.bounds[0]; j <= g.bounds[1]; j++) {
            words.push({ ...whisperWords[j] });
        }
    } else {
        // synthesize words for missing sentence
        const textParts = g.sentence.split(/\s+/);
        textParts.forEach(tp => {
            words.push({ text: tp, startFrame: g.forceTiming, endFrame: g.forceTiming });
        });
    }

    if (i === 0 && words[0].startFrame > 0) {
        words[0].startFrame = 0;
    }

    // Assign text to words from the original sentence to perfectly match!
    const origWords = g.sentence.split(' ');
    // If the number of words matches or differs, let's keep whisper's segmentation but use its text?
    // The prompt says "단어는 원본 대본의 단어와 100% 일치해야합니다."
    // And also says "원본 대본의 각 단어와 일치해야합니다."
    // Let's replace whisper words text with split spaces from original text if possible.
    // If lengths mismatch, we try our best.
    if (origWords.length === words.length) {
        for (let j = 0; j < origWords.length; j++) {
            words[j].text = origWords[j];
        }
    } else {
        // Just use whisper words but it might not be 100% original. Let's do a simple replace since it usually matches.
        // For simplicity, we just keep whisper words text to preserve timings properly. The user wants "단어를 조합한 원본과 일치하는 문장", which is handled by "sentence" field. Wait, "words" array has "text" which says "원본 대본의 단어와 100% 일치해야합니다."
        // We will just do a simple map. If lengths don't match, we map as many as possible and dump the rest to the last word.
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
        // If there are leftover timings, we ignore them to enforce 100% text match. 
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
        // The start frame of the FIRST word of the NEXT sentence
        const nextWords = sentences[idx + 1].words;
        s.endFrame = nextWords[0].startFrame;
    }
    // ensure endFrame >= startFrame
    if (s.endFrame < s.startFrame) s.endFrame = s.startFrame;
    s.durationInFrames = s.endFrame - s.startFrame;

    // ensure word timings are contiguous strictly where needed, or at least respect boundaries
    s.words.forEach(w => {
        if (w.startFrame < s.startFrame) w.startFrame = s.startFrame;
        // w.endFrame could be larger than s.endFrame if whisper had a gap overlap, but we leave whisper timings intact as requested, except bounded.
    });

    prevEndFrame = s.endFrame;
});

fs.writeFileSync('/Users/kdm/Projects/GenVideo/public/project-maven/body1/body1_final_timeline.json', JSON.stringify({
    totalDuration,
    totalFrames,
    sentences
}, null, 2));

// Quick verify
console.log('Body1 Done!', sentences.length);
