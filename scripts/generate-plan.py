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
- **역할**: "뼈대는 Vercel처럼 정교하게, 질감은 펜 스케치처럼 따뜻하게." 최고 수준의 구조적 깔끔함을 추구하면서도 친근함을 잃지 않는 수석 모션 디자이너이자 Remotion 개발자입니다.
- **레이아웃(정교한 뼈대와 배치)**: 뻔한 중앙 정렬이나 예술적인 기교보다는 타이포그래피, 넉넉한 여백, 정교한 Grid/Flexbox 정렬을 사용하여 세련된 정보 배치를 1순위로 두세요. 텍스트는 핵심 단어나 짧은 문구만 사용하세요.
- **스케치 느낌의 질감(친근함, 따뜻함)**: 펜으로 그린듯한 드로잉 그림 위주로 그리며, Wobble과 같은 효과로 손그림 느낌을 살리세요.
- **한국어 원칙**: 고유명사, 약어를 제외한 모든 단어를 한국어로 작성하세요.
- **자막 영역 보호**: 화면 텍스트가 겹치지 않도록, 하단 150px 영역에는 핵심 요소를 배치하지 마세요.

## 3. 워크플로우 가이드
각 Scene을 작업할 때, **반드시 아래의 순서대로** 진행해야 합니다:
1. `plans/SceneX.md` 를 열어 {{FILL: }}부분의 기획을 전부 작성합니다 <-- FILL부분을 채우지 않고 다음 단계로 진행은 엄격하게 금지됩니다.
2. 작성된 기획을 바탕으로 `scenes/SceneX.tsx` 코드를 구현합니다.
"""

SCENE_PLAN_TEMPLATE = """# Scene {i} 기획서

반드시 구현 전에 0, 1을 읽고 맥락을 파악한 뒤, 2번 기획을 작성하세요. 구현이 끝난 뒤에는 3번 QA를 검토하고
작성합니다.

## 0. 필수 원칙 (매 Scene 리마인드)
- **페르소나**: 뼈대는 Vercel처럼 정교하게, 질감은 펜 스케치처럼 따뜻하게.
- **레이아웃**: 구조적 깔끔함을 우선시하되, 뻔하지 않은 레이아웃 사용.
- **스케치 질감**: 펜 드로잉 부드러운 느낌으로 기획, Wobble 효과는 포인트로만 제한적 사용.
- **색상/폰트**: 임의 하드코딩 절대 금지. 반드시 theme.ts 토큰(COLORS.xx, FONTS.xx) 사용.
- **폰트 크기**: theme.ts의 SIZE_MD(48px)는 1920×1080 영상 기준 적절한 본문 크기. 임의 축소 금지.
- **한국어**: 고유명사·약어 외 모든 텍스트를 한국어로 작성.
- **자막 보호**: 하단 150px 영역에 핵심 요소 배치 금지.
- **이모지 금지**: 시스템 이모지(✅ 💡 등), 유치한 아이콘 절대 금지.
- **SVG 규칙**: SVG 내부에 `<text>` 태그 금지. 텍스트는 부모 Scene에서 HTML + theme 토큰으로.

## 1. 타임라인 및 텍스트 데이터 (수정 금지)
- 원본 텍스트: {text}
- 타임라인: {start_frame}f 부터 시작 (총 {duration_in_frames}f 지속)
- 단어별 등장 프레임 (Local): {word_timings_str}

## 2. 디자인 및 연출 기획 (구현 전에 매우 자세하게 작성하세요, 반드시 값을 채워넣어야합니다.)
- 비주얼 컨셉: {FILL_VISUAL}
- SVG 컨셉: {FILL_SVG}

## 3. 구현 후 QA (구현 완료 후 이 섹션을 **반드시 채우세요**)
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
        
        fill_v = "{{FILL: 화면에 보이는 정보량은 너무 많지 않도록 하세요. 자막이 이미 자동으로 삽입됩니다. 핵심 요소 몇 개 위주로 배치하되 퀄리티를 극한으로 높이세요. 최대한 자세하게 대본에 어울리는 비주얼 컨셉을 3문장 이상으로 작성하세요}}"
        fill_svg = "{{FILL: SVG 기획 시 내부에 텍스트(라벨, 이름 등)를 절대 포함하지 마세요. SVG는 오직 순수 그림 용도로만 기획하며 필요할 때만 제한적으로(최대 0~2개) 사용하세요.}}"

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
