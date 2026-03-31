import fs from "fs";
import path from "path";
import { Section, SectionMeta } from "./scaffold-types";
import { processMediaForSections } from "./scaffold-media";
import { generateComponents } from "./scaffold-components";

const FPS = 30;

function generateContextFile(projectId: string, meta: SectionMeta) {
  const publicDir = path.join(
    process.cwd(),
    `public/${projectId}/${meta.name}`
  );
  const contextPath = path.join(publicDir, `${meta.name}_context.md`);

  // Parse original script into sentences
  const originalSentences = meta.text
    .split(/(?<=[.!?。])\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Build timestamp table
  let timestampTable =
    "| # | startMs | endMs | 길이 | Whisper 텍스트 |\n";
  timestampTable +=
    "|---|---------|-------|------|---------------|\n";
  meta.timestamps.forEach((ts, i) => {
    const durationSec = ((ts.endMs - ts.startMs) / 1000).toFixed(1);
    timestampTable += `| ${i + 1} | ${ts.startMs} | ${ts.endMs} | ${durationSec}s | ${ts.text} |\n`;
  });

  const content = `# Section Context: ${meta.name}

- **Project**: ${projectId}
- **Audio Duration**: ${meta.audioDurationMs}ms (${meta.durationInFrames} frames @${FPS}fps)
- **Assets**:
  - Audio: \`${projectId}/${meta.name}/${meta.name}.wav\`
  - Script: \`${projectId}/${meta.name}/${meta.name}.txt\`
  - Timestamps: \`${projectId}/${meta.name}/${meta.name}_timestamp.json\`

## 원본 대본 (정본)

> ⚠️ 아래 대본이 정본입니다. 타임스탬프의 텍스트와 다를 수 있으니, 대본 내용을 기준으로 작업하세요.

${originalSentences.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## 타임스탬프 (타이밍 참조용)

> ⚠️ 아래 텍스트는 Whisper AI가 인식한 결과이며 원본과 다를 수 있습니다.
> **타이밍(startMs, endMs)만 참조**하고, 텍스트 내용은 위 원본 대본을 기준으로 하세요.
> Whisper가 추가한 환각 텍스트(예: "감사합니다", "MBC 뉴스..." 등 원본에 없는 텍스트)는 무시하세요.

${timestampTable}

## 대본-타임스탬프 매핑 가이드

원본 대본의 각 문장과 타임스탬프를 대응시킬 때:
1. **원본 대본의 문장**을 기준으로 삼으세요
2. 타임스탬프의 startMs/endMs는 가장 유사한 문장에 매핑하세요
3. Whisper가 추가한 환각 텍스트는 무시하세요
4. 여러 타임스탬프가 하나의 대본 문장에 대응될 수 있습니다 (시작~끝 범위로 묶기)
5. 하나의 타임스탬프가 여러 대본 문장에 걸칠 수도 있습니다
`;

  fs.writeFileSync(contextPath, content, "utf-8");
  console.log(`📋 Generated context file: ${contextPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      "Usage: npx ts-node scripts/scaffold-project.ts <project_id>"
    );
    process.exit(1);
  }

  const projectId = args[0];
  const refPath = path.join(process.cwd(), `src/ref/${projectId}.txt`);

  if (!fs.existsSync(refPath)) {
    console.error(`Error: Ref file not found at ${refPath}`);
    process.exit(1);
  }

  const scriptContent = fs.readFileSync(refPath, "utf-8");
  // Split by "---" on its own line
  const chunks = scriptContent.split(/\n---\n|\r\n---\r\n/);

  const sections: Section[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const text = chunks[i].trim();
    if (!text) continue;

    let sectionName = "";
    if (i === 0) sectionName = "intro";
    else if (i === chunks.length - 1) sectionName = "outro";
    else sectionName = `body${i}`;

    sections.push({ name: sectionName, text });
  }

  console.log(
    `Found ${sections.length} sections: ${sections.map((s) => s.name).join(", ")}`
  );

  // Step 1: Handle directories, TTS wave files, and Whisper JSONs
  const sectionMetas = await processMediaForSections(projectId, sections);

  // Step 2: Handle React Component generation and Root.tsx registration
  generateComponents(projectId, sectionMetas);

  // Step 3: Generate context files for AI planning
  console.log("\n=== Phase 4: Generating Context Files ===");
  for (const meta of sectionMetas) {
    generateContextFile(projectId, meta);
  }

  console.log(`\n✅ Scaffold complete for ${projectId}!`);
  console.log(`\n📌 Next steps:`);
  console.log(
    `   1. Review context files in public/${projectId}/*/`
  );
  console.log(
    `   2. Run /plan-animations ${projectId} to generate animation plans`
  );
  console.log(
    `   3. Run /implement-scenes ${projectId} to implement scenes`
  );
}

main().catch(console.error);
