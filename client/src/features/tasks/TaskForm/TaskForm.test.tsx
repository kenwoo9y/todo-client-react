import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  const mockFormData = {
    title: '',
    description: '',
    due_date: '',
    status: 'ToDo',
  };

  const mockHandlers = {
    onSubmit: vi.fn((e) => e.preventDefault()),
    onChange: vi.fn(),
    onCancel: vi.fn(),
  };

  const defaultProps = {
    formData: mockFormData,
    onSubmit: mockHandlers.onSubmit,
    onChange: mockHandlers.onChange,
    onCancel: mockHandlers.onCancel,
    submitLabel: '保存',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('フォームの全ての要素が正しくレンダリングされること', () => {
    render(<TaskForm {...defaultProps} />);

    expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
    expect(screen.getByLabelText('詳細')).toBeInTheDocument();
    expect(screen.getByLabelText('期日')).toBeInTheDocument();
    expect(screen.getByLabelText('ステータス')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'キャンセル' }),
    ).toBeInTheDocument();
  });

  it('入力値の変更が正しく処理されること', () => {
    render(<TaskForm {...defaultProps} />);

    const titleInput = screen.getByLabelText('タイトル');
    fireEvent.change(titleInput, { target: { value: 'テストタスク' } });

    expect(mockHandlers.onChange).toHaveBeenCalled();
  });

  it('フォーム送信が正しく処理されること', () => {
    render(<TaskForm {...defaultProps} />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockHandlers.onSubmit).toHaveBeenCalled();
  });

  it('キャンセルボタンクリックが正しく処理されること', () => {
    render(<TaskForm {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'キャンセル' });
    fireEvent.click(cancelButton);

    expect(mockHandlers.onCancel).toHaveBeenCalled();
  });
});
