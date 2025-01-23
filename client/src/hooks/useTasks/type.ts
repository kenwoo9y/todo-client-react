import { Task } from '../../types/task';

export type FetchTasksResponse = Task[];

export type CreateTaskRequest = {
  title: string;
  description: string;
  due_date: string;
  status: string;
  owner_id: number;
};

export type CreateTaskResponse = Task;