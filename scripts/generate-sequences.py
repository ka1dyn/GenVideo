import os
import sys
import json
import argparse
import re

def generate_sequences_for_section(project_id, section, force=False):
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

    # ── {FILL_...} 마커 잔존 검사 ──
    unfilled = re.findall(r'\{FILL_\w+:[^}]*\}', plan_text)
    if unfilled:
        print(f"⚠️  [{section}] plan.md에 미작성 FILL 마커 {len(unfilled)}개 발견:")
        for marker in unfilled[:5]:
            print(f"     - {marker[:80]}")
        if len(unfilled) > 5:
            print(f"     ... 외 {len(unfilled) - 5}개")
        if not force:
            print(f"❌ [{section}] FILL 마커가 남아있어 sequences 생성을 건너뜁니다. --force 플래그로 강제 실행 가능.")
            return
        print(f"⚡ --force 플래그로 강제 진행합니다.")

    # ── 파트 분리: "### Scene 1" 등 마크다운 헤더 기준 ──
    parts = re.split(r'(?m)^\s*#{1,4}\s*Scene\s+\d+\s*$', plan_text)
    
    # ── Global Context 추출 (HTML 마커 우선, 폴백으로 텍스트 마커) ──
    raw_global = parts[0].strip() if len(parts) > 0 else ""
    
    # HTML 마커 기반 추출: SECTION_SUMMARY + SECTION_OVERVIEW
    summary_match = re.search(
        r'<!-- SECTION_SUMMARY_START -->(.+?)<!-- SECTION_SUMMARY_END -->',
        raw_global, re.DOTALL
    )
    overview_match = re.search(
        r'<!-- SECTION_OVERVIEW_START -->(.+?)<!-- SECTION_OVERVIEW_END -->',
        raw_global, re.DOTALL
    )
    
    if summary_match or overview_match:
        # HTML 마커가 있으면 사용 (새 포맷)
        global_parts = []
        if summary_match:
            global_parts.append(summary_match.group(1).strip())
        if overview_match:
            global_parts.append(overview_match.group(1).strip())
        global_context = '\n\n'.join(global_parts)
    else:
        # 폴백: 레거시 텍스트 마커 (이전 포맷 호환)
        start_marker = "1. Section 주제 및 내용 요약"
        end_marker = "### Scene 작성 형식"
        start_idx = raw_global.find(start_marker)
        end_idx = raw_global.find(end_marker)
        if start_idx == -1:
            start_marker = "2. 섹션 개요"
            start_idx = raw_global.find(start_marker)
        if start_idx != -1:
            global_context = raw_global[start_idx:end_idx].strip() if end_idx != -1 else raw_global[start_idx:].strip()
        elif end_idx != -1:
            global_context = raw_global[:end_idx].strip()
        else:
            global_context = raw_global

    scene_texts = parts[1:] if len(parts) > 1 else []

    sentences = data.get('sentences', [])

    # ── Scene 수 검증 ──
    if len(scene_texts) != len(sentences):
        print(f"⚠️  [{section}] Scene 수 불일치: plan.md {len(scene_texts)}개 ≠ timeline.json {len(sentences)}개")
        if len(scene_texts) < len(sentences):
            print(f"   → 뒷쪽 {len(sentences) - len(scene_texts)}개 Scene은 기획 없이 빈 주석으로 생성됩니다.")
    
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
    parser.add_argument("--force", action="store_true", help="Force generation even if FILL markers remain")

    args = parser.parse_args()
    project_id = args.project_id
    project_dir = f"public/{project_id}"

    if not os.path.isdir(project_dir):
        print(f"Error: Project directory '{project_dir}' does not exist.")
        sys.exit(1)

    if args.section:
        generate_sequences_for_section(project_id, args.section, force=args.force)
    else:
        for item in sorted(os.listdir(project_dir)):
            item_path = os.path.join(project_dir, item)
            if os.path.isdir(item_path):
                generate_sequences_for_section(project_id, item, force=args.force)

if __name__ == '__main__':
    main()
