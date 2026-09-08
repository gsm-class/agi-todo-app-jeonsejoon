import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from './TaskItem'
import { Task } from '@/types/task'

describe('TaskItem', () => {
  const mockOnToggleComplete = vi.fn()
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  const mockTask: Task = {
    id: '1',
    title: 'テストタスク',
    completed: false,
    dueDate: '2024-12-31',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // window.confirm のモック
    vi.spyOn(window, 'confirm').mockReturnValue(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('タスクの情報が正しく表示される', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('テストタスク')).toBeInTheDocument()
    expect(screen.getByText(/期限: 2024\/12\/31/)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('完了済みタスクは取り消し線とグレーアウトで表示される', () => {
    const completedTask = { ...mockTask, completed: true }
    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const taskTitle = screen.getByText('テストタスク')
    expect(taskTitle).toHaveClass('line-through', 'opacity-50')
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('期限切れのタスクは赤色で表示される', () => {
    const overdueTask = { ...mockTask, dueDate: '2020-01-01' }
    render(
      <TaskItem
        task={overdueTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const dueDateText = screen.getByText(/期限:/)
    expect(dueDateText).toHaveClass('text-red-500')
  })

  it('今日が期限のタスクはオレンジ色で表示される', () => {
    const today = new Date().toISOString().split('T')[0]
    const todayTask = { ...mockTask, dueDate: today }
    render(
      <TaskItem
        task={todayTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const dueDateText = screen.getByText(/期限:/)
    expect(dueDateText).toHaveClass('text-orange-500')
  })

  it('期限がないタスクは期限が表示されない', () => {
    const noDueDateTask = { ...mockTask, dueDate: undefined }
    render(
      <TaskItem
        task={noDueDateTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.queryByText(/期限:/)).not.toBeInTheDocument()
  })

  it('チェックボックスをクリックすると完了状態が切り替わる', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockOnToggleComplete).toHaveBeenCalledWith('1')
  })

  it('編集ボタンをクリックすると編集モードになる', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const editButton = screen.getByRole('button', { name: '編集' })
    await user.click(editButton)

    // 編集モードのUI要素が表示される
    expect(screen.getByDisplayValue('テストタスク')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2024-12-31')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
    
    // 元のボタンは非表示
    expect(screen.queryByRole('button', { name: '編集' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '削除' })).not.toBeInTheDocument()
  })

  it('編集モードで保存すると更新される', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    // 編集モードに入る
    await user.click(screen.getByRole('button', { name: '編集' }))

    // タイトルと期限を変更
    const titleInput = screen.getByDisplayValue('テストタスク')
    const dueDateInput = screen.getByDisplayValue('2024-12-31')

    await user.clear(titleInput)
    await user.type(titleInput, '更新されたタスク')
    await user.clear(dueDateInput)
    await user.type(dueDateInput, '2025-01-01')

    // 保存
    await user.click(screen.getByRole('button', { name: '保存' }))

    expect(mockOnEdit).toHaveBeenCalledWith('1', '更新されたタスク', '2025-01-01')
  })

  it('編集モードで空のタイトルでは保存されない', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    await user.click(screen.getByRole('button', { name: '編集' }))
    const titleInput = screen.getByDisplayValue('テストタスク')
    await user.clear(titleInput)
    await user.click(screen.getByRole('button', { name: '保存' }))

    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('編集モードでキャンセルすると元に戻る', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    await user.click(screen.getByRole('button', { name: '編集' }))
    
    // 値を変更
    const titleInput = screen.getByDisplayValue('テストタスク')
    await user.clear(titleInput)
    await user.type(titleInput, '変更したタスク')

    // キャンセル
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))

    // 元の表示に戻る
    expect(screen.getByText('テストタスク')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('変更したタスク')).not.toBeInTheDocument()
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('削除ボタンをクリックして確認ダイアログでOKを選ぶと削除される', async () => {
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '削除' })
    await user.click(deleteButton)

    expect(window.confirm).toHaveBeenCalledWith('このタスクを削除してもよろしいですか？')
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('削除ボタンをクリックして確認ダイアログでキャンセルを選ぶと削除されない', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    
    const user = userEvent.setup()
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '削除' })
    await user.click(deleteButton)

    expect(window.confirm).toHaveBeenCalledWith('このタスクを削除してもよろしいですか？')
    expect(mockOnDelete).not.toHaveBeenCalled()
  })
})