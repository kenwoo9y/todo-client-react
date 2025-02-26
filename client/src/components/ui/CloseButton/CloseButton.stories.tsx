import type { Meta, StoryObj } from '@storybook/react';
import { CloseButton } from './CloseButton';

const meta: Meta<typeof CloseButton> = {
  title: 'Components/UI/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Close button clicked'),
  },
};
