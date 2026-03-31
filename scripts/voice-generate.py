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
            text=f"... {processed_text} ...",
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

    text = "웹 개발의 패러다임이 완전히 바뀌고 있습니다. 과거에는 모든 컴포넌트를 바닥부터 직접 작성해야 했지만, 이제는 AI가 우리의 가장 든든한 페어 프로그래머가 되었습니다. \
디자인에서 개발로 넘어가는 과정의 병목현상도 눈에 띄게 사라졌습니다. 이제는 스케치 한 장이나 간단한 프롬프트만으로도 곧바로 작동하는 프로토타입이 생성되는 마법 같은 일이 일어납니다. \
단순히 코드를 짜주는 것을 넘어, 시스템 아키텍처를 설계하고 최적화 포인트까지 제안합니다. 마치 수십 년 경력의 시니어 개발자가 항상 내 옆에 앉아 코드를 리뷰해 주는 것과 같죠. \
이러한 변화는 단순히 개인의 코딩 속도를 높이는 것을 넘어, 팀 전체의 애자일한 협업 방식을 근본적으로 재정의하고 있습니다. 우리는 더 빠르게 실패하고, 더 빨리 혁신할 수 있게 되었습니다. \
유명한 개발자는 이렇게 말했습니다. \"미래의 코딩은 타이핑이 아니라 대화가 될 것이다.\" 결국 우리에게 가장 필요한 역량은 타건 속도가 아니라, 문제를 정의하고 AI를 지휘하는 기획력이 될 것입니다."

    await generate_tts(text, "./output.wav")

if __name__ == "__main__":
    asyncio.run(main())
