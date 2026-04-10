import json
import sys
import os

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
    
    MAX_CHARS_PER_LINE = 28
    MAX_LINES_PER_CAPTION = 2
    # Threshold for deciding whether to force a split at a punctuation mark
    # even if it's not at the very end of the character limit.
    SOFT_LIMIT = 20 

    processed_captions = []

    def split_into_boxes(words):
        """Splits a list of words into multiple subtitle boxes using natural punctuation."""
        boxes = []
        current_box_words = []
        
        i = 0
        while i < len(words):
            # Try to build a box that fits 2 lines
            # First, find a potential split point (punctuation)
            potential_split_index = -1
            current_count = 0
            
            # Look ahead for natural break points within a reasonable range
            for j in range(i, len(words)):
                word_text = words[j]['text']
                current_count += len(word_text) + (1 if j > i else 0)
                
                # If we encounter a strong punctuation point (. ! ?), we consider splitting here
                if word_text.endswith(('.', '!', '?', '."')):
                    # If this sub-sentence fits in a box, it's a candidate
                    if current_count <= (MAX_CHARS_PER_LINE * MAX_LINES_PER_CAPTION):
                        potential_split_index = j
                    
                # If we exceed the total box capacity, we MUST split
                if current_count > (MAX_CHARS_PER_LINE * MAX_LINES_PER_CAPTION):
                    break
            
            # If we found a natural split point, use it.
            # Otherwise, use the last word that fits.
            if potential_split_index != -1:
                chunk = words[i : potential_split_index + 1]
                i = potential_split_index + 1
            else:
                # No natural split point found that fits, fallback to character-based fill
                chunk = []
                current_count = 0
                for j in range(i, len(words)):
                    word_text = words[j]['text']
                    next_count = current_count + len(word_text) + (1 if chunk else 0)
                    if next_count > (MAX_CHARS_PER_LINE * MAX_LINES_PER_CAPTION) and chunk:
                        break
                    chunk.append(words[j])
                    current_count = next_count
                i += len(chunk)
            
            if chunk:
                boxes.append(chunk)
        
        return boxes

    def format_box_text(words):
        """Formats box words into 1-2 lines with \n."""
        line1_words = []
        line1_len = 0
        line2_words = []
        
        # Try to split at a comma or end of a phrase for line break
        split_at = -1
        for i in range(len(words)):
            w_text = words[i]['text']
            line1_len += len(w_text) + (1 if line1_words else 0)
            
            if line1_len > MAX_CHARS_PER_LINE:
                break
            
            line1_words.append(words[i])
            if w_text.endswith((',', '.', '!', '?', '"')):
                split_at = i
        
        # If we found a logical line break within the first line limit, use it
        # UNLESS the remaining text is way too long for line 2.
        if split_at != -1 and split_at < len(words) - 1:
            line1 = " ".join([w['text'] for w in words[:split_at+1]])
            line2 = " ".join([w['text'] for w in words[split_at+1:]])
            # Check if line2 fits
            if len(line2) <= MAX_CHARS_PER_LINE + 5: # Small buffer for line 2
                return f"{line1}\\n{line2}".replace('"', '\\"')
        
        # Fallback to simple split
        line1_words = []
        line1_len = 0
        for w in words:
            word_text = w['text']
            if line1_len + len(word_text) + (1 if line1_words else 0) > MAX_CHARS_PER_LINE:
                break
            line1_words.append(w)
            line1_len += len(word_text) + 1
            
        line1 = " ".join([w['text'] for w in line1_words])
        line2_words = words[len(line1_words):]
        if line2_words:
            line2 = " ".join([w['text'] for w in line2_words])
            return f"{line1}\\n{line2}".replace('"', '\\"')
        return line1.replace('"', '\\"')

    for sentence_obj in sentences_data:
        words = sentence_obj.get('words', [])
        if not words: continue
        
        # Step 1: Split sentence into boxes (subtitle blocks)
        boxes = split_into_boxes(words)
        
        # Step 2: Format each box
        for box_words in boxes:
            subtitle_text = format_box_text(box_words)
            processed_captions.append({
                "text": subtitle_text,
                "startFrame": box_words[0]['startFrame'],
                "endFrame": box_words[-1]['endFrame']
            })

    # Gap protection
    for i in range(len(processed_captions) - 1):
        if processed_captions[i+1]['startFrame'] - processed_captions[i]['endFrame'] < 3:
            processed_captions[i]['endFrame'] = processed_captions[i+1]['startFrame']

    # Generate output
    os.makedirs(output_dir, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// Auto-generated by scripts/generate-captions.py\n")
        f.write("export const captions = [\n")
        for cap in processed_captions:
            f.write("  {\n")
            f.write(f"    text: \"{cap['text']}\",\n")
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
