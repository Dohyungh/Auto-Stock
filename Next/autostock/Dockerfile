# 공식 Node.js 20 이미지를 베이스 이미지로 사용
FROM node:20 AS builder

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock)을 컨테이너로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 프로젝트 파일을 컨테이너로 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# 프로덕션 이미지를 설정
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 빌드 단계에서 생성한 파일을 프로덕션 이미지로 복사
COPY --from=builder /app /app

# Next.js가 기본적으로 사용하는 포트 3000을 외부에 노출
EXPOSE 3000

# 애플리케이션을 프로덕션 모드로 실행
CMD ["npm", "start"]
