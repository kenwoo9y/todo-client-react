import React, { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Pencil, Trash } from 'lucide-react';

/**
 * タスクの型定義
 */
type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

/**
 * モックデータ
 * TODO: APIから取得するように変更する
 */
const data: Task[] = [
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

/**
 * テーブルのカラム定義
 */
const columns: ColumnDef<Task>[] = [
  {
    id: 'index',
    header: '#',
    enableSorting: false,
    cell: (info) => {
      // 現在の表示順に基づいて番号を振り直す
      const index = info.table.getRowModel().rows.findIndex(
        (row) => row.id === info.row.id
      );
      return index + 1;
    },
  },
  { accessorKey: 'title', header: 'タイトル', sortingFn: 'alphanumeric' },
  { accessorKey: 'dueDate', header: '期日', sortingFn: 'datetime' },
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

/**
 * タスクテーブルコンポーネント
 * @returns タスク一覧を表示するテーブル
 * @description
 * - Tanstack Tableを使用したタスク一覧表示
 * - 編集・削除アクションの提供
 */
const TaskTable: React.FC = () => {
  // ソート状態
  const [sorting, setSorting] = useState<SortingState>([]);

  // テーブルインスタンスの初期化
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      {/* ページタイトル */}
      <h1 className="mb-4 text-2xl font-bold">ToDo</h1>

      {/* タスクテーブル */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-200 bg-gray-100 px-4 py-2 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.column.columnDef.header?.toString()}
                        {/* ソートアイコンの表示 */}
                        {{
                          asc: <ChevronUp className="size-4" />,
                          desc: <ChevronDown className="size-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-200 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
