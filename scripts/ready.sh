#!/bin/bash
# ─────────────────────────────────────────────
# 프로젝트 데이터 준비 스크립트
# 사용법: ./scripts/ready.sh <project-id>
# 예시:   ./scripts/ready.sh my-first-topic
# ─────────────────────────────────────────────

set -euo pipefail

# 1. 기본 설정 및 경로 확인
PROJECT_ID="${1:?프로젝트 ID를 입력하세요 (예: my-first-topic)}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_DIR="$ROOT_DIR/src/projects/$PROJECT_ID"
SOURCE_FILE="$ROOT_DIR/src/sources/$PROJECT_ID/script.txt"

echo "🚀 프로젝트 준비 시작: $PROJECT_ID"

PUBLIC_DIR="$ROOT_DIR/public/projects/$PROJECT_ID"
SKIP_TTS=false

if [ -d "$PUBLIC_DIR" ]; then
  SKIP_TTS=true
  echo "⚠️ 기존 public 에셋이 존재하여 TTS 오디오 생성 부분을 건너뛸 예정입니다."
fi

# 2. 사전 체크
if [ -d "$PROJECT_DIR" ]; then
  echo "❌ 이미 존재하는 프로젝트 디렉토리입니다: $PROJECT_DIR"
  echo "   기존 프로젝트를 삭제하거나 다른 ID를 사용하세요."
  exit 1
fi

if [ ! -f "$SOURCE_FILE" ]; then
  echo "❌ 원본 대본 파일을 찾을 수 없습니다: $SOURCE_FILE"
  echo "   'src/sources/$PROJECT_ID/script.txt' 파일을 먼저 작성해 주세요."
  exit 1
fi

# 3. 프로젝트 스캐폴딩 생성
echo "📁 [1/3] 새 프로젝트 구조 생성 중..."
"$SCRIPT_DIR/new-project.sh" "$PROJECT_ID"

# 4. 대본 파싱 (txt -> ts)
echo "📝 [2/3] 대본 파싱 중 (script.txt -> script.ts)..."
npx tsx "$SCRIPT_DIR/parse-script.ts" "$PROJECT_ID"

# 5. 오디오 생성 (TTS)
if [ "$SKIP_TTS" = true ]; then
  echo "🎙️ [3/3] 기존 애셋이 존재하여 TTS 오디오 생성을 건너뜁니다."
else
  echo "🎙️ [3/3] TTS 오디오 생성 중..."
  # conda activate 대신 conda run을 사용하여 서브쉘 이슈 방지
  if command -v conda &> /dev/null; then
    conda run -n qwen3-tts --no-capture-output python3 "$SCRIPT_DIR/generate-audio.py" "$PROJECT_ID"
  else
    echo "⚠️  conda 명령어를 찾을 수 없습니다. 기본 python3로 시도합니다."
    python3 "$SCRIPT_DIR/generate-audio.py" "$PROJECT_ID"
  fi
fi

echo ""
echo "✨ 모든 준비가 완료되었습니다!"
echo "   이제 Remotion Preview에서 확인해 보세요."
