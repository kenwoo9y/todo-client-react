import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTaskStore from '../stores/useTask';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const headerTitles = [
  'タイトル',
  '詳細',
  '期日',
  'ステータス',
  '作成日時',
  '更新日時',
];

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLからタスクIDを取得
  const navigate = useNavigate();
  const { tasks, loading, error, getTasks } = useTaskStore(); // タスクデータとAPI呼び出し関数を取得
  const [task, setTask] = useState<Task | null>(null);

  // ページが読み込まれたときにタスクを取得する
  useEffect(() => {
    if (!tasks.length) {
      getTasks(); // タスクが空の場合は取得
    }
  }, [getTasks, tasks.length]);

  // タスクIDに基づいて特定のタスクを検索
  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === Number(id));
    setTask(foundTask || null);
  }, [id, tasks]);

  // ロード中の表示
  if (loading) {
    return <div>Loading...</div>;
  }

  // エラーメッセージの表示
  if (error) {
    return <div>Error: {error}</div>;
  }

  // タスクが存在しない場合
  if (!task) {
    return <div>No task found</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex">
        <button
          className="rounded border border-gray-300 px-4 py-2 text-gray-700"
          onClick={() => navigate('/')}
        >
          戻る
        </button>
      </div>

      <table className="min-w-full border border-gray-200 bg-white">
        <tbody>
          {headerTitles.map((title, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{title}</td>
              <td className="border px-4 py-2">
                {index === 0
                  ? task.title
                  : index === 1
                    ? task.description
                    : index === 2
                      ? task.due_date
                      : index === 3
                        ? task.status
                        : index === 4
                          ? task.created_at
                          : task.updated_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetail;
