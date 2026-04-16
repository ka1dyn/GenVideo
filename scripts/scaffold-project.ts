import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Section, SectionMeta } from "./scaffold-types";
import { extractMedia, generateTimestamps } from "./scaffold-media";
import { generateComponents } from "./scaffold-components";

import { VIDEO_FPS as FPS } from "../src/constants/video-config";


async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      "Usage: npx tsx scripts/scaffold-project.ts [extract|process|all] <project_id>"
    );
    process.exit(1);
  }

  const command = args[0];
  const projectId = args[1];

  if (!["extract", "process", "all"].includes(command)) {
    console.error("Invalid command. Use 'extract', 'process', or 'all'.");
    process.exit(1);
  }

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

  if (command === "extract" || command === "all") {
    // Step 1: Handle directories and TTS wave files
    await extractMedia(projectId, sections);
    if (command === "extract") {
      console.log(`\n✅ Extract complete for ${projectId}!`);
      console.log(`\n📌 Next steps:`);
      console.log(`   1. Edit audio files in public/${projectId}/*/ if necessary.`);
      console.log(`   2. Run: npx tsx scripts/scaffold-project.ts process ${projectId}`);
      return;
    }
  }

  if (command === "process" || command === "all") {
    // Step 2: Handle Whisper JSONs and duration
    const sectionMetas = await generateTimestamps(projectId, sections);

    // Step 3: Handle React Component generation and Root.tsx registration
    generateComponents(projectId, sectionMetas);


    // Step 4: Automatically generate the final timeline JSONs
    console.log("\n=== Phase 4: Generating Final Timelines ===");
    try {
      execSync(`python3 scripts/generate-timeline.py ${projectId}`, {
        stdio: "inherit",
      });
    } catch (e) {
      console.error(
        `\n❌ Timeline generation failed. Please check the python script output.`
      );
    }

    // Step 5: Automatically generate captions.ts
    console.log("\n=== Phase 5: Generating Captions ===");
    try {
      execSync(`python3 scripts/generate-captions.py ${projectId}`, {
        stdio: "inherit",
      });
    } catch (e) {
      console.error(
        `\n❌ Captions generation failed. Please check the python script output.`
      );
    }

    // Step 6: Automatically generate make_video_plan.md and plans/SceneX.md
    console.log("\n=== Phase 6: Generating Plan Skeletons ===");
    try {
      execSync(`python3 scripts/generate-plan.py ${projectId}`, {
        stdio: "inherit",
      });
    } catch (e) {
      console.error(
        `\n❌ Plan generation failed. Please check the python script output.`
      );
    }

    // Step 7: Automatically generate sequences.tsx boilerplate
    console.log("\n=== Phase 7: Generating Sequences Boilerplate ===");
    try {
      execSync(`python3 scripts/generate-sequences.py ${projectId}`, {
        stdio: "inherit",
      });
    } catch (e) {
      console.error(
        `\n❌ Sequences generation failed. Please check the python script output.`
      );
    }

    console.log(`\n✅ Scaffold complete for ${projectId}!`);
    console.log(`\n📌 Next steps:`);
    console.log(
      `   1. Review timeline_report.md in public/${projectId}/`
    );
    console.log(
      `   2. Run /implement-scenes ${projectId} <section> (예: intro, body1) to implement scenes`
    );
  }
}

main().catch(console.error);
