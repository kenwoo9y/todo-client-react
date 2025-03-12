import React, { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableColumns } from './TableColumns';
import { TablePagination } from './TablePagination';
import { useFetchTasks } from '@/hooks/useTasks';
import { TaskCreate } from '@/features/tasks/TaskCreate';
import { useNavigate } from 'react-router-dom';

/**
 * タスクテーブルコンポーネント
 * @returns タスク一覧を表示するテーブル
 * @description
 * - Tanstack Tableを使用したタスク一覧表示
 * - 編集・削除アクションの提供
 */
export const TaskTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]); // ソート状態
  const [pageSize, setPageSize] = useState(10); // ページサイズの状態

  // APIからタスクを取得
  const { data: tasks, isLoading, error, refetch } = useFetchTasks();

  const navigate = useNavigate();

  // テーブルインスタンスの初期化
  const table = useReactTable({
    data: tasks ?? [], // データがない場合は空配列を使用
    columns: TableColumns,
    meta: {
      refetch: refetch
    },
    state: {
      sorting,
      pagination: {
        pageSize,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-end">
        <TaskCreate />
      </div>
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
                            asc: (
                              <ChevronUp
                                className="size-4"
                                data-testid="chevron-up"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="size-4"
                                data-testid="chevron-down"
                              />
                            ),
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
                <tr
                  key={row.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/detail/${row.original.id}`)}
                >
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

        {/* ページネーション */}
        <TablePagination
          table={table}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};
