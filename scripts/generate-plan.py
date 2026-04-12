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

- 타임라인 수치를 임의로 수정하지 않는다.
- `src/constants/theme.ts`에 명시된 디자인 토큰을 엄격히 준수한다.

### 🚨 페르소나

[역할]
당신은 유튜브 SEO 전문가이자 영상 기획자 입니다.

[유튜브 채널 정보]
채널명: 나만빼고 AI
채널설명: AI 트렌드를 따라가고 싶은 일반인들을 위해 알기 쉽고 친절하게 설명하는 채널

[타겟 시청자]
AI에 관심은 있지만, 전문 용어가 어렵고 복잡하게 느껴져서 시작하기 망설여지는 20~50 직장인 및 일반인

[영상 스타일]

- 톤앤매너: 친근함, 쉬운 설명, 따뜻함, 스케치, 아날로그
- 디자인 스타일: 펜으로 직접 그린 듯한 스케치 스타일 UI, 크림색 종이 배경 위에 마커와 펜으로 핵심 내용을 요약하며, 자유롭고 생동감 넘치는 드로잉 애니메이션으로 복잡한 AI 트렌드를 쉽게 설명한다
- 단어를 일차원적으로 묘사하는 유치한 아이콘(가위, 전구, 돋보기 등) 사용을 엄격히 금지합니다. 맥락에 맞는 시각적 디자인을 svg와 canvas 그림으로 계획하세요.
<!-- SECTION_OVERVIEW_END -->

<!-- SCENE_INSTRUCTIONS_START -->
### Scene 작성 형식

- 각 Scene의 {{FILL_S*_...}} 부분만 작성합니다. 원본 텍스트와 타임스탬프는 절대 수정하지 않습니다.
- 각 Scene을 기획할 때, 원본 텍스트를 읽고 맥락을 파악한 뒤 페르소나에 어울리는 비주얼을 계획하세요.
- Scene의 길이가 길고 포함된 단어가 많다면, 시청자가 해당 장면에서 지루하지 않도록 In-scene 애니메이션을 구체적으로 기획하여 비주얼 컨셉에 포함시킵니다.
- 반드시 `multi_replace_file_content` 또는 `replace_file_content` 도구만 사용하세요. `write_to_file`로 파일 전체를 덮어쓰는 것을 금지합니다.

최대 3개의 Scene을 Chunk 단위로 Iterate하게 계획하세요.
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
        scene_str += f"- 비주얼 컨셉: {{FILL_S{i}_VISUAL: 상단 공통 규칙을 준수하여, 이 씬의 레이아웃·핵심 요소·연출 방향을 2~4문장으로 요약. 단어는 고유명사, 약어를 제외하고 전부 한국어로 작성한다.}}\n"
        scene_str += f"- 필요한 그림(svg, canvas) 컴포넌트: {{FILL_S{i}_COMPONENT: AI가 작성}}\n"
        
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
