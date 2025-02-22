import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { apiClient } from '@/lib/axios';
import { fetchTasks } from './function';

vi.mock('@/lib/axios', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('fetchTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('タスク一覧を正常に取得できること', async () => {
    // モックデータの準備
    const mockResponse = {
      data: {
        tasks: [
          {
            id: 1,
            title: 'テストタスク',
            description: 'テストの説明',
            due_date: '2024-03-20',
            status: 'Doing',
            owner_id: 1,
            created_at: '2024-03-19T10:00:00Z',
            updated_at: '2024-03-19T10:00:00Z',
          },
          {
            id: 2,
            title: 'テストタスク2',
            description: 'テストの説明2',
            due_date: '2024-03-21',
            status: 'Done',
            owner_id: 2,
            created_at: '2024-03-19T10:00:00Z',
            updated_at: '2024-03-19T10:00:00Z',
          },
        ],
      },
    };

    (apiClient.get as Mock).mockResolvedValue(mockResponse);

    // テスト実行
    const result = await fetchTasks();

    // 検証
    expect(apiClient.get).toHaveBeenCalledWith('/tasks');
    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);
  });

  it('APIエラー時にエラーがスローされること', async () => {
    // エラーモックの設定
    const error = new Error('API Error');
    (apiClient.get as Mock).mockRejectedValue(error);

    // テスト実行と検証
    await expect(fetchTasks()).rejects.toThrow('API Error');
    expect(apiClient.get).toHaveBeenCalledWith('/tasks');
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });
});
