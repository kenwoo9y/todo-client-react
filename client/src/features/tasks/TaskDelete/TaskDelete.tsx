import React, { useState } from 'react';
import { Task } from '@/types/task';
import { useDeleteTask } from '@/hooks/useTasks';
import { Button } from '@/components/ui/Button';
import { DeleteIcon } from '@/components/ui/DeleteIcon';
import { Dialog } from '@/components/ui/Dialog';

interface TaskDeleteProps {
  task: Task;
  onSuccess?: () => void;
}

export const TaskDelete: React.FC<TaskDeleteProps> = ({ task, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false); // モーダルの表示状態
  const deleteTask = useDeleteTask();

  const handleSubmit = () => {
    deleteTask.mutate({ id: task.id });
    setIsOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <DeleteIcon
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="タスク削除"
        stopPropagation={true}
      >
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
      </Dialog>
    </>
  );
};
