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
  return (
    <button
      className={clsx(
        'rounded px-4 py-2 shadow',
        {
          'text-white': variant === 'primary',
          [`bg-${color}-500 hover:bg-${color}-600`]: variant === 'primary',
          'border border-gray-300 hover:bg-gray-100': variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
