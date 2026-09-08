import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskFilter from './TaskFilter'

describe('TaskFilter', () => {
  const mockOnToggleShowCompleted = vi.fn()

  beforeEach(() => {
    mockOnToggleShowCompleted.mockClear()
  })

  it('チェックボックスとラベルが表示される', () => {
    render(
      <TaskFilter
        showCompleted={true}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('完了済みのタスクを表示')

    expect(checkbox).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('showCompletedがtrueの場合、チェックボックスがチェックされている', () => {
    render(
      <TaskFilter
        showCompleted={true}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('showCompletedがfalseの場合、チェックボックスがチェックされていない', () => {
    render(
      <TaskFilter
        showCompleted={false}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('チェックボックスをクリックするとコールバックが呼ばれる', async () => {
    const user = userEvent.setup()
    render(
      <TaskFilter
        showCompleted={false}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockOnToggleShowCompleted).toHaveBeenCalledWith(true)
    expect(mockOnToggleShowCompleted).toHaveBeenCalledTimes(1)
  })

  it('チェック済みのチェックボックスをクリックするとfalseで呼ばれる', async () => {
    const user = userEvent.setup()
    render(
      <TaskFilter
        showCompleted={true}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockOnToggleShowCompleted).toHaveBeenCalledWith(false)
    expect(mockOnToggleShowCompleted).toHaveBeenCalledTimes(1)
  })

  it('ラベルをクリックしてもチェックボックスが切り替わる', async () => {
    const user = userEvent.setup()
    render(
      <TaskFilter
        showCompleted={false}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const label = screen.getByText('完了済みのタスクを表示')
    await user.click(label)

    expect(mockOnToggleShowCompleted).toHaveBeenCalledWith(true)
  })

  it('複数回クリックしても正しく動作する', async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <TaskFilter
        showCompleted={false}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    
    // 1回目のクリック
    await user.click(checkbox)
    expect(mockOnToggleShowCompleted).toHaveBeenLastCalledWith(true)

    // propsを更新して再レンダリング
    rerender(
      <TaskFilter
        showCompleted={true}
        onToggleShowCompleted={mockOnToggleShowCompleted}
      />
    )

    // 2回目のクリック
    await user.click(checkbox)
    expect(mockOnToggleShowCompleted).toHaveBeenLastCalledWith(false)

    expect(mockOnToggleShowCompleted).toHaveBeenCalledTimes(2)
  })
})