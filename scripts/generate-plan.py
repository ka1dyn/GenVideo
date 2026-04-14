import os
import sys
import json
import argparse

TEMPLATE = """# {section} 애니메이션 기획서

## 1. 섹션 개요

| 항목      | 값 |
| --------- | --- |
| 총 길이   | {total_duration}ms |
| 총 프레임 | {total_frames}f |
| Scene 수  | {sentence_count} |

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
            w_start_global = word.get('startFrame', 0)
            w_start_local = max(0, w_start_global - start_frame)
            word_timings.append(f'"{w_text}": {w_start_local}f')
            
        word_timings_str = "{ " + ", ".join(word_timings) + " }"

        scene_str = f"### Scene {i}\n\n"
        scene_str += f"- 원본 텍스트: {text}\n"
        scene_str += f"- 단어 등장 프레임 (Local): {word_timings_str}\n"
        scene_str += f"- 타임라인: {start_frame}f 부터 시작 (총 {duration_in_frames}f 지속)\n"
        scene_str += f"- [🔥 페르소나 리마인드]: Vercel 스타일의 미니멀한 구조 위에, 펜 스케치 질감을 '포인트'로만 제한적으로 얹습니다.\n"
        scene_str += f"- 비주얼 컨셉: {{FILL_S{i}_VISUAL: 정보량을 최소화하세요. 예술적인 그림 기획보다 텍스트(타이포그래피), 여백, 점, 선, 간단한 도형을 활용한 구조적 배치를 1순위로 기획합니다. }}\n"
        scene_str += f"- SVG 컴포넌트: {{FILL_S{i}_SVG: SVG 기획 시 내부에 텍스트(라벨, 이름 등)를 절대 포함하지 마세요. SVG는 오직 순수 그림 용도로만 기획하며 필요할 때만 제한적으로(최대 0~2개) 사용하세요. }}\n"

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
