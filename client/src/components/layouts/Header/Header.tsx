import React from 'react';
import { HamburgerMenu } from '../HamburgerMenu';
import { LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed z-10 flex h-16 w-full items-center justify-between bg-blue-500 p-4 text-white">
      <HamburgerMenu />
      <div className="ml-12 flex items-center">
        <h1 className="cursor-pointer text-2xl">ToDo App</h1>
      </div>
      <div className="ml-auto flex items-center">
        <LogIn className="size-6 cursor-pointer" />
        <span className="ml-2 cursor-pointer">Sign Out</span>
      </div>
    </header>
  );
};
