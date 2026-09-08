# TODO App

간단하고 사용하기 쉬운 TODO 응용 프로그램. 작업 관리, 기한 설정, 완료 상태 관리가 가능합니다.

## 기능

- ✅ 작업 추가・편집・삭제
- 📅 기한 설정과 관리
- 🎯 완료 상태 전환
- 🔍 완료된 작업 표시/비표시
- 💾 로컬 스토리지에 의한 데이터 지속화
- 📱 반응형 디자인

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Storage**: Local Storage

## 설정

### 필요한 환경

- Node.js 18.0.0이상
- npm 또는 yarn

### 설치

```bash
# 리포지토리 복제
git clone [repository-url]
cd todo-app

# 종속성 설치
npm install
```

### 개발 서버의 시작

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 를 열어 애플리케이션을 확인할 수 있습니다.

## 사용 방법

### 태스크의 추가

1. 작업 이름 필드에 작업 입력
2. 필요에 따라「기한」을 설정
3. 「태스크를 추가」버튼을 클릭하거나 Enter 키를 누릅니다

### 태스크의 편집

1. 태스크의「편집」버튼을 클릭
2. 태스크명의 기한을 변경
3. 「저장」을 클릭하여 변경 사항을 저장

### 태스크의 삭제

1. 태스크의「삭제」버튼을 클릭
2. 확인 다이얼로그에서「OK」를 선택

### 태스크의 완료

- 태스크 왼쪽의 체크박스를 클릭하여 완료 상태를 전환

### 필터링

- 「완료된 작업 표시」체크박스로 표시/비표시를 전환

## 프로젝트 구조

```
todo-app/
├── app/
│   ├── layout.tsx    # 애플리케이션 레이아웃
│   ├── page.tsx      # 메인페이지
│   └── globals.css   # 글로벌 스타일
├── components/
│   ├── TaskForm.tsx   # 작업 추가 양식
│   ├── TaskList.tsx   # 작업 목록
│   ├── TaskItem.tsx   # 개별 작업 표시
│   └── TaskFilter.tsx # 필터 구성 요소
├── hooks/
│   └── useTodos.ts    # TODO로직 커스텀 후크
├── types/
│   └── task.ts        # Task 타입 정의
└── utils/
    ├── constants.ts   # 상수 정의
    ├── storage.ts     # 로컬 스토리지 작업
    └── migration.ts   # 데이터 마이그레이션 로직
```

## 스크립트

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

## 라이센스

MIT