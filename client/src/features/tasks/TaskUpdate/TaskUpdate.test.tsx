import { vi, describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskUpdate } from './TaskUpdate';
import { useUpdateTask } from '@/hooks/useTasks';
import { userEvent } from '@storybook/test';

// useUpdateTaskのモック
vi.mock('@/hooks/useTasks', () => ({
  useUpdateTask: vi.fn(),
}));

describe('TaskUpdate', () => {
  const mockMutate = vi.fn();

  const mockTask = {
    id: 1,
    title: 'テストタスク',
    description: 'テストの詳細',
    due_date: '2024-12-31',
    status: 'ToDo',
    owner_id: 1,
  };

  beforeEach(() => {
    (useUpdateTask as Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('編集アイコンをクリックするとモーダルが開く', () => {
    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    const editIcon = screen.getByTestId('edit-icon');
    fireEvent.click(editIcon);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('タスク更新')).toBeInTheDocument();
  });

  it('フォームの入力値が正しく更新される', () => {
    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));

    // タイトルを更新
    const titleInput = screen.getByLabelText('タイトル*');
    fireEvent.change(titleInput, { target: { value: '更新されたタイトル' } });

    expect(titleInput).toHaveValue('更新されたタイトル');
  });

  it('キャンセルボタンをクリックするとモーダルが閉じる', () => {
    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(screen.getByText('タスク更新')).toBeInTheDocument();

    // キャンセルボタンをクリック
    fireEvent.click(screen.getByText('キャンセル'));
    expect(screen.queryByText('タスク更新')).not.toBeInTheDocument();
  });

  it('フォーム送信時に正しいデータで更新APIが呼ばれる', async () => {
    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));

    // フォームを更新して送信
    const titleInput = screen.getByLabelText('タイトル*');
    fireEvent.change(titleInput, { target: { value: '更新されたタイトル' } });

    const submitButton = screen.getByText('更新');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: mockTask.id,
          request: expect.objectContaining({
            title: '更新されたタイトル',
            owner_id: mockTask.owner_id,
          }),
        },
        expect.any(Object),
      );
    });
  });

  it('更新成功時にモーダルが閉じる', async () => {
    mockMutate.mockImplementation((_, options) => {
      options.onSuccess();
    });

    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));

    // フォームを送信
    fireEvent.click(screen.getByText('更新'));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('全てのフォームフィールドが正しく更新される', async () => {
    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));

    // タイトルの入力をテスト
    const titleInput = screen.getByLabelText('タイトル*');
    fireEvent.change(titleInput, { target: { value: '新しいタイトル' } });
    expect(titleInput).toHaveValue('新しいタイトル');

    // 詳細の入力をテスト
    const descriptionInput = screen.getByLabelText('詳細');
    fireEvent.change(descriptionInput, { target: { value: '新しい詳細' } });
    expect(descriptionInput).toHaveValue('新しい詳細');

    // 期日の入力をテスト
    const dueDateInput = screen.getByLabelText('期日');
    fireEvent.change(dueDateInput, { target: { value: '2024-12-31' } });
    expect(dueDateInput).toHaveValue('2024-12-31');

    // ステータスの選択をテスト
    const statusSelect = screen.getByLabelText('ステータス*');
    fireEvent.change(statusSelect, { target: { value: 'Doing' } });
    expect(statusSelect).toHaveValue('Doing');
  });

  it('タスク更新失敗時にエラーがコンソールに出力される', async () => {
    // コンソールエラーのスパイを設定
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // エラーを投げるようにmutateをモック
    const error = new Error('タスク更新エラー');
    (useUpdateTask as Mock).mockReturnValue({
      mutate: (
        _data: {
          id: string;
          title: string;
          description: string;
          due_date: string;
          status: string;
        },
        options: {
          onSuccess?: () => void;
          onError?: (error: Error) => void;
        },
      ) => {
        options.onError?.(error);
      },
    });

    render(
      <TaskUpdate
        task={{
          ...mockTask,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        }}
      />,
    );

    // モーダルを開く
    fireEvent.click(screen.getByTestId('edit-icon'));

    // フォームに入力
    await userEvent.type(
      screen.getByLabelText('タイトル*'),
      '更新されたタイトル',
    );

    // フォームを送信
    fireEvent.click(screen.getByText('更新'));

    // エラーメッセージが正しく出力されたことを確認
    expect(consoleSpy).toHaveBeenCalledWith(
      'タスクの更新に失敗しました:',
      error,
    );

    // スパイをクリーンアップ
    consoleSpy.mockRestore();
  });
});
