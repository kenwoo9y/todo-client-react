import React, { useState } from 'react';
import Modal from 'react-modal';
import { Task } from '../../../types/task';
import { useDeleteTask } from '../../../hooks/useTasks';
import { Button } from '../../../components/ui/Button';
import { DeleteIcon } from '../../../components/ui/DeleteIcon';

// モーダルのルート要素を設定
Modal.setAppElement('#root');

export const TaskDelete: React.FC<{ task: Task }> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false); // モーダルの表示状態
  const deleteTask = useDeleteTask();

  const handleSubmit = () => {
    deleteTask.mutate({ id: task.id });
    setIsOpen(false);
  };

  return (
    <>
      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      />

      <Modal
        className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        isOpen={isOpen}
        onRequestClose={(e) => {
          e?.stopPropagation();
          setIsOpen(false);
        }}
        contentElement={(props, children) => (
          // モーダルの内容をクリックしたときにモーダルが閉じないようにする
          <div {...props} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        )}
        // オーバーレイのクリックでモーダルを閉じる（navigationは防ぐ）
        overlayElement={(props, children) => (
          <div
            {...props}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            {children}
          </div>
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // クリックイベントの伝播を停止
            setIsOpen(false);
          }}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="mb-4 text-xl font-bold">タスク削除</h2>
        <p className="mb-4">以下のタスクを削除しますか？</p>
        <p className="mb-6 text-lg font-medium">{task.title}</p>
        <div className="flex justify-start gap-4">
          <Button
            variant="primary"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit();
            }}
          >
            削除
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            キャンセル
          </Button>
        </div>
      </Modal>
    </>
  );
};
