import React, { useState } from "react";
import TaskCreate from "./TaskCreate";
import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";

interface Task {
    index: number;
    title: string;
    details: string;
    due_date: string;
    status: string;
}

const columns = [
    { label: '#', field: 'index' },
    { label: 'タイトル', field: 'title' },
    { label: '期日', field: 'due_date' },
    { label: 'ステータス', field: 'status' },
    { label: '操作', field: 'actions' },
];

const initialData: Task[] = [
    { index: 1, title: 'Task 1', details: 'Detail 1', due_date: '2024-07-01', status: 'ToDo' },
    { index: 2, title: 'Task 2', details: 'Detail 2', due_date: '2024-07-02', status: 'Done' },
    { index: 3, title: 'Task 3', details: 'Detail 3', due_date: '2024-07-03', status: 'Doing' },
];

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialData);

    const handleDelete = (taskId: number) => {
        const newTasks = tasks.filter((task) => task.index !== taskId);
        setTasks(newTasks);
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-end mb-4">
                <TaskCreate />
            </div>
            
            <h1 className="text-2xl">ToDo</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th 
                                key={column.field} 
                                className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((row, rowIndex) => (
                        <tr key={row.index} className="hover:bg-gray-100">
                            {columns.map((column) => (
                                <td 
                                    key={column.field} 
                                    className="py-3 px-6 border-b border-gray-200 text-sm text-gray-700"
                                >
                                    {column.field === 'index' ? rowIndex + 1 : 
                                    column.field === 'actions' ? (
                                        <div className="flex space-x-4">
                                            <TaskEdit task={row} />
                                            <TaskDelete task={row} onDelete={handleDelete} />
                                        </div>
                                    ) : (row as any)[column.field]}
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