import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from './key';
import { createTask, fetchTask, fetchTasks, updateTask } from './function';
import { fetchTasksSelector } from './selector';
import { UpdateTaskRequest, UpdateTaskResponse } from './type';

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
