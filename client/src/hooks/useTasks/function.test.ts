import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { apiClient } from '@/lib/axios';
import { fetchTasks, fetchTask, createTask, updateTask, deleteTask } from './function';

vi.mock('@/lib/axios', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
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

describe('fetchTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('指定したIDのタスクを正常に取得できること', async () => {
    const taskId = 1;
    const mockResponse = {
      data: {
        task: {
          id: taskId,
          title: 'テストタスク',
          description: 'テストの説明',
          due_date: '2024-03-20',
          status: 'Doing',
          owner_id: 1,
          created_at: '2024-03-19T10:00:00Z',
          updated_at: '2024-03-19T10:00:00Z',
        },
      },
    };

    (apiClient.get as Mock).mockResolvedValue(mockResponse);

    const result = await fetchTask(taskId);

    expect(apiClient.get).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);
  });

  it('存在しないタスクIDの場合にエラーがスローされること', async () => {
    const taskId = 999;
    const error = new Error('Task not found');
    (apiClient.get as Mock).mockRejectedValue(error);

    await expect(fetchTask(taskId)).rejects.toThrow('Task not found');
    expect(apiClient.get).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  it('APIエラー時にエラーがスローされること', async () => {
    const taskId = 1;
    const error = new Error('API Error');
    (apiClient.get as Mock).mockRejectedValue(error);

    await expect(fetchTask(taskId)).rejects.toThrow('API Error');
    expect(apiClient.get).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });
});

describe('createTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('タスクを正常に作成できること', async () => {
    const mockRequest = {
      title: '新規タスク',
      description: 'タスクの説明',
      due_date: '2024-03-25',
      status: 'Todo',
      owner_id: 1,
    };

    const mockResponse = {
      data: {
        task: {
          id: 1,
          ...mockRequest,
          created_at: '2024-03-19T10:00:00Z',
          updated_at: '2024-03-19T10:00:00Z',
        },
      },
    };

    (apiClient.post as Mock).mockResolvedValue(mockResponse);

    const result = await createTask(mockRequest);

    expect(apiClient.post).toHaveBeenCalledWith('/tasks', mockRequest);
    expect(apiClient.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);
  });

  it('バリデーションエラー時にエラーがスローされること', async () => {
    const invalidRequest = {
      title: '', // 空のタイトル
      description: 'タスクの説明',
      due_date: '2024-03-25',
      status: 'Todo',
      owner_id: 1,
    };

    const error = new Error('Validation Error');
    (apiClient.post as Mock).mockRejectedValue(error);

    await expect(createTask(invalidRequest)).rejects.toThrow('Validation Error');
    expect(apiClient.post).toHaveBeenCalledWith('/tasks', invalidRequest);
    expect(apiClient.post).toHaveBeenCalledTimes(1);
  });

  it('APIエラー時にエラーがスローされること', async () => {
    const mockRequest = {
      title: '新規タスク',
      description: 'タスクの説明',
      due_date: '2024-03-25',
      status: 'Todo',
      owner_id: 1,
    };

    const error = new Error('API Error');
    (apiClient.post as Mock).mockRejectedValue(error);

    await expect(createTask(mockRequest)).rejects.toThrow('API Error');
    expect(apiClient.post).toHaveBeenCalledWith('/tasks', mockRequest);
    expect(apiClient.post).toHaveBeenCalledTimes(1);
  });
});

describe('updateTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('タスクを正常に更新できること', async () => {
    const taskId = 1;
    const mockRequest = {
      title: '更新後のタスク',
      description: '更新後の説明',
      due_date: '2024-03-26',
      status: 'Done',
      owner_id: 1,
    };

    const mockResponse = {
      data: {
        task: {
          id: taskId,
          ...mockRequest,
          created_at: '2024-03-19T10:00:00Z',
          updated_at: '2024-03-19T11:00:00Z',
        },
      },
    };

    (apiClient.patch as Mock).mockResolvedValue(mockResponse);

    const result = await updateTask(taskId, mockRequest);

    expect(apiClient.patch).toHaveBeenCalledWith(`/tasks/${taskId}`, mockRequest);
    expect(apiClient.patch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse.data);
  });

  it('存在しないタスクIDの場合にエラーがスローされること', async () => {
    const taskId = 999;
    const mockRequest = {
      title: '更新後のタスク',
      description: '更新後の説明',
      due_date: '2024-03-26',
      status: 'Done',
      owner_id: 1,
    };

    const error = new Error('Task not found');
    (apiClient.patch as Mock).mockRejectedValue(error);

    await expect(updateTask(taskId, mockRequest)).rejects.toThrow('Task not found');
    expect(apiClient.patch).toHaveBeenCalledWith(`/tasks/${taskId}`, mockRequest);
    expect(apiClient.patch).toHaveBeenCalledTimes(1);
  });

  it('バリデーションエラー時にエラーがスローされること', async () => {
    const taskId = 1;
    const invalidRequest = {
      title: '', // 空のタイトル
      description: '更新後の説明',
      due_date: '2024-03-26',
      status: 'Done',
      owner_id: 1,
    };

    const error = new Error('Validation Error');
    (apiClient.patch as Mock).mockRejectedValue(error);

    await expect(updateTask(taskId, invalidRequest)).rejects.toThrow('Validation Error');
    expect(apiClient.patch).toHaveBeenCalledWith(`/tasks/${taskId}`, invalidRequest);
    expect(apiClient.patch).toHaveBeenCalledTimes(1);
  });
});

describe('deleteTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('タスクを正常に削除できること', async () => {
    const taskId = 1;
    (apiClient.delete as Mock).mockResolvedValue(undefined);

    await deleteTask(taskId);

    expect(apiClient.delete).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.delete).toHaveBeenCalledTimes(1);
  });

  it('存在しないタスクIDの場合にエラーがスローされること', async () => {
    const taskId = 999;
    const error = new Error('Task not found');
    (apiClient.delete as Mock).mockRejectedValue(error);

    await expect(deleteTask(taskId)).rejects.toThrow('Task not found');
    expect(apiClient.delete).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.delete).toHaveBeenCalledTimes(1);
  });

  it('APIエラー時にエラーがスローされること', async () => {
    const taskId = 1;
    const error = new Error('API Error');
    (apiClient.delete as Mock).mockRejectedValue(error);

    await expect(deleteTask(taskId)).rejects.toThrow('API Error');
    expect(apiClient.delete).toHaveBeenCalledWith(`/tasks/${taskId}`);
    expect(apiClient.delete).toHaveBeenCalledTimes(1);
  });
});
