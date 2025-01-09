import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Home, MessagesSquare } from 'lucide-react';

import './HamburgerMenu.css';

export const HamburgerMenu: React.FC = () => {
  return (
    <Menu>
      <ul className="text-grey-800">
        <li className="flex cursor-pointer menu-item">
          <Home className="mr-2 size-6" />
          Home
        </li>
        <li className="flex cursor-pointer menu-item">
          <MessagesSquare className="mr-2 size-6" />
          About
        </li>
      </ul>
    </Menu>
  );
};
