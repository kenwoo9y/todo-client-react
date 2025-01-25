import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Home, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

import './HamburgerMenu.css';

export const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onStateChange={(state) => setIsOpen(state.isOpen)}>
      <ul>
        <li className="menu-item">
          <Link to="/" className="flex cursor-pointer" onClick={handleClose}>
            <Home className="mr-2 size-6" />
            Home
          </Link>
        </li>
        <li className="menu-item">
          <Link
            to="/about"
            className="flex cursor-pointer"
            onClick={handleClose}
          >
            <MessagesSquare className="mr-2 size-6" />
            About
          </Link>
        </li>
      </ul>
    </Menu>
  );
};
