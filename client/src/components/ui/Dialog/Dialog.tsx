import React from 'react';
import Modal from 'react-modal';
import { CloseButton } from '../CloseButton';

// モーダルのルート要素を設定
Modal.setAppElement('#root');

interface DialogProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
  title: string;
  children: React.ReactNode;
  stopPropagation?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  stopPropagation = true,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    // navigationを防ぐ
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClose(e);
  };

  return (
    <Modal
      className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      isOpen={isOpen}
      onRequestClose={handleClick}
      // モーダルの内容をクリックしたときにモーダルが閉じないようにする
      contentElement={(props, children) => (
        <div
          {...props}
          onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
        >
          {children}
        </div>
      )}
      // オーバーレイのクリックでモーダルを閉じる
      overlayElement={(props, children) => (
        <div {...props} onClick={handleClick}>
          {children}
        </div>
      )}
    >
      <CloseButton onClick={handleClick} />
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {children}
    </Modal>
  );
};
