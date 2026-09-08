# 구성 요소 문서

## 구성 요소 목록

### TaskForm

작업을 추가하는 양식 구성 요소.

**Props:**
```typescript
interface TaskFormProps {
  onAddTask: (title: string, dueDate?: string) => void;
}
```

**기능:**
- 태스크명 입력
- 기한 설정（옵션）
- Enter 키での 전송 대응
- 기한 클리어 버튼

**사용 예:**
```tsx
<TaskForm onAddTask={(title, dueDate) => addTask(title, dueDate)} />
```

### TaskList

작업 목록을 표시하는 구성 요소.

**Props:**
```typescript
interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, dueDate?: string) => void;
  onDelete: (id: string) => void;
}
```

**기능:**
- 태스크 목록의 표시
- 빈 상태의 표시
- 개별 태스크의 관리

**사용 예:**
```tsx
<TaskList
  tasks={filteredTasks}
  onToggleComplete={toggleComplete}
  onEdit={editTask}
  onDelete={deleteTask}
/>
```

### TaskItem

개별 작업을 표시하는 구성 요소.

**Props:**
```typescript
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, dueDate?: string) => void;
  onDelete: (id: string) => void;
}
```

**기능:**
- 태스크의 표시（제목、기한、완료 상태）
- 인라인 편집
- 완료 상태의切り替え
- 삭제 확인 다이얼로그
- 기한의 색分け 표시

**사용 예:**
```tsx
<TaskItem
  task={task}
  onToggleComplete={onToggleComplete}
  onEdit={onEdit}
  onDelete={onDelete}
/>
```

### TaskFilter

완료된 작업의 표시/숨기기를 전환하는 필터 구성요소.

**Props:**
```typescript
interface TaskFilterProps {
  showCompleted: boolean;
  onToggleShowCompleted: (show: boolean) => void;
}
```

**기능:**
- 체크박스による 표시切り替え
- 호버 효과

**사용 예:**
```tsx
<TaskFilter
  showCompleted={showCompleted}
  onToggleShowCompleted={setShowCompleted}
/>
```

## 커스텀 후크

### useTodos

TODO 애플리케이션의 비즈니스 로직을 관리하는 사용자 정의 후크.

**반환 값:**
```typescript
{
  tasks: Task[];              // 필터링된 태스크 목록
  isLoading: boolean;         // 로딩 상태
  showCompleted: boolean;     // 완료된 작업 표시 플래그
  setShowCompleted: (show: boolean) => void;
  addTask: (title: string, dueDate?: string) => void;
  editTask: (id: string, title: string, dueDate?: string) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}
```

**기능:**
- 작업 상태 관리
- 로컬 스토리지와 동기화
- CRUD 조작
- 필터링

## 型定義

### Task

```typescript
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 성능 최적화

모든 컴퍼넌트는 `React.memo`로 랩 되어 있어 불필요한 재렌더링을 막고 있습니다.

## 스타일링

Tailwind CSS를 사용하고 다음 설계 원칙을 따릅니다.
- 반응형 디자인(모바일 우선)
- 호버 효과와 전환
- 접근성을 고려한 대비