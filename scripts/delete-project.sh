#!/bin/bash
# ─────────────────────────────────────────────
# 프로젝트 전체 삭제
# ─────────────────────────────────────────────

PROJECT_ID="${1:?프로젝트 ID를 입력하세요 (예: my-first-topic)}"

rm -rf src/projects/$PROJECT_ID public/projects/$PROJECT_ID

echo "프로젝트 $PROJECT_ID 가 삭제되었습니다."