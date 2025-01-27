import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';
type ButtonColor = 'blue' | 'yellow' | 'red';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = 'blue',
  className,
  children,
  ...props
}) => {
  const getColorClasses = () => {
    if (variant === 'primary') {
      switch (color) {
        case 'blue':
          return 'bg-blue-500 hover:bg-blue-600';
        case 'yellow':
          return 'bg-yellow-500 hover:bg-yellow-600';
        case 'red':
          return 'bg-red-500 hover:bg-red-600';
        default:
          return 'bg-blue-500 hover:bg-blue-600';
      }
    }
    return '';
  };

  return (
    <button
      className={clsx(
        'rounded px-4 py-2 shadow',
        {
          'text-white': variant === 'primary',
          'border border-gray-300 hover:bg-gray-100': variant === 'secondary',
        },
        getColorClasses(),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
