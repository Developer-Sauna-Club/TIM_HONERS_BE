# TMI_HONERS_BE

## 멤버

<table>
 <tr>
    <td align="center"><a href="https://github.com/GBAJS754"><img src="https://avatars.githubusercontent.com/GBAJS754" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/khakhid"><img src="https://avatars.githubusercontent.com/khakhid" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/bbearcookie"><img src="https://avatars.githubusercontent.com/bbearcookie" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/colorkite10"><img src="https://avatars.githubusercontent.com/colorkite10" width="130px;" alt=""></a></td>
    <td align="center"><a href="https://github.com/DongjaJ"><img src="https://avatars.githubusercontent.com/DongjaJ" width="130px;" alt=""></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/GBAJS754"><b>김다은</b></a></td>
    <td align="center"><a href="https://github.com/khakhid"><b>신동호</b></a></td>
    <td align="center"><a href="https://github.com/bbearcookie"><b>이상훈<b></b></a></td>
    <td align="center"><a href="https://github.com/colorkite10"><b>이채연</b></a></td>
    <td align="center"><a href="https://github.com/DongjaJ"><b>정동환</b></a></td>
  </tr>
</table>

## 실행 방법

### 인프라 실행 방법

Docker Desktop을 실행하고, 프로젝트 폴더의 루트 디렉토리에서 `docker-compose up -d` 를 입력하면, 백그라운드에서 인프라가 실행됨.

### 로컬 서버 실행 방법

```sh
corepack enable # 패키지 매니저를 위한 corepack 활성화 (최초 한 번만 실행)
pnpm install # 패키지 설치
pnpm prisma generate # Prisma 클라이언트에 현재 Prisma Schema의 내용을 반영 (schema.prisma 파일 바꿀 때마다 실행해야 함.)
pnpm start:local # Hot Reload가 적용된 로컬 개발 서버 실행
```

### DB 연동 테스트용 API

```
--------------------------------------------------------------
GET http://localhost:5010/hello
- hello 테이블의 모든 내용 조회
--------------------------------------------------------------

--------------------------------------------------------------
POST http://localhost:5010/hello
- hello 테이블에 컬럼 추가

Content-Type: x-www-form-urlencoded

Request Body
title: string (제목)
content: string (내용)
--------------------------------------------------------------
```
