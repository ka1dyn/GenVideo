#!/bin/bash
# ─────────────────────────────────────────────
# 새 영상 프로젝트 Scaffolding
# 사용법: ./scripts/new-project.sh <project-id>
# 예시:   ./scripts/new-project.sh my-first-topic
# ─────────────────────────────────────────────

set -euo pipefail

PROJECT_ID="${1:?프로젝트 ID를 입력하세요 (예: my-first-topic)}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATE_DIR="$ROOT_DIR/src/projects/_template"
PROJECT_DIR="$ROOT_DIR/src/projects/$PROJECT_ID"
PUBLIC_DIR="$ROOT_DIR/public/projects/$PROJECT_ID"

# 이미 존재하는지 확인
if [ -d "$PROJECT_DIR" ]; then
  echo "❌ 이미 존재하는 프로젝트입니다: $PROJECT_DIR"
  exit 1
fi

echo "📁 폴더 생성 중: $PROJECT_ID"

# src/projects/{id} 복사
cp -r "$TEMPLATE_DIR" "$PROJECT_DIR"

if [ ! -d "$PUBLIC_DIR" ]; then
  # public/projects/{id}/audio 디렉토리 생성
  mkdir -p "$PUBLIC_DIR/audio"
  mkdir -p "$PUBLIC_DIR/images"
else
  echo "⚠️ 이미 존재하는 애셋 디렉토리입니다: $PUBLIC_DIR (에셋 생성 건너뜀)"
fi

# placeholder 치환
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS sed
  find "$PROJECT_DIR" -type f -name '*.ts' -o -name '*.tsx' | while read -r file; do
    sed -i '' "s/__PROJECT_ID__/$PROJECT_ID/g" "$file"
    sed -i '' "s/__PROJECT_TITLE__/$PROJECT_ID/g" "$file"
  done
else
  # Linux sed
  find "$PROJECT_DIR" -type f -name '*.ts' -o -name '*.tsx' | while read -r file; do
    sed -i "s/__PROJECT_ID__/$PROJECT_ID/g" "$file"
    sed -i "s/__PROJECT_TITLE__/$PROJECT_ID/g" "$file"
  done
fi

echo ""
echo "✅ 폴더 생성 완료!"
echo ""
echo "   📂 소스:   src/projects/$PROJECT_ID/"
echo "   📂 에셋:   public/projects/$PROJECT_ID/"
echo ""
