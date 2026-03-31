import fs from "fs";
import path from "path";
import { Section } from "./scaffold-types";

function capitalize(s: string) {
  if (!s) return "";
  return s[0].toUpperCase() + s.substring(1);
}

export function generateComponents(projectId: string, sections: Section[]) {
  for (const doc of sections) {
    console.log(`\n=== Generating Components for [${doc.name}] ===`);
    const srcDir = path.join(process.cwd(), `src/projects/${projectId}/${doc.name}`);
    fs.mkdirSync(srcDir, { recursive: true });

    const componentCode = `import React from 'react';\nimport { AbsoluteFill } from 'remotion';\n\nexport const ${capitalize(doc.name)}: React.FC = () => {\n  return (\n    <AbsoluteFill style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>\n      <h1>${doc.name.toUpperCase()} Scene</h1>\n    </AbsoluteFill>\n  );\n};\n`;
    fs.writeFileSync(path.join(srcDir, `${doc.name}.tsx`), componentCode);
  }

  // Create Parent component
  const rootComponentPath = path.join(process.cwd(), `src/projects/${projectId}/${projectId}.tsx`);
  const rootComponentName = projectId
    .split("-")
    .map(capitalize)
    .join("");

  let imports = `import React from 'react';\nimport { Series } from 'remotion';\n`;
  let seriesChildren = "";

  for (const doc of sections) {
    const compName = capitalize(doc.name);
    imports += `import { ${compName} } from './${doc.name}/${doc.name}';\n`;
    seriesChildren += `      <Series.Sequence durationInFrames={300} name="${compName}">\n        <${compName} />\n      </Series.Sequence>\n`;
  }

  const rootComponentCode = `${imports}\nexport const ${rootComponentName}: React.FC = () => {\n  return (\n    <Series>\n${seriesChildren}    </Series>\n  );\n};\n`;

  fs.writeFileSync(rootComponentPath, rootComponentCode);

  updateRootTsx(projectId, rootComponentName, sections.length);
}

function updateRootTsx(projectId: string, componentName: string, numSections: number) {
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

  const compositionComponent = `      <Composition\n        id="${projectId}"\n        component={${componentName}}\n        durationInFrames={${300 * numSections}} // dummy duration\n        fps={30}\n        width={1920}\n        height={1080}\n      />\n`;

  if (content.includes("<Folder name=\"Projects\">")) {
    const parts = content.split("<Folder name=\"Projects\">");
    content = parts[0] + "<Folder name=\"Projects\">\n" + compositionComponent + parts[1];
  }

  fs.writeFileSync(rootPath, content);
  console.log(`✅ Updated Root.tsx with ${componentName}`);
}
