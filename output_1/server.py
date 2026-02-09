# output/server.py

import os
import requests
from pathlib import Path
from dotenv import load_dotenv  # .env 파일 자동 로드 라이브러리
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# ------------------------------------------------------------------------------
# 1. 환경 변수(.env) 자동 로드 설정
# ------------------------------------------------------------------------------
# 현재 파일(server.py)의 위치: 00_Web_Page_Aube/output/server.py
# .env 파일의 위치: 00_Web_Page_Aube/.env (한 단계 상위 폴더)

current_dir = Path(__file__).resolve().parent
project_root = current_dir.parent
env_path = project_root / ".env"

print(f"🔍 .env 파일 찾는 중... 경로: {env_path}")

if env_path.exists():
    load_dotenv(dotenv_path=env_path)
    print("✅ .env 파일을 성공적으로 로드했습니다!")
else:
    print("⚠️ 경고: .env 파일을 찾을 수 없습니다. 환경변수가 설정되지 않을 수 있습니다.")

# ------------------------------------------------------------------------------
# 2. FastAPI 앱 및 CORS 설정 (보안 통행증)
# ------------------------------------------------------------------------------
app = FastAPI(title="Aube Contact Server")

# 모든 도메인에서의 접속을 허용합니다 (테스트용)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------------
# 3. 데이터 모델 (입력값 검증)
# ------------------------------------------------------------------------------
class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    message: str

# ------------------------------------------------------------------------------
# 4. 텔레그램 전송 함수
# ------------------------------------------------------------------------------
def send_telegram_message(data: dict):
    """
    받은 데이터를 포맷팅하여 텔레그램 봇으로 전송합니다.
    """
    # .env에서 로드된 값을 가져옵니다.
    token = os.getenv('TELEGRAM_BOT_TOKEN')
    chat_id = os.getenv('TELEGRAM_CHAT_ID')

    if not token or not chat_id:
        print("❌ 오류: 텔레그램 토큰이나 CHAT_ID가 없습니다. .env 파일을 확인해주세요.")
        return

    # 메시지 내용 꾸미기
    message_text = (
        f"🔔 *[Aube 웹사이트] 새로운 문의 도착!*\n\n"
        f"👤 *이름:* {data.get('name')}\n"
        f"📧 *이메일:* {data.get('email')}\n"
        f"📱 *전화번호:* {data.get('phone')}\n"
        f"📝 *메시지:* {data.get('message')}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message_text,
        "parse_mode": "Markdown"
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print("🚀 텔레그램 전송 성공!")
    except requests.exceptions.RequestException as e:
        print(f"❌ 텔레그램 전송 실패: {e}")

# ------------------------------------------------------------------------------
# 5. API 엔드포인트 (접수 창구)
# ------------------------------------------------------------------------------
@app.post("/contact")
async def handle_contact(form_data: ContactForm):
    """
    웹사이트에서 보낸 데이터를 받아서 텔레그램으로 쏘고 결과를 돌려줍니다.
    """
    # 1. 데이터 받기
    print(f"📩 데이터 수신됨: {form_data.name}, {form_data.email}")
    
    # 2. 텔레그램 전송
    data = form_data.dict()
    send_telegram_message(data)

    # 3. 결과 반환
    return {
        "status": "success",
        "message": "문의가 성공적으로 접수되었습니다."
    }

@app.get("/")
async def root():
    return {"message": "Aube 서버가 정상 작동 중입니다."}

# 직접 실행 시 (python server.py)
if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)