import { ColumnDef } from '@tanstack/react-table';

// テーブルデータの型定義
type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

// カラム定義
const columns: ColumnDef<Task>[] = [
  { accessorKey: 'index', header: '#' },
  { accessorKey: 'title', header: 'タイトル' },
  { accessorKey: 'dueDate', header: '期日' },
  { accessorKey: 'status', header: 'ステータス' },
  { accessorKey: 'actions', header: '操作' },
];
