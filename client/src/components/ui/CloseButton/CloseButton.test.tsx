import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CloseButton } from './CloseButton';

describe('CloseButton', () => {
  it('閉じるボタンが正しくレンダリングされること', () => {
    const handleClick = vi.fn();
    render(<CloseButton onClick={handleClick} />);

    const button = screen.getByText('✕');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('absolute', 'right-4', 'top-4');
  });

  it('クリック時にonClickが呼び出されること', async () => {
    const handleClick = vi.fn();
    render(<CloseButton onClick={handleClick} />);

    const user = userEvent.setup();
    const button = screen.getByText('✕');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
