import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchTask } from '@/hooks/useTasks';
import { formatDateTime } from '@/utils/dateUtils';
import { TaskUpdate } from '@/features/tasks/TaskUpdate/TaskUpdate';
import { TaskDelete } from '@/features/tasks/TaskDelete/TaskDelete';

export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: task, isLoading, error, refetch } = useFetchTask(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!task) return <div>Task not found</div>;

  const taskDetails = [
    { label: 'タイトル', value: task?.title },
    { label: '詳細', value: task?.description },
    { label: '期日', value: task?.due_date },
    { label: 'ステータス', value: task?.status },
    { label: '作成日時', value: formatDateTime(task?.created_at) },
    { label: '更新日時', value: formatDateTime(task?.updated_at) },
  ];

  const handleDeleteSuccess = () => {
    navigate('/');
  };

  return (
    <div className="w-full">
      {/* 操作ボタン */}
      <div className="mb-4 flex justify-end gap-2">
        <TaskUpdate task={task} onSuccess={refetch} />
        <TaskDelete
          task={task}
          onSuccess={handleDeleteSuccess}
          data-testid="task-delete"
        />
      </div>

      {/* ページタイトル */}
      <h1 className="mb-4 text-2xl font-bold">タスク詳細</h1>

      {/* タスク詳細テーブル */}
      <table className="min-w-full border-collapse">
        <tbody>
          {taskDetails.map(({ label, value }) => (
            <tr key={label} className="border-b">
              <th className="w-1/4 bg-gray-50 px-4 py-2 text-left">{label}</th>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
