import { Task, FetchTasksResponse } from '@/types/task';

export const fetchTasksSelector = (data: FetchTasksResponse): Task[] => {
  return data;
};
