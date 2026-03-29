#!/bin/bash
# ─────────────────────────────────────────────
# 프로젝트 데이터 준비 스크립트
# 사용법: ./scripts/ready.sh <project-id>
# 예시:   ./scripts/ready.sh my-first-topic
# ─────────────────────────────────────────────
PROJECT_ID="${1:?프로젝트 ID를 입력하세요 (예: my-first-topic)}"

if [ -d "$PROJECT_DIR" ]; then
  echo "❌ 이미 존재하는 프로젝트입니다: $PROJECT_DIR"
  exit 1
fi

conda activate qwen3-tts

./scripts/new-project.sh $PROJECT_ID
npx tsc parse-script.ts $PROJECT_ID
python3 scripts/generate-audio.py $PROJECT_ID
