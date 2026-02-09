import os
from pathlib import Path
from crewai import LLM
from dotenv import load_dotenv

# [1] .env 파일 위치: 이 소스 파일 기준으로 항상 절대 경로 사용 (실행 위치와 무관)
current_file_path = Path(__file__).resolve()
project_root = current_file_path.parent.parent
env_path = (project_root / ".env").resolve()

print(f"\n🔍 [Config 진단] .env 파일 위치: {env_path}")

if env_path.exists():
    print(f"\n📂 [파일 실제 내용 확인] {env_path}")
    print("-" * 30)
    with open(env_path, "r", encoding="utf-8") as f:
        print(f.read())  # 파일 전체 내용 출력
    print("-" * 30)
    
    load_dotenv(dotenv_path=str(env_path), override=True)
    print("✅ .env 로드 시도 완료")
else:
    print("❌ 경고: .env 파일이 이 경로에 없습니다!")


def _read_key_from_env_file():
    """프로젝트 .env에서 GOOGLE_API_KEY 값을 직접 파싱 (CWD/다른 .env와 무관)."""
    if not env_path.exists():
        return None
    try:
        with open(env_path, "r", encoding="utf-8-sig") as f:
            for line in f:
                line = line.strip()
                if line.startswith("#") or "=" not in line:
                    continue
                if line.startswith("GOOGLE_API_KEY="):
                    value = line.split("=", 1)[1].strip().strip('"').strip("'")
                    if value and len(value) > 20:
                        return value
    except Exception:
        pass
    return None


def get_gemini_llm():
    # [2] 이 프로젝트 .env에서 직접 읽기 (실행 CWD와 무관하게 절대 경로로 열기)
    raw_key = _read_key_from_env_file() or os.getenv("GOOGLE_API_KEY")
    api_key = (raw_key or "").strip().strip('"').strip("'")
    if api_key:
        os.environ["GOOGLE_API_KEY"] = api_key
    
    # [3] 키 상태 디버깅 출력 (핵심 부분)
    print("\n🗝️  [API KEY 진단 정보]")
    
    if not api_key:
        print("   ❌ 상태: 키가 없음 (None)")
        raise ValueError("GOOGLE_API_KEY 환경변수가 비어있습니다.")
    key_length = len(api_key)
    # 앞 8자 + ... + 뒤 4자 로 표시 (placeholder "AIzaSy..." 와 구분 가능, 전체 로드 여부 확인용)
    if key_length > 12:
        masked_view = api_key[:8] + "..." + api_key[-4:]
    else:
        masked_view = api_key
    
    print(f"   👉 총 길이: {key_length}자")
    print(f"   👉 로드된 값(마스킹): [{masked_view}]")
    if key_length >= 39:
        print("   ✅ 전체 키가 정상 로드되었습니다.")
    elif key_length < 35:
        print("   ⚠️ 경고: 키가 너무 짧습니다. (보통 39자) .env 한 줄에 키가 끝까지 있는지 확인하세요.")
    if api_key.startswith('"') or api_key.startswith("'"):
        print("   ⚠️ 경고: 키 앞뒤에 따옴표가 포함되어 있습니다. .env에서 따옴표를 지우세요.")
    if "placeholder" in api_key.lower() or "your_api_key" in api_key.lower():
        print("   ⚠️ 경고: 실제 키가 아니라 예시 텍스트가 들어있습니다.")

    # [5] LLM 객체 생성
    return LLM(
        model="gemini/gemini-3-pro-preview",
        api_key=api_key,
        temperature=0.4,
        max_tokens=8000
    )