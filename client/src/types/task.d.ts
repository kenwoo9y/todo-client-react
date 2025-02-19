/**
 * タスクの型定義
 */
export type Task = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

export type FetchTasksResponse = Task[];
export type FetchTaskResponse = Task;

export type CreateTaskRequest = {
  title: string;
  description: string;
  due_date: string;
  status: string;
  owner_id: number;
};

export type CreateTaskResponse = Task;

export type UpdateTaskRequest = {
  title: string;
  description: string;
  due_date: string;
  status: string;
  owner_id: number;
};

export type UpdateTaskResponse = Task;
