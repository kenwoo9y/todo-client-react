import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskDetail } from '../TaskDetail';
import { useFetchTask, useDeleteTask, useUpdateTask } from '@/hooks/useTasks';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';

// useFetchTaskのモック
vi.mock('@/hooks/useTasks');
const mockUseFetchTask = useFetchTask as Mock;

// useNavigateのモックを追加
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useNavigate: vi.fn(),
  };
});

// useDeleteTaskのモックを追加
vi.mock('@/hooks/useTasks', () => ({
  useFetchTask: vi.fn(),
  useDeleteTask: vi.fn(),
  useUpdateTask: vi.fn(),
}));

describe('TaskDetail', () => {
  const mockTask = {
    id: 1,
    title: 'テストタスク',
    description: 'テスト詳細',
    due_date: '2024-03-20',
    status: 'ToDo',
    created_at: '2024-03-15T10:00:00Z',
    updated_at: '2024-03-15T10:00:00Z',
  };

  const mockNavigate = vi.fn();
  const mockMutate = vi.fn();

  const renderTaskDetail = (id: string = '1') => {
    return render(
      <MemoryRouter initialEntries={[`/tasks/${id}`]}>
        <Routes>
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useDeleteTask as Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
    });
    (useUpdateTask as Mock).mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
    });
  });

  it('タスクの詳細が正しく表示される', () => {
    mockUseFetchTask.mockReturnValue({
      data: mockTask,
      isLoading: false,
      error: null,
    });

    renderTaskDetail();

    expect(screen.getByText('タスク詳細')).toBeInTheDocument();
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
    expect(screen.getByText('テスト詳細')).toBeInTheDocument();
    expect(screen.getByText('2024-03-20')).toBeInTheDocument();
    expect(screen.getByText('ToDo')).toBeInTheDocument();
  });

  it('ローディング中の表示が正しく表示される', () => {
    mockUseFetchTask.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderTaskDetail();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('エラー時のメッセージが正しく表示される', () => {
    mockUseFetchTask.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('エラーが発生しました'),
    });

    renderTaskDetail();

    expect(screen.getByText('Error: エラーが発生しました')).toBeInTheDocument();
  });

  it('タスクが見つからない場合のメッセージが正しく表示される', () => {
    mockUseFetchTask.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    renderTaskDetail();

    expect(screen.getByText('Task not found')).toBeInTheDocument();
  });

  it('タスク削除成功時にホームページにリダイレクトされる', async () => {
    mockUseFetchTask.mockReturnValue({
      data: mockTask,
      isLoading: false,
      error: null,
    });

    renderTaskDetail();

    // 削除アイコンをクリック
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

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
