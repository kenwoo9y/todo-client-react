import type { Meta, StoryObj } from '@storybook/react';
import { TaskUpdate } from './TaskUpdate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query のセットアップ
const queryClient = new QueryClient();

const meta = {
  title: 'Features/Tasks/TaskUpdate',
  component: TaskUpdate,
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
} satisfies Meta<typeof TaskUpdate>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const WithLongContent: Story = {
  args: {
    task: {
      id: 2,
      title:
        'とても長いタイトルのタスクサンプルです。これは長いタイトルの例として使用されます。',
      description:
        '長い説明文のサンプルです。\n複数行にわたる説明文として使用されます。\nこれは3行目です。\nこれは4行目です。',
      due_date: '2024-12-31',
      status: 'Doing',
      owner_id: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
};
