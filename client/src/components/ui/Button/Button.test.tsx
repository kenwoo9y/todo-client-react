import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('ボタンが正しくレンダリングされること', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByText('テストボタン')).toBeInTheDocument();
  });

  it('primaryバリアントが正しく適用されること', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('bg-blue-500');
  });

  it('secondaryバリアントが正しく適用されること', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('border-gray-300');
  });

  it('赤色が正しく適用されること', () => {
    render(<Button color="red">Red Button</Button>);
    const button = screen.getByText('Red Button');
    expect(button).toHaveClass('bg-red-500');
  });

  it('黄色が正しく適用されること', () => {
    render(<Button color="yellow">Yellow Button</Button>);
    const button = screen.getByText('Yellow Button');
    expect(button).toHaveClass('bg-yellow-500');
  });

  it('青色が正しく適用されること', () => {
    render(<Button color="blue">Blue Button</Button>);
    const button = screen.getByText('Blue Button');
    expect(button).toHaveClass('bg-blue-500');
  });
});
