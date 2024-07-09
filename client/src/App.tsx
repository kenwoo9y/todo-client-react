import React, { useState } from "react";
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import ToDoList from "./components/ToDoList";

const App: React.FC = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
      setIsSideMenuOpen(!isSideMenuOpen);
    };

    const closeSideMenu = () => {
      setIsSideMenuOpen(false);
    };

    const columns = [
      { label: 'Name', field: 'name' },
      { label: 'Age', field: 'age' },
      { label: 'Email', field: 'email' },
    ];

    const data = [
      { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
      { name: 'Sam Johnson', age: 22, email: 'sam.johnson@example.com' },
    ];

    return (
      <div className="flex flex-col min-h-screen">
          <Header toggleSideMenu={toggleSideMenu} />
          <SideMenu isOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
          <main className={`flex-grow pt-16 p-4 transition-all duration-300 ease-in-out ${isSideMenuOpen ? 'ml-64' : ''}`}>
            <div className="container mx-auto p-4 bg-white">
              <ToDoList columns={columns} data={data} />
            </div>
          </main>
          <Footer />
      </div>
    );
}

export default App;