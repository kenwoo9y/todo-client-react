import { ColumnDef } from '@tanstack/react-table';
import { Task } from '@/types/task';
import { TaskUpdate } from '@/features/tasks/TaskUpdate/TaskUpdate';
import { TaskDelete } from '@/features/tasks/TaskDelete/TaskDelete';

/**
 * テーブルのカラム定義
 */
export const TableColumns: ColumnDef<Task>[] = [
  {
    id: 'index',
    header: '#',
    enableSorting: false,
    cell: (info) => {
      // 現在の表示順に基づいて番号を振り直す
      const index = info.table
        .getRowModel()
        .rows.findIndex((row) => row.id === info.row.id);
      return index + 1;
    },
  },
  { accessorKey: 'title', header: 'タイトル', sortingFn: 'alphanumeric' },
  { accessorKey: 'due_date', header: '期日', sortingFn: 'datetime' },
  { accessorKey: 'status', header: 'ステータス', sortingFn: 'alphanumeric' },
  {
    accessorKey: 'actions',
    header: '操作',
    enableSorting: false,
    cell: (info) => (
      <div className="flex space-x-4">
        <TaskUpdate task={info.row.original} />
        <TaskDelete task={info.row.original} />
      </div>
    ),
  },
];
