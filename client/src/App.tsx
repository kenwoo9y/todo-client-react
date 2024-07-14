import React, { useState } from "react";
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import AppRouter from "./router/Router";

const App: React.FC = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
      setIsSideMenuOpen(!isSideMenuOpen);
    };

    const closeSideMenu = () => {
      setIsSideMenuOpen(false);
    };

    return (
      <div className="flex flex-col min-h-screen">
          <Header toggleSideMenu={toggleSideMenu} />
          <SideMenu isOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
          <main className={`flex-grow pt-16 p-4 transition-all duration-300 ease-in-out ${isSideMenuOpen ? 'ml-64' : ''}`}>
            <div className="container mx-auto p-4 bg-white">
              <AppRouter />
            </div>
          </main>
          <Footer />
      </div>
    );
}

export default App;