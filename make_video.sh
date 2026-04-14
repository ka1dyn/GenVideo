#!/bin/bash

SESSIONS=("gemini-intro" "gemini-body1" "gemini-body2" "gemini-body3" "gemini-body4" "gemini-body5" "gemini-body6" "gemini-body7" "gemini-outro")
TARGET_DIR="~/Projects/GenVideo"

osascript - "$TARGET_DIR" "${SESSIONS[@]}" <<EOF
on run argv
    set targetDir to item 1 of argv
    set sessionNames to items 2 thru -1 of argv
    
    tell application "iTerm2"
        -- 1. 새 창 생성 및 크기 설정
        set newWin to (create window with default profile)
        tell newWin
            set bounds to {50, 50, 1400, 1000}
            
            -- 2. 화면 분할
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
            
            -- 3. 명령어 일괄 전송 (소수점 독립 타이머 적용)
            set allSessions to sessions of current tab
            
            repeat with i from 1 to count of sessionNames
                set currentName to item i of sessionNames
                
                -- [핵심 포인트] 0.0 ~ 10.0 사이의 리얼한 소수점 랜덤 시간 추출
                set waitTime to (random number) * 10
                
                tell item i of allSessions
                    -- sleep 3.4819... 처럼 소수점 초 단위로 대기 후 실행됨
                    write text "sleep " & waitTime & " && cd " & targetDir & " && source ~/.zshrc && " & currentName
                end tell
            end repeat
        end tell
    end tell
end run
EOF