import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from './key';
import { createTask, fetchTasks } from './function';
import { fetchTasksSelector } from './selector';

export const useFetchTasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: fetchTasks,
    select: fetchTasksSelector,
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
