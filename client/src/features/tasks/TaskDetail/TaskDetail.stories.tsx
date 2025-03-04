import type { Meta, StoryObj } from '@storybook/react';
import type { Task } from '@/types/task';

// モックデータ
const mockTask: Task = {
  id: 1,
  title: 'テストタスク',
  description: 'これはテストタスクの説明です。',
  due_date: '2024-03-31',
  status: 'Doing',
  owner_id: 1,
  created_at: '2024-03-15 10:00:00',
  updated_at: '2024-03-15 10:00:00',
};

// モック用の新しいコンポーネント
const MockedTaskDetail = () => {
  // useFetchTaskの代わりに直接データを提供
  const mockData: {
    data: Task | undefined;
    isLoading: boolean;
    error: Error | null;
  } = {
    data: mockTask,
    isLoading: false,
    error: null,
  };

  // TaskDetailコンポーネントの内部実装を模倣
  if (mockData.isLoading) return <div>Loading...</div>;
  if (mockData.error) return <div>Error: {mockData.error.message}</div>;
  if (!mockData.data) return <div>Task not found</div>;

  const taskDetails = [
    { label: 'タイトル', value: mockData.data.title },
    { label: '詳細', value: mockData.data.description },
    { label: '期日', value: mockData.data.due_date },
    { label: 'ステータス', value: mockData.data.status },
    { label: '作成日時', value: mockData.data.created_at },
    { label: '更新日時', value: mockData.data.updated_at },
  ];

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">タスク詳細</h1>
      <table className="min-w-full border-collapse">
        <tbody>
          {taskDetails.map(({ label, value }) => (
            <tr key={label} className="border-b">
              <th className="w-1/4 bg-gray-50 px-4 py-2 text-left">{label}</th>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const meta = {
  title: 'Features/Tasks/TaskDetail',
  component: MockedTaskDetail,
} satisfies Meta<typeof MockedTaskDetail>;

export default meta;
type Story = StoryObj<typeof MockedTaskDetail>;

export const Default: Story = {};
