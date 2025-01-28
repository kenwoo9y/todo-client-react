import React, { useState } from 'react';
import { Task } from '../../../types/task';
import { useUpdateTask } from '../../../hooks/useTasks';
import { Button } from '../../../components/ui/Button';
import { EditIcon } from '../../../components/ui/EditIcon';
import { Dialog } from '../../../components/ui/Dialog';

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
      <EditIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="タスク更新"
        stopPropagation={true}
      >
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
          <div className="flex justify-start gap-4">
            <Button variant="primary" color="yellow" type="submit">
              更新
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
        </form>
      </Dialog>
    </>
  );
};
