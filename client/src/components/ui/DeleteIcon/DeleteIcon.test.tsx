import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteIcon } from './DeleteIcon';

describe('DeleteIcon', () => {
  it('削除アイコンが正しくレンダリングされること', () => {
    const handleClick = vi.fn();
    render(<DeleteIcon onClick={handleClick} />);

    const icon = screen.getByTestId('delete-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('cursor-pointer');
  });

  it('クリック時にonClickが呼び出されること', async () => {
    const handleClick = vi.fn();
    render(<DeleteIcon onClick={handleClick} />);

    const user = userEvent.setup();
    const icon = screen.getByTestId('delete-icon');

    await user.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
