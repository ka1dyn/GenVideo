import os
import sys
import json
import argparse

def generate_sequences_for_section(project_id, section):
    base_dir = f"public/{project_id}/{section}"
    json_path = os.path.join(base_dir, f"{section}_final_timeline.json")
    
    out_dir = f"src/projects/{project_id}/{section}"
    scenes_dir = os.path.join(out_dir, "scenes")
    out_path = os.path.join(out_dir, "sequences.tsx")

    if not os.path.exists(json_path):
        print(f"Skipping {section}: {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    sentences = data.get('sentences', [])
    if not sentences:
        print(f"No sentences found in {json_path}. Skipping.")
        return

    os.makedirs(scenes_dir, exist_ok=True)

    sequence_render_lines = []
    imports = []
    
    # 1. Generate SceneX.tsx files
    for i, sentence in enumerate(sentences, 1):
        scene_tsx_path = os.path.join(scenes_dir, f"Scene{i}.tsx")
        
        # 뼈대 코드 생성
        scene_lines = [
            "import React from 'react';",
            "import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';",
            "import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../../constants/theme';",
            "import { Wobble } from '../../../../shared-components/Wobble';",
            "import { DrawLine } from '../../../../shared-components/DrawLine';",
            "import { PaperTexture } from '../../../../shared-components/PaperTexture';",
            "",
            f"export const Scene{i}: React.FC = () => {{",
            "  const frame = useCurrentFrame();",
            "  const { fps } = useVideoConfig();",
            "",
            f"  // TODO: 구현 (../plans/Scene{i}.md 기획 바탕으로)",
            "  return (",
            "    <AbsoluteFill>",
            "      <PaperTexture />",
            "      {/* 여기에 요소들을 배치하세요 */}",
            "    </AbsoluteFill>",
            "  );",
            "};",
            ""
        ]
        if os.path.exists(scene_tsx_path):
            print(f"   ⏭️ {scene_tsx_path} already exists, skipping.")
        else:
            with open(scene_tsx_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(scene_lines))
        
        imports.append(f"import {{ Scene{i} }} from './scenes/Scene{i}';")
        
        next_key = f"SCENE{i+1}" if i < len(sentences) else "END"
        sequence_render_lines.append(f"      <Sequence from={{CUTS.SCENE{i}}} durationInFrames={{CUTS.{next_key} - CUTS.SCENE{i}}}>")
        sequence_render_lines.append(f"        <Scene{i} />")
        sequence_render_lines.append(f"      </Sequence>")

    # 2. Generate sequences.tsx
    tsx_lines = []
    tsx_lines.append("import React from 'react';")
    tsx_lines.append("import { AbsoluteFill, Sequence } from 'remotion';")
    tsx_lines.extend(imports)
    tsx_lines.append("")

    tsx_lines.append("export const CUTS = {")
    for i, sentence in enumerate(sentences, 1):
        s_frame = sentence.get('startFrame', 0)
        tsx_lines.append(f"  SCENE{i}: {s_frame},")
    
    last_s = sentences[-1]
    end_f = last_s.get('startFrame', 0) + last_s.get('durationInFrames', 0)
    tsx_lines.append(f"  END: {end_f}")
    tsx_lines.append("};")
    tsx_lines.append("")

    tsx_lines.append("export const Sequences: React.FC = () => {")
    tsx_lines.append("  return (")
    tsx_lines.append("    <AbsoluteFill>")
    tsx_lines.extend(sequence_render_lines)
    tsx_lines.append("    </AbsoluteFill>")
    tsx_lines.append("  );")
    tsx_lines.append("};")
    tsx_lines.append("")

    if os.path.exists(out_path):
        with open(out_path, 'r', encoding='utf-8') as f:
            existing_content = f.read()
        if 'CUTS' in existing_content:
            print(f"⏭️ {out_path} already exists with CUTS, skipping.")
        else:
            print(f"♻️  {out_path} is a placeholder, overwriting with CUTS version.")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(tsx_lines))
            print(f"✅ Regenerated {out_path} with {len(sentences)} scene imports")
    else:
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(tsx_lines))
        print(f"✅ Generated {out_path} and {len(sentences)} scenes in {scenes_dir}")

def main():
    parser = argparse.ArgumentParser(description="Generate scenes/SceneX.tsx skeletons and sequences.tsx mapping")
    parser.add_argument("project_id", help="The ID of the project")
    parser.add_argument("--section", help="Specific section to generate (optional)")

    args = parser.parse_args()
    project_id = args.project_id
    project_dir = f"public/{project_id}"

    if not os.path.isdir(project_dir):
        print(f"Error: Project directory '{project_dir}' does not exist.")
        sys.exit(1)

    if args.section:
        generate_sequences_for_section(project_id, args.section)
    else:
        for item in sorted(os.listdir(project_dir)):
            item_path = os.path.join(project_dir, item)
            if os.path.isdir(item_path):
                generate_sequences_for_section(project_id, item)

if __name__ == '__main__':
    main()
