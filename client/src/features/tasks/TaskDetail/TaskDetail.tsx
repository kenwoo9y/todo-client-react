import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTask } from '../../../hooks/tasks/useTasks';
export const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading, error } = useFetchTask(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!task) return <div>Task not found</div>;

  const taskDetails = [
    { label: 'タイトル', value: task?.title },
    { label: '詳細', value: task?.description },
    { label: '期日', value: task?.due_date },
    { label: 'ステータス', value: task?.status },
    { label: '作成日時', value: task?.created_at },
    { label: '更新日時', value: task?.updated_at },
  ];

  return (
    <div className="w-full">
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
