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
