import { apiClient } from '../../lib/axios';
import { CreateTaskRequest, CreateTaskResponse, FetchTasksResponse } from './type';

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (
  request: CreateTaskRequest,
): Promise<CreateTaskResponse> => {
  const response = await apiClient.post('/tasks', request);
  return response.data;
};
