import { useQuery } from '@tanstack/react-query';
import { taskKeys } from './key';
import { fetchTasks } from './function';
import { fetchTasksSelector } from './selector';

export const useFetchTasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: fetchTasks,
    select: fetchTasksSelector,
  });

  return { data, isLoading, error };
};
