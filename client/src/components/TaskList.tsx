import React, { useEffect } from "react";
import TaskCreate from "./TaskCreate";
import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../stores/useTask";

const columns = [
    { label: '#', field: 'index' },
    { label: 'タイトル', field: 'title' },
    { label: '期日', field: 'due_date' },
    { label: 'ステータス', field: 'status' },
    { label: '操作', field: 'actions' },
];

const TaskList: React.FC = () => {
    const { tasks, getTasks } = useTaskStore();
    const navigate = useNavigate();

    // コンポーネントがマウントされたときにタスクを取得
    useEffect(() => {
        getTasks();
    }, [getTasks]);

    // 行クリックハンドラ
    const handleRowClick = (taskId: number) => {
        navigate(`/detail/${taskId}`);
    };

    // アイコンクリックハンドラ
    const iconClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 flex justify-end">
                <TaskCreate />
            </div>

            <h1 className="text-2xl">ToDo</h1>
            <table className="min-w-full border border-gray-200 bg-white">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th 
                                key={column.field} 
                                className="border-b border-gray-200 bg-gray-100 px-6 py-3 text-left text-sm font-semibold text-gray-700"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((row, rowIndex) => (
                        <tr 
                            key={row.id} 
                            className="cursor-pointer hover:bg-gray-100" 
                            onClick={() => handleRowClick(row.id)}
                        >
                            {columns.map((column) => (
                                <td 
                                    key={column.field} 
                                    className="border-b border-gray-200 px-6 py-3 text-sm text-gray-700"
                                >
                                    {column.field === 'index' ? rowIndex + 1 : 
                                    column.field === 'actions' ? (
                                        <div className="flex space-x-4">
                                            <div onClick={(event) => iconClick(event)}>
                                                <TaskEdit task={row} />
                                            </div>
                                            <div onClick={(event) => iconClick(event)}>
                                                <TaskDelete task={row} />
                                            </div>
                                        </div>
                                    ) : (row as never)[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;