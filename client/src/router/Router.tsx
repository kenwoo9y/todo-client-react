import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';
import TaskList from '../components/TaskList';
import TaskDetail from '../components/TaskDetail';

const AppRouter: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header toggleSideMenu={toggleSideMenu} />
        <SideMenu isOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
        <main
          className={`grow p-4 pt-16 transition-all duration-300 ease-in-out ${isSideMenuOpen ? 'ml-64' : ''}`}
        >
          <div className="container mx-auto bg-white p-4">
            <Routes>
              <Route path="/" element={<TaskList />} />
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
