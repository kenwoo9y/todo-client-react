import { vi, describe, it, expect, Mock, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { useFetchTasks, useFetchTask, useCreateTask } from './index';
import { createTask, fetchTask, fetchTasks } from './function';
import { fetchTasksSelector } from './selector';
import { createWrapper } from '@/test/utils/wrapper';

// モックの設定
vi.mock('./function');
vi.mock('./selector');

describe('useFetchTasks', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = createWrapper(queryClient);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('正常にタスクを取得できる場合', async () => {
    const mockTasks = [{
      id: 1,
      title: 'テストタスク',
      description: 'テストの説明',
      due_date: '2024-03-20',
      status: 'Doing',
      owner_id: 1,
      created_at: '2024-03-19T10:00:00Z',
      updated_at: '2024-03-19T10:00:00Z'
    }];
    
    const mockProcessedTasks = [{
      id: 1,
      title: 'テストタスク',
      description: 'テストの説明',
      due_date: '2024-03-20',
      status: 'Doing',
      owner_id: 1,
      created_at: '2024-03-19T10:00:00Z',
      updated_at: '2024-03-19T10:00:00Z'
    }];
    
    (fetchTasks as Mock).mockResolvedValue(mockTasks);
    (fetchTasksSelector as Mock).mockReturnValue(mockProcessedTasks);

    const { result } = renderHook(() => useFetchTasks(), { wrapper });

    // 初期状態の確認
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // データ取得完了後の状態を確認
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockProcessedTasks);
    expect(result.current.error).toBeNull();
  });

  it('エラーが発生した場合', async () => {
    const error = new Error('タスクの取得に失敗しました');
    (fetchTasks as Mock).mockRejectedValue(error);
    (fetchTasksSelector as Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useFetchTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe('タスクの取得に失敗しました');
    });

    expect(result.current.data).toBeUndefined();
  });
});

describe('useFetchTask', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    wrapper = createWrapper(queryClient);
  });

  it('正常に単一のタスクを取得できる場合', async () => {
    const mockTask = {
      id: 1,
      title: 'テストタスク',
      description: 'テストの説明',
      due_date: '2024-03-20',
      status: 'Doing',
      owner_id: 1,
      created_at: '2024-03-19T10:00:00Z',
      updated_at: '2024-03-19T10:00:00Z'
    };
    
    (fetchTask as Mock).mockResolvedValue(mockTask);

    const { result } = renderHook(() => useFetchTask(1), { wrapper });

    // 初期状態の確認
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    // データ取得完了後の状態を確認
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockTask);
    expect(result.current.error).toBeNull();
    expect(fetchTask).toHaveBeenCalledWith(1);
  });

  it('エラーが発生した場合', async () => {
    const error = new Error('["tasks","detail",1] data is undefined');
    vi.clearAllMocks();
    (fetchTask as Mock).mockReset();
    (fetchTask as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useFetchTask(1), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe('["tasks","detail",1] data is undefined');
    });

    expect(result.current.data).toBeUndefined();
    expect(fetchTask).toHaveBeenCalledWith(1);
  });
});

describe('useCreateTask', () => {
  let queryClient: QueryClient;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    // invalidateQueriesをモック化
    queryClient.invalidateQueries = vi.fn();
    wrapper = createWrapper(queryClient);
  });

  it('正常にタスクを作成できる場合', async () => {
    const mockTask = {
      title: '新規タスク',
      description: '新規タスクの説明',
      due_date: '2024-03-20',
      status: 'Todo',
      owner_id: 1
    };

    const createdTask = { ...mockTask, id: 1 };
    (createTask as Mock).mockResolvedValue(createdTask);

    const { result } = renderHook(() => useCreateTask(), { wrapper });

    // mutateを呼び出す
    result.current.mutate(mockTask);

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith(mockTask);
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ['tasks', 'list']
      });
    });
  });

  it('エラーが発生した場合', async () => {
    const error = new Error('タスクの作成に失敗しました');
    const consoleSpy = vi.spyOn(console, 'error');
    const mockTask = {
      title: '新規タスク',
      description: '新規タスクの説明',
      due_date: '2024-03-20',
      status: 'Todo',
      owner_id: 1
    };

    (createTask as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateTask(), { wrapper });

    // mutateを呼び出す
    result.current.mutate(mockTask);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('タスクの作成に失敗しました:', error);
    });

    consoleSpy.mockRestore();
  });
});