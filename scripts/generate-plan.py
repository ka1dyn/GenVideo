import os
import sys
import json
import argparse

MAKE_PLAN_TEMPLATE = """# {section} 전역 기획서

## 1. 섹션 개요

| 항목 | 값 |
|------|-----|
| 총 길이 | {total_duration}ms |
| 총 프레임 | {total_frames}f |
| Scene 수 | {sentence_count} |

## 2. 디자인 규칙 (전 Scene 적용, 반드시 숙지)

- **페르소나**: 당신은 Apple, Vercel, Toss와 같은 최고 수준의 IT 기업에서 일하는 수석 유튜브 영상 편집자이자 'React Remotion 개발자'입니다. 복잡하고 유치한 연출을 철저히 배제하고, 깔끔하고 구조적인 코드로 세련미를 극대화하세요.
- **스타일**: 깔끔하지만 살아있는 화면. PPT처럼 정적이면 안 됨. 요소가 **내레이션 타이밍에 맞춰** 등장·변화해야 시청 몰입도 유지
- **핵심**: 단어별 타이밍(word_timings)을 적극 활용하여, 핵심 단어가 나올 때 관련 요소가 등장하도록 연출
- 색상·폰트·크기·여백은 **반드시** 아래 토큰 레퍼런스에서만 사용. 하드코딩 절대 금지
- 화면에 표시되는 모든 텍스트는 **한국어 필수**. 영어 라벨(REPORT, ENV, ACT, PERCEPTION 등) 절대 금지. 고유명사(Mythos, AI 등)만 영어 허용
- 화면 요소는 **하단 150px 자막 영역에 절대 배치 금지**. 이미 대본 원문이 자막으로 자동 삽입됨.

### 금지패턴 / 권장패턴

- [금지] ❌ 정보량이 많고 자잘한 요소가 많은 화면, 대본 원문을 그대로 화면에 삽입
- [지향] ✅ 영상에 포함된 정보량을 최소화하고, 핵심 요소 1~3개를 시원시원하게 배치. 보조 요소는 절제하여 사용. 텍스트는 단어, 짧은문장 위주로만 배치.

- [금지] ❌ 화려하고 역동적인 애니메이션, 진동/떨림 등 과도한 효과, glow/boxShadow 남발, 4개이상 동시 애니메이션
- [지향] ✅ 간결하고 세련된 애니메이션, 한 Scene에 최대 3개의 애니메이션 효과 사용.

- [금지] ❌ 웹페이지처럼 16px, 24px 등 작은 폰트 사용
- [지향] ✅ 폰트 크기 48px(SIZE_MD) **미만 금지** (영상이므로 모바일 가독성 필수, 시원시원하게 배치)

- [금지] ❌ 대본을 일차원적으로 해석한 연출, 클리셰 메타포(가위, 전구, 돋보기 등 단어를 일차원적으로 표현하는 촌스러운 시스템아이콘) 사용
- [지향] ✅ 대본의 맥락을 보조할 수 있는 깔끔한 연출, 순수 CSS나 SVG 패스를 사용한 세련되고 구조적인 이미지 활용

### SVG 규칙

- SVG 내부에 텍스트(text 태그) **금지**
- 한 Scene에 SVG 컴포넌트 최대 2개
- viewBox는 150×150 이하의 단순한 좌표계 사용

## 3. 토큰 레퍼런스 (이 목록에 없는 토큰 사용 금지)

### COLORS
배경: BG_BASE | BG_SURFACE | BG_MUTED | BG_EMPHASIS | BG_DARK | BG_DARKEST
포인트: PRIMARY_LIGHT | PRIMARY_SOFT | PRIMARY_MID | PRIMARY | PRIMARY_DARK | PRIMARY_BOLD
보조: SECONDARY_LIGHT | SECONDARY_SOFT | SECONDARY | SECONDARY_MID | SECONDARY_DARK | SECONDARY_BOLD
텍스트: TEXT_MAIN | TEXT_BODY | TEXT_SUB | TEXT_DISABLED | TEXT_ON_DARK | TEXT_ON_PRIMARY | TEXT_ON_SECONDARY
선: STROKE_SUBTLE | STROKE_DEFAULT | STROKE_STRONG | STROKE_PRIMARY | STROKE_INK
오버레이: OVERLAY_LIGHT | OVERLAY_MED | OVERLAY_DARK | OVERLAY_PRIMARY | OVERLAY_SECONDARY
상태: STATE_SUCCESS_BG/FG | STATE_WARN_BG/FG | STATE_ERROR_BG/FG

### FONTS
패밀리: DISPLAY | PRIMARY | HANDWRITING | MONO
크기: SIZE_MD(48) | SIZE_LG(64) | SIZE_XL(80) | SIZE_2XL(100) | SIZE_3XL(140) | SIZE_4XL(180)
굵기: WEIGHT_REGULAR(400) | WEIGHT_MEDIUM(500) | WEIGHT_SEMIBOLD(600) | WEIGHT_BOLD(700) | WEIGHT_EXTRABOLD(800)

### EFFECTS
틴트: TINT_WARM | TINT_PRIMARY | TINT_SECONDARY | TINT_DARK | TINT_WHITE
그림자: SHADOW_SM | SHADOW_MD | SHADOW_LG | SHADOW_PRIMARY | SHADOW_SECONDARY
→ 사용: `boxShadow: EFFECTS.SHADOW_MD`, `filter: \`drop-shadow(\${{EFFECTS.SHADOW_SM}})\``

### SPACING (여백·크기에만 사용, fontSize 금지)
사용 예시: `SPACING.PX_16`, `SPACING.RADIUS_LG`
PX: PX_4 | PX_8 | PX_12 | PX_16 | PX_24 | PX_32 | PX_40 | PX_48 | PX_64 | PX_80 | PX_96 | PX_120
RADIUS: RADIUS_SM(6) | RADIUS_MD(12) | RADIUS_LG(20) | RADIUS_XL(32) | RADIUS_PILL(9999)

### ANIMATION
스프링: SPRING_GENTLE | SPRING_BOUNCY | SPRING_SNAPPY | SPRING_HEAVY
지속: DUR_XS(6f) | DUR_SM(9f) | DUR_MD(15f) | DUR_LG(21f) | DUR_XL(30f) | DUR_2XL(45f)
스태거: STAGGER_SM(6) | STAGGER_MD(10) | STAGGER_LG(16)

### Z (레이어 순서)
BG(0) | CONTENT(10) | OVERLAY(20) | UI(30) | CAPTION(40) | TOP(50)

## 4. 레이아웃 카탈로그 (SceneX.md에서 A~D로 선택)

레이아웃은 핵심 요소를 어떤 식으로 배치할 지를 기준으로 설정합니다. 보조 요소는 절제하여 배치하세요.

- **A: 중앙 집중** — 핵심 요소를 화면 중앙에 배치.
- **B: 좌우 분할** — 핵심 요소를 좌 우 대칭으로 배치.
- **C: 순차 퇴장/등장** - 여러 요소가 정중앙에서 퇴장 -> 등장으로 이어집니다. 보조요소 사용금지
- **D: 그리드/카드 배치** — 2~4개 요소가 flex 또는 grid 정렬. 비교·나열에 적합
- **E: 풀스크린 이미지** — 이미지 전체화면 + 오버레이 텍스트

⚠️ 연속 3개 이상 같은 레이아웃 사용 금지. 반드시 교차 배치.

## 5. 애니메이션 카탈로그 → 공유 컴포넌트 매핑

기획에서는 **카테고리.번호**로 지정, 구현에서는 대응하는 공유 컴포넌트를 import하여 사용합니다.
컴포넌트 상세 Props는 `shared-components/COMPONENTS.md` 참조.

### 등장/퇴장 (Appear 계열)
- **등장.①페이드인** = `<Appear delay={{프레임}}>` — 기본값 fadeUp. **가장 자주 사용 (60%)**
- **등장.②스케일인** = `<Appear delay={{프레임}} type="scale">` — 핵심 강조 요소 (15%)
- **등장.③방향** = `<Appear delay={{프레임}} type={{fadeLeft|fadeRight}}>` — 좌우 분할 대비 (15%)
- **등장.④기타** = `<Appear delay={{프레임}} type={{fade|fadeDown|wipe|blur}}>` — 변주 필요 시 (10%)
- **등장.⑤퇴장→등장** = `<Appear delay={{0}} exitAt={{프레임}}>A</Appear> <Appear delay={{프레임}}>B</Appear>` — 요소 교체

### 텍스트 강조
- **강조.①타이핑** = `<TypeWriter text="..." startFrame={{프레임}}>` — 글자 순차 등장
- **강조.②밑줄** = `<UnderLine startFrame={{프레임}}>텍스트</UnderLine>` — 밑줄 그리기
- **강조.③흔들림** = `<Wobble mode="smooth">텍스트</Wobble>` — 손그림 느낌 미세 흔들림

### 데이터/구조
> 자체 애니메이션 내장. `<Appear>`로 감쌀 필요 없음.

- **데이터.①순차목록** = `<StepList items={{[...]}} startFrame={{프레임}}>` — 순차 등장 목록
- **데이터.②카운터** = `<Counter to={{숫자}} startFrame={{프레임}}>` — 숫자 카운트
- **데이터.③진행바** = `<ProgressBar value={{0~1}} startFrame={{프레임}}>` — 수평 진행률

⚠️ 한 Scene에 애니메이션 최대 3종류. 과도한 움직임 금지.

## 5-2. 레이아웃 컴포넌트 (제한적 사용)

> 애니메이션 없음 (순수 스타일 컨테이너). 남용 시 화면이 단조로워지므로 **꼭 필요한 경우에만** 사용.
> 등장 효과가 필요하면 **Appear 계열만** 래핑 가능. (UnderLine, Wobble 등 텍스트 강조는 카드 내부에서 효과 없음)

- **보조.①카드** = `<Card variant="surface|emphasis|outline">내용</Card>` — 데이터 카드
- **보조.②인용** = `<QuoteCard>인용문</QuoteCard>` — 좌측 액센트 바 인용 카드

⚠️ 한 섹션에서 Card/QuoteCard 사용은 전체 Scene의 30% 이하 권장.

## 6. 이미지 활용 카탈로그 (이미지가 있는 Scene에서 선택)

- **배경**: Img 풀스크린 (objectFit: cover) + TINT_DARK 오버레이 필수
- **요소-대**: 600~900px 너비, 메인 비주얼로 배치.
- **요소-소**: 200~400px 너비, 보조 썸네일/아이콘 역할.

이미지가 있다면 view_file 도구를 활용해 **반드시 직접 파일을 열어** 내용을 확인한 뒤 활용 방식을 결정하세요.

## 7. 워크플로우
각 Scene 작업 시 반드시 아래 순서로 진행:
1. `plans/SceneX.md`를 열어 기획 슬롯을 **위 카탈로그에서 선택**하여 전부 채움
2. 기획을 바탕으로 `scenes/SceneX.tsx` 코드 구현
"""

SCENE_PLAN_TEMPLATE = """# Scene {i}

## 데이터 (수정 금지)
- 대본: {text} (총 {duration_in_frames}f)
- 타이밍: {word_timings_str}
- 이미지: 0개

## 기획 (make_video_plan.md 카탈로그 참조)

컨셉: [대본을 보조할 비주얼 방향 2~3문장]
레이아웃: [A|B|C|D|E]중 택1
이미지 활용: [없음 | 배경 | 요소-대 | 요소-소] / [배치,애니메이션 설명]
배경: 단색, 그라데이션, 패턴, 이미지 등 화면 전체를 덮음(패턴 및 변화는 제한적 사용, 색상은 요소와 겹치지 않게 흐릿하게 처리)
    색상-[COLORS.토큰명] / 패턴-[없음|그리드, 라인, 파티클 등 설명] / 변화-[없음|색상변화, 움직임 등 설명]

요소:
1. [종류] / [내용] / [크기토큰] / [색상토큰] / [애니메이션 번호: 카테고리.번호 delay=Xf]
2. ...

## QA
- [ ] 토큰 위반(하드코딩 색상/사이즈) →
- [ ] 요소가 자막 영역(하단 150px) 침범 →
- [ ] 애니메이션 최대 3개 →
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
    
    images_dir = f"public/{project_id}/{section}/images"
    os.makedirs(images_dir, exist_ok=True)
    mapping_path = os.path.join(images_dir, "image_mapping.md")

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

    # 2. plans/SceneX.md 작성 및 3. image_mapping.md 작성 준비
    mapping_lines = [
        f"# {section} 이미지 매핑",
        "이 폴더에 이미지를 넣고, 사용할 씬 아래에 이미지 파일명을 괄호 `[ ]` 안에 적어주세요.",
        "하나의 씬에 여러 이미지를 쓰려면 쉼표로 구분하세요. (예: `[ chart.png, logo.png ]`)",
        "이미지를 사용하지 않는 씬은 빈칸 `[ ]` 으로 두시면 됩니다.",
        ""
    ]

    for i, sentence in enumerate(sentences, 1):
        text = sentence.get('sentence', '')
        start_frame = sentence.get('startFrame', 0)
        duration_in_frames = sentence.get('durationInFrames', 0)
        
        # 맵핑 파일용 텍스트 요약
        clean_text = text.replace('\n', ' ')
        display_text = clean_text if len(clean_text) <= 50 else clean_text[:47] + "..."
        mapping_lines.append(f"- Scene {i} (\"{display_text}\"): [ ]")
        
        word_timings = []
        for word in sentence.get('words', []):
            w_text = word.get('text', '')
            w_start_global = word.get('startFrame', 0)
            w_start_local = max(0, w_start_global - start_frame)
            word_timings.append(f'"{w_text}" {w_start_local}f')
            
        word_timings_str = " | ".join(word_timings)
        
        scene_md_content = SCENE_PLAN_TEMPLATE.format(
            i=i,
            text=text,
            start_frame=start_frame,
            duration_in_frames=duration_in_frames,
            word_timings_str=word_timings_str
        )
        
        scene_plan_path = os.path.join(plans_dir, f"Scene{i}.md")
        if os.path.exists(scene_plan_path):
            print(f"   ⏭️ {scene_plan_path} already exists, skipping.")
            continue

        with open(scene_plan_path, 'w', encoding='utf-8') as f:
            f.write(scene_md_content)

    print(f"Generated {sentence_count} Scene plans in {plans_dir}")
    
    # 3. image_mapping.md 작성
    if not os.path.exists(mapping_path):
        with open(mapping_path, 'w', encoding='utf-8') as f:
            f.write("\n".join(mapping_lines))
        print(f"Generated {mapping_path}")
    else:
        print(f"⏭️ {mapping_path} already exists, skipping.")

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
