import React from 'react';
import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Task } from '@/types/task';

interface TaskTablePaginationProps {
  table: Table<Task>;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export const TablePagination: React.FC<TaskTablePaginationProps> = ({
  table,
  pageSize,
  setPageSize,
}) => {
  return (
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
          aria-label="first"
        >
          <ChevronsLeft className="size-5" />
        </button>
        <button
          className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="previous"
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
          aria-label="next"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="last"
        >
          <ChevronsRight className="size-5" />
        </button>
      </div>
    </div>
  );
};
