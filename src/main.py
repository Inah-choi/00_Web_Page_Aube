import sys
import os  # [추가]
from pathlib import Path

# 프로젝트 루트 경로 설정
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from crewai import Crew, Process
from src.agents import create_agents
from src.tasks import create_tasks

# [추가 함수] 새로운 출력 폴더 이름 생성기
def get_unique_output_dir(base_name="output"):
    """
    output 폴더가 이미 있으면 output_1, output_2 순서로 이름을 찾음
    """
    # 프로젝트 루트 (main.py의 상위 상위)
    project_root = Path(__file__).resolve().parent.parent
    
    # 1. 기본 output 폴더 확인
    target_dir = project_root / base_name
    if not target_dir.exists():
        return base_name # output이 없으면 그냥 'output' 사용
    
    # 2. 숫자를 붙여가며 빈 폴더명 찾기
    counter = 1
    while True:
        new_name = f"{base_name}_{counter}"
        target_dir = project_root / new_name
        if not target_dir.exists():
            return new_name
        counter += 1

def main():
    print("🚀 Aube 웹사이트 프로젝트 시작...")

    # [1] 저장할 폴더 이름 결정 및 환경변수 설정
    final_output_dir = get_unique_output_dir()
    os.environ["TARGET_OUTPUT_DIR"] = final_output_dir  # 전역 변수처럼 등록
    
    print(f"📂 이번 결과물은 '{final_output_dir}' 폴더에 저장됩니다.")

    # 2. 에이전트 생성
    pm, fe_dev, be_dev, qa = create_agents()

    # 3. 태스크 생성
    tasks = create_tasks(pm, fe_dev, be_dev, qa)

    # 4. 크루 결성
    aube_crew = Crew(
        agents=[pm, fe_dev, be_dev, qa],
        tasks=tasks,
        process=Process.sequential,
        verbose=True
    )

    # 5. 실행
    result = aube_crew.kickoff()

    print("\n######################")
    print("✅ 프로젝트 완료!")
    print(f"결과물은 '{final_output_dir}/index.html'에서 확인하세요.")
    print(result)

if __name__ == "__main__":
    main()