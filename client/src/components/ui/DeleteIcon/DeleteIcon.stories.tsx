import type { Meta, StoryObj } from '@storybook/react';
import { DeleteIcon } from './DeleteIcon';

const meta: Meta<typeof DeleteIcon> = {
  title: 'Components/UI/DeleteIcon',
  component: DeleteIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeleteIcon>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Delete icon clicked'),
  },
};
