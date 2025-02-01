import React, { useState } from 'react';
import { Task } from '../../../types/task';
import { useUpdateTask } from '../../../hooks/useTasks';
import { EditIcon } from '../../../components/ui/EditIcon';
import { Dialog } from '../../../components/ui/Dialog';
import { TaskForm } from '../TaskForm';

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
        <TaskForm
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onCancel={() => setIsOpen(false)}
          submitLabel="更新"
          submitColor="yellow"
        />
      </Dialog>
    </>
  );
};
