import { describe, it, expect } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { HamburgerMenu } from './HamburgerMenu';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@storybook/test';

describe('HamburgerMenu', () => {
  it('メニュー項目とリンクが正しく表示されること', () => {
    render(
      <BrowserRouter>
        <HamburgerMenu />
      </BrowserRouter>,
    );

    // メニュー項目の確認
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    // リンクの確認
    const homeLink = screen.getByText('Home').closest('a');
    const aboutLink = screen.getByText('About').closest('a');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('メニュー項目をクリックするとメニューが閉じること', async () => {
    render(
      <BrowserRouter>
        <HamburgerMenu />
      </BrowserRouter>,
    );

    const user = userEvent.setup();
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    await act(async () => {
      await user.click(homeLink);
    });

    await act(async () => {
      await user.click(aboutLink);
    });
  });
});
