import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideMenu }) => {
  const navigate = useNavigate();

  const handleAppNameClick = () => {
    navigate('/');
  };

  return (
    <header className="fixed z-10 flex w-full items-center justify-between bg-blue-500 p-4 text-white">
      <div className="flex items-center">
        <HamburgerMenu toggleSideMenu={toggleSideMenu} />
        <h1
          className="cursor-pointer text-2xl"
          onClick={() => handleAppNameClick()}
        >
          ToDo App
        </h1>
      </div>
      <div className="ml-auto flex items-center">
        <LogIn className="size-6 cursor-pointer" />
        <span className="ml-2 cursor-pointer">Sign Out</span>
      </div>
    </header>
  );
};

export default Header;
