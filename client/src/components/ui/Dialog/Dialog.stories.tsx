import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWithHooks = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Sample Dialog"
      >
        <p>Dialog content</p>
      </Dialog>
    </div>
  );
};

export const Default: Story = {
  render: () => <DialogWithHooks />,
};
