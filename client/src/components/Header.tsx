import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    toggleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
    const navigate = useNavigate();

    const handleAppNameClick = () => {
        navigate('/');
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex items-center justify-between z-10 fixed w-full">
            <div className="flex items-center">
                <HamburgerMenu toggleSideMenu={toggleSideMenu} />
                <h1 className="text-2xl cursor-pointer" onClick={() => handleAppNameClick()}>
                    ToDo App
                </h1>
            </div>
            <div className="flex items-center ml-auto">
                <LogIn className="w-6 h-6 cursor-pointer" />
                <span className="ml-2 cursor-pointer">Sign Out</span>
            </div>
        </header>
    );
}

export default Header;