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
  { id: 1, title: 'タスク1', status: 'Doing', dueDate: '2024-03-20' },
  { id: 2, title: 'タスク2', status: 'Done', dueDate: '2024-03-21' },
  { id: 3, title: 'タスク3', status: 'ToDo', dueDate: '2024-03-22' },
  { id: 4, title: 'タスク4', status: 'Done', dueDate: '2024-03-23' },
  { id: 5, title: 'タスク5', status: 'ToDo', dueDate: '2024-03-24' },
  { id: 6, title: 'タスク6', status: 'Done', dueDate: '2024-03-25' },
  { id: 7, title: 'タスク7', status: 'Doing', dueDate: '2024-03-26' },
  { id: 8, title: 'タスク8', status: 'Done', dueDate: '2024-03-27' },
  { id: 9, title: 'タスク9', status: 'ToDo', dueDate: '2024-03-28' },
  { id: 10, title: 'タスク10', status: 'Done', dueDate: '2024-03-29' },
  { id: 11, title: 'タスク11', status: 'ToDo', dueDate: '2024-03-30' },
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
    const title = screen.getByRole('heading', { name: 'ToDo' });
    expect(title).toBeInTheDocument();

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

  describe('ページネーション機能', () => {
    beforeEach(() => {
      mockUseFetchTasks.mockReturnValue({
        data: mockTasks,
        isLoading: false,
        error: null,
      });
    });

    it('ページサイズの変更が正しく動作する', () => {
      render(
        <BrowserRouter>
          <TaskTable />
        </BrowserRouter>,
      );

      // ページサイズ選択をクリック
      const pageSizeSelect = screen.getByRole('combobox');
      fireEvent.change(pageSizeSelect, { target: { value: '20' } });

      // 20件表示されることを確認
      expect(screen.getByText('タスク1')).toBeInTheDocument();
      expect(screen.getByText('タスク11')).toBeInTheDocument();
    });

    it('次のページへの移動が正しく動作する', () => {
      render(
        <BrowserRouter>
          <TaskTable />
        </BrowserRouter>,
      );

      // 次のページボタンをクリック
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      // 2ページ目のデータが表示されることを確認
      const pageInfo = screen.getByTestId('pagination-info');
      expect(pageInfo.textContent).toBe('2/2');
    });

    it('前のページへの移動が正しく動作する', () => {
      render(
        <BrowserRouter>
          <TaskTable />
        </BrowserRouter>,
      );

      // 次のページボタンをクリック
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      // 前のページボタンをクリック
      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);

      // 1ページ目のデータが表示されることを確認
      const pageInfo = screen.getByTestId('pagination-info');
      expect(pageInfo.textContent).toBe('1/2');
    });

    it('最初のページへの移動が正しく動作する', () => {
      render(
        <BrowserRouter>
          <TaskTable />
        </BrowserRouter>,
      );

      // 次のページボタンをクリック
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);

      // 最初のページボタンをクリック
      const firstButton = screen.getByRole('button', { name: /first/i });
      fireEvent.click(firstButton);

      // 1ページ目のデータが表示されることを確認
      const pageInfo = screen.getByTestId('pagination-info');
      expect(pageInfo.textContent).toBe('1/2');
    });

    it('最後のページへの移動が正しく動作する', () => {
      render(
        <BrowserRouter>
          <TaskTable />
        </BrowserRouter>,
      );

      // 最後のページボタンをクリック
      const lastButton = screen.getByRole('button', { name: /last/i });
      fireEvent.click(lastButton);

      // 最後のページのデータが表示されることを確認
      const pageInfo = screen.getByTestId('pagination-info');
      expect(pageInfo.textContent).toBe('2/2');
    });
  });
});
