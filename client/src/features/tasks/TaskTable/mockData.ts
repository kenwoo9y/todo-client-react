import { Task } from '../../../types/task';

/**
 * モックデータ
 * TODO: APIから取得するように変更する
 */
export const mockTasks: Task[] = [
  {
    id: 1,
    title: 'タスク1',
    description: '説明1',
    dueDate: '2025-01-15',
    status: 'Done',
  },
  {
    id: 2,
    title: 'タスク2',
    description: '説明2',
    dueDate: '2025-01-20',
    status: 'Doing',
  },
  {
    id: 3,
    title: 'タスク3',
    description: '説明3',
    dueDate: '2025-01-25',
    status: 'ToDo',
  },
];
