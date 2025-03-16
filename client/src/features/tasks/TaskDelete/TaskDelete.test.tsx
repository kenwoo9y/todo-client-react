import { vi, describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskDelete } from './TaskDelete';
import { useDeleteTask } from '@/hooks/useTasks';

// useDeleteTaskのモック
vi.mock('@/hooks/useTasks', () => ({
  useDeleteTask: vi.fn(),
}));

describe('TaskDelete', () => {
  const mockMutate = vi.fn();

  const mockTask = {
    id: 1,
    title: 'テストタスク',
    description: 'テストの詳細',
    due_date: '2024-12-31',
    status: 'ToDo',
    owner_id: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    (useDeleteTask as Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
      onSuccess: vi.fn(),
      onError: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('削除アイコンをクリックするとモーダルが表示される', () => {
    render(<TaskDelete task={mockTask} />);

    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('タスク削除')).toBeInTheDocument();
    expect(
      screen.getByText('以下のタスクを削除しますか？'),
    ).toBeInTheDocument();
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
  });

  it('削除ボタンをクリックするとタスクが削除される', async () => {
    render(<TaskDelete task={mockTask} />);

    // モーダルを開く
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    // 削除ボタンをクリック
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ id: mockTask.id });
    });
  });

  it('キャンセルボタンをクリックするとモーダルが閉じる', () => {
    render(<TaskDelete task={mockTask} />);

    // モーダルを開く
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    // キャンセルボタンをクリック
    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('削除成功時にモーダルが閉じる', async () => {
    render(<TaskDelete task={mockTask} />);

    // モーダルを開く
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    // 削除ボタンをクリック
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    // mutateを呼び出した時のコールバックを実行
    const mutateCallback = mockMutate.mock.calls[0][1]?.onSuccess;
    if (mutateCallback) {
      mutateCallback();
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('削除成功時にonSuccessコールバックが呼ばれる', async () => {
    const onSuccessMock = vi.fn();
    render(<TaskDelete task={mockTask} onSuccess={onSuccessMock} />);

    // モーダルを開く
    const deleteIcon = screen.getByTestId('delete-icon');
    fireEvent.click(deleteIcon);

    // 削除ボタンをクリック
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    // mutateを呼び出した時のコールバックを実行
    const mutateCallback = mockMutate.mock.calls[0][1]?.onSuccess;
    if (mutateCallback) {
      mutateCallback();
    }

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });
});
