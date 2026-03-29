import * as fs from "fs";
import * as path from "path";

/**
 * script.txt (텍스트 기반 대본) → script.ts (Remotion용 대본) 변환 스크립트
 *
 * 사용법: npx tsx scripts/parse-script.ts <project-id>
 * 예시:   npx tsx scripts/parse-script.ts test-project
 */

const projectId = process.argv[2];
if (!projectId) {
  console.error("❌ 프로젝트 ID를 입력하세요");
  console.error("   사용법: npx tsx scripts/parse-script.ts <project-id>");
  process.exit(1);
}

const sourceFile = path.join(
  __dirname,
  "..",
  "src",
  "sources",
  projectId,
  "script.txt",
);
const outputFile = path.join(
  __dirname,
  "..",
  "src",
  "projects",
  projectId,
  "script.ts",
);

if (!fs.existsSync(sourceFile)) {
  console.error(`❌ 원본 대본 파일을 찾을 수 없습니다: ${sourceFile}`);
  process.exit(1);
}

if (!fs.existsSync(path.dirname(outputFile))) {
  console.error(`❌ 출력 디렉토리를 찾을 수 없습니다: ${path.dirname(outputFile)}`);
  console.log(`💡 ./scripts/new-project.sh ${projectId} 를 먼저 실행하세요.`);
  process.exit(1);
}

const content = fs.readFileSync(sourceFile, "utf-8");

// [SceneX start] ... [SceneX end] 파싱을 위한 정규식
// gms: global, multiline, dotAll (dot matches newline)
const sceneRegex = /\[(Scene\d+)\s+start\]([\s\S]*?)\[\1\s+end\]/gi;

const scenes: { sceneId: string; text: string }[] = [];
let match;

while ((match = sceneRegex.exec(content)) !== null) {
  const sceneId = match[1].toLowerCase(); // e.g. "Scene1" -> "scene1"
  const text = match[2].trim().replace(/\s+/g, " "); // 공백 및 줄바꿈 정리
  scenes.push({ sceneId, text });
}

if (scenes.length === 0) {
  console.warn("⚠️  파싱된 Scene이 없습니다. 대본 형식을 확인하세요.");
  console.warn("   형식: [Scene1 start] 대본내용 [Scene1 end]");
  process.exit(0);
}

// script.ts 내용 생성
const outputContent = `import { SceneScript } from "../../shared/types/project";

export const script: SceneScript[] = [
${scenes
  .map(
    (scene) => `  {
    sceneId: "${scene.sceneId}",
    audioFile: "projects/${projectId}/audio/${scene.sceneId}.wav",
    text: "${scene.text.replace(/"/g, '\\"')}",
  },`,
  )
  .join("\n")}
];
`;

fs.writeFileSync(outputFile, outputContent, "utf-8");

console.log(`✅ 대본 변환 완료!`);
console.log(`   📂 원본: ${sourceFile}`);
console.log(`   📂 출력: ${outputFile}`);
console.log(`   📝 총 ${scenes.length}개의 Scene이 생성되었습니다.`);
