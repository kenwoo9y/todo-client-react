import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TablePagination } from './TablePagination';
import { Table } from '@tanstack/react-table';
import { Task } from '@/types/task';

// テーブルのモックを作成
const mockTable = {
  getState: () => ({
    pagination: {
      pageIndex: 0,
    },
  }),
  getPageCount: () => 5,
  getCanPreviousPage: () => true,
  getCanNextPage: () => true,
  setPageIndex: vi.fn(),
  previousPage: vi.fn(),
  nextPage: vi.fn(),
} as unknown as Table<Task>;

describe('TablePagination', () => {
  const defaultProps = {
    table: mockTable,
    pageSize: 10,
    setPageSize: vi.fn(),
  };

  it('ページネーションの基本的なレンダリング', () => {
    render(<TablePagination {...defaultProps} />);

    // 各要素が正しく表示されているか確認
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('10');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('ページサイズの変更が正しく動作する', () => {
    render(<TablePagination {...defaultProps} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '20' } });

    expect(defaultProps.setPageSize).toHaveBeenCalledWith(20);
  });

  it('ページ移動ボタンが正しく動作する', () => {
    render(<TablePagination {...defaultProps} />);

    // 最初のページへ
    const firstPageButton = screen.getByRole('button', { name: /first/i });
    fireEvent.click(firstPageButton);
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(0);

    // 前のページへ
    const prevPageButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevPageButton);
    expect(mockTable.previousPage).toHaveBeenCalled();

    // 次のページへ
    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
    expect(mockTable.nextPage).toHaveBeenCalled();

    // 最後のページへ
    const lastPageButton = screen.getByRole('button', { name: /last/i });
    fireEvent.click(lastPageButton);
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(4); // pageCount - 1
  });

  it('ページ移動ボタンが適切に無効化される', () => {
    const disabledTable = {
      ...mockTable,
      getCanPreviousPage: () => false,
      getCanNextPage: () => false,
    } as unknown as Table<Task>;

    render(<TablePagination {...defaultProps} table={disabledTable} />);

    // すべてのボタンが無効化されていることを確認
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('利用可能なページサイズオプションが正しく表示される', () => {
    render(<TablePagination {...defaultProps} />);

    const select = screen.getByRole('combobox');
    const options = Array.from(select.getElementsByTagName('option'));

    expect(options).toHaveLength(4);
    expect(options.map((option) => option.value)).toEqual([
      '10',
      '20',
      '30',
      '50',
    ]);
  });
});
