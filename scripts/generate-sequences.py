import os
import sys
import json
import argparse
import re

def generate_sequences_for_section(project_id, section):
    base_dir = f"public/{project_id}/{section}"
    json_path = os.path.join(base_dir, f"{section}_final_timeline.json")
    plan_path = os.path.join(base_dir, f"{section}_plan.md")
    out_dir = f"src/projects/{project_id}/{section}"
    out_path = os.path.join(out_dir, "sequences.tsx")

    if not os.path.exists(json_path):
        print(f"Skipping {section}: {json_path} not found.")
        return
    if not os.path.exists(plan_path):
        print(f"Skipping {section}: {plan_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    with open(plan_path, 'r', encoding='utf-8') as f:
        plan_text = f.read()

    # 파트 분리: "Scene 1", "### Scene 2" 등으로 시작하는 라인을 기준으로 나눕니다.
    parts = re.split(r'(?m)^\s*#*\s*Scene\s+\d+\s*$', plan_text)
    
    global_context = parts[0].strip() if len(parts) > 0 else ""
    scene_texts = parts[1:] if len(parts) > 1 else []

    sentences = data.get('sentences', [])
    
    os.makedirs(out_dir, exist_ok=True)

    tsx_lines = []
    
    # 1. 컴포넌트 헤더 및 글로벌 컨텍스트 주석
    tsx_lines.append("/**")
    tsx_lines.append(" * [Section Global Context]")
    for line in global_context.split('\n'):
        tsx_lines.append(f" * {line.strip()}")
    tsx_lines.append(" */")
    tsx_lines.append("import React from 'react';")
    tsx_lines.append("import { AbsoluteFill, Sequence } from 'remotion';")
    tsx_lines.append("import { BRAND, COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';")
    tsx_lines.append("")

    # 2. Scene별 컴포넌트 자동 생성 (plan.md의 해당 씬 컨텍스트 복사 반영)
    sequence_render_lines = []
    for i, sentence in enumerate(sentences, 1):
        start_frame = sentence.get('startFrame', 0)
        duration = sentence.get('durationInFrames', 0)
        
        scene_text = ""
        if i <= len(scene_texts):
            scene_text = scene_texts[i-1].strip()

        tsx_lines.append("/**")
        tsx_lines.append(f" * [Scene {i}]")
        for line in scene_text.split('\n'):
            tsx_lines.append(f" * {line}")
        tsx_lines.append(" */")
        tsx_lines.append(f"const Scene{i}: React.FC = () => {{")
        tsx_lines.append("  // TODO: 구현")
        tsx_lines.append("  return (")
        tsx_lines.append("    <AbsoluteFill>")
        tsx_lines.append("      {/* 현재 씬 작업 영역 */}")
        tsx_lines.append("    </AbsoluteFill>")
        tsx_lines.append("  );")
        tsx_lines.append("};")
        tsx_lines.append("")
        
        sequence_render_lines.append(f"      <Sequence from={{{start_frame}}} durationInFrames={{{duration}}}>")
        sequence_render_lines.append(f"        <Scene{i} />")
        sequence_render_lines.append(f"      </Sequence>")

    # 3. 최하단 통합 렌더링 컴포넌트 (절대 프레임 배치)
    tsx_lines.append("export const Sequences: React.FC = () => {")
    tsx_lines.append("  return (")
    tsx_lines.append("    <AbsoluteFill>")
    tsx_lines.extend(sequence_render_lines)
    tsx_lines.append("    </AbsoluteFill>")
    tsx_lines.append("  );")
    tsx_lines.append("};")
    tsx_lines.append("")

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(tsx_lines))
    print(f"✅ Generated {out_path} with {len(sentences)} scenes mapped from timeline.")

def main():
    parser = argparse.ArgumentParser(description="Generate sequences.tsx skeleton mapped from plan.md and final_timeline.json")
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
        for item in os.listdir(project_dir):
            item_path = os.path.join(project_dir, item)
            if os.path.isdir(item_path):
                generate_sequences_for_section(project_id, item)

if __name__ == '__main__':
    main()
