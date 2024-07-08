import React, { useState } from "react";
import './index.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";

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
          <main className="flex-grow pt-16"></main>
          <Footer />
      </div>
    );
}

export default App;