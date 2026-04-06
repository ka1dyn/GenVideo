const fs = require('fs');
const path = require('path');

const projectPath = '/Users/kdm/Projects/GenVideo/public/project-maven';
const sections = ['intro', 'body1', 'body2', 'body3', 'body4', 'outro'];

function parseContext(section) {
    const contextPath = path.join(projectPath, section, `${section}_context.md`);
    if (!fs.existsSync(contextPath)) return null;
    const content = fs.readFileSync(contextPath, 'utf8');
    
    const audioDurationMatch = content.match(/Audio Duration.*\((\d+) frames/);
    const totalFrames = audioDurationMatch ? parseInt(audioDurationMatch[1]) : 0;
    
    // Extract script text
    const scriptLines = [];
    const scriptMatch = content.match(/## 원본 대본 \(정본\)\n\n[\s\S]*?\n\n##/);
    if (scriptMatch) {
        const lines = scriptMatch[0].split('\n');
        for (const line of lines) {
            if (/^\d+\./.test(line.trim())) {
                scriptLines.push(line.replace(/^\d+\.\s*/, '').trim());
            } else if (line.trim() && !line.includes('> ⚠️') && !line.includes('##') && !line.includes('원본 대본')) {
               // handle lines without number but part of script
               if (scriptLines.length > 0) {
                    scriptLines[scriptLines.length-1] += ' ' + line.trim();
               } else {
                   scriptLines.push(line.trim());
               }
            }
        }
    }
    
    return { totalFrames, scriptLines };
}

function run() {
    sections.forEach(section => {
        const timestampPath = path.join(projectPath, section, `${section}_timestamp.json`);
        if (!fs.existsSync(timestampPath)) return;
        
        const timestampData = JSON.parse(fs.readFileSync(timestampPath, 'utf8'));
        const context = parseContext(section);
        
        console.log(`\n=== ${section} ===`);
        console.log(`Total Frames: ${context.totalFrames}`);
        console.log(`Original sentences: ${context.scriptLines.length}`);
        console.log(`Whisper words: ${timestampData.length}`);
        
        // Print first 3 and last 3 to check format
        if (context.scriptLines.length > 0) {
            console.log("Script preview:", context.scriptLines.slice(0, 3));
        }
    });
}
run();
