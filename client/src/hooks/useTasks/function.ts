import { apiClient } from '../../lib/axios';
import {
  CreateTaskRequest,
  CreateTaskResponse,
  FetchTasksResponse,
  FetchTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from './type';

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const fetchTask = async (id: number): Promise<FetchTaskResponse> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (
  request: CreateTaskRequest,
): Promise<CreateTaskResponse> => {
  const response = await apiClient.post('/tasks', request);
  return response.data;
};

export const updateTask = async (
  id: number,
  request: UpdateTaskRequest,
): Promise<UpdateTaskResponse> => {
  const response = await apiClient.patch(`/tasks/${id}`, request);
  return response.data;
};
