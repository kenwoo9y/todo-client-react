import { useState, useEffect } from "react";
import { apiClient } from "../plugins/axios";
import axios from "axios";

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
        setError(null);

        try {
            const response = await apiClient.get<Task[]>('/tasks');
            setTasks(response.data);
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Failed to get tasks');
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
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