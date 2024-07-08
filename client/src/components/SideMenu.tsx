import React from "react";

interface SideMenuProps {
    isOpen: boolean;
    closeSideMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen }) => {
    return (
        <div className={`fixed top-16 left-0 w-64 bg-white text-grey-800 h-full shadow-2xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <ul>
                <li className="p-4">Item 1</li>
                <li className="p-4">Item 2</li>
                <li className="p-4">Item 3</li>
            </ul>
        </div>
    );
}

export default SideMenu;