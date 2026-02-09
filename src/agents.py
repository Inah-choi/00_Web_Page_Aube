import os
from pathlib import Path
from crewai import Agent
from crewai.tools import tool
from src.config import get_gemini_llm

@tool("Save File with UTF-8")
def save_file_utf8(filename: str, content: str):
    """
    Saves text content to a file with UTF-8 encoding.
    It automatically saves to the current run's unique output directory (e.g., output_1).
    """
    try:
        # 1. 파일명 정리 (에이전트가 output/style.css 라고 줘도 style.css만 남김)
        clean_name = filename.replace("./output/", "").replace("output/", "").lstrip("/")
        
        # 2. 프로젝트 루트 경로 계산
        current_dir = Path(__file__).resolve().parent
        project_root = current_dir.parent
        
        # [핵심 변경] main.py에서 설정한 환경변수 읽기 (없으면 기본값 'output')
        target_dir_name = os.getenv("TARGET_OUTPUT_DIR", "output")
        
        # 3. 목표 경로 설정 (동적으로 변한 폴더명 사용)
        target_path = project_root / target_dir_name / clean_name
        
        # 4. 폴더가 없으면 생성
        target_path.parent.mkdir(parents=True, exist_ok=True)

        # 5. UTF-8로 강제 저장
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        return f"✅ Saved successfully to: {target_dir_name}/{clean_name}"
    except Exception as e:
        return f"❌ Error saving file: {str(e)}"

gemini_llm = get_gemini_llm()

def create_agents():
    # 1. PM (기획)
    pm = Agent(
        role='Product Manager',
        goal='Plan the website structure, content strategy, and system architecture.',
        backstory="You are a visionary PM. You define the company brand 'Aube' and its solutions.",
        llm=gemini_llm,
        verbose=True
    )

    # 2. Frontend Dev (화면 개발)
    fe_dev = Agent(
        role='Senior Frontend Engineer',
        goal='Build a responsive UI with animations and visuals using HTML/CSS/JS.',
        backstory="You specialize in modern UI. You create beautiful grids for portfolios and connect forms to APIs.",
        llm=gemini_llm,
        verbose=True
    )

    # 3. Backend Dev (서버 개발 )
    be_dev = Agent(
        role='Python Backend Engineer',
        goal='Create a FastAPI server to handle form submissions and send Telegram notifications.',
        backstory="You build robust APIs. You know how to use Python 'requests' to talk to the Telegram Bot API.",
        llm=gemini_llm,
        verbose=True
    )

    # 4. QA (검수)
    qa = Agent(
        role='Quality Assurance',
        goal='Verify code integrity, file saving, and functionality.',
        backstory="You ensure the frontend connects properly to the backend and all files are saved correctly.",
        llm=gemini_llm,
        tools=[save_file_utf8],
        verbose=True
    )
    
    return pm, fe_dev, be_dev, qa