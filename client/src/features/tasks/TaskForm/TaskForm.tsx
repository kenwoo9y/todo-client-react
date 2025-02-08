import React from 'react';
import { Button } from '@/components/ui/Button';

interface TaskFormData {
  title: string;
  description: string;
  due_date: string;
  status: string;
}

interface TaskFormProps {
  formData: TaskFormData;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onCancel: (e: React.MouseEvent) => void;
  submitLabel: string;
  submitColor?: 'blue' | 'yellow';
}

export const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  onSubmit,
  onChange,
  onCancel,
  submitLabel,
  submitColor = 'blue',
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-bold">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          className="w-full rounded border p-2"
          maxLength={30}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-bold">
          詳細
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          className="w-full rounded border p-2"
          maxLength={255}
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
          onChange={onChange}
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
          onChange={onChange}
          className="w-full rounded border p-2"
        >
          <option value="ToDo">ToDo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="flex justify-start gap-4">
        <Button variant="primary" color={submitColor} type="submit">
          {submitLabel}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  );
};
