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
    ownerId: 1,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 2,
    title: 'タスク2',
    description: '説明2',
    dueDate: '2025-01-20',
    status: 'Doing',
    ownerId: 2,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 3,
    title: 'タスク3',
    description: '説明3',
    dueDate: '2025-01-25',
    status: 'ToDo',
    ownerId: 3,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];
