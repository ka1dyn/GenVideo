#!/bin/bash

# ─────────────────────────────────────────────
# make_video.sh — 9-pane 병렬 Gemini CLI 오케스트레이션
#
# Usage: ./make_video.sh <project_id>
# Example: ./make_video.sh aiwar
# ─────────────────────────────────────────────

PROJECT_ID=${1:?"Usage: ./make_video.sh <project_id>"}
TARGET_DIR="~/Projects/GenVideo"

# 고정 9개 섹션 (intro, body1~body7, outro)
SECTIONS=("intro" "body1" "body2" "body3" "body4" "body5" "body6" "body7" "outro")

# 실제 존재하는 섹션 확인
EXISTING_SECTIONS=()
for s in "${SECTIONS[@]}"; do
  if [ -d "public/${PROJECT_ID}/${s}" ]; then
    EXISTING_SECTIONS+=("$s")
  fi
done

echo "=== make_video.sh ==="
echo "Project: ${PROJECT_ID}"
echo "Existing sections: ${EXISTING_SECTIONS[*]}"
echo "Total panes: ${#SECTIONS[@]} (${#EXISTING_SECTIONS[@]} active)"
echo ""

osascript - "$TARGET_DIR" "$PROJECT_ID" "${SECTIONS[@]}" <<'EOF'
on run argv
    set targetDir to item 1 of argv
    set projectId to item 2 of argv
    set sectionNames to items 3 thru -1 of argv

    tell application "iTerm2"
        -- 1. 새 창 생성 및 크기 설정
        set newWin to (create window with default profile)
        tell newWin
            set bounds to {50, 50, 1400, 1000}

            -- 2. 3×3 화면 분할
            set s1 to current session of current tab
            tell s1
                set s2 to (split vertically with default profile)
                set s3 to (split vertically with default profile)
            end tell

            tell s1
                split horizontally with default profile
                split horizontally with default profile
            end tell
            tell s2
                split horizontally with default profile
                split horizontally with default profile
            end tell
            tell s3
                split horizontally with default profile
                split horizontally with default profile
            end tell

            -- 3. 각 pane에 명령어 전송
            set allSessions to sessions of current tab

            repeat with i from 1 to count of sectionNames
                set currentSection to item i of sectionNames

                -- 0~10초 랜덤 딜레이 (CPU/IO 피크 분산)
                set waitTime to (random number) * 10

                -- 섹션 폴더 존재 여부로 활성/비활성 결정
                set checkCmd to "if [ -d " & targetDir & "/public/" & projectId & "/" & currentSection & " ]; then echo 'EXISTS'; else echo 'MISSING'; fi"

                tell item i of allSessions
                    -- 섹션이 존재하면 Gemini CLI 실행, 없으면 즉시 종료
                    write text "cd " & targetDir & " && source ~/.zshrc && if [ -d public/" & projectId & "/" & currentSection & " ]; then sleep " & waitTime & " && gemini-" & currentSection & " --yolo \"/implement-scenes " & projectId & " " & currentSection & "\"; else echo '⏭️  [" & currentSection & "] 섹션이 존재하지 않습니다. 종료합니다.'; fi"
                end tell
            end repeat
        end tell
    end tell
end run
EOF

echo "✅ iTerm2 9-pane 실행 완료"