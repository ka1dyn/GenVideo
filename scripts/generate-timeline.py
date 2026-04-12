"""
generate-timeline.py — Final Timeline Generator (v3)

순차 위치 기반(Sequential Position) 매핑을 사용하여
원본 대본과 Whisper 타임스탬프를 정확하게 대응시킵니다.

핵심 원칙:
  1. 매핑 성공 단어의 타임스탬프는 Whisper 값을 100% 사용 (불변)
  2. 1:N 매핑 시 글자 수 비율로 시간 분배
  3. 매핑 불가 단어는 스마트 보간 + 리포트 경고
  4. 0-duration 단어 절대 금지
  5. 연속 환각 복구를 위한 확장 lookahead (최대 3)
"""

import json
import re
import os
import math
from difflib import SequenceMatcher


# ─────────────────────────────────────────────
# 1. Context 파일 파싱
# ─────────────────────────────────────────────

def parse_source_files(project_id: str, section: str):
    """
    원본 파일들을 직접 읽어 타임라인 생성에 필요한 데이터를 반환합니다.
    context.md 파싱 대신 원본 소스를 직접 참조하여 안정성을 확보합니다.
    
    Returns: (total_duration_ms, total_frames, script_lines, timestamps)
    """
    import subprocess
    
    base_dir = f'public/{project_id}/{section}'
    txt_path = os.path.join(base_dir, f'{section}.txt')
    ts_path = os.path.join(base_dir, f'{section}_timestamp.json')
    wav_path = os.path.join(base_dir, f'{section}.wav')
    
    # 1. 원본 대본 읽기
    script_lines = []
    if os.path.exists(txt_path):
        with open(txt_path, 'r', encoding='utf-8') as f:
            script_lines = [line.strip() for line in f if line.strip()]
    else:
        print(f"  ❌ 대본 파일 없음: {txt_path}")
        return 0, 0, [], []
    
    # 2. 타임스탬프 JSON 읽기
    timestamps = []
    if os.path.exists(ts_path):
        with open(ts_path, 'r', encoding='utf-8') as f:
            timestamps = json.load(f)
    else:
        print(f"  ❌ 타임스탬프 파일 없음: {ts_path}")
        return 0, 0, script_lines, []
    
    # 3. 오디오 duration (ffprobe 직접 호출)
    total_duration_ms = 0
    total_frames = 0
    FPS = 30  # 기본값
    
    # video-config에서 FPS 읽기 시도
    config_path = 'src/constants/video-config.ts'
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            config_content = f.read()
            fps_match = re.search(r'VIDEO_FPS\s*=\s*(\d+)', config_content)
            if fps_match:
                FPS = int(fps_match.group(1))
    
    if os.path.exists(wav_path):
        try:
            result = subprocess.run(
                ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                 '-of', 'csv=p=0', wav_path],
                capture_output=True, text=True, timeout=10
            )
            duration_sec = float(result.stdout.strip())
            total_duration_ms = round(duration_sec * 1000)
            total_frames = math.ceil(duration_sec * FPS)
        except Exception as e:
            print(f"  ⚠️ ffprobe 실패: {e}")
            # 타임스탬프의 마지막 endFrame으로 추정
            if timestamps:
                total_frames = max(ts.get('endFrame', 0) for ts in timestamps)
                total_duration_ms = round(total_frames / FPS * 1000)
    else:
        print(f"  ⚠️ WAV 파일 없음: {wav_path}, 타임스탬프 기반으로 추정")
        if timestamps:
            total_frames = max(ts.get('endFrame', 0) for ts in timestamps)
            total_duration_ms = round(total_frames / FPS * 1000)
    
    return total_duration_ms, total_frames, script_lines, timestamps


# ─────────────────────────────────────────────
# 2. 텍스트 유사도 유틸리티
# ─────────────────────────────────────────────

def clean_text(t: str) -> str:
    """구두점, 따옴표 등 제거하고 순수 글자만 남김"""
    return re.sub(r'[^\w]', '', t)


def char_similarity(a: str, b: str) -> float:
    """두 문자열의 글자 유사도 (0.0 ~ 1.0)"""
    ca, cb = clean_text(a), clean_text(b)
    if not ca or not cb:
        return 0.0
    return SequenceMatcher(None, ca, cb).ratio()


# ─────────────────────────────────────────────
# 3. 순차 위치 기반 매핑 (핵심 알고리즘)
# ─────────────────────────────────────────────

def map_words_to_timestamps(script_words: list[str], whisper_words: list[dict], report: dict):
    """
    순서 기반 매핑:
    1. 원본 단어와 Whisper 단어를 순서대로 정렬
    2. 앞에서부터 순차적으로 1:1 매핑 시도
    3. 1:N (원본 여러 단어 → Whisper 한 단어) 감지 및 시간 분배
    4. 매핑 실패 단어는 스마트 보간

    Returns: list of {"text": str, "startFrame": int, "endFrame": int, "interpolated": bool}
    """
    n_script = len(script_words)
    n_whisper = len(whisper_words)

    # 결과 배열
    result = [
        {"text": w, "startFrame": None, "endFrame": None, "interpolated": False}
        for w in script_words
    ]

    if n_whisper == 0:
        report["errors"].append("Whisper 타임스탬프가 비어 있습니다.")
        return result

    # ── Phase 1: 순차 매핑 (greedy forward matching) ──
    # 원본과 Whisper를 동시에 순회하며 최적 매칭을 찾음
    s_idx = 0  # script index
    w_idx = 0  # whisper index

    while s_idx < n_script and w_idx < n_whisper:
        sw = script_words[s_idx]
        ww = whisper_words[w_idx]

        sim = char_similarity(sw, ww["text"])

        # Case 1: 높은 유사도 → 1:1 매핑
        if sim >= 0.5:
            result[s_idx]["startFrame"] = ww["startFrame"]
            result[s_idx]["endFrame"] = ww["endFrame"]
            s_idx += 1
            w_idx += 1
            continue

        # Case 2: 1:N 감지 — Whisper 단어가 원본 여러 단어를 합친 것인지 확인
        # 예: Whisper "핵버튼이에요" ↔ 원본 "핵" + "버튼이에요."
        merged_found = False
        for merge_count in range(2, min(5, n_script - s_idx + 1)):
            merged_text = ''.join(script_words[s_idx:s_idx + merge_count])
            merged_sim = char_similarity(merged_text, ww["text"])
            if merged_sim >= 0.5:
                # 원본 merge_count개 단어가 Whisper 1단어에 대응
                # → 글자 수 비율로 시간 분배
                distribute_time_by_chars(
                    result, s_idx, merge_count, ww, report
                )
                s_idx += merge_count
                w_idx += 1
                merged_found = True
                break

        if merged_found:
            continue

        # Case 3: N:1 감지 — 원본 단어 1개가 Whisper 여러 단어에 걸친 것인지 확인
        # 예: 원본 "300~500개" ↔ Whisper "300," + "500개"
        split_found = False
        for split_count in range(2, min(5, n_whisper - w_idx + 1)):
            split_text = ''.join(
                clean_text(whisper_words[w_idx + k]["text"])
                for k in range(split_count)
            )
            split_sim = char_similarity(sw, ''.join(c for c in split_text))
            if split_sim >= 0.5:
                # Whisper split_count개 단어가 원본 1단어에 대응
                result[s_idx]["startFrame"] = whisper_words[w_idx]["startFrame"]
                result[s_idx]["endFrame"] = whisper_words[w_idx + split_count - 1]["endFrame"]
                s_idx += 1
                w_idx += split_count
                split_found = True
                break

        if split_found:
            continue

        # Case 4: 매핑 실패 — 확장 lookahead로 연속 환각 복구
        # Whisper 환각이 2~3개 연속 발생해도 정상 단어를 놓치지 않도록
        # 최대 LOOKAHEAD 범위까지 스캔하여 매칭 가능한 위치를 찾음
        LOOKAHEAD = 3
        
        # 전략 A: 현재 원본 단어(sw)가 Whisper의 뒤쪽 단어와 매칭되는지 확인
        # → Whisper 쪽에 연속 환각이 있는 케이스
        whisper_skip = 0
        for skip in range(1, min(LOOKAHEAD + 1, n_whisper - w_idx)):
            if char_similarity(sw, whisper_words[w_idx + skip]["text"]) >= 0.5:
                whisper_skip = skip
                break
        
        if whisper_skip > 0:
            # w_idx ~ w_idx+whisper_skip-1 은 전부 환각으로 기록
            for h in range(whisper_skip):
                report["hallucinations"].append({
                    "whisper_idx": w_idx + h,
                    "whisper_text": whisper_words[w_idx + h]["text"],
                    "startFrame": whisper_words[w_idx + h]["startFrame"],
                    "endFrame": whisper_words[w_idx + h]["endFrame"],
                })
            w_idx += whisper_skip
            continue  # sw를 다시 매칭 시도 (w_idx가 이동했으므로)
        
        # 전략 B: 현재 Whisper 단어(ww)가 원본의 뒤쪽 단어와 매칭되는지 확인
        # → 원본에 Whisper가 인식 못 한 단어가 있는 케이스
        script_skip = 0
        for skip in range(1, min(LOOKAHEAD + 1, n_script - s_idx)):
            if char_similarity(script_words[s_idx + skip], ww["text"]) >= 0.5:
                script_skip = skip
                break
        
        if script_skip > 0:
            # s_idx ~ s_idx+script_skip-1 은 매칭 불가 → 나중에 보간
            s_idx += script_skip
            continue  # ww를 다시 매칭 시도
        
        # 전략 C: 양쪽 모두 lookahead 범위 내에서 매칭 불가
        # → 양쪽 다 한 칸 전진 (최후 수단)
        report["hallucinations"].append({
            "whisper_idx": w_idx,
            "whisper_text": ww["text"],
            "startFrame": ww["startFrame"],
            "endFrame": ww["endFrame"],
        })
        s_idx += 1
        w_idx += 1

    # ── Phase 2: 스마트 보간 ──
    interpolate_unmatched(result, report)

    return result


def distribute_time_by_chars(result: list, start_idx: int, count: int, whisper_word: dict, report: dict):
    """
    Whisper 한 단어의 시간을 원본 여러 단어에 글자 수 비율로 분배.
    각 단어가 최소 1프레임을 보장합니다.
    """
    total_start = whisper_word["startFrame"]
    total_end = whisper_word["endFrame"]
    total_time = total_end - total_start

    char_counts = [max(1, len(clean_text(result[start_idx + i]["text"]))) for i in range(count)]
    total_chars = sum(char_counts)

    current = total_start
    for i in range(count):
        if i == count - 1:
            # 마지막 단어는 나머지 시간 전부
            word_end = total_end
        else:
            # 비율 분배, 최소 1프레임
            word_time = max(1, round(total_time * char_counts[i] / total_chars))
            word_end = min(current + word_time, total_end)

        result[start_idx + i]["startFrame"] = current
        result[start_idx + i]["endFrame"] = word_end
        result[start_idx + i]["interpolated"] = True
        current = word_end

    word_texts = [result[start_idx + j]["text"] for j in range(count)]
    report["splits"].append({
        "original_words": word_texts,
        "whisper_text": whisper_word["text"],
        "startFrame": total_start,
        "endFrame": total_end,
        "method": f"글자 수 비율 분배 ({':'.join(str(c) for c in char_counts)})",
    })


def interpolate_unmatched(result: list, report: dict):
    """
    매핑 실패 단어들을 인접 매핑 성공 단어 사이에서
    글자 수 비율로 시간을 분배합니다. (0-duration 방지)
    """
    n = len(result)
    i = 0

    while i < n:
        if result[i]["startFrame"] is not None:
            i += 1
            continue

        # 연속 미매핑 구간 찾기
        gap_start = i
        while i < n and result[i]["startFrame"] is None:
            i += 1
        gap_end = i  # exclusive

        # 앞/뒤 매핑 성공 단어의 프레임 경계 찾기
        prev_end = None
        next_start = None

        if gap_start > 0:
            prev_end = result[gap_start - 1]["endFrame"]
        if gap_end < n:
            next_start = result[gap_end]["startFrame"]

        # 가용 시간 범위 결정 (매핑 성공 단어와 겹치지 않도록)
        if prev_end is not None and next_start is not None:
            avail_start = prev_end
            avail_end = next_start
        elif prev_end is not None:
            # 뒤에 매핑 성공 단어가 없으면, 전체 결과에서 찾기
            next_matched = None
            for k in range(gap_end, n):
                if result[k]["startFrame"] is not None:
                    next_matched = result[k]["startFrame"]
                    break
            avail_start = prev_end
            avail_end = next_matched if next_matched is not None else prev_end + (gap_end - gap_start) * 2
        elif next_start is not None:
            # 앞에 매핑 성공 단어가 없으면, 전체 결과에서 찾기
            prev_matched = None
            for k in range(gap_start - 1, -1, -1):
                if result[k]["endFrame"] is not None:
                    prev_matched = result[k]["endFrame"]
                    break
            avail_end = next_start
            avail_start = prev_matched if prev_matched is not None else max(0, next_start - (gap_end - gap_start) * 2)
        else:
            # 전체에서 첫 번째 매핑 성공 단어 탐색
            first_matched = None
            for k in range(n):
                if result[k]["startFrame"] is not None:
                    first_matched = result[k]["startFrame"]
                    break
            avail_start = 0
            avail_end = first_matched if first_matched is not None else (gap_end - gap_start) * 2

        gap_count = gap_end - gap_start
        avail_time = avail_end - avail_start

        # 글자 수 비율 분배 (최소 1프레임 보장)
        char_counts = [max(1, len(clean_text(result[j]["text"]))) for j in range(gap_start, gap_end)]
        total_chars = sum(char_counts)

        current = avail_start
        for k in range(gap_count):
            j = gap_start + k
            if k == gap_count - 1:
                word_end = avail_end
            else:
                word_time = max(1, round(avail_time * char_counts[k] / total_chars))
                word_end = min(current + word_time, avail_end)
                # 다음 단어도 최소 1프레임 남겨둠
                remaining_words = gap_count - k - 1
                word_end = min(word_end, avail_end - remaining_words)

            # 0-duration 방지: 최소 1프레임
            if word_end <= current:
                word_end = current + 1

            result[j]["startFrame"] = current
            result[j]["endFrame"] = word_end
            result[j]["interpolated"] = True
            current = word_end

            report["interpolated"].append({
                "word": result[j]["text"],
                "startFrame": result[j]["startFrame"],
                "endFrame": result[j]["endFrame"],
                "reason": "Whisper 매칭 실패 (환각 또는 누락)",
            })


# ─────────────────────────────────────────────
# 4. 문장 조립 + 프레임 가드
# ─────────────────────────────────────────────

def assemble_sentences(script_lines: list[str], mapped_words: list[dict],
                       total_frames: int, report: dict) -> list[dict]:
    """
    매핑된 단어들을 문장 구조로 재조립하고 프레임 가드를 적용합니다.

    프레임 가드 규칙:
    - 문장의 endFrame = 다음 문장의 startFrame (단어 타임스탬프는 불변)
    - 마지막 문장의 endFrame = totalFrames
    - 첫 문장의 startFrame = 0
    """
    # 단어 수 검증
    total_script_words = sum(len(line.split()) for line in script_lines)
    if total_script_words != len(mapped_words):
        report["errors"].append(
            f"단어 수 불일치: 원본 대본 {total_script_words}단어 ≠ 매핑 결과 {len(mapped_words)}단어"
        )

    # 문장별 단어 분배
    word_idx = 0
    sentences = []

    for i, s_text in enumerate(script_lines):
        words_in_line = s_text.split()
        n_words = len(words_in_line)
        # 범위 초과 방지
        available = min(n_words, len(mapped_words) - word_idx)
        sentence_words = mapped_words[word_idx:word_idx + available]
        word_idx += available

        # 단어에서 interpolated 플래그 제거 (출력용)
        clean_words = [
            {"text": w["text"], "startFrame": w["startFrame"], "endFrame": w["endFrame"]}
            for w in sentence_words
        ]

        s_start = sentence_words[0]["startFrame"] if sentence_words else 0

        # 첫 문장은 반드시 0에서 시작
        if i == 0:
            s_start = 0
            if clean_words:
                clean_words[0]["startFrame"] = 0

        sentences.append({
            "sentence": s_text,
            "startFrame": s_start,
            "words": clean_words,
        })

    # 프레임 가드: 문장 간 연속성 + 마지막 문장
    for i in range(len(sentences)):
        if i < len(sentences) - 1:
            sentences[i]["endFrame"] = sentences[i + 1]["startFrame"]
        else:
            sentences[i]["endFrame"] = total_frames

        sentences[i]["durationInFrames"] = sentences[i]["endFrame"] - sentences[i]["startFrame"]

    # 0-duration 단어 자동 수정 + 검증
    for i, s in enumerate(sentences):
        words = s["words"]
        for j, w in enumerate(words):
            if w["endFrame"] <= w["startFrame"]:
                # Whisper 원본 자체가 0-duration인 케이스 → 최소 1프레임 보장
                # 다음 단어의 startFrame까지 여유가 있으면 endFrame을 1 늘림
                next_boundary = None
                if j + 1 < len(words):
                    next_boundary = words[j + 1]["startFrame"]
                elif i + 1 < len(sentences) and sentences[i + 1]["words"]:
                    next_boundary = sentences[i + 1]["words"][0]["startFrame"]

                if next_boundary is not None and next_boundary > w["startFrame"]:
                    w["endFrame"] = w["startFrame"] + 1
                else:
                    # 다음 단어 여유 없으면 startFrame을 1 당김
                    w["startFrame"] = w["endFrame"] - 1
                    if w["startFrame"] < 0:
                        w["startFrame"] = 0
                        w["endFrame"] = 1

                report["interpolated"].append({
                    "word": w["text"],
                    "startFrame": w["startFrame"],
                    "endFrame": w["endFrame"],
                    "reason": f"Whisper 원본 0-duration → 최소 1프레임 보정",
                })

        if s["durationInFrames"] <= 0:
            report["errors"].append(
                f"문장 {i} durationInFrames={s['durationInFrames']} (0 이하): \"{s['sentence'][:30]}...\""
            )

    return sentences


# ─────────────────────────────────────────────
# 5. 검증 리포트 생성
# ─────────────────────────────────────────────

def generate_report(section: str, report: dict, sentences: list[dict],
                    total_frames: int, script_lines: list[str]) -> str:
    """섹션별 검증 리포트를 마크다운으로 생성합니다."""
    lines = [f"## {section} 타임라인 리포트\n"]

    # ── 기본 검증 ──
    lines.append("### 기본 검증\n")

    checks = []
    # 문장 수
    n_tl = len(sentences)
    n_orig = len(script_lines)
    ok = n_tl == n_orig
    checks.append(f"- 문장 수: 원본 {n_orig} / 타임라인 {n_tl} {'✅' if ok else '❌'}")

    # 첫 문장
    if sentences:
        ok = sentences[0]["startFrame"] == 0
        checks.append(f"- 첫 문장 startFrame: {sentences[0]['startFrame']} {'✅' if ok else '❌'}")

    # 마지막 문장
    if sentences:
        ok = sentences[-1]["endFrame"] == total_frames
        checks.append(
            f"- 마지막 문장 endFrame: {sentences[-1]['endFrame']} == totalFrames({total_frames}) "
            f"{'✅' if ok else '❌'}"
        )

    # 문장 연속성
    continuity_ok = True
    for i in range(1, len(sentences)):
        if sentences[i]["startFrame"] != sentences[i - 1]["endFrame"]:
            continuity_ok = False
            break
    checks.append(f"- 문장 연속성: {'모두 통과 ✅' if continuity_ok else '불일치 발견 ❌'}")

    # 0-duration 단어
    zero_dur_words = []
    for i, s in enumerate(sentences):
        for j, w in enumerate(s["words"]):
            if w["endFrame"] <= w["startFrame"]:
                zero_dur_words.append(f"문장{i} \"{w['text']}\"")
    checks.append(f"- 0-duration 단어: {len(zero_dur_words)}건 {'✅' if not zero_dur_words else '❌'}")
    if zero_dur_words:
        for zw in zero_dur_words:
            checks.append(f"  - {zw}")

    lines.extend(checks)
    lines.append("")

    # ── 보간된 단어 ──
    if report["interpolated"]:
        lines.append(f"### ⚠️ 보간된 단어 ({len(report['interpolated'])}건)\n")
        lines.append("| 단어 | startFrame | endFrame | 사유 |")
        lines.append("|------|-----------|---------|------|")
        for item in report["interpolated"]:
            lines.append(
                f"| {item['word']} | {item['startFrame']} | {item['endFrame']} | {item['reason']} |"
            )
        lines.append("")

    # ── 1:N 분할 매핑 ──
    if report["splits"]:
        lines.append(f"### ⚠️ 1:N 분할 매핑 ({len(report['splits'])}건)\n")
        lines.append("| 원본 단어 | Whisper 원본 | 프레임 범위 | 분배 방식 |")
        lines.append("|----------|-------------|-----------|----------|")
        for item in report["splits"]:
            orig = " / ".join(item["original_words"])
            lines.append(
                f"| {orig} | {item['whisper_text']} | "
                f"{item['startFrame']}~{item['endFrame']} | {item['method']} |"
            )
        lines.append("")

    # ── Whisper 환각 ──
    if report["hallucinations"]:
        lines.append(f"### 🔇 Whisper 환각 건너뜀 ({len(report['hallucinations'])}건)\n")
        lines.append("| Whisper # | 텍스트 | startFrame | endFrame |")
        lines.append("|-----------|--------|-----------|---------|")
        for item in report["hallucinations"]:
            lines.append(
                f"| {item['whisper_idx']} | {item['whisper_text']} | "
                f"{item['startFrame']} | {item['endFrame']} |"
            )
        lines.append("")

    # ── 에러 ──
    if report["errors"]:
        lines.append(f"### ❌ 에러 ({len(report['errors'])}건)\n")
        for err in report["errors"]:
            lines.append(f"- {err}")
        lines.append("")

    # ── 요약 ──
    total_issues = len(report["interpolated"]) + len(report["splits"]) + len(report["errors"])
    if total_issues == 0:
        lines.append("### ✅ 모든 검증 통과 — 문제 없음\n")
    else:
        lines.append(f"### 📋 총 {total_issues}건의 주의 항목\n")

    return '\n'.join(lines)


# ─────────────────────────────────────────────
# 6. 메인 프로세스
# ─────────────────────────────────────────────

def process_section(project_id: str, section: str) -> str | None:
    """한 섹션의 final_timeline.json을 생성합니다."""
    total_dur, total_frames, script_lines, whisper_ts = parse_source_files(project_id, section)

    if not script_lines:
        print(f"  ❌ 원본 대본을 파싱할 수 없습니다.")
        return None
    if not whisper_ts:
        print(f"  ❌ 타임스탬프를 파싱할 수 없습니다.")
        return None

    # 원본 단어 펼치기
    script_words = []
    for line in script_lines:
        script_words.extend(line.split())

    print(f"  📊 원본 {len(script_words)}단어, Whisper {len(whisper_ts)}단어")

    # 리포트 초기화
    report = {
        "interpolated": [],
        "splits": [],
        "hallucinations": [],
        "errors": [],
    }

    # 핵심: 순차 위치 기반 매핑
    mapped_words = map_words_to_timestamps(script_words, whisper_ts, report)

    # 문장 조립 + 프레임 가드
    sentences = assemble_sentences(script_lines, mapped_words, total_frames, report)

    # JSON 저장
    output = {
        "totalDuration": total_dur,
        "totalFrames": total_frames,
        "sentences": sentences,
    }

    out_path = f'public/{project_id}/{section}/{section}_final_timeline.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"  ✅ 저장: {out_path}")

    # 리포트 생성
    report_text = generate_report(section, report, sentences, total_frames, script_lines)
    return report_text


def main():
    import sys

    if len(sys.argv) < 2:
        print("사용법: python3 scripts/generate-timeline.py {project_id}")
        print("예시:   python3 scripts/generate-timeline.py aiwar")
        sys.exit(1)

    project_id = sys.argv[1]

    # 프로젝트 루트 기준으로 경로 해석 (scripts/ 폴더에서 실행해도 동작)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)

    # 동적 섹션 탐색
    base = f'public/{project_id}'
    if not os.path.exists(base):
        print(f"❌ 프로젝트 디렉토리 없음: {base}")
        sys.exit(1)

    sections = sorted([
        d for d in os.listdir(base)
        if os.path.isdir(os.path.join(base, d)) and not d.startswith('.')
    ])

    print(f"=== 프로젝트 '{project_id}' 타임라인 생성 (v2) ===")
    print(f"  섹션: {', '.join(sections)}\n")

    all_reports = [f"# {project_id} 타임라인 검증 리포트\n"]

    for section in sections:
        print(f"[{section}] 처리 중...")
        report_text = process_section(project_id, section)
        if report_text:
            all_reports.append(report_text)
        print()

    # 통합 리포트 저장
    report_path = f'public/{project_id}/timeline_report.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n---\n\n'.join(all_reports))
    print(f"📋 검증 리포트: {report_path}")
    print("=== 완료 ===")


if __name__ == '__main__':
    main()
