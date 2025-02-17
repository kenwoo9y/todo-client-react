import { vi, describe, it, expect, Mock, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCreate } from './TaskCreate';
import { useCreateTask } from '@/hooks/useTasks';

// useTasks hookのモック
vi.mock('@/hooks/useTasks', () => ({
  useCreateTask: vi.fn(),
}));

describe('TaskCreate', () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    // モックの設定
    (useCreateTask as Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('タスク作成ボタンをクリックするとモーダルが開く', () => {
    render(<TaskCreate />);

    const createButton = screen.getByText('タスク作成');
    fireEvent.click(createButton);

    expect(screen.getByText('新規タスク作成')).toBeInTheDocument();
  });

  it('フォームの入力値が正しく更新される', async () => {
    render(<TaskCreate />);

    // モーダルを開く
    fireEvent.click(screen.getByText('タスク作成'));

    // タイトルの入力をテスト
    const titleInput = screen.getByLabelText('タイトル');
    await userEvent.type(titleInput, 'テストタスク');
    expect(titleInput).toHaveValue('テストタスク');

    // 詳細の入力をテスト
    const descriptionInput = screen.getByLabelText('詳細');
    await userEvent.type(descriptionInput, 'テストの詳細');
    expect(descriptionInput).toHaveValue('テストの詳細');

    // 期日の入力をテスト
    const dueDateInput = screen.getByLabelText('期日');
    await userEvent.type(dueDateInput, '2024-12-31');
    expect(dueDateInput).toHaveValue('2024-12-31');

    // ステータスの選択をテスト
    const statusSelect = screen.getByLabelText('ステータス');
    await userEvent.selectOptions(statusSelect, 'Doing');
    expect(statusSelect).toHaveValue('Doing');
  });

  it('キャンセルボタンをクリックするとモーダルが閉じる', () => {
    render(<TaskCreate />);

    // モーダルを開く
    fireEvent.click(screen.getByText('タスク作成'));
    expect(screen.getByText('新規タスク作成')).toBeInTheDocument();

    // キャンセルボタンをクリック
    fireEvent.click(screen.getByText('キャンセル'));
    expect(screen.queryByText('新規タスク作成')).not.toBeInTheDocument();
  });

  it('フォームに入力してタスクを作成できる', async () => {
    render(<TaskCreate />);

    // モーダルを開く
    fireEvent.click(screen.getByText('タスク作成'));

    // フォームに入力
    await userEvent.type(screen.getByLabelText('タイトル'), 'テストタスク');
    await userEvent.type(screen.getByLabelText('詳細'), 'テストの詳細');
    await userEvent.type(screen.getByLabelText('期日'), '2024-12-31');

    // フォームを送信
    fireEvent.click(screen.getByText('作成'));

    // mutateが正しいデータで呼ばれたことを確認
    expect(mockMutate).toHaveBeenCalledWith(
      {
        title: 'テストタスク',
        description: 'テストの詳細',
        due_date: '2024-12-31',
        status: 'ToDo',
        owner_id: 1,
      },
      expect.any(Object),
    );
  });

  it('タスク作成成功時にモーダルが閉じてフォームがリセットされる', async () => {
    render(<TaskCreate />);

    // モーダルを開く
    fireEvent.click(screen.getByText('タスク作成'));

    // フォームに入力
    await userEvent.type(screen.getByLabelText('タイトル'), 'テストタスク');

    // フォームを送信
    fireEvent.click(screen.getByText('作成'));

    // mutateのコールバックを実行
    const mutateOptions = mockMutate.mock.calls[0][1];
    mutateOptions.onSuccess();

    // モーダルが閉じていることを確認
    await waitFor(() => {
      expect(screen.queryByText('新規タスク作成')).not.toBeInTheDocument();
    });
  });

  it('タスク作成失敗時にエラーがコンソールに出力される', async () => {
    // コンソールエラーのスパイを設定
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // エラーを投げるようにmutateをモック
    const error = new Error('タスク作成エラー');
    (useCreateTask as Mock).mockReturnValue({
      mutate: (
        _data: {
          title: string;
          description: string;
          due_date: string;
          status: string;
          owner_id: number;
        },
        options: {
          onSuccess?: () => void;
          onError?: (error: Error) => void;
        },
      ) => {
        options.onError?.(error);
      },
    });

    render(<TaskCreate />);

    // モーダルを開く
    fireEvent.click(screen.getByText('タスク作成'));

    // フォームに入力
    await userEvent.type(screen.getByLabelText('タイトル'), 'テストタスク');

    // フォームを送信
    fireEvent.click(screen.getByText('作成'));

    // エラーメッセージが正しく出力されたことを確認
    expect(consoleSpy).toHaveBeenCalledWith(
      'タスクの作成に失敗しました:',
      error,
    );

    // スパイをクリーンアップ
    consoleSpy.mockRestore();
  });
});
