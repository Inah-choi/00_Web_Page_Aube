import os
import requests
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

# 1. Load Environment Variables
load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

# 2. Initialize FastAPI
app = FastAPI(
    title="Aube API",
    description="Backend for Aube Corporate Landing Page",
    version="1.0.0"
)

# 3. Enable CORS
# Allowing all origins as requested for the MVP phase
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Define Data Model
# Matching the "Section 4: Contact" fields from the Aube Content Strategy
class ContactForm(BaseModel):
    name: str          # Identity
    email: EmailStr    # Coordinates
    topic: str         # Frequency (Partnership, Demo, etc.)
    message: str       # Transmission

# 5. Helper function to send Telegram Message
def send_telegram_notification(data: ContactForm):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Error: Telegram credentials not found in .env")
        return False

    api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    
    # Formatting the message to match the "Aube" aesthetic
    formatted_text = (
        f"<b>✨ Aube: Incoming Signal</b>\n\n"
        f"<b>Identity:</b> {data.name}\n"
        f"<b>Coordinates:</b> {data.email}\n"
        f"<b>Frequency:</b> {data.topic}\n"
        f"<b>Transmission:</b>\n{data.message}"
    )

    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": formatted_text,
        "parse_mode": "HTML"
    }

    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"Failed to send Telegram message: {e}")
        return False

# 6. API Endpoints
@app.get("/")
def read_root():
    return {"status": "online", "system": "Aube API v1.0"}

@app.post("/contact", status_code=status.HTTP_200_OK)
async def handle_contact(form_data: ContactForm):
    """
    Receives contact form submissions and transmits them via Telegram.
    """
    success = send_telegram_notification(form_data)

    if not success:
        # In a production app, we might log this to a DB instead of failing
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Signal transmission failed."
        )

    return {
        "message": "Signal Received. We will respond at first light.",
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)