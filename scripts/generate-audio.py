import os
import sys
import re
import asyncio
from pathlib import Path
from gradio_client import Client
from pydub import AudioSegment

LANGUAGE = "Korean"
GRADIO_URL = "http://localhost:8000"

try:
    print("🔌 TTS 서버에 연결 중...")
    client = Client(GRADIO_URL)
    print("✅ 서버 연결 성공!\n")
except Exception as e:
    print(f"❌ Gradio 서버에 연결할 수 없습니다. 코랩이 켜져있고 URL이 최신인지 확인하세요.\n에러: {e}")
    sys.exit(1)


async def generate_tts(text: str, output_path: str):
    clean_text = text.strip()

    valid_punctuations = ('.', '!', '?')
    if not clean_text.endswith(valid_punctuations):
        # 문장 부호가 없으면 마침표를 붙여줌
        processed_text = clean_text + "."
    else:
        processed_text = clean_text
    
    # 서버로 API 요청 (블로킹 함수이므로 스레드에서 실행)
    def call_gradio():
        return client.predict(
            text=f"{processed_text} -=",
            lang=LANGUAGE,
            api_name="/generate_audio"
        )
    
    try:
        # Gradio 예측 실행 (결과는 보통 임시 파일 경로를 포함한 튜플이나 문자열)
        result = await asyncio.to_thread(call_gradio)
        
        temp_audio_path = None
        if isinstance(result, str):
            temp_audio_path = result
        elif isinstance(result, (tuple, list)):
            temp_audio_path = result[0]
        elif isinstance(result, dict) and "name" in result:
            temp_audio_path = result["name"] # 최신 Gradio 대응
        if not temp_audio_path or not os.path.exists(temp_audio_path):
            raise Exception(f"TTS 생성 실패: 임시 파일을 찾을 수 없습니다. (결과: {result})")

        # pydub을 사용하여 파일 변환 및 저장
        audio = AudioSegment.from_file(temp_audio_path)
        audio.export(output_path, format="wav")
        
        print(f"  ✅ 생성 완료: {output_path}")

    except Exception as e:
        print(f"  ❌ TTS 생성 오류: {str(e)}")
        raise e

async def main():
    if len(sys.argv) < 2:
        print("❌ 프로젝트 ID를 입력하세요")
        print("   사용법: python scripts/generate-audio.py <project-id>")
        sys.exit(1)

    project_id = sys.argv[1]
    
    # 경로 설정
    current_dir = Path(__file__).parent.resolve()
    project_dir = current_dir.parent / "src" / "projects" / project_id
    audio_dir = current_dir.parent / "public" / "projects" / project_id / "audio"
    script_path = project_dir / "script.ts"

    if not script_path.exists():
        print(f"❌ script.ts를 찾을 수 없습니다: {script_path}")
        sys.exit(1)

    # script.ts 파싱 — Segment 단위로 추출
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Scene 블록 파싱 (sceneId + segments 배열)
    scene_pattern = re.compile(
        r'sceneId:\s*"([^"]+)"[\s\S]*?segments:\s*\[([\s\S]*?)\]',
        re.DOTALL
    )
    scene_matches = scene_pattern.findall(content)

    if not scene_matches:
        print("⚠️  파싱된 Scene이 없습니다. script.ts 형식을 확인하세요.")
        sys.exit(0)

    # 각 Scene의 Segment 추출
    segment_pattern = re.compile(
        r'segmentId:\s*"([^"]+)"[\s\S]*?text:\s*"((?:[^"\\]|\\.)*)"',
        re.DOTALL
    )

    all_segments = []  # (scene_id, segment_id, text) 튜플 리스트

    for scene_id, segments_block in scene_matches:
        seg_matches = segment_pattern.findall(segments_block)
        for segment_id, text in seg_matches:
            all_segments.append((scene_id, segment_id, text))

    if not all_segments:
        print("⚠️  파싱된 Segment가 없습니다. script.ts 형식을 확인하세요.")
        sys.exit(0)

    print(f"🎙️ {len(all_segments)}개 Segment의 오디오를 생성합니다...\n")

    for scene_id, segment_id, text in all_segments:
        # 이스케이프 문자 복구
        clean_text = text.replace('\\"', '"').replace('\\n', ' ')

        # Scene별 서브 디렉토리 생성 (audio/scene1/, audio/scene2/, ...)
        scene_audio_dir = audio_dir / scene_id
        if not scene_audio_dir.exists():
            scene_audio_dir.mkdir(parents=True, exist_ok=True)
        
        # seg_id에서 "scene1-seg1" → "seg1" 추출
        seg_short = segment_id.split("-")[-1] if "-" in segment_id else segment_id
        output_path = scene_audio_dir / f"{seg_short}.wav"
        
        print(f"▶️ [{segment_id}] 변환 중: \"{clean_text[:40]}...\"")
        
        # 순차적 실행 (코랩 GPU OOM 방지 및 안전성 확보)
        await generate_tts(clean_text, str(output_path))

    print("✨ 모든 오디오 생성이 완료되었습니다!")

if __name__ == "__main__":
    asyncio.run(main())
