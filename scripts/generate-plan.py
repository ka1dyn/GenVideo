import os
import sys
import json
import argparse

TEMPLATE = """# {section} 애니메이션 기획서

<!-- SECTION_SUMMARY_START -->
## 1. Section 주제 및 내용 요약

원본 대본(./{section}.txt)을 읽고 주제와 핵심 내용을 요약해서 작성하세요.

주제: {{FILL_TOPIC: 이 섹션이 다루는 핵심 주제}}
내용 요약: {{FILL_SUMMARY: 3~5문장으로 섹션 전체 흐름 요약}}
<!-- SECTION_SUMMARY_END -->

<!-- SECTION_OVERVIEW_START -->
## 2. 섹션 개요

| 항목      | 값 |
| --------- | --- |
| 총 길이   | {total_duration}ms |
| 총 프레임 | {total_frames}f |
| Scene 수  | {sentence_count} |

## 시퀀스 별 애니메이션 기획

- 반드시 `src/constants/theme.ts`에 명시된 디자인 토큰을 확인하고 색상을 파악하세요.

### 🚨 페르소나

[역할]
당신은 유튜브 채널을 운영하는 트렌디한 IT 기업의 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'입니다.

[유튜브 채널 정보]
채널명: 나만빼고 AI
채널설명: AI 트렌드를 따라가고 싶은 일반인들을 위해 알기 쉽고 직관적으로 설명하는 채널

[영상 스타일]
- 깔끔한 레이아웃과 핵심을 전달하는 텍스트 및 다이어그램을 사용하며, 여백을 넉넉하게 확보하세요
- 데이터의 흐름, UI 컴포넌트의 배치 변화, 타이포그래피, 추상적인 기하학 도형을 활용하여 시각화하세요.

- 🚫 금지 패턴 (이것만 피하면 됩니다):
  1. 나레이션의 단어를 그대로 그림으로 옮기지 마세요. ("뇌" → 뇌 SVG, "지도" → 세계지도 등 일차원적인 직역 금지) 맥락에 맞게 씬을 창의적으로 기획하세요.
  2. 하나의 씬에 SVG 일러스트를 2개 이상 배치하지 마세요.
<!-- SECTION_OVERVIEW_END -->

<!-- SCENE_INSTRUCTIONS_START -->
### Scene 작성 형식

- 각 Scene의 {{FILL_S*_...}} 부분만 작성합니다. **원본 텍스트와 타임스탬프는 절대 수정하지 않습니다.**
- 반드시 `multi_replace_file_content` 또는 `replace_file_content` 도구만 사용하세요. `write_to_file`로 파일 전체를 덮어쓰는 것을 금지합니다.
- 색상을 나타낼 때에는 반드시 `src/constants/theme.ts`에 정의된 디자인 토큰으로 설명하세요

최대 3개의 Scene을 Chunk 단위로 Iterate하게 계획하세요. svg 파일은 Scene 3개 당 1개 정도 사용하세요.(canvas는 별도입니다.)
한 Iteration의 계획이 끝났다면, 다음 Chunk를 새로 계획합니다.
<!-- SCENE_INSTRUCTIONS_END -->

{scenes_content}
"""

def generate_plan_for_section(project_id, section):
    base_dir = f"public/{project_id}/{section}"
    json_path = os.path.join(base_dir, f"{section}_final_timeline.json")
    out_path = os.path.join(base_dir, f"{section}_plan.md")

    if not os.path.exists(json_path):
        print(f"Skipping {section}: {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    total_duration = data.get('totalDuration', 0)
    total_frames = data.get('totalFrames', 0)
    sentences = data.get('sentences', [])
    sentence_count = len(sentences)

    scenes_content_list = []
    
    for i, sentence in enumerate(sentences, 1):
        text = sentence.get('sentence', '')
        start_frame = sentence.get('startFrame', 0)
        duration_in_frames = sentence.get('durationInFrames', 0)
        
        word_timings = []
        for word in sentence.get('words', []):
            w_text = word.get('text', '')
            w_start = word.get('startFrame', 0)
            word_timings.append(f'"{w_text}": {w_start}f')
            
        word_timings_str = "{ " + ", ".join(word_timings) + " }"

        scene_str = f"### Scene {i}\n\n"
        scene_str += f"- 원본 텍스트: {text}\n"
        scene_str += f"- 단어 등장 프레임: {word_timings_str}\n"
        scene_str += f"- 타임라인: {start_frame}f 부터 시작 (총 {duration_in_frames}f 지속)\n"
        scene_str += f"- 비주얼 컨셉: {{FILL_S{i}_VISUAL: 이 씬의 텍스트에 어울리는 비주얼 컨셉을 2~4문장으로 요약.(타임라인 전체에 걸쳐 지루하지 않게 기획) 단어는 고유명사, 약어를 제외하고 전부 한국어로 작성한다. 임팩트 있는 장면은 Canvas나 3D canvas를 사용하라고 명시한다.(제한적으로 사용)}}\n"
        scene_str += f"- 필요한 그림(svg) 컴포넌트: {{FILL_S{i}_COMPONENT: 텍스트와 UI 레이아웃만으로 충분하면 '없음'으로 작성.}}\n"
        
        scenes_content_list.append(scene_str)

    scenes_content = "\n".join(scenes_content_list)

    md_content = TEMPLATE.format(
        project_id=project_id,
        section=section,
        total_duration=total_duration,
        total_frames=total_frames,
        sentence_count=sentence_count,
        scenes_content=scenes_content
    )

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    
    print(f"Generated {out_path}")


def main():
    parser = argparse.ArgumentParser(description="Generate plan.md for sections")
    parser.add_argument("project_id", help="The ID of the project")
    parser.add_argument("--section", help="Specific section to generate (optional, generates all if omitted)")

    args = parser.parse_args()
    project_id = args.project_id
    project_dir = f"public/{project_id}"

    if not os.path.isdir(project_dir):
        print(f"Error: Project directory '{project_dir}' does not exist.")
        sys.exit(1)

    if args.section:
        generate_plan_for_section(project_id, args.section)
    else:
        for item in sorted(os.listdir(project_dir)):
            item_path = os.path.join(project_dir, item)
            if os.path.isdir(item_path):
                generate_plan_for_section(project_id, item)

if __name__ == "__main__":
    main()
