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
      className={`text-grey-800 fixed left-0 top-16 h-full w-64 bg-white shadow-2xl${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
    >
      <ul>
        <li
          className="flex cursor-pointer items-center p-4"
          onClick={() => handleNavigation('/')}
        >
          <Home className="mr-2 size-6" />
          Home
        </li>
        <li className="flex cursor-pointer items-center p-4">
          <MessagesSquare className="mr-2 size-6" />
          About
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
