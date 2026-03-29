/**
 * 대본 → WAV 일괄 생성 스크립트 (placeholder)
 *
 * 사용법: npx tsx scripts/generate-audio.ts <project-id>
 * 예시:   npx tsx scripts/generate-audio.ts my-first-topic
 *
 * TODO: 사용자가 TTS 함수를 제공하면 여기에 연동
 */

import * as fs from "fs";
import * as path from "path";

const projectId = process.argv[2];
if (!projectId) {
  console.error("❌ 프로젝트 ID를 입력하세요");
  console.error("   사용법: npx tsx scripts/generate-audio.ts <project-id>");
  process.exit(1);
}

const projectDir = path.join(__dirname, "..", "src", "projects", projectId);
const audioDir = path.join(
  __dirname,
  "..",
  "public",
  "projects",
  projectId,
  "audio",
);

// script.ts 동적 import
async function main() {
  const scriptPath = path.join(projectDir, "script.ts");
  if (!fs.existsSync(scriptPath)) {
    console.error(`❌ script.ts를 찾을 수 없습니다: ${scriptPath}`);
    process.exit(1);
  }

  // script.ts에서 대본 가져오기
  const { script } = await import(scriptPath);

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  console.log(`🎙️ ${script.length}개 Scene의 오디오를 생성합니다...`);
  console.log("");

  for (const scene of script) {
    const outputPath = path.join(audioDir, `${scene.sceneId}.wav`);
    console.log(`  📝 ${scene.sceneId}: "${scene.text.slice(0, 40)}..."`);
    console.log(`  📂 출력: ${outputPath}`);

    // TODO: 여기에 TTS 함수 호출
    // await generateTTS(scene.text, outputPath);

    console.log(`  ⏳ TTS 함수가 아직 연결되지 않았습니다.`);
    console.log("");
  }

  console.log("⚠️  TTS 함수를 연결한 뒤 다시 실행하세요.");
}

main().catch(console.error);
