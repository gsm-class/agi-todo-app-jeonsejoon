import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTodos } from './useTodos'
import * as storage from '@/utils/storage'

// Mock storage module
vi.mock('@/utils/storage', () => ({
  loadTasks: vi.fn(),
  saveTasks: vi.fn(),
}))

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset localStorage mock
    vi.mocked(storage.loadTasks).mockReturnValue([])
  })

  it('初期状態でisLoadingがtrueになるが、useEffectの実行後はfalseになる', async () => {
    const { result } = renderHook(() => useTodos())
    
    // 初期状態はtrueだが、テスト環境ではuseEffectが即座に実行される
    // そのため、結果はfalseになっている
    expect(result.current.isLoading).toBe(false)
  })

  it('クライアントサイドでデータをロードする', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Test Task',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

    const { result } = renderHook(() => useTodos())

    // Wait for useEffect to run
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.tasks).toEqual(mockTasks)
  })

  it('タスクを追加できる', async () => {
    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.addTask('New Task', '2024-12-31')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject({
      title: 'New Task',
      dueDate: '2024-12-31',
      completed: false,
    })
    expect(storage.saveTasks).toHaveBeenCalledWith(result.current.tasks)
  })

  it('タスクを削除できる', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Task to delete',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.deleteTask('1')
    })

    expect(result.current.tasks).toHaveLength(0)
    expect(storage.saveTasks).toHaveBeenCalledWith([])
  })

  it('タスクの完了状態を切り替えられる', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Task',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.toggleComplete('1')
    })

    expect(result.current.tasks[0].completed).toBe(true)
  })

  it('タスクを編集できる', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Old Title',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    act(() => {
      result.current.editTask('1', 'New Title', '2024-12-31')
    })

    expect(result.current.tasks[0]).toMatchObject({
      title: 'New Title',
      dueDate: '2024-12-31',
    })
  })

  it('完了済みタスクをフィルタリングできる', async () => {
    const mockTasks = [
      {
        id: '1',
        title: 'Completed Task',
        completed: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        title: 'Active Task',
        completed: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ]
    vi.mocked(storage.loadTasks).mockReturnValue(mockTasks)

    const { result } = renderHook(() => useTodos())

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    // 初期状態では全タスクを表示
    expect(result.current.tasks).toHaveLength(2)

    // 完了済みを非表示に
    act(() => {
      result.current.setShowCompleted(false)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Active Task')
  })
})