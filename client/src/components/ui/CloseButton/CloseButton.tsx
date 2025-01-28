import React from 'react';

interface CloseButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      onClick={onClick}
    >
      ✕
    </button>
  );
};
