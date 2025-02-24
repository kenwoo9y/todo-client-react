import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Layout/Header',
  component: Header,
  decorators: [(Story) => (
    <BrowserRouter>
      <div style={{ margin: 0, padding: 0, width: '100%' }}>
        <Story />
      </div>
    </BrowserRouter>
  )],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
