import os
import sys
import json
import argparse
import re

# ── plan-video 전용 문구 필터 ──────────────────────────────────────────────────
# Global Context에서 implement-scenes AI에 불필요한 줄을 제거합니다.
# plan-video 단계의 지시문(역할, 채널정보, 작성 안내)이 구현 AI에 혼란을 주는 것을 방지.
GLOBAL_CONTEXT_FILTER_PATTERNS = [
    # plan-video 전용 역할 지시
    r'^\[역할\]',
    r'^당신은.*입니다\.',
    # 채널 정보 (구현에 불필요)
    r'^\[유튜브 채널 정보\]',
    r'^채널명:',
    r'^채널설명:',
    # plan-video 작성 안내 문구
    r'^원본 대본\(.*\)을 읽고',
    r'^- 타임라인 수치를 임의로 수정하지 않는다',
    # 마크다운 헤더 번호 ("## 1. Section 주제..." → 내용만 남기기)
    r'^##\s+1\.',
    r'^##\s+시퀀스 별 애니메이션 기획',
]
GLOBAL_FILTER_RE = [re.compile(p) for p in GLOBAL_CONTEXT_FILTER_PATTERNS]


def filter_global_context(text: str) -> str:
    """Global Context에서 implement-scenes에 불필요한 줄을 제거"""
    
    # 🚨 페르소나 섹션 이후의 모든 텍스트를 제거합니다 (별도로 하드코딩해서 주입하기 위함)
    persona_idx = text.find('### 🚨 페르소나')
    if persona_idx != -1:
        text = text[:persona_idx]

    lines = text.split('\n')
    filtered = []
    for line in lines:
        stripped = line.strip()
        if any(pat.search(stripped) for pat in GLOBAL_FILTER_RE):
            continue
        filtered.append(line)
    # 연속 빈 줄 정리 (3줄 이상 → 2줄)
    result = '\n'.join(filtered)
    result = re.sub(r'\n{3,}', '\n\n', result)
    return result.strip()

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

    # ── draw-components 작업물 보호 ──
    if os.path.exists(out_path):
        with open(out_path, 'r', encoding='utf-8') as f:
            existing = f.read()
        if 'SIMPLIFIED' in existing or 'COMPONENTS' in existing:
            print(f"⚠️  [{section}] sequences.tsx에 SIMPLIFIED/COMPONENTS 블록이 존재합니다.")
            print(f"   재생성하면 draw-components 작업물이 손실됩니다.")
            if not force:
                print(f"❌ [{section}] 건너뜁니다. --force로 강제 실행 가능.")
                return
            print(f"⚡ --force 플래그로 강제 덮어씁니다.")

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
        global_context = filter_global_context('\n\n'.join(global_parts))
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
        safe_line = line.strip().replace('*/', '* /')
        tsx_lines.append(f" * {safe_line}")
    tsx_lines.append(" *")
    tsx_lines.append(" * ### 🚨 페르소나 및 디자인 가이드")
    tsx_lines.append(" * [역할] 당신은 유튜브 채널을 운영하는 트렌디한 IT 기업의 수석 UI/UX 모션그래픽 전문가이자 'React Remotion 개발자'입니다.")
    tsx_lines.append(" * [채널명] 나만빼고 AI")
    tsx_lines.append(" * [채널설명] AI 트렌드를 따라가고 싶은 일반인들을 위해 친근하게 스케치 느낌의 영상으로 이해하기 쉽게 설명하는 채널")
    tsx_lines.append(" */")
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
        tsx_lines.append("  // TODO: 구현 - 상단 주석의 대본과 비주얼 컨셉을 확인하고, 실제 구현을 어떻게 할 지 기존 기획에서 크게 벗어나지 않도록 디테일을 수정하여 주석을 수정한 뒤, 구현을 진행하세요.")
        tsx_lines.append("  return (")
        tsx_lines.append("    <AbsoluteFill>")
        tsx_lines.append("      <PaperTexture />")
        tsx_lines.append("      {/* 핵심 텍스트와 정보 요소는 하단 150px 자막 영역에 배치하지 마세요. */}")
        tsx_lines.append("      {/* 배경·장식·파티클은 전체 화면을 자유롭게 사용할 수 있습니다. */}")
        tsx_lines.append("      {/* 포함되는 텍스트는 고유 명사를 제외하고 전부 한국어로 작성합니다. */}")
        tsx_lines.append("      {/* Scene이 끝날 때까지 지루하지 않도록 In-Scene 애니메이션을 적극 활용하세요 */}")
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
