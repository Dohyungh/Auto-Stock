# Python 3.9 이미지에서 시작
FROM python:3.12-slim

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt를 복사하고 필요한 패키지 설치
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Flask 애플리케이션 파일 복사
COPY . /app

# 5000 포트 열기
EXPOSE 5000

# 애플리케이션 실행
CMD ["python", "app.py"]
