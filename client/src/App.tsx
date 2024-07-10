import React, { useState } from "react";
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
      setIsSideMenuOpen(!isSideMenuOpen);
    };

    const closeSideMenu = () => {
      setIsSideMenuOpen(false);
    };

    const columns = [
      { label: '#', field: 'index' },
      { label: 'タイトル', field: 'title' },
      { label: '期日', field: 'due_date' },
      { label: 'ステータス', field: 'status'},
      { label: '操作', field: 'actions'},
    ];

    const data = [
      { title: 'タスク1', due_date: '2024-07-01', status: 'ToDo'},
      { title: 'タスク2', due_date: '2024-07-02', status: 'Done'},
      { title: 'タスク3', due_date: '2024-07-03', status: 'Doing'},
    ];

    return (
      <div className="flex flex-col min-h-screen">
          <Header toggleSideMenu={toggleSideMenu} />
          <SideMenu isOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
          <main className={`flex-grow pt-16 p-4 transition-all duration-300 ease-in-out ${isSideMenuOpen ? 'ml-64' : ''}`}>
            <div className="container mx-auto p-4 bg-white">
              <TaskList columns={columns} data={data} />
            </div>
          </main>
          <Footer />
      </div>
    );
}

export default App;