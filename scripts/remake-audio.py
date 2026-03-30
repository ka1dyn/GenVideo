import os
import sys
import re
import asyncio
from pathlib import Path
from gradio_client import Client
from pydub import AudioSegment

# 설정 (generate-audio.py와 동일)
LANGUAGE = "Korean"
GRADIO_URL = "http://localhost:8000"

try:
    print("🔌 TTS 서버에 연결 중...")
    client = Client(GRADIO_URL)
    print("✅ 서버 연결 성공!\n")
except Exception as e:
    print(f"❌ Gradio 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.\n에러: {e}")
    sys.exit(1)


async def generate_tts(text: str, output_path: str):
    clean_text = text.strip()
    valid_punctuations = ('.', '!', '?')
    processed_text = clean_text if clean_text.endswith(valid_punctuations) else clean_text + "."
    
    def call_gradio():
        return client.predict(
            text=f"{processed_text} ...",
            lang=LANGUAGE,
            api_name="/generate_audio"
        )
    
    try:
        result = await asyncio.to_thread(call_gradio)
        
        temp_audio_path = None
        if isinstance(result, str):
            temp_audio_path = result
        elif isinstance(result, (tuple, list)):
            temp_audio_path = result[0]
        elif isinstance(result, dict) and "name" in result:
            temp_audio_path = result["name"]
            
        if not temp_audio_path or not os.path.exists(temp_audio_path):
            raise Exception(f"TTS 생성 실패: 임시 파일을 찾을 수 없습니다. (결과: {result})")

        audio = AudioSegment.from_file(temp_audio_path)
        audio.export(output_path, format="wav")
        print(f"  ✅ 재생성 완료: {output_path}")

    except Exception as e:
        print(f"  ❌ TTS 생성 오류: {str(e)}")
        raise e

async def main():
    if len(sys.argv) < 3:
        print("❌ 사용법이 올바르지 않습니다.")
        print("   사용법: python scripts/remake-audio.py <project-id> <segment-id1> <segment-id2> ...")
        print("   예시: python scripts/remake-audio.py test-project scene1-seg1")
        sys.exit(1)

    project_id = sys.argv[1]
    target_segments = sys.argv[2:]
    
    # 경로 설정
    current_dir = Path(__file__).parent.resolve()
    project_dir = current_dir.parent / "src" / "projects" / project_id
    audio_dir = current_dir.parent / "public" / "projects" / project_id / "audio"
    script_path = project_dir / "script.ts"

    if not script_path.exists():
        print(f"❌ script.ts를 찾을 수 없습니다: {script_path}")
        sys.exit(1)

    # script.ts 파싱
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    scene_pattern = re.compile(r'sceneId:\s*"([^"]+)"[\s\S]*?segments:\s*\[([\s\S]*?)\]', re.DOTALL)
    segment_pattern = re.compile(r'segmentId:\s*"([^"]+)"[\s\S]*?text:\s*"((?:[^"\\]|\\.)*)"', re.DOTALL)

    # 전체 세그먼트 맵 구축 (segment_id -> (scene_id, text))
    segment_map = {}
    scene_matches = scene_pattern.findall(content)
    for scene_id, segments_block in scene_matches:
        seg_matches = segment_pattern.findall(segments_block)
        for segment_id, text in seg_matches:
            segment_map[segment_id] = (scene_id, text)

    print(f"🎙️ {len(target_segments)}개의 오디오를 다시 생성합니다...\n")

    for target_id in target_segments:
        if target_id not in segment_map:
            print(f"⚠️  경고: '{target_id}'를 script.ts에서 찾을 수 없습니다. 건너뜁니다.")
            continue

        scene_id, text = segment_map[target_id]
        clean_text = text.replace('\\"', '"').replace('\\n', ' ')

        scene_audio_dir = audio_dir / scene_id
        if not scene_audio_dir.exists():
            scene_audio_dir.mkdir(parents=True, exist_ok=True)
        
        seg_short = target_id.split("-")[-1] if "-" in target_id else target_id
        output_path = scene_audio_dir / f"{seg_short}.wav"
        
        print(f"▶️ [{target_id}] 다시 생성 중: \"{clean_text[:40]}...\"")
        await generate_tts(clean_text, str(output_path))

    print("\n✨ 선택한 오디오의 재생성이 완료되었습니다!")

if __name__ == "__main__":
    asyncio.run(main())
