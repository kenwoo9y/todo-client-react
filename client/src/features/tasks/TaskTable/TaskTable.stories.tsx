import type { Meta, StoryObj } from '@storybook/react';
import type { Task } from '../../../types/task';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { EditIcon } from '../../../components/ui/EditIcon/EditIcon';
import { DeleteIcon } from '../../../components/ui/DeleteIcon/DeleteIcon';

// モックデータ
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'プロジェクトの計画策定',
    description: '次期プロジェクトの計画書を作成する',
    due_date: '2024-03-31',
    status: 'Doing',
    owner_id: 1,
    created_at: '2024-03-20 09:00',
    updated_at: '2024-03-20 09:00',
  },
  {
    id: 2,
    title: 'クライアントミーティング',
    description: '要件定義のための打ち合わせ',
    due_date: '2024-03-25',
    status: 'ToDo',
    owner_id: 1,
    created_at: '2024-03-20 10:00:00',
    updated_at: '2024-03-20 10:00:00',
  },
];

// モック用の新しいコンポーネント
const MockedTaskTable = () => {
  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">タスク一覧</h1>
        <Link
          to="/tasks/new"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          新規作成
        </Link>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-2 text-left">タイトル</th>
            <th className="px-4 py-2 text-left">期日</th>
            <th className="px-4 py-2 text-left">ステータス</th>
            <th className="px-4 py-2 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {mockTasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.due_date}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="flex space-x-2 px-4 py-2">
                <EditIcon onClick={() => console.log(`Edit task ${task.id}`)} />
                <DeleteIcon
                  onClick={() => console.log(`Delete task ${task.id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta = {
  title: 'Features/Tasks/TaskTable',
  component: MockedTaskTable,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof MockedTaskTable>;

export default meta;
type Story = StoryObj<typeof MockedTaskTable>;

export const Default: Story = {};
