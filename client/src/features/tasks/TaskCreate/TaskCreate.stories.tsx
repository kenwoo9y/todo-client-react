import type { Meta, StoryObj } from '@storybook/react';
import { TaskCreate } from './TaskCreate';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query のセットアップ
const queryClient = new QueryClient();

const meta = {
  title: 'Features/Tasks/TaskCreate',
  component: TaskCreate,
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
} satisfies Meta<typeof TaskCreate>;

export default meta;
type Story = StoryObj<typeof TaskCreate>;

export const Default: Story = {};
