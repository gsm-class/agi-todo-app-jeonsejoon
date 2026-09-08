# TODO 앱 구축 작업 목록

## 🎯 프로젝트 개요
SPECIFICATION.md를 기반으로 간단한 TODO 애플리케이션 구축

## 📋 구현 태스크

### Phase 1: 환경 구축과 프로젝트 세팅
- [x] Next.js 14 프로젝트의 초기화
  - [x] `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
  - [x] 불필요한 파일의 삭제（README.md 이외）
  - [x] `.gitignore`확인 및 조정
- [x] 프로젝트 구조의 생성
  - [x] `components/`디렉토리 생성
  - [x] `hooks/`디렉토리 생성
  - [x] `types/`디렉토리 생성
  - [x] `utils/`디렉토리 생성

### Phase 2: 유형 정의 및 데이터 구조
- [x] Task 유형 정의（`types/task.ts`）
  ```typescript
  interface Task {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
  }
  ```
- [x] 로컬 스토리지의 키 상수 정의

### Phase 3: 기본UI 컴포넌트의 생성
- [x] 레이아웃의 구현（`app/layout.tsx`）
  - [x] 헤더「TODO App」의 설정
  - [x] 기본적인 스타일링
- [x] 메인페이지의 기본 구조（`app/page.tsx`）
- [x] TaskForm 컴포넌트（`components/TaskForm.tsx`）
  - [x] 태스크명 입력 필드
  - [x] 기한 선택（날짜 피커）
  - [x] 추가 버튼
  - [x] Enter 키での 추가 대응
- [x] TaskList 컴포넌트（`components/TaskList.tsx`）
  - [x] 태스크 목록의 표시
  - [x] 빈 상태의 표시
- [x] TaskItem 컴포넌트（`components/TaskItem.tsx`）
  - [x] 체크박스
  - [x] 태스크명 표시
  - [x] 기한 표시
  - [x] 편집 버튼
  - [x] 삭제 버튼
- [x] TaskFilter 컴포넌트（`components/TaskFilter.tsx`）
  - [x] 완료된 상태 표시切り替え 토글

### Phase 4: 상태 관리와 비즈니스 로직
- [x] useTodos 커스텀 훅（`hooks/useTodos.ts`）
  - [x] 태스크의 상태 관리
  - [x] 태스크 추가 기능
  - [x] 태스크 편집 기능
  - [x] 태스크 삭제 기능
  - [x] 완료 상태切り替え 기능
  - [x] 필터링 기능
- [x] 로컬 스토리지 유틸리티（`utils/storage.ts`）
  - [x] 데이터의 저장
  - [x] 데이터의 읽기
  - [x] 에러 핸들링

### Phase 5: CRUD기능 구현
- [x] 태스크 추가 기능의 연결
  - [x] 양식 전송 처리
  - [x] 유효성 검사 
  - [x] 즉시 UI 업데이트
- [x] 태스크 편집 기능
  - [x] 인라인 편집 구현 
  - [x] 편집 모드 전환 
  - [x] 저장/취소 처리
- [x] 태스크 삭제 기능
  - [x] 삭제 확인 대화 상자
  - [x] 삭제 처리 구현
- [x] 완료 상태 관리
  - [x] 확인란 클릭 처리
  - [x] 시각적 피드백

### Phase 6: 마감일 관리 및 경고 기능
- [x] 기한 설정 기능 
  - [x] 날짜 선택기 구현 
  - [x] 기한 없음 옵션
- [x] 마감일 표시 색상 구분
  - [x] 마감일 초과: 적색（`text-red-500`）
  - [x] 오늘 기한: 오렌지색（`text-orange-500`）
  - [x] 마감일 내: 기본 색상
- [x] 기한 판정 로직 구현

### Phase 7: UI/UX개선
- [x] 완료된 작업 스타일링
  - [x] 취소선(`line-through`)
  - [x] 그레이아웃(`opacity-50`)
- [x] 반응형 디자인
  - [x] 모바일 지원 레이아웃
  - [x] 터치 조작 최적화
  - [x] 버튼 크기 조정
- [x] 상호작용 개선
  - [x] 호버 효과
  - [x] 전환
  - [x] 로딩 상태

### Phase 8: 데이터 지속성
- [x] 로컬 스토리지 연계 
  - [x] 최초 로드 시 데이터 취득 
  - [x] 변경 시 자동 저장
  - [x] 오류 처리
- [x] 데이터 무결성 확보
  - [x] 잘못된 데이터 유효성 검사
  - [x] 마이그레이션 처리

### Phase 9: 최종 조정 및 테스트
- [x] 기능 테스트 
  - [x] 모든 CRUD 작업 확인 
  - [x] 기한 관리 동작 확인 
  - [x] 필터링 확인 
  - [x] 로컬 스토리지의 지속성 확인
- [x] 브라우저 호환성 테스트
  - [x] Chrome
  - [x] Firefox
  - [x] Safari
  - [x] Edge
  - [x] 모바일 브라우저
- [x] 성능 최적화 
  - [x] 불필요한 재 렌더링 감소 
  - [x] React.memo 적용 
  - [x] useCallback 적용
- [x] 코드 리팩토링 
  - [x] 중복 코드 삭제 
  - [x] 명명 규칙의 통일 
  - [x] 댓글 추가

### Phase 10: 문서 만들기
- [x] EADME.md 업데이트 
  - [x] 프로젝트 개요 
  - [x] 설정 절차 
  - [x] 사용법
- [x] 컴포넌트 문서
  - [x] 각 컴포넌트의 설명
  - [x] Props의 설명

## 📅 예상 소요 시간
- Phase 1: 15분
- Phase 2: 10분
- Phase 3: 45분
- Phase 4: 30분
- Phase 5: 45분
- Phase 6: 30분
- Phase 7: 30분
- Phase 8: 20분
- Phase 9: 30분
- Phase 10: 15분

**합계: 약 4.5시간**

## 🎨 디자인 사양
- 심플하고 최소한의 디자인
- Tailwind CSS 사용
- 반응형 대응 필수
- 다크 모드 비 대응

## 🚫 스코프 외
- 사용자 인증
- 클라우드 동기화
- 카테고리 분류
- 우선순위 설정
- 검색 기능
- 태스크의 정렬
- 데이터 내보내기/가져오기
- 알림 기능
- 통계·분석 기능