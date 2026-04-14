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

    # ── 파트 분리: "### Scene 1" 등 마크다운 헤더 기준 ──
    parts = re.split(r'(?m)^\s*#{1,4}\s*Scene\s+\d+\s*$', plan_text)
    
    scene_texts = parts[1:] if len(parts) > 1 else []
    sentences = data.get('sentences', [])

    # ── Scene 수 검증 ──
    if len(scene_texts) != len(sentences):
        print(f"⚠️  [{section}] Scene 수 불일치: plan.md {len(scene_texts)}개 ≠ timeline.json {len(sentences)}개")
        if len(scene_texts) < len(sentences):
            print(f"   → 뒷쪽 {len(sentences) - len(scene_texts)}개 Scene은 기획 없이 빈 주석으로 생성됩니다.")
    
    os.makedirs(out_dir, exist_ok=True)

    tsx_lines = []
    
    # 1. 파일 헤더 (imports)
    tsx_lines.append("import React from 'react';")
    tsx_lines.append("import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';")
    tsx_lines.append("import { COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z } from '../../../constants/theme';")
    tsx_lines.append("import { Wobble } from '../../../shared-components/Wobble';")
    tsx_lines.append("import { DrawLine } from '../../../shared-components/DrawLine';")
    tsx_lines.append("import { PaperTexture } from '../../../shared-components/PaperTexture';")
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
            safe_line = line.replace('*/', '* /')
            tsx_lines.append(f" * {safe_line}")
        tsx_lines.append(" */")
        tsx_lines.append(f"const Scene{i}: React.FC = () => {{")
        tsx_lines.append("  const frame = useCurrentFrame();")
        tsx_lines.append("  const { fps } = useVideoConfig();")
        tsx_lines.append("  // TODO: 구현")
        tsx_lines.append("  return (")
        tsx_lines.append("    <AbsoluteFill>")
        tsx_lines.append("      <PaperTexture />")
        tsx_lines.append("      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. 자막은 자동으로 삽입됩니다. */}")
        tsx_lines.append("      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}")
        tsx_lines.append("      {/* (중요) 포함되는 텍스트는 고유 명사, 약어를 제외하고 전부 한국어로 작성합니다. */}")
        tsx_lines.append("      {/* `src/constants/theme.ts`에 명시된 디자인 토큰을 외에 다른 색상, 폰트를 사용하지 마세요. */}")
        tsx_lines.append("    </AbsoluteFill>")
        tsx_lines.append("  );")
        tsx_lines.append("};")
        tsx_lines.append("")
        
        from_prop = f"from={{{start_frame}}} " if start_frame != 0 else ""
        sequence_render_lines.append(f"      <Sequence {from_prop}durationInFrames={{{duration}}}>")
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
        for item in sorted(os.listdir(project_dir)):
            item_path = os.path.join(project_dir, item)
            if os.path.isdir(item_path):
                generate_sequences_for_section(project_id, item)

if __name__ == '__main__':
    main()
