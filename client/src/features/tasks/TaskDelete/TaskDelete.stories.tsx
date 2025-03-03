import type { Meta, StoryObj } from '@storybook/react';
import { TaskDelete } from './TaskDelete';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query のセットアップ
const queryClient = new QueryClient();

const meta = {
  title: 'Features/Tasks/TaskDelete',
  component: TaskDelete,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskDelete>;

export default meta;
type Story = StoryObj<typeof TaskDelete>;

export const Default: Story = {
  args: {
    task: {
      id: 1,
      title: 'サンプルタスク',
      description: 'これはサンプルのタスク説明です。',
      due_date: '2024-12-31',
      status: 'ToDo',
      owner_id: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      id: 2,
      title:
        'これは非常に長いタイトルのタスクです。モーダル内でどのように表示されるか確認するためのサンプルです。',
      description: 'これはサンプルのタスク説明です。',
      due_date: '2024-12-31',
      status: 'Doing',
      owner_id: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
};
