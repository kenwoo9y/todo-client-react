import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  // テスト前にルート要素を設定
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  // テスト後にクリーンアップ
  afterEach(() => {
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }
  });

  it('ダイアログが開いているときにタイトルとコンテンツが表示される', () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="テストタイトル">
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    expect(screen.getByText('テストタイトル')).toBeInTheDocument();
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  it('閉じるボタンをクリックするとonCloseが呼ばれる', () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="テストタイトル">
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('オーバーレイをクリックするとonCloseが呼ばれる', () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={true} onClose={onClose} title="テストタイトル">
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    // ReactModal__Overlayクラスを持つ要素を取得
    const overlay = document.querySelector('.ReactModal__Overlay');
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('stopPropagation=falseの場合、イベントの伝播が止まらない', () => {
    const onClose = vi.fn();
    const mockStopPropagation = vi.fn();

    render(
      <Dialog
        isOpen={true}
        onClose={onClose}
        title="テストタイトル"
        stopPropagation={false}
      >
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    const content = screen.getByRole('dialog');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    event.stopPropagation = mockStopPropagation;

    fireEvent(content, event);
    expect(mockStopPropagation).not.toHaveBeenCalled();
  });

  it('isOpen=falseの場合、ダイアログが表示されない', () => {
    const onClose = vi.fn();
    render(
      <Dialog isOpen={false} onClose={onClose} title="テストタイトル">
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    expect(screen.queryByText('テストタイトル')).not.toBeInTheDocument();
    expect(screen.queryByText('テストコンテンツ')).not.toBeInTheDocument();
  });

  it('stopPropagation=trueの場合、イベントの伝播が止まる', () => {
    const onClose = vi.fn();
    const mockStopPropagation = vi.fn();

    render(
      <Dialog isOpen={true} onClose={onClose} title="テストタイトル">
        <p>テストコンテンツ</p>
      </Dialog>,
    );

    const content = screen.getByRole('dialog');
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    event.stopPropagation = mockStopPropagation;

    fireEvent(content, event);
    expect(mockStopPropagation).toHaveBeenCalled();
  });
});
