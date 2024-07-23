import { useState, useEffect } from "react";
import { apiClient } from "../plugins/axios";

interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: string;
}

const useTaskStore = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // タスクを取得する関数
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/tasks');
            setTasks(response.data);
            setError(null);
        } catch (error) {
            setError('Failed to get tasks');
        } finally {
            setLoading(false);
        }
    };

    // コンポーネントがマウントされたときにタスクを取得
    useEffect(() => {
        getTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        getTasks,
    };
};

export default useTaskStore;