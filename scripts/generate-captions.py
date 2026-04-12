"""
generate-captions.py — 자막(captions.ts) 자동 생성기 (v2)

final_timeline.json의 sentences/words 데이터를 읽어
화면에 표시할 자막 박스로 분할합니다.

핵심 원칙:
  1. 한 줄 최대 28자, 최대 2줄
  2. 구두점에서 적극적으로 분할 (SOFT_LIMIT 이상이면 즉시)
  3. 최소 자막 길이 미달 시 이전 박스에 병합
  4. 최소 표시 시간(MIN_DISPLAY_FRAMES) 보장
  5. 인접 자막 간격이 작으면 연장하여 공백 방지
"""

import json
import sys
import os

# ─── 상수 ───
MAX_CHARS_PER_LINE = 28
MAX_LINES_PER_CAPTION = 2
MAX_BOX_CHARS = MAX_CHARS_PER_LINE * MAX_LINES_PER_CAPTION  # 56

# 이 글자 수 이상 채운 상태에서 구두점을 만나면 즉시 split
SOFT_LIMIT = 20

# 이 글자 수 또는 단어 수 미만이면 이전 박스에 병합
MIN_CAPTION_CHARS = 8
MIN_CAPTION_WORDS = 3

# 자막 최소 표시 시간 (프레임)
MIN_DISPLAY_FRAMES = 15

# 인접 자막 간격이 이 프레임 미만이면 앞 자막을 연장
GAP_THRESHOLD_FRAMES = 15

# 강한 구두점 (문장 종결)
STRONG_PUNCTUATION = ('.', '!', '?')


def word_char_count(words, start, end):
    """words[start:end]의 총 글자 수 (공백 포함)"""
    count = 0
    for k in range(start, end):
        count += len(words[k]['text']) + (1 if k > start else 0)
    return count


def split_into_boxes(words):
    """문장의 단어 리스트를 자막 박스(subtitle block)로 분할합니다.
    
    분할 전략:
    1. 구두점 적극 활용: SOFT_LIMIT 이상 채웠으면 구두점에서 즉시 split
    2. MAX_BOX_CHARS 초과 시 강제 split
    3. 구두점 없으면 글자 수 기반 fill
    """
    boxes = []
    i = 0
    
    while i < len(words):
        best_split = -1
        current_count = 0
        
        for j in range(i, len(words)):
            word_text = words[j]['text']
            current_count += len(word_text) + (1 if j > i else 0)
            
            # 강한 구두점 감지
            is_punctuation = any(word_text.endswith(p) for p in STRONG_PUNCTUATION)
            # 따옴표로 끝나는 경우도 체크 (예: 겁니다.", 있어요.")
            if word_text.endswith('."') or word_text.endswith('!"') or word_text.endswith('?"'):
                is_punctuation = True
            if word_text.endswith('."') or word_text.endswith('!"') or word_text.endswith('?"'):
                is_punctuation = True
            
            if is_punctuation and current_count <= MAX_BOX_CHARS:
                best_split = j
                # SOFT_LIMIT 적극 활용: 충분히 채웠으면 여기서 즉시 split
                if current_count >= SOFT_LIMIT:
                    break
            
            # MAX_BOX_CHARS 초과 시 강제 중단
            if current_count > MAX_BOX_CHARS:
                break
        
        if best_split >= i:
            # 구두점 기반 split
            chunk = words[i:best_split + 1]
            i = best_split + 1
        else:
            # 구두점 없음 — 글자 수 기반 fill
            chunk = []
            current_count = 0
            for j in range(i, len(words)):
                word_text = words[j]['text']
                next_count = current_count + len(word_text) + (1 if chunk else 0)
                if next_count > MAX_BOX_CHARS and chunk:
                    break
                chunk.append(words[j])
                current_count = next_count
            i += len(chunk)
        
        if chunk:
            boxes.append(chunk)
    
    return boxes


def merge_short_boxes(boxes):
    """최소 길이 미달 박스를 이전 박스에 병합합니다."""
    if not boxes:
        return boxes
    
    merged = [boxes[0]]
    
    for box in boxes[1:]:
        box_text = " ".join(w['text'] for w in box)
        box_chars = len(box_text)
        box_words = len(box)
        
        # 최소 기준 미달?
        if box_chars < MIN_CAPTION_CHARS or box_words < MIN_CAPTION_WORDS:
            # 이전 박스와 합쳤을 때 MAX_BOX_CHARS 이내인지 확인
            prev_text = " ".join(w['text'] for w in merged[-1])
            combined_len = len(prev_text) + 1 + box_chars
            
            if combined_len <= MAX_BOX_CHARS:
                merged[-1] = merged[-1] + box
                continue
        
        merged.append(box)
    
    return merged


def format_box_text(words):
    """박스의 단어들을 1~2줄로 포맷합니다.
    
    전략:
    1. 구두점 기반 줄바꿈 시도 (line1 범위 내에서)
    2. 실패 시 글자 수 기반 줄바꿈
    3. line2도 MAX_CHARS_PER_LINE 검증
    """
    full_text = " ".join(w['text'] for w in words)
    
    # 한 줄에 들어가면 그대로 반환
    if len(full_text) <= MAX_CHARS_PER_LINE:
        return full_text
    
    # 구두점 기반 줄바꿈 시도
    best_split = -1
    line1_len = 0
    
    for i in range(len(words)):
        w_text = words[i]['text']
        line1_len += len(w_text) + (1 if i > 0 else 0)
        
        if line1_len > MAX_CHARS_PER_LINE:
            break
        
        # 구두점에서 split 후보 기록
        if w_text.endswith((',', '.', '!', '?', '"', '."', '!"', '?"')):
            best_split = i
    
    if best_split != -1 and best_split < len(words) - 1:
        line1 = " ".join(w['text'] for w in words[:best_split + 1])
        line2 = " ".join(w['text'] for w in words[best_split + 1:])
        
        # line2가 MAX_CHARS_PER_LINE 이내인지 확인
        if len(line2) <= MAX_CHARS_PER_LINE:
            return f"{line1}\n{line2}"
    
    # 글자 수 기반 줄바꿈 (fallback)
    line1_words = []
    line1_len = 0
    
    for w in words:
        next_len = line1_len + len(w['text']) + (1 if line1_words else 0)
        if next_len > MAX_CHARS_PER_LINE:
            break
        line1_words.append(w)
        line1_len = next_len
    
    line1 = " ".join(w['text'] for w in line1_words)
    remaining = words[len(line1_words):]
    
    if remaining:
        line2 = " ".join(w['text'] for w in remaining)
        return f"{line1}\n{line2}"
    
    return line1


def generate_captions(project_id, section_id):
    workspace_root = os.getcwd()
    json_path = os.path.join(workspace_root, f"public/{project_id}/{section_id}/{section_id}_final_timeline.json")
    output_dir = os.path.join(workspace_root, f"src/projects/{project_id}/{section_id}")
    output_path = os.path.join(output_dir, "captions.ts")

    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    sentences_data = data.get('sentences', [])
    processed_captions = []

    # 모든 sentence의 단어들을 하나로 합친 뒤 처리합니다.
    # 그래야 문장 경계에 걸친 짧은 단어(예: "해준다.")가 고아 박스가 되지 않습니다.
    all_words = []
    for sentence_obj in sentences_data:
        words = sentence_obj.get('words', [])
        all_words.extend(words)

    if not all_words:
        print(f"Warning: No words found in {json_path}")
        return

    # Step 1: 전체 단어를 대상으로 자막 박스 분할
    boxes = split_into_boxes(all_words)
    
    # Step 2: 짧은 박스 병합 (전체 대상이므로 문장 경계에 있는 짧은 박스도 병합됨)
    boxes = merge_short_boxes(boxes)
    
    # Step 3: 포맷 + 타이밍
    for box_words in boxes:
        subtitle_text = format_box_text(box_words)
        processed_captions.append({
            "text": subtitle_text,
            "startFrame": box_words[0]['startFrame'],
            "endFrame": box_words[-1]['endFrame']
        })

    # ─── 후처리 ───
    
    # 1. 최소 표시 시간 보장
    for i in range(len(processed_captions)):
        cap = processed_captions[i]
        min_end = cap['startFrame'] + MIN_DISPLAY_FRAMES
        if cap['endFrame'] < min_end:
            # 다음 자막과 겹치지 않도록 제한
            if i + 1 < len(processed_captions):
                cap['endFrame'] = min(min_end, processed_captions[i + 1]['startFrame'])
            else:
                cap['endFrame'] = min_end

    # 2. Gap protection — 인접 자막 간격 보정
    for i in range(len(processed_captions) - 1):
        gap = processed_captions[i + 1]['startFrame'] - processed_captions[i]['endFrame']
        if 0 < gap < GAP_THRESHOLD_FRAMES:
            processed_captions[i]['endFrame'] = processed_captions[i + 1]['startFrame']

    # ─── 출력 ───
    os.makedirs(output_dir, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated by scripts/generate-captions.py\n")
        f.write("export const captions = [\n")
        for cap in processed_captions:
            # json.dumps로 이스케이프 일원화 (따옴표, 줄바꿈 등 자동 처리)
            text_escaped = json.dumps(cap['text'], ensure_ascii=False)
            f.write("  {\n")
            f.write(f"    text: {text_escaped},\n")
            f.write(f"    startFrame: {cap['startFrame']},\n")
            f.write(f"    endFrame: {cap['endFrame']}\n")
            f.write("  },\n")
        f.write("];\n")

    print(f"✅ Successfully generated {len(processed_captions)} captions at {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 generate-captions.py <project_id> [section_id]")
        sys.exit(1)
        
    project_id = sys.argv[1]
    
    if len(sys.argv) >= 3:
        # 특정 섹션만 처리
        generate_captions(project_id, sys.argv[2])
    else:
        # 프로젝트 내 모든 섹션 자동 탐색
        print(f"=== Generating all captions for project: {project_id} ===")
        base_dir = os.path.join(os.getcwd(), f"public/{project_id}")
        if not os.path.exists(base_dir):
            print(f"Error: Project directory not found: {base_dir}")
            sys.exit(1)
            
        sections = sorted([
            d for d in os.listdir(base_dir)
            if os.path.isdir(os.path.join(base_dir, d)) and not d.startswith('.')
        ])
        
        for section in sections:
            print(f"Processing section: {section}")
            generate_captions(project_id, section)
        
        print("=== All sections processed ===")
