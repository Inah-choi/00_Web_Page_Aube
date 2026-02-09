# 00_Web_Page_Aube

AI 스타트업 'Aube' 랜딩 페이지를 CrewAI 에이전트(PM, Dev, QA)가 협업하여 생성하는 프로젝트입니다.

## 구조

- **src/agents.py** — PM(기획), Dev(개발), QA(검수) 에이전트 정의
- **src/tasks.py** — 기획 → 코딩 → 검수 3단계 태스크
- **src/main.py** — Crew 조립 및 실행
- **output/** — 생성된 `index.html` 저장 위치

## 실행 방법

1. `.env`에 `GOOGLE_API_KEY` 설정
2. `pip install -r requirements.txt`
3. `python -m src.main` (프로젝트 루트 `00_Web_Page_Aube`에서)

결과물은 `output/index.html`에서 확인할 수 있습니다.
