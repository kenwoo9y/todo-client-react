import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    color: {
      control: 'select',
      options: ['blue', 'yellow', 'red'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    color: 'blue',
    children: '作成',
  },
};

export const Yellow: Story = {
  args: {
    variant: 'primary',
    color: 'yellow',
    children: '編集',
  },
};

export const Red: Story = {
  args: {
    variant: 'primary',
    color: 'red',
    children: '削除',
  },
};
