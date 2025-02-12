import React from 'react';
import { Pencil } from 'lucide-react';

interface EditIconProps {
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export const EditIcon: React.FC<EditIconProps> = ({ onClick }) => {
  return (
    <Pencil
      className="cursor-pointer hover:text-yellow-500"
      onClick={onClick}
      data-testid="edit-icon"
    />
  );
};
