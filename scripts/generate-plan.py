import os
import sys
import json
import argparse

MAKE_PLAN_TEMPLATE = """# {section} 애니메이션 전역 기획서

## 1. 섹션 개요

| 항목      | 값 |
| --------- | --- |
| 총 길이   | {total_duration}ms |
| 총 프레임 | {total_frames}f |
| Scene 수  | {sentence_count} |

## 2. 디자인 페르소나 및 원칙 (필수 숙지)
- **역할**: 당신은 지금부터 Apple, Vercel, Toss와 같은 최고 수준의 IT 기업에서 일하는 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'입니다. 복잡하고 유치한 연출을 철저히 배제하고, 깔끔하고 구조적인 코드로 세련미를 극대화하세요.
- **레이아웃(정교한 뼈대와 배치)**: 뻔한 중앙 정렬이나 예술적인 기교보다는 타이포그래피, 넉넉한 여백, 정교한 Grid/Flexbox 정렬을 사용하여 세련된 정보 배치를 1순위로 두세요.
- **단순 ppt느낌 절대 금지**: 자막이 자동 삽입되므로, 영상은 시청 피로도를 낮추기 위해 정보량을 최소화하고, 원본 대본을 보조하는 내용으로 기획 및 연출하세요. 
- **클리셰 메타포 절대 금지 & 이모지 사용 금지**: 가위, 전구, 돋보기 등 단어를 일차원적으로 표현하는 촌스러운 아이콘을 절대 사용하지 마세요. 또한 시스템 이모지(✅ 등) 사용을 엄격히 금지하며, 대신 순수 CSS나 SVG 패스를 활용해 직접 드로잉하세요.
- **한국어 원칙**: 고유명사, 약어를 제외한 모든 단어를 한국어로 작성하세요.

## 3. 워크플로우 가이드
각 Scene을 작업할 때, **반드시 아래의 순서대로** 진행해야 합니다:
1. `plans/SceneX.md` 를 열어 {{FILL: }}부분의 기획을 전부 작성합니다 <-- FILL부분을 채우지 않고 다음 단계로 진행은 엄격하게 금지됩니다.
2. 작성된 기획을 바탕으로 `scenes/SceneX.tsx` 코드를 구현합니다.
"""

SCENE_PLAN_TEMPLATE = """# Scene {i} 기획서

아래 {{FILL}} 내용을 반드시 직접 채워넣으며 기획하세요. 절대 남는 부분 없이 **전부 채우세요**.

## 필수 원칙 (매 Scene 리마인드)
- **페르소나**: Apple, Vercel, Toss와 같은 최고 수준의 IT 기업에서 일하는 수석 UI/UX 모션 디자이너이자 'React Remotion 개발자'
- **레이아웃**: 구조적 깔끔함을 우선시하되, 뻔하고 단조로운 레이아웃은 지양합니다.
- **색상/폰트**: 임의 하드코딩 절대 금지. 반드시 theme.ts 토큰(COLORS.xx, FONTS.xx) 사용.
- **폰트 크기**: **웹페이지가 아닌 영상**을 구현하는 것이므로, 모바일에서도 잘 보이도록 theme.ts에 명시된 48px(SIZE_MD) 미만의 크기는 엄격하게 금지합니다.
- **한국어**: 고유명사·약어 외 모든 텍스트를 한국어로 작성.
- **이모지 금지**: 시스템 이모지(✅ 💡 등), 유치한 아이콘 절대 금지.

## 기획 (반드시 상세하고 신중하게 기획)

1번의 해당 씬에 나오는 원본 대본과, 단어의 타임라인을 파악한 뒤, 전체적인 비주얼 컨셉을 기획합니다.
2번에서 씬의 대본과 어울리는 전체 화면을 채우는 배경을 기획합니다.(색상, 패턴, 변화 등)
3번에서 배경 위에 배치될 화면 요소들(텍스트, svg 등)을 기획하고, 어떻게 배치할 지, 어떤 애니메이션을 사용할 지 기획합니다. 

### 1. 대본과 타임라인 파악, 전체적인 비주얼 컨셉 작성(수정 금지)
- 원본 텍스트: {text}
- 타임라인: {start_frame}f 부터 시작 (총 {duration_in_frames}f 지속)
- 단어별 등장 프레임 (Local): {word_timings_str}

위의 원본 자막에 어울리는 영상을 기획하세요. 일차원적인 해석이 아닌, 대본을 보조해서 사용자의 이해도를 높이는 창의적이고 트렌디한 연출을 생각하세요.
원본 텍스트는 이미 자막이 자동으로 삽입되므로, 전체 텍스트를 그대로 영상에 붙여넣는건 엄격히 금지합니다.

비주얼 컨셉: {FILL_VISUAL}

### 2. 배경 기획

- 텍스트 요소는 엄격히 금지됩니다.
- 정보량을 거의 없도록 합니다.
- 배경 위에 올라갈 요소들과 겹쳐도 이상하지 않도록 않도록 색상을 설정합니다.
- 모든 씬에 패턴이나 그라데이션 이 들어가면 너무 복잡하기 때문에 기본적으로 라이트모드 단색을 사용하며, 강조할 때만 제한적으로 효과를 사용합니다.

배경은 화면 전체를 채웁니다.(자막 영역 포함) 
색상: {{FILL: 단색 / 그라데이션 등 원하는대로 기획, 전체 씬의 60%는 단색만 사용합니다.}} 
패턴: {{FILL: 없음 / 점, 선, 도형등 원하는대로 기획, 강조할 때 제한적으로 사용합니다. 기본적으로 없음}}
변화: {{FILL: 없음 / 진행도중 반전등 원하는대로 기획, 마찬가지로 강조할 때 제한적으로 사용합니다. 기본적으로 없음}}

### 3. 화면 요소 기획

- 2번에서 기획한 배경에 어울리는 화면 요소들을 배치합니다.
- 절대 자잘하게 많이 넣지 말고, **핵심 요소들 위주로 배치합니다.**
- [CAUTION!!]: 화면 요소는 절대 하단 150px 자막 영역에는 배치하지 않습니다.

텍스트: {{FILL: 개수 작성, 예시: 3개}}
    - {{FILL: 텍스트 내용, 텍스트 배치 방식, 크기, 색상, 애니메이션 등 등 원하는대로 기획. 텍스트는 단어나 짧은 문장만 사용합니다.}}
    ...
svg 이미지: {{FILL: 개수 작성, 예시: 1개}}
    - {FILL_SVG}
    ...
이외 요소들: 
    - {{FILL: 자유 작성 영역}}   
    ...

## 구현 후 QA (구현 완료 후 이 섹션을 **반드시 채우세요**)
- [ ] 하드코딩 점검: 색상·폰트·사이즈에 theme.ts 토큰 대신 직접 값을 쓴 곳 → (없음 / 위치)
- [ ] 자막 영역: 하단 150px 내에 핵심 요소 배치 여부 → (없음 / 요소명)
- [ ] 한국어: 고유명사·약어 외 영어 텍스트 사용 여부 → (없음 / 해당 텍스트)
- [ ] z-index: Z 토큰 사용 여부 → (사용한 레이어 목록)
- [ ] props 기본값: 모든 컴포넌트 props에 기본값 지정 여부 → (완료 / 미지정 props)
"""

def generate_plan_for_section(project_id, section):
    json_path = f"public/{project_id}/{section}/{section}_final_timeline.json"
    
    out_dir = f"src/projects/{project_id}/{section}"
    plans_dir = os.path.join(out_dir, "plans")
    scenes_dir = os.path.join(out_dir, "scenes")
    
    make_plan_path = os.path.join(out_dir, "make_video_plan.md")

    if not os.path.exists(json_path):
        print(f"Skipping {section}: {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 폴더 구조 보장
    os.makedirs(plans_dir, exist_ok=True)
    os.makedirs(scenes_dir, exist_ok=True)

    total_duration = data.get('totalDuration', 0)
    total_frames = data.get('totalFrames', 0)
    sentences = data.get('sentences', [])
    sentence_count = len(sentences)

    # 1. make_video_plan.md 작성
    if os.path.exists(make_plan_path):
        print(f"⏭️ {make_plan_path} already exists, skipping.")
    else:
        md_content = MAKE_PLAN_TEMPLATE.format(
            section=section,
            total_duration=total_duration,
            total_frames=total_frames,
            sentence_count=sentence_count
        )
        with open(make_plan_path, 'w', encoding='utf-8') as f:
            f.write(md_content)
        print(f"Generated {make_plan_path}")

    # 2. plans/SceneX.md 작성
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
        
        fill_v = "{FILL: 화면에 보이는 정보량은 너무 많지 않도록 하세요. 자막이 이미 자동으로 삽입됩니다. 핵심 요소 몇 개 위주로 배치하되 퀄리티를 극한으로 높이세요. 최대한 자세하게 대본에 어울리는 비주얼 컨셉을 3문장 이상으로 작성하세요}"
        fill_svg = "{FILL: SVG 기획 시 내부에 텍스트(라벨, 이름 등)를 절대 포함하지 마세요. SVG는 오직 순수 그림 용도로만 기획하며 필요할 때만 제한적으로(최대 0~2개) 사용하세요.}"

        scene_md_content = SCENE_PLAN_TEMPLATE.format(
            i=i,
            text=text,
            start_frame=start_frame,
            duration_in_frames=duration_in_frames,
            word_timings_str=word_timings_str,
            FILL_VISUAL=fill_v,
            FILL_SVG=fill_svg
        )
        
        scene_plan_path = os.path.join(plans_dir, f"Scene{i}.md")
        if os.path.exists(scene_plan_path):
            print(f"   ⏭️ {scene_plan_path} already exists, skipping.")
            continue

        with open(scene_plan_path, 'w', encoding='utf-8') as f:
            f.write(scene_md_content)

    print(f"Generated {sentence_count} Scene plans in {plans_dir}")

def main():
    parser = argparse.ArgumentParser(description="Generate make_video_plan.md and plans/SceneX.md for sections")
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
