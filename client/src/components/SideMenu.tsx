import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  closeSideMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, closeSideMenu }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    closeSideMenu();
  };

  return (
    <div
      className={`fixed top-16 left-0 w-64 bg-white text-grey-800 h-full shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
    >
      <ul>
        <li
          className="p-4 flex items-center cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <Home className="w-6 h-6 mr-2" />
          Home
        </li>
        <li className="p-4 flex items-center cursor-pointer">
          <MessagesSquare className="w-6 h-6 mr-2" />
          About
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
