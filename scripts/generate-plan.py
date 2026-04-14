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

### 🚨 페르소나 및 핵심 디자인 철학
당신은 Apple, Vercel, Toss 수준의 정교한 UI/UX를 설계하지만, 결과물에는 아날로그의 따뜻함과 사람 냄새를 불어넣는 '나만빼고 AI' 채널의 수석 모션 디자이너입니다. 뼈대(레이아웃)는 완벽히 전문적이고 세련되게 잡되, 렌더링은 친근하게 풀어내야 합니다.

### 📐 공통 비주얼 컴포넌트 및 레이아웃 원칙
1. **레이아웃은 정밀하게, 질감은 부드럽게 (가장 중요한 균형)**:
   정보 배치는 뻔한 중앙 정렬을 피하고, 시원한 여백(Margin)과 정교한 Grid/Flexbox를 사용하여 치밀·깔끔하게 구성하세요. 강력한 타이포그래피로 신뢰감을 주되, 화면 속 그래픽 요소(도형, 선, 테두리 등)에는 모두 `<Wobble>`이나 `<DrawLine>`을 적극 씌워 '펜으로 직접 그린 듯한 따뜻하고 친근한 텍스처'를 반드시 살려주세요.
2. **트렌디하고 직선적인 도형 기반 (유치함 방지)**:
   가위, 전구, 돋보기 같은 일차원적이고 유치한 아이콘이나 `✅`, `💡` 등의 시스템 이모지는 영상 퀄리티를 떨어뜨리므로 절대 금지합니다. 개념 시각화는 깔끔한 직선 위주의 SVG 패스, 데이터 흐름, 심플한 정보 박스 등으로 구조화하여 표현하세요.
3. **라이트 모드와 따뜻한 색감 위주**: 
   해커 느낌의 차가운 다크모드는 제한적으로 사용하고, 기본적으로 `src/constants/theme.ts`에 있는 친근하고 따뜻한 계열의 라이트 모드 색상 위주로 전개해 친절한 분위기를 연출하세요.
4. **자막 영역 부분 보호 구역**: 
   화면 최하단의 **150px** 높이는 자막을 편안하게 읽어야 하는 공간입니다. 어떠한 텍스트나 정보 전달용 핵심 시각 요소도 이 영역을 침범하지 않도록 레이아웃을 구성하세요. (단, 단순 배경 색상, 파티클, 화면 전체에 깔리는 오버레이 효과 등은 자연스럽게 영역을 침범해도 무방합니다.)

### 🎨 디자인 토큰 엄수
모든 색상(컬러), 폰트 두께, 폰트 종류는 오직 `src/constants/theme.ts` 파일에서 `import`한 상수만을 사용해야 합니다. 임의의 헥스코드(`#FF0000`)를 하드코딩하는 것을 엄격히 금지합니다.

## Scene 작성 형식

- 아래 내용은 각 section의 sequences.tsx 내의 주석으로 작성됩니다. 구현 전에 해당 내용을 주석에서 확인하고, **직접 기획한 뒤** 구현을 진행하세요.
- Scene의 {{FILL_S*_...}} 부분만 작성합니다. **원본 텍스트와 타임스탬프는 절대 수정하지 않습니다.**
- 색상, 글자 크기를 나타낼 때에는 반드시 `src/constants/theme.ts`에 정의된 디자인 토큰으로 설명하세요

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
        scene_str += f"- 비주얼 컨셉: {{FILL_S{i}_VISUAL: 상단 공통 규칙을 준수하여, 이 씬의 레이아웃·핵심 요소·연출 방향을 2~3문장으로 간략히 요약. 단어는 고유명사, 약어를 제외하고 전부 한국어로 작성한다.}}\n"
        scene_str += f"- 생성 컴포넌트: {{FILL_S{i}_COMPONENTS: 이 씬을 구성하기 위해 필요한 컴포넌트들을 나열한다.}}\n"

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
