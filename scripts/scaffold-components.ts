import fs from "fs";
import path from "path";
import { SectionMeta } from "./scaffold-types";

const FPS = 30;

function capitalize(s: string) {
  if (!s) return "";
  return s[0].toUpperCase() + s.substring(1);
}

export function generateComponents(
  projectId: string,
  sectionMetas: SectionMeta[]
) {
  for (const meta of sectionMetas) {
    console.log(`\n=== Generating Components for [${meta.name}] ===`);
    const srcDir = path.join(
      process.cwd(),
      `src/projects/${projectId}/${meta.name}`
    );
    fs.mkdirSync(srcDir, { recursive: true });

    const compName = capitalize(meta.name);
    const audioStaticPath = `${projectId}/${meta.name}/${meta.name}.wav`;
    const timestampStaticPath = `${projectId}/${meta.name}/${meta.name}_timestamp.json`;

    const componentCode = `import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';

/**
 * Section: ${meta.name}
 * Audio Duration: ${meta.audioDurationMs}ms (${meta.durationInFrames} frames @${FPS}fps)
 *
 * Assets (use with staticFile):
 *   Audio:      staticFile('${audioStaticPath}')
 *   Timestamps: staticFile('${timestampStaticPath}')
 *
 * Plan: public/${projectId}/${meta.name}/${meta.name}_plan.md
 */
export const ${compName}: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio src={staticFile('${audioStaticPath}')} />
      <h1 style={{ color: '#ffffff', fontSize: 48 }}>
        ${meta.name.toUpperCase()} Scene
      </h1>
    </AbsoluteFill>
  );
};
`;
    fs.writeFileSync(path.join(srcDir, `${meta.name}.tsx`), componentCode);
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
  if (!content.includes(importStatement)) {
    content = content.replace(
      /import \{ Folder(.*?)?\} from "remotion";(\r?\n)/,
      `import { Folder, Composition } from "remotion";\n${importStatement}\n`
    );
  }

  const compositionComponent = `      <Composition\n        id="${projectId}"\n        component={${componentName}}\n        durationInFrames={${totalDuration}}\n        fps={30}\n        width={1920}\n        height={1080}\n      />\n`;

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
