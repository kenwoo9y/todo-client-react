import { apiClient } from '../../lib/axios';
import { FetchTasksResponse } from './type';

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};
