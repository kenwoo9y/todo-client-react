import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const TaskDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            // 本来はAPIからタスクを取得する
            const fetchedTask: Task = {
                id: parseInt(id || "0"),
                title: `Task ${id}`,
                description: `Detail of task ${id}`,
                due_date: `2024-07-0${id}`,
                status: id === '1' ? '未完了' : id === '2' ? '完了' : '進行中',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setTask(fetchedTask);
        };
        fetchTask();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-start mb-4">
                <button
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded"
                    onClick={() => navigate('/')}
                >
                    Go Back
                </button>
            </div>

            <div className="flex justify-end space-x-4 mb-4">
            </div>

            <div className="bg-white shadow-md rounded-md p-4">
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
        </div>
    );
};

export default TaskDetail;
