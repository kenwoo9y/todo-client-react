import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskTable } from '../TaskTable';
import { useFetchTasks } from '@/hooks/useTasks';
import { BrowserRouter } from 'react-router-dom';

// useFetchTasksのモック
vi.mock('@/hooks/useTasks');
const mockUseFetchTasks = useFetchTasks as Mock;

// テスト用のタスクデータ
const mockTasks = [
  { id: 1, title: 'タスク1', status: '未着手', dueDate: '2024-03-20' },
  { id: 2, title: 'タスク2', status: '完了', dueDate: '2024-03-21' },
];

describe('TaskTable', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    mockUseFetchTasks.mockReset();
  });

  it('タスク一覧が正しく表示される', () => {
    // モックの戻り値を設定
    mockUseFetchTasks.mockReturnValue({
      data: mockTasks,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <TaskTable />
      </BrowserRouter>,
    );

    // タイトルの確認
    expect(screen.getByText('ToDo')).toBeInTheDocument();

    // タスクデータの表示確認
    expect(screen.getByText('タスク1')).toBeInTheDocument();
    expect(screen.getByText('タスク2')).toBeInTheDocument();
  });

  it('ローディング中の表示が正しく動作する', () => {
    mockUseFetchTasks.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <TaskTable />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('エラー時の表示が正しく動作する', () => {
    mockUseFetchTasks.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('エラーが発生しました'),
    });

    render(
      <BrowserRouter>
        <TaskTable />
      </BrowserRouter>,
    );

    expect(screen.getByText('Error: エラーが発生しました')).toBeInTheDocument();
  });

  it('ソート機能が正しく動作する', () => {
    mockUseFetchTasks.mockReturnValue({
      data: mockTasks,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <TaskTable />
      </BrowserRouter>,
    );

    // タイトル列のヘッダーをクリック
    const titleHeader = screen.getByText('タイトル');
    fireEvent.click(titleHeader);

    // ソートアイコンが表示されることを確認
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });
});
