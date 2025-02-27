import type { Meta, StoryObj } from '@storybook/react';
import { EditIcon } from './EditIcon';

const meta: Meta<typeof EditIcon> = {
  title: 'Components/UI/EditIcon',
  component: EditIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Edit icon clicked'),
  },
};
