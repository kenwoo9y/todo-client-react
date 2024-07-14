import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "../components/TaskList";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskList />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;