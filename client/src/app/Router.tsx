import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/layouts/Header';
import { Footer } from '../components/layouts/Footer';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Footer />
        <main>
          <div className="container mx-auto bg-white p-4">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/detail/:id" element={<TaskDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default AppRouter;
