import React from 'react';

interface HamburgerMenuProps {
  toggleSideMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggleSideMenu }) => {
  return (
    <button className="p-2" onClick={toggleSideMenu}>
      <div className="mb-1 h-0.5 w-6 bg-white"></div>
      <div className="mb-1 h-0.5 w-6 bg-white"></div>
      <div className="h-0.5 w-6 bg-white"></div>
    </button>
  );
};

export default HamburgerMenu;
