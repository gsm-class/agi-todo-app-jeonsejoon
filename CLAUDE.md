# TODO 앱 개발 가이드라인

이 프로젝트는 @SPECIFICATION.md를 기반으로 개발되는 간단한 TODO 응용 프로그램입니다.

## 프로젝트 개요

- **앱 이름**: TODO App
- **종류**: 개인용 Web 애플리케이션
- **주요 기능**: 작업 관리, 기한 설정, 로컬 저장
- **개발 기간**: 3일

## 기술 스택

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- 로컬 스토리지

## 개발 룰

### 코딩 규약

1. **TypeScript**
   - 엄격한 유형 정의 사용
   - `any`타입은 사용 금지
   - 인터페이스는`interface`사용

2. **컴포넌트 설계**
   - 함수 컴포넌트 사용
   - 커스텀 훅으로 상태 관리 로직을 분리
   - 작고 재사용 가능한 컴포넌트로 분할

3. **파일 구조**
   ```
   src/
   ├── app/
   │   ├── page.tsx
   │   ├── layout.tsx
   │   └── globals.css
   ├── components/
   │   ├── TaskList.tsx
   │   ├── TaskItem.tsx
   │   ├── TaskForm.tsx
   │   └── TaskFilter.tsx
   ├── hooks/
   │   └── useTodos.ts
   ├── types/
   │   └── task.ts
   └── utils/
       └── storage.ts
   ```

4. **명명 규칙** 
   - 구성 요소: PascalCase 
   - 함수 및 변수: camelCase 
   - 상수: UPPER_SNAKE_CASE 
   - 파일 이름 : 구성 요소는 PascalCase, 기타는 camelCase

### 데이터 관리

1. **작업 데이터 구조**(@SPECIFICATION.md 준수)
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

2. **로컬 스토리지**
   - 키 이름: `todos`
   - JSON 형식으로 저장
   - 읽기/저장 시 에러 핸들링

### UI/UX 구현 지침

1. **디자인 원칙** 
   - 간단하고 직관적 인 UI 
   - 반응형 대응 필수 
   - 내게 필요한 옵션 고려

2. **기한표시 색 구분** 
   - 만료 : 'text-red-500' 
   - 오늘 기한 :`text-orange-500` 
- 마감일: 기본 색상

3. **완료된 작업** 
   - 취소 선 :`line-through` 
   - 그레이 아웃 :`opacity-50`

### 개발 흐름

1. **Day 1**: 기반 구축
   - Next.js 프로젝트 설정
   - 기본 레이아웃 구현
   - 태스크 추가・표시 기능

2. **Day 2**: 기능 구현
   - 편집・삭제 기능
   - 완료 상태 관리
   - ローカルストレージ連携

3. **Day 3**: 마무리 
   - 기한 관리 기능 
   - 반응형 대응 
   - 테스트 및 최종 조정

### 테스트 정책

1. **수동 테스트 항목** 
   - 작업 추가, 편집, 삭제 
   - 기한 설정 및 경고 표시 
   - 반응형 디스플레이 
   - 로컬 스토리지의 지속성

2. **브라우저 테스트** 
   - Chrome, Firefox, Safari, Edge 
   - 모바일 브라우저

### 커밋 메시지 약관

```
feat: 새로운 기능 추가
fix: 버그 수정
style: UI 스타일 변경
refactor: 리팩토링
docs: 문서 업데이트
test: 테스트 추가/수정
```

### 주의사항

1. **제외 기능**(@SPECIFICATION.md 참조) 
   - 사용자 인증, 클라우드 동기화, 카테고리 분류 등은 구현하지 않음 
   - 범위를 지키고 단순함을 유지

2. **성능** 
   - 불필요한 재 렌더링을 피하십시오. 
   - 메모화를 적절히 사용

3. **오류 처리** 
   - 로컬 스토리지 액세스 시 오류 처리 
   - 사용자 친화적 인 오류 메시지

이 가이드라인에 따라 @SPECIFICATION.md의 요구사항을 충족하는 고품질의 TODO 앱을 개발하십시오.