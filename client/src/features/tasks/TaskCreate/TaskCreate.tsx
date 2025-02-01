import React, { useState } from 'react';
import { useCreateTask } from '../../../hooks/useTasks';
import { Dialog } from '../../../components/ui/Dialog';
import { TaskForm } from '../TaskForm';

export const TaskCreate: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // モーダルの表示状態
  const createTask = useCreateTask(); // オプションなしで呼び出し

  // フォームデータの状態
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'ToDo',
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
    createTask.mutate(
      { ...formData, owner_id: 1 }, // APIリクエスト時にowner_idを追加
      {
        onSuccess: () => {
          setIsOpen(false);
          setFormData({
            // フォームをリセット
            title: '',
            description: '',
            due_date: '',
            status: 'ToDo',
          });
        },
        onError: (error: Error) =>
          console.error('タスクの作成に失敗しました:', error),
      },
    );
  };

  return (
    <>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white shadow"
        onClick={() => setIsOpen(true)}
      >
        タスク作成
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="新規タスク作成"
        stopPropagation={true}
      >
        <TaskForm
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onCancel={() => setIsOpen(false)}
          submitLabel="作成"
          submitColor="blue"
        />
      </Dialog>
    </>
  );
};
