import React from 'react';
import { Trash } from 'lucide-react';

interface DeleteIconProps {
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ onClick }) => {
  return (
    <Trash className="cursor-pointer hover:text-red-500" onClick={onClick} />
  );
};
