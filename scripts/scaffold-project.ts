import fs from "fs";
import path from "path";
import { Section } from "./scaffold-types";
import { processMediaForSections } from "./scaffold-media";
import { generateComponents } from "./scaffold-components";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: npx ts-node scripts/scaffold-project.ts <project_id>");
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
    else if (i === chunks.length - 1) sectionName = "outtro";
    else sectionName = `body${i}`;

    sections.push({ name: sectionName, text });
  }

  console.log(`Found ${sections.length} sections: ${sections.map((s) => s.name).join(", ")}`);

  // Step 1: Handle directories, TTS wave files, and Whisper JSONs
  await processMediaForSections(projectId, sections);

  // Step 2: Handle React Component generation and Root.tsx registration
  generateComponents(projectId, sections);

  console.log(`\n✅ Scaffold complete for ${projectId}!`);
}

main().catch(console.error);
