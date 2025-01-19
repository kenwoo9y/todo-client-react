/**
 * タスクの型定義
 */
export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
};
