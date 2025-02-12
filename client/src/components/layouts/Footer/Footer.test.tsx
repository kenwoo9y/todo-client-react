import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('コピーライト表示が存在すること', () => {
    render(<Footer />);

    const copyrightText = screen.getByText(/© 2024 kenwoo9y/);
    expect(copyrightText).toBeInTheDocument();
  });
});
