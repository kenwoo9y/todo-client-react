import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditIcon } from './EditIcon';

describe('EditIcon', () => {
  it('編集アイコンが正しくレンダリングされること', () => {
    const handleClick = vi.fn();
    render(<EditIcon onClick={handleClick} />);

    const icon = screen.getByTestId('edit-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('cursor-pointer');
  });

  it('クリック時にonClickが呼び出されること', async () => {
    const handleClick = vi.fn();
    render(<EditIcon onClick={handleClick} />);

    const user = userEvent.setup();
    const icon = screen.getByTestId('edit-icon');

    await user.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
