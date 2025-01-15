import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/layouts/Header';
import { Footer } from '../components/layouts/Footer';
import TaskTable from '../features/tasks/TaskTable';
import TaskDetail from '../components/TaskDetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="my-16 flex-1">
          <div className="container mx-auto bg-white p-4">
            <Routes>
              <Route path="/" element={<TaskTable />} />
              <Route path="/detail/:id" element={<TaskDetail />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
