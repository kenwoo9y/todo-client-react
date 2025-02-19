import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskDetail } from '../TaskDetail';
import { useFetchTask } from '@/hooks/useTasks';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// useFetchTaskのモック
vi.mock('@/hooks/useTasks');
const mockUseFetchTask = useFetchTask as Mock;

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
});
