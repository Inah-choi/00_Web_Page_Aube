from crewai import Task

def create_tasks(pm, fe_dev, be_dev, qa):
    # 1. 기획
    task_planning = Task(
        description=(
            "Plan a corporate landing page for 'Aube' (AI & Tech Startup).\n"
            "**Core Concept:** 'Architecting the Dawn of Intelligence'.\n"
            "**Key Sections:**\n"
            "1. **Hero Section:** Immersive, interactive night-sky visual (Canvas constellation).\n"
            "2. **About:** Short mission statement.\n"
            "3. **Solutions:** 3 Cards (Wedding App, Video Maker, Real-time Map).\n"
            "4. **Contact:** Form connected to Backend.\n"
        ),
        expected_output='Detailed website structure plan.',
        agent=pm
    )

    # 2. 프론트엔드 개발 
    task_fe_coding = Task(
        description=(
            "Create `index.html`, `css/style.css`, `js/main.js`.\n"
            "**1. HERO SECTION (Visuals):**\n"
            "   - **Animation:** Implement **HTML5 Canvas Constellation Effect**.\n"
            "     - Floating white stars that connect with thin lines when mouse hovers.\n"
            "     - Interactive and responsive.\n"
            "   - **Text:** 'Architecting the Dawn of Intelligence'.\n\n"
            "**2. SOLUTIONS & CONTACT:**\n"
            "   - Grid layout for solutions.\n"
            "   - Dark themed Contact Form.\n"
            "   - **Logic:** Use `fetch()` to POST to `http://localhost:8000/contact`."
        ),
        expected_output='Frontend code with Canvas Animation.',
        agent=fe_dev,
        context=[task_planning]
    )

    # 3. 백엔드 개발 
    task_be_coding = Task(
        description=(
            "Create `server.py` and `.env` file in the output directory.\n\n"
            
            "**[STEP 1] AUTO-GENERATE .env FILE:**\n"
            "You MUST create a file named `.env` with the EXACT following content:\n"
            "---------------------------------------------------\n"
            "TELEGRAM_BOT_TOKEN=\"7509145094:AAG0Hz965JQQErMzA3cpUuPT85eykAQRsYg\"\n"
            "TELEGRAM_CHAT_ID=\"7982560131\"\n"
            "---------------------------------------------------\n\n"

            "**[STEP 2] Create server.py:**\n"
            "   - Use **FastAPI**.\n"
            "   - Use `dotenv` to load the `.env` file (it will be in the same folder).\n"
            "   - Enable CORS for `['*']`.\n"
            "   - Implement POST `/contact` to send Telegram messages using the variables from `.env`.\n"
        ),
        expected_output='server.py AND .env file (with actual Telegram keys inside).',
        agent=be_dev,
        context=[task_planning]
    )

    # 4. 검수
    task_review = Task(
        description=(
            "1. Check if `.env` file exists and contains the Telegram keys.\n"
            "2. Verify `index.html` has the canvas animation.\n"
            "3. Confirm `server.py` is ready to run."
        ),
        expected_output='Final Quality Check.',
        agent=qa,
        context=[task_fe_coding, task_be_coding]
    )

    return [task_planning, task_fe_coding, task_be_coding, task_review]