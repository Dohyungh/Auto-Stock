-- 1. MySQL 접속
mysql -u root -p

-- 2. 사용자 생성
CREATE USER 'autostock'@'%' IDENTIFIED BY '1234';

CREATE DATABASE IF NOT EXISTS autostock;

-- 3. 권한 부여
GRANT ALL PRIVILEGES ON autostock.* TO 'autostock'@'%';

-- 4. 권한 적용
FLUSH PRIVILEGES;
