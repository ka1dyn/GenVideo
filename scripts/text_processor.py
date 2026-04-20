# -*- coding:utf-8 -*-
import re
from hangulize import hangulize

# Initialize models
print("로딩: 텍스트 전처리 모듈 초기화 완료...")

# 만 단위 자릿수
tenThousandPos = 4
# 억 단위 자릿수
hundredMillionPos = 9
txtDigit = ['', '십', '백', '천', '만', '억']
txtNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
txtPoint = '쩜 '

def digit2txt(strNum):
    resultStr = ''
    digitCount = 0
    for ch in strNum:
        if ch == ',':
            continue
        elif ch == '.':
            break
        digitCount = digitCount + 1

    digitCount = digitCount - 1
    index = 0

    while True:
        notShowDigit = False
        ch = strNum[index]
        if ch == ',':
            index = index + 1
            if index >= len(strNum):
                break
            continue

        if ch == '.':
            if index >= 1 and strNum[index - 1] == '0' and not resultStr:
                resultStr = '영'
            resultStr += txtPoint
        else:
            if (digitCount >= 1) and (digitCount != tenThousandPos) and (digitCount != hundredMillionPos) and int(ch) == 1:
                resultStr = resultStr + ''
            elif int(ch) == 0:
                resultStr = resultStr + ''
                if (digitCount != tenThousandPos) and (digitCount != hundredMillionPos):
                    notShowDigit = True
            else:
                resultStr = resultStr + txtNumber[int(ch)]

        if digitCount > hundredMillionPos:
            if not notShowDigit:
                resultStr = resultStr + txtDigit[digitCount - hundredMillionPos]
        elif digitCount > tenThousandPos:
            if not notShowDigit:
                resultStr = resultStr + txtDigit[digitCount - tenThousandPos]
        else:
            if not notShowDigit:
                resultStr = resultStr + txtDigit[digitCount]

        if digitCount <= 0:
            digitCount = 0
        else:
            digitCount = digitCount - 1
        index = index + 1
        if index >= len(strNum):
            break
    return resultStr


NATIVE_MAP_MODIFIERS = {
    1: "한", 2: "두", 3: "세", 4: "네", 5: "다섯",
    6: "여섯", 7: "일곱", 8: "여덟", 9: "아홉"
}

NATIVE_MAP_STANDALONE = {
    1: "하나", 2: "둘", 3: "셋", 4: "넷", 5: "다섯",
    6: "여섯", 7: "일곱", 8: "여덟", 9: "아홉"
}

MAP_TENS_NATIVE = {
    10: "열", 20: "스물", 30: "서른", 40: "마흔", 50: "쉰",
    60: "예순", 70: "일흔", 80: "여든", 90: "아흔"
}


def get_native_number(number_str, is_modifier=True):
    try:
        number = int(number_str)
    except ValueError:
        return digit2txt(str(number_str))

    if number >= 100 or number <= 0:
        return digit2txt(str(number))

    korean_number = ""
    tens = (number // 10) * 10
    ones = number % 10

    if tens > 0:
        if tens == 20 and ones == 0 and is_modifier:
            korean_number += "스무"
        else:
            korean_number += MAP_TENS_NATIVE[tens]

    if ones > 0:
        if is_modifier:
            korean_number += NATIVE_MAP_MODIFIERS[ones]
        else:
            korean_number += NATIVE_MAP_STANDALONE[ones]

    return korean_number


def CSign2txt(csign):
    currency_symbols = {
        "$": "달러",
        "€": "유로",
        "£": "파운드",
        "¥": "엔",
        "￦": "원"
    }
    return currency_symbols.get(csign, "")

def eng2txt(text):
    # 특수 대문자 약어는 한글 발음으로 직접 매핑
    acronyms = {
        "AI": "에이아이",
        "GPT": "지피티",
        "IP": "아이피",
        "GPS": "지피에스",
        "USA": "유에스에이",
        "GEMINI": "제미나이",
        "ANTHROPIC": "앤트로픽",
        "MYTHOS": "미토스",
        "OPUS": "오푸스",
    }
    if text.upper() in acronyms:
        return acronyms[text.upper()]

    # 전부 대문자인 경우 스펠링대로 읽기 (예: CIA -> 씨아이에이)
    if text.isupper():
        spelling_map = {
            'A': '에이', 'B': '비', 'C': '씨', 'D': '디', 'E': '이',
            'F': '에프', 'G': '지', 'H': '에이치', 'I': '아이', 'J': '제이',
            'K': '케이', 'L': '엘', 'M': '엠', 'N': '엔', 'O': '오',
            'P': '피', 'Q': '큐', 'R': '알', 'S': '에스', 'T': '티',
            'U': '유', 'V': '브이', 'W': '더블유', 'X': '엑스', 'Y': '와이', 'Z': '제트'
        }
        return "".join(spelling_map.get(char, char) for char in text)

    # 영어 발음 변환용 (cym: 웨일스어가 영어 발음과 유사하게 매핑되는 속성을 이용)
    try:
        if not text.strip():
             return text
        return hangulize(text, 'cym')
    except Exception as e:
        return text

def process_txt(text, engtrans=True):
    result = ""
    # 매치 그룹 안전성 보강
    pattern = re.compile(r'([가-힣]+)|([a-zA-Z]+)|(\d[\d,.]*)|(\$|€|£|¥|￦)|(\s+)|([^가-힣a-zA-Z\d\$€£¥￦\s]+)')

    matches = pattern.finditer(text)
    for match in matches:
        if match.group(1):  # Korean part
            result += match.group(1)
        elif match.group(2):  # English part
            if engtrans:
                result += eng2txt(match.group(2))
            else:
                result += match.group(2)
        elif match.group(3):  # Number part
            end_index = match.end(3)
            next_text = text[end_index:].lstrip()
            
            # 많이 쓰이는 순우리말 의존 명사(수량사) 목록
            native_counters = [
                '개', '명', '번', '살', '마리', '시간', '달', '가지', '군데', 
                '채', '송이', '자루', '켤레', '장', '팀', '곳', '병', '잔', '방', '건'
            ]
            
            is_native_counter = False
            for counter in native_counters:
                if next_text.startswith(counter):
                    is_native_counter = True
                    break
            
            if is_native_counter:
                # 단위 명사가 뒤따를 경우 꾸며주는 형태(관형형: 한, 두, 세, 네, 스무) 사용
                result += get_native_number(match.group(3).replace(',', ''), is_modifier=True)
            else:
                # 단위가 없거나 한자어 단위명사면 그냥 한자어 수사 (예: 24 -> 이십사, 24일 -> 이십사일)
                result += digit2txt(match.group(3).replace(',', ''))

        elif match.group(4):  # Currency symbol part
            result += CSign2txt(match.group(4))
        elif match.group(5):  # Space part
            result += match.group(5)
        elif match.group(6):  # Other punctuations etc
            result += match.group(6)
            
    # TTS 모델은 보통 '맞춤법' 기준의 텍스트를 가장 자연스럽게 읽습니다.
    # 의도적으로 g2p를 거쳐 '도덕쩍 꼬뇌'로 문자를 변형하면 TTS가 오히려 당황하여 억양을 깰 수 있습니다.
    # 따라서 수사(1개->한개), 영어(AI->에이아이) 등만 한글로 변환한 result를 그대로 반환합니다.
    return result
