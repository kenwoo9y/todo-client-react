import { Task } from '../../../types/task';
import { FetchTasksResponse } from './type';

export const fetchTasksSelector = (data: FetchTasksResponse): Task[] => {
  return data;
};
