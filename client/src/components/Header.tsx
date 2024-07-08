import React from "react";
import HamburgerMenu from "./HamburgerMenu";

interface HeaderProps {
    toggleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
    return (
        <header className="bg-blue-500 text-white p-4 flex items-center z-10 fixed w-full">
            <HamburgerMenu toggleSideMenu={toggleSideMenu} />
            <h1 className="text-2xl">ToDo App</h1>
        </header>
    );
}

export default Header;