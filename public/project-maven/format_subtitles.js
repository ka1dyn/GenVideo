const fs = require('fs');
const path = require('path');

const basePath = '/Users/kdm/Projects/GenVideo/public/project-maven';
const sections = ['intro', 'body1', 'body2', 'body3', 'body4', 'outro'];

function breakSentence(text) {
    if (text.length <= 22) return text;

    // Prefer breaking after a comma or natural pause near the middle
    const commaIndex = text.indexOf(', ');
    if (commaIndex > 0 && commaIndex > text.length * 0.3 && commaIndex < text.length * 0.7) {
        return text.substring(0, commaIndex + 1) + '\n' + text.substring(commaIndex + 2);
    }

    // Split by spaces and find the space closest to the middle
    const words = text.split(' ');
    if (words.length <= 1) return text;

    let bestDiff = Infinity;
    let bestIndex = 0;
    let currentLen = 0;
    const mid = text.length / 2;

    for (let i = 0; i < words.length - 1; i++) {
        currentLen += words[i].length + 1; // +1 for the space
        const diff = Math.abs(currentLen - mid);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestIndex = i;
        }
    }

    const part1 = words.slice(0, bestIndex + 1).join(' ');
    const part2 = words.slice(bestIndex + 1).join(' ');
    return part1 + '\n' + part2;
}

function cleanSentence(text) {
    let t = text.trim();
    // Remove unmatched quotes
    const quoteCount = (t.match(/"/g) || []).length;
    if (quoteCount % 2 !== 0) {
        t = t.replace(/"/g, ''); // remove all quotes if unbalanced for safety
    } else {
        // even if balanced, sometimes quotes at the very start/end look awkward in standard subs
        // let's leave them if balanced, but trim leading/trailing spaces inside
    }
    
    // Remove if it's completely wrapped in quotes which is usually unnecessary in subtitles
    if (t.startsWith('"') && t.endsWith('"')) {
        t = t.substring(1, t.length - 1);
    }

    // Remove dangling comma
    if (t.endsWith(',')) {
        t = t.substring(0, t.length - 1);
    }

    // Remove trailing conjunctions or weird characters
    t = t.trim();
    return breakSentence(t);
}

sections.forEach(section => {
    const file = path.join(basePath, section, `${section}_final_timeline.json`);
    if (fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        
        let changedCount = 0;
        data.sentences = data.sentences.map(s => {
            const newSen = cleanSentence(s.sentence);
            if (newSen !== s.sentence) {
                s.sentence = newSen;
                changedCount++;
            }
            return s;
        });

        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        console.log(`Updated ${section}: changed ${changedCount} sentences`);
    }
});
