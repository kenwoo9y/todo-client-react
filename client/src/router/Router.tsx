import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskDetail from "../components/TaskDetail";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/detail/:id" element={<TaskDetail />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;