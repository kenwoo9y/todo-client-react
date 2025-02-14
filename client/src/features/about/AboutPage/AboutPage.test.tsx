import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('必要な要素が正しく表示されること', () => {
    render(<AboutPage />);

    expect(screen.getByText('About This ToDo App')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();

  });
});
