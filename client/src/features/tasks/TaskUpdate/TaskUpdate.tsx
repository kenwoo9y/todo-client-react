import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import Modal from 'react-modal';
import { Task } from '../../../types/task';
import { useUpdateTask } from '../../../hooks/tasks/useTasks';

// モーダルのルート要素を設定
Modal.setAppElement('#root');

export const TaskUpdate: React.FC<{ task: Task }> = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false); // モーダルの表示状態
  const updateTask = useUpdateTask();

  // フォームデータの状態
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    status: task.status,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask.mutate(
      {
        id: task.id,
        request: { ...formData, owner_id: task.owner_id },
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: (error: Error) =>
          console.error('タスクの更新に失敗しました:', error),
      },
    );
  };

  return (
    <>
      <Pencil
        className="cursor-pointer hover:text-yellow-500"
        onClick={(e) => {
          e.stopPropagation(); // クリックイベントの伝播を停止
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
        <h2 className="mb-4 text-xl font-bold">新規タスク作成</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-bold">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-bold"
            >
              詳細
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="due_date" className="mb-2 block text-sm font-bold">
              期日
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-bold">
              ステータス
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded border p-2"
            >
              <option value="ToDo">ToDo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded bg-yellow-500 px-4 py-2 text-white shadow"
          >
            更新
          </button>
        </form>
      </Modal>
    </>
  );
};
