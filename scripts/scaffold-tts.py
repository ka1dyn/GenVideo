import os
import sys
import asyncio
from gradio_client import Client
from pydub import AudioSegment

LANGUAGE = "Korean"
GRADIO_URL = "http://localhost:8000"

try:
    print(f"🔌 TTS 서버({GRADIO_URL})에 연결 중...")
    client = Client(GRADIO_URL)
    print("✅ 서버 연결 성공!\n")
except Exception as e:
    print(f"❌ Gradio 서버에 연결할 수 없습니다. URL({GRADIO_URL})이 올바른지 확인하세요.\n에러: {e}")
    sys.exit(1)

async def generate_tts(text: str, output_path: str):
    clean_text = text.strip()

    valid_punctuations = ('.', '!', '?')
    if not clean_text.endswith(valid_punctuations):
        processed_text = clean_text + "."
    else:
        processed_text = clean_text
    
    def call_gradio():
        return client.predict(
            text=f"... {processed_text} ...",
            lang=LANGUAGE,
            api_name="/generate_audio"
        )
    
    try:
        print(f"🎙️ TTS 생성 요청 중... ({output_path})")
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
        print(f"✅ 생성 완료: {output_path}")

    except Exception as e:
        print(f"❌ TTS 생성 오류: {str(e)}")
        sys.exit(1)

async def main():
    if len(sys.argv) < 3:
        print("Usage: python scaffold-tts.py <text> <output_path>")
        sys.exit(1)
    
    text = sys.argv[1]
    output_path = sys.argv[2]
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    await generate_tts(text, output_path)

if __name__ == "__main__":
    asyncio.run(main())
