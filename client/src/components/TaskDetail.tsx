import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    "タイトル", "詳細", "期日", "ステータス", "作成日時", "更新日時"
];

const initialData: Task = { id: 1, title: 'Task 1', description: 'Detail 1', due_date: '2024-07-01', status: 'ToDo', created_at: '2024-07-01', updated_at: '2024-07-01' };

const TaskDetail: React.FC = () => {
    // const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task] = useState<Task | null>(initialData);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex mb-4">
                <button
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={() => navigate('/')}
                >
                    戻る
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[0]}</td>
                        <td className="border px-4 py-2">{task.title}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[1]}</td>
                        <td className="border px-4 py-2">{task.description}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[2]}</td>
                        <td className="border px-4 py-2">{task.due_date}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[3]}</td>
                        <td className="border px-4 py-2">{task.status}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[4]}</td>
                        <td className="border px-4 py-2">{task.created_at}</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{headerTitles[5]}</td>
                        <td className="border px-4 py-2">{task.updated_at}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    );
};

export default TaskDetail;
