import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from './key';
import {
  fetchTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
} from './function';
import { fetchTasksSelector } from './selector';
import { UpdateTaskRequest, UpdateTaskResponse } from '@/types/task';

export const useFetchTasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: fetchTasks,
    select: fetchTasksSelector,
  });

  return { data, isLoading, error };
};

export const useFetchTask = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => fetchTask(id),
  });
  return { data, isLoading, error };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('タスクの作成に失敗しました:', error);
    },
  });

  return { mutate };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    UpdateTaskResponse,
    Error,
    { id: number; request: UpdateTaskRequest }
  >({
    mutationFn: ({ id, request }) => updateTask(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('タスクの更新に失敗しました:', error);
    },
  });

  return { mutate };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, { id: number }>({
    mutationFn: ({ id }) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
    onError: (error) => {
      console.error('タスクの削除に失敗しました:', error);
    },
  });

  return { mutate };
};
