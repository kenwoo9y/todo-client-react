import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Home, MessagesSquare } from 'lucide-react';

import './HamburgerMenu.css';

export const HamburgerMenu: React.FC = () => {
  return (
    <Menu>
      <ul>
        <li className="menu-item flex cursor-pointer">
          <Home className="mr-2 size-6" />
          Home
        </li>
        <li className="menu-item flex cursor-pointer">
          <MessagesSquare className="mr-2 size-6" />
          About
        </li>
      </ul>
    </Menu>
  );
};
