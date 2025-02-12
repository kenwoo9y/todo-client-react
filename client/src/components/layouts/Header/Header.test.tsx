import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('should render', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // タイトルの確認
    expect(screen.getByText('ToDo App')).toBeInTheDocument();

    // サインアウトボタンの確認
    expect(screen.getByText('Sign Out')).toBeInTheDocument();

    // ハンバーガーメニューの存在確認
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
