import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
import { Task } from '../../../types/task';

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
    cell: () => (
      <div className="flex space-x-4">
        <Pencil className="cursor-pointer hover:text-blue-500" />
        <Trash className="cursor-pointer hover:text-red-500" />
      </div>
    ),
  },
];
