import fs from "fs";
import path from "path";
import { SectionMeta } from "./scaffold-types";

import { VIDEO_FPS as FPS } from "../src/constants/video-config";

function capitalize(s: string) {
  if (!s) return "";
  return s[0].toUpperCase() + s.substring(1);
}

export function generateComponents(
  projectId: string,
  sectionMetas: SectionMeta[]
) {
  console.log(`\n📦 Initializing component directories per section...`);

  for (const meta of sectionMetas) {
    console.log(`\n=== Generating Components for [${meta.name}] ===`);
    const srcDir = path.join(
      process.cwd(),
      `src/projects/${projectId}/${meta.name}`
    );
    const componentsDir = path.join(srcDir, "components");
    fs.mkdirSync(srcDir, { recursive: true });
    fs.mkdirSync(componentsDir, { recursive: true });

    const compName = capitalize(meta.name);
    const audioStaticPath = `${projectId}/${meta.name}/${meta.name}.wav`;
    const timestampStaticPath = `${projectId}/${meta.name}/${meta.name}_timestamp.json`;

    const componentCode = `import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { COLORS } from "../../../constants/theme";
import { CaptionOverlay } from '../../../core/CaptionOverlay';
import { captions } from './captions';
import { Sequences } from "./sequences";

/**
 * Section: ${meta.name}
 * Audio Duration: ${meta.audioDurationMs}ms (${meta.durationInFrames} frames @${FPS}fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('${audioStaticPath}')
 *   Timestamps: staticFile('${timestampStaticPath}')
 *
 * Plan: src/projects/${projectId}/${meta.name}/make_video_plan.md
 */
export const ${compName}: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.BG_BASE,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* 1. 오디오 단일 선언 */}
      <Audio src={staticFile('${audioStaticPath}')} />

      {/* 2. 절대 프레임 좌표로 배치된 하위 씬들의 묶음 렌더링 */}
      <Sequences />

      {/* 3. 자막 오버레이 */}
      <CaptionOverlay captions={captions} />
    </AbsoluteFill>
  );
};
`;
    fs.writeFileSync(path.join(srcDir, `${meta.name}.tsx`), componentCode);

    // 빈 sequences.tsx stub — 이미 존재하면 건너뜀 (generate-sequences.py가 기획 주석 포함 버전을 생성)
    const sequencesPath = path.join(srcDir, "sequences.tsx");
    if (!fs.existsSync(sequencesPath)) {
      const sequencesCode = `import React from "react";
import { AbsoluteFill } from "remotion";

export const Sequences: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
        color: "rgba(0,0,0,0.3)",
      }}
    >
      ${meta.name.toUpperCase()} - Planning in progress...
    </AbsoluteFill>
  );
};
`;
      fs.writeFileSync(sequencesPath, sequencesCode);
    } else {
      console.log(`   ⏭️ sequences.tsx already exists for [${meta.name}], skipping stub generation`);
    }

    console.log(
      `   📦 ${compName} (${meta.durationInFrames} frames, ${meta.audioDurationMs}ms)`
    );
  }

  // Create Parent component
  const rootComponentPath = path.join(
    process.cwd(),
    `src/projects/${projectId}/${projectId}.tsx`
  );
  const rootComponentName = projectId.split("-").map(capitalize).join("");

  let imports = `import React from 'react';\nimport { Series } from 'remotion';\n`;
  let seriesChildren = "";

  for (const meta of sectionMetas) {
    const compName = capitalize(meta.name);
    imports += `import { ${compName} } from './${meta.name}/${meta.name}';\n`;
    seriesChildren += `      <Series.Sequence durationInFrames={${meta.durationInFrames}} name="${compName}">\n        <${compName} />\n      </Series.Sequence>\n`;
  }

  const rootComponentCode = `${imports}\nexport const ${rootComponentName}: React.FC = () => {\n  return (\n    <Series>\n${seriesChildren}    </Series>\n  );\n};\n`;

  fs.writeFileSync(rootComponentPath, rootComponentCode);

  const totalDuration = sectionMetas.reduce(
    (sum, m) => sum + m.durationInFrames,
    0
  );
  updateRootTsx(projectId, rootComponentName, totalDuration);
}

function updateRootTsx(
  projectId: string,
  componentName: string,
  totalDuration: number
) {
  const rootPath = path.join(process.cwd(), "src/Root.tsx");
  if (!fs.existsSync(rootPath)) return;

  let content = fs.readFileSync(rootPath, "utf-8");

  // Check if already registered
  if (content.includes(`id="${projectId}"`)) {
    console.log(`⚠️ Project ${projectId} already registered in Root.tsx`);
    return;
  }

  const importStatement = `import { ${componentName} } from "./projects/${projectId}/${projectId}";`;

  // Import 추가 — remotion import 라인 뒤에 삽입
  if (!content.includes(importStatement)) {
    // remotion import 라인 찾기 (Folder, Composition 등 어떤 조합이든)
    const remotionImportRegex = /^(import\s+\{[^}]*\}\s+from\s+["']remotion["'];?\s*\n)/m;
    const match = content.match(remotionImportRegex);
    if (match) {
      // Composition이 import되어 있는지 확인
      if (!match[1].includes("Composition")) {
        const fixedImport = match[1].replace("{", "{ Composition,");
        content = content.replace(match[1], fixedImport);
      }
      // remotion import 라인 바로 뒤에 프로젝트 import 추가
      const insertPoint = content.indexOf(match[0]) + match[0].length;
      content = content.slice(0, insertPoint) + importStatement + "\n" + content.slice(insertPoint);
    } else {
      // remotion import를 못 찾으면 파일 상단에 추가
      content = `import { Composition } from "remotion";\n${importStatement}\n${content}`;
    }
  }

  const compositionComponent = `      <Composition\n        id="${projectId}"\n        component={${componentName}}\n        durationInFrames={${totalDuration}}\n        fps={VIDEO_FPS}\n        width={VIDEO_WIDTH}\n        height={VIDEO_HEIGHT}\n      />\n`;

  if (content.includes('<Folder name="Projects">')) {
    const parts = content.split('<Folder name="Projects">');
    content =
      parts[0] +
      '<Folder name="Projects">\n' +
      compositionComponent +
      parts[1];
  }

  fs.writeFileSync(rootPath, content);
  console.log(`✅ Updated Root.tsx with ${componentName} (${totalDuration} frames)`);
}
