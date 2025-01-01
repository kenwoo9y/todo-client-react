import React from 'react';

interface HamburgerMenuProps {
  toggleSideMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggleSideMenu }) => {
  return (
    <button className="p-2" onClick={toggleSideMenu}>
      <div className="w-6 h-0.5 bg-white mb-1"></div>
      <div className="w-6 h-0.5 bg-white mb-1"></div>
      <div className="w-6 h-0.5 bg-white"></div>
    </button>
  );
};

export default HamburgerMenu;
