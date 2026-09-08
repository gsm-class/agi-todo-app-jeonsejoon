import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import { Task } from '@/types/task'

// TaskItemコンポーネントをモック
vi.mock('./TaskItem', () => ({
  default: vi.fn(({ task, onToggleComplete, onEdit, onDelete }) => (
    <div data-testid={`task-item-${task.id}`}>
      <span>{task.title}</span>
      <button onClick={() => onToggleComplete(task.id)}>Toggle</button>
      <button onClick={() => onEdit(task.id, 'edited', '2024-12-31')}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )),
}))

describe('TaskList', () => {
  const mockOnToggleComplete = vi.fn()
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'タスク1',
      completed: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'タスク2',
      completed: true,
      dueDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('タスクが空の場合、メッセージが表示される', () => {
    render(
      <TaskList
        tasks={[]}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('タスクがありません。新しいタスクを追加してください。')).toBeInTheDocument()
  })

  it('タスクが存在する場合、すべてのタスクが表示される', () => {
    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByTestId('task-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('task-item-2')).toBeInTheDocument()
    expect(screen.getByText('タスク1')).toBeInTheDocument()
    expect(screen.getByText('タスク2')).toBeInTheDocument()
  })

  it('TaskItemに正しいpropsが渡される', async () => {
    const TaskItemModule = await import('./TaskItem')
    const TaskItem = vi.mocked(TaskItemModule.default)
    
    render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    // 最初のタスクのpropsを確認
    expect(TaskItem).toHaveBeenCalledWith(
      {
        task: mockTasks[0],
        onToggleComplete: mockOnToggleComplete,
        onEdit: mockOnEdit,
        onDelete: mockOnDelete,
      },
      undefined
    )

    // 2番目のタスクのpropsを確認
    expect(TaskItem).toHaveBeenCalledWith(
      {
        task: mockTasks[1],
        onToggleComplete: mockOnToggleComplete,
        onEdit: mockOnEdit,
        onDelete: mockOnDelete,
      },
      undefined
    )
  })

  it('タスクの数が変わっても正しく表示される', () => {
    const { rerender } = render(
      <TaskList
        tasks={mockTasks}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getAllByTestId(/task-item-/)).toHaveLength(2)

    // タスクを追加
    const newTasks = [
      ...mockTasks,
      {
        id: '3',
        title: 'タスク3',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]

    rerender(
      <TaskList
        tasks={newTasks}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getAllByTestId(/task-item-/)).toHaveLength(3)
  })
})