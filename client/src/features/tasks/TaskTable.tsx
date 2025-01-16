import React, { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Trash,
} from 'lucide-react';

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
      const index = info.table
        .getRowModel()
        .rows.findIndex((row) => row.id === info.row.id);
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
  const [sorting, setSorting] = useState<SortingState>([]); // ソート状態
  const [pageSize, setPageSize] = useState(10); // ページサイズの状態

  // テーブルインスタンスの初期化
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {/* ページタイトル */}
      <h1 className="mb-4 text-2xl font-bold">ToDo</h1>

      <div className="relative overflow-x-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーションコントロール */}
        <div className="mt-4 flex items-center justify-end gap-4 px-4">
          {/* ページサイズ選択 */}
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded border px-2 py-1"
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* ページネーションボタン */}
          <div className="flex items-center gap-2">
            <button
              className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="size-5" />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="flex items-center gap-1">
              <span>{table.getState().pagination.pageIndex + 1}</span>
              <span>/</span>
              <span>{table.getPageCount()}</span>
            </span>
            <button
              className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
